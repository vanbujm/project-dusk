import { and, inputRule, rule, shield } from 'graphql-shield';
import { Context } from '../resolvers';

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx: Context) => {
  console.error('isAuthenticated', { email: ctx?.user?.email });
  return !!ctx?.user?.email;
});

const isMissing = (str?: string) => !str || str === '';

const hasClassNameOrId = inputRule()(
  (yup) =>
    yup.object({
      where: yup.object({
        name: yup.string().when('id', {
          is: isMissing,
          then: yup.string().required('name required if id not provided'),
          otherwise: yup.string(),
        }),
        id: yup.string().when('name', {
          is: isMissing,
          then: yup.string().required('id required if name not provided'),
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
    narrations: and(isAuthenticated, hasClassNameOrId),
  },
});
