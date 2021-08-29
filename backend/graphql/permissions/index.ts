import { and, inputRule, rule, shield } from 'graphql-shield';
import { Context } from '../resolvers';

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx: Context) => {
  console.log('isAuthenticated', !!ctx?.user?.email);
  return !!ctx?.user?.email;
});

const isMissing = (str?: string) => {
  console.log('isMissing', str, !str || str === '');
  return !str || str === '';
};

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
