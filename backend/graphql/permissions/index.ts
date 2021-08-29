import { and, inputRule, rule, shield } from 'graphql-shield';
import { Context } from '../resolvers';
import { QueryNarrationsArgs, RequireFields } from '../../../generated/graphql';

const isAuthenticated = rule()(async (parent, args: RequireFields<QueryNarrationsArgs, 'where'>, ctx: Context) => {
  console.log('isAuthenticated', { args, ctx });
  return !!ctx?.user?.email;
});

const isMissing = (str?: string) => !str || str === '';

const hasClassNameOrId = inputRule()(
  (yup) =>
    yup.object({
      where: yup.object({
        name: yup.string().when('id', {
          is: isMissing,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
        id: yup.string().when('name', {
          is: isMissing,
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
    narrations: and(hasClassNameOrId, isAuthenticated),
  },
});
