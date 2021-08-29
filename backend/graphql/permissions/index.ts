import { and, inputRule, rule, shield } from 'graphql-shield';
import { Context } from '../resolvers';
import { QueryNarrationsArgs, RequireFields } from '../../../generated/graphql';

const isAuthenticated = rule()(async (parent, args: RequireFields<QueryNarrationsArgs, 'where'>, ctx: Context) => {
  console.log('isAuthenticated', { args, ctx });
  return !!ctx?.user?.email;
});

const hasEmailOrId = inputRule()(
  (yup) =>
    yup.object({
      where: yup.object({
        email: yup
          .string()
          .email()
          .when('id', {
            is: (id?: string) => !id || id.length === 0,
            then: yup.string().email().required(),
            otherwise: yup.string(),
          }),
        id: yup.string().when('email', {
          is: (email?: string) => !email || email.length === 0,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
      }),
    }),
  {
    abortEarly: false,
  }
);

export const permissions = shield({
  Query: {
    narrations: and(hasEmailOrId, isAuthenticated),
  },
});
