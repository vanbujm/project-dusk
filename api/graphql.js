const { applyMiddleware: e } = require('graphql-middleware'),
  { makeExecutableSchema: r } = require('@graphql-tools/schema'),
  { ApolloServer: o } = require('apollo-server-micro'),
  { typeDefs: t } = require('../graphql/typeDefs'),
  { resolvers: s } = require('../graphql/resolvers'),
  { permissions: a } = require('../graphql/permissions'),
  i = require('jsonwebtoken'),
  n = require('jwks-rsa'),
  c = require('cross-fetch'),
  l = require('micro-cors')(),
  u = 'https://dev-zah-ux2d.us.auth0.com/';
let p = n({ cache: !0, rateLimit: !0, jwksRequestsPerMinute: 5, jwksUri: `${u}.well-known/jwks.json` });
const h = (e, r) => {
    p.getSigningKey(e.kid, (e, o) => {
      const t = o.publicKey || o.rsaPublicKey;
      r(null, t);
    });
  },
  d = new o({
    schema: e(r({ typeDefs: t, resolvers: s }), a),
    playground: !0,
    introspection: !0,
    context: async ({ req: e }) => {
      try {
        if (!e.headers.authorization || '' === e.headers.authorization) return {};
        const r = e.headers.authorization.replace('Bearer ', '');
        if (
          !(await new Promise((e, o) =>
            i.verify(
              r,
              h,
              {
                issuer: u,
                audience: 'https://project-dusk.vercel.app/api',
                algorithms: ['RS256'],
              },
              (r, t) => {
                r ? o(r) : e(t);
              }
            )
          ))
        )
          return console.error('invalid token'), {};
        const o = await c(`${u}userinfo`, {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: e.headers.authorization,
          },
        });
        return { user: await o.json() };
      } catch (r) {
        return console.error('context error', r), {};
      }
    },
  }),
  q = d
    .start()
    .then(() => {
      const e = d.createHandler({ path: '/api/graphql' });
      return l(async (r, o) => ('OPTIONS' === r.method ? o.send('ok') : await e(r, o)));
    })
    .catch((e) => console.error('app error: ', e));
module.exports = q;
