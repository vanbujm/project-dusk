var e = Object.defineProperty,
  r = Object.defineProperties,
  t = Object.getOwnPropertyDescriptors,
  a = Object.getOwnPropertySymbols,
  n = Object.prototype.hasOwnProperty,
  i = Object.prototype.propertyIsEnumerable,
  s = (r, t, a) => (t in r ? e(r, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (r[t] = a)),
  o = (e, r) => {
    for (var t in r || (r = {})) n.call(r, t) && s(e, t, r[t]);
    if (a) for (var t of a(r)) i.call(r, t) && s(e, t, r[t]);
    return e;
  };
import { h as l, i as u, l as c, m as p, n as h, o as y, p as d, q as m } from '../assets/vendor.79cb110b.js';

const { gql: g } = require('apollo-server-micro'),
  w = g`
  type Answer {
    id: ID!
    text: String!
    question: Narration
  }

  type Narration {
    id: ID!
    text: String!

    answer: Answer

    classes: [Class!]!
  }

  type Class {
    id: ID!
    name: String!

    sequence: [Narration!]!
    player: [Player!]!
  }

  type Player {
    id: ID!
    email: String!
    name: String!

    class: Class

    seenNarrations: [Narration!]!
    answeredQuestions: [Narration!]!
  }

  input PlayerUniqueInput {
    id: String
    email: String
    name: String
  }

  input ClassUniqueInput {
    id: String
    name: String
  }

  type Query {
    narrations(where: ClassUniqueInput!): [Narration!]!
  }
`,
  { getPrismaClient: b } = require('../../lib/prisma'),
  v = b(),
  j = {
    Query: {
      narrations: (e, { where: a }, { user: n }) => {
        return v.narration.findMany({
          where: {
            AND: [
              { classes: { every: ((i = o({}, a)), (s = { player: { every: { email: n.email } } }), r(i, t(s))) } },
            ],
          },
        });
        var i, s;
      },
    },
  },
  S = l.rule()(async (e, r, t) => {
    var a;
    return !!(null == (a = null == t ? void 0 : t.user) ? void 0 : a.email);
  }),
  f = l.inputRule()(
    (e) =>
      e.object({
        where: e.object({
          email: e
            .string()
            .email()
            .when('id', {
              is: (e) => !e || 0 === e.length,
              then: e.string().email().required(),
              otherwise: e.string(),
            }),
          id: e
            .string()
            .when('email', { is: (e) => !e || 0 === e.length, then: e.string().required(), otherwise: e.string() }),
        }),
      }),
    { abortEarly: !1 }
  ),
  q = l.shield({ Query: { narrations: l.and(f, S) } }),
  P = m(),
  O = 'https://dev-zah-ux2d.us.auth0.com/';
let I = u({ cache: !0, rateLimit: !0, jwksRequestsPerMinute: 5, jwksUri: `${O}.well-known/jwks.json` });
const N = (e, r) => {
    I.getSigningKey(e.kid, (e, t) => {
      const a = t.publicKey || t.rsaPublicKey;
      r(null, a);
    });
  },
  k = c(p({ typeDefs: w, resolvers: j }), q),
  C = new h.ApolloServer({
    schema: k,
    introspection: !0,
    context: async ({ req: e }) => {
      try {
        if (!e.headers.authorization || '' === e.headers.authorization) return {};
        const r = e.headers.authorization.replace('Bearer ', '');
        if (
          !(await new Promise((e, t) =>
            y.verify(
              r,
              N,
              {
                issuer: O,
                audience: 'https://project-dusk.vercel.app/api',
                algorithms: ['RS256'],
              },
              (r, a) => {
                r ? t(r) : e(a);
              }
            )
          ))
        )
          return console.error('invalid token'), {};
        const t = await d(`${O}userinfo`, {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: e.headers.authorization,
          },
        });
        return { user: await t.json() };
      } catch (r) {
        return console.error('context error', r), {};
      }
    },
  });
module.exports = C.start()
  .then(() => {
    const e = C.createHandler({ path: '/api/graphql' });
    return P(async (r, t) => ('OPTIONS' === r.method ? t.send('ok') : await e(r, t)));
  })
  .catch((e) => console.error('app error: ', e));
