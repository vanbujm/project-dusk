'use strict';

var graphqlMiddleware = require('graphql-middleware');
var schema$1 = require('@graphql-tools/schema');
var apolloServerMicro = require('apollo-server-micro');
var client$2 = require('@prisma/client');
var graphqlShield = require('graphql-shield');
var jwks = require('jwks-rsa');
var fetch = require('cross-fetch');
var microCors = require('micro-cors');
var jsonwebtoken = require('jsonwebtoken');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var jwks__default = /*#__PURE__*/_interopDefaultLegacy(jwks);
var fetch__default = /*#__PURE__*/_interopDefaultLegacy(fetch);
var microCors__default = /*#__PURE__*/_interopDefaultLegacy(microCors);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var typeDefs = apolloServerMicro.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Answer {\n    id: ID!\n    text: String!\n    question: Narration\n  }\n\n  type Narration {\n    id: ID!\n    text: String!\n\n    answer: Answer\n\n    classes: [Class!]!\n  }\n\n  type Class {\n    id: ID!\n    name: String!\n\n    sequence: [Narration!]!\n    player: [Player!]!\n  }\n\n  type Player {\n    id: ID!\n    email: String!\n    name: String!\n\n    class: Class\n\n    seenNarrations: [Narration!]!\n    answeredQuestions: [Narration!]!\n  }\n\n  input PlayerUniqueInput {\n    id: String\n    email: String\n    name: String\n  }\n\n  input ClassUniqueInput {\n    id: String\n    name: String\n  }\n\n  type Query {\n    narrations(where: ClassUniqueInput!): [Narration!]!\n  }\n"], ["\n  type Answer {\n    id: ID!\n    text: String!\n    question: Narration\n  }\n\n  type Narration {\n    id: ID!\n    text: String!\n\n    answer: Answer\n\n    classes: [Class!]!\n  }\n\n  type Class {\n    id: ID!\n    name: String!\n\n    sequence: [Narration!]!\n    player: [Player!]!\n  }\n\n  type Player {\n    id: ID!\n    email: String!\n    name: String!\n\n    class: Class\n\n    seenNarrations: [Narration!]!\n    answeredQuestions: [Narration!]!\n  }\n\n  input PlayerUniqueInput {\n    id: String\n    email: String\n    name: String\n  }\n\n  input ClassUniqueInput {\n    id: String\n    name: String\n  }\n\n  type Query {\n    narrations(where: ClassUniqueInput!): [Narration!]!\n  }\n"])));
var templateObject_1;

var prisma;
var getPrismaClient = function () {
    if (!prisma) {
        console.log('creating prisma client...');
        prisma = new client$2.PrismaClient();
        console.log('prisma client created');
    }
    return prisma;
};

var client$1 = getPrismaClient();
var queryResolvers = {
    narrations: function (parent, _a, _b) {
        var where = _a.where;
        var user = _b.user;
        return client$1.narration.findMany({
            where: {
                OR: [
                    { classes: { every: __assign(__assign({}, where), { player: { every: { email: user.email } } }) } },
                    { classes: { every: __assign(__assign({}, where), { player: null }) } },
                ]
            }
        });
    }
};
var resolvers = {
    Query: queryResolvers
};

var isAuthenticated = graphqlShield.rule()(function (parent, args, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        console.log('isAuthenticated', { args: args, ctx: ctx });
        return [2 /*return*/, !!((_a = ctx === null || ctx === void 0 ? void 0 : ctx.user) === null || _a === void 0 ? void 0 : _a.email)];
    });
}); });
var isMissing = function (str) { return !str || str === ''; };
var hasClassNameOrId = graphqlShield.inputRule()(function (yup) {
    return yup.object({
        where: yup.object({
            name: yup.string().when('id', {
                is: isMissing,
                then: yup.string().required(),
                otherwise: yup.string()
            }),
            id: yup.string().when('name', {
                is: isMissing,
                then: yup.string().required(),
                otherwise: yup.string()
            })
        })
    });
}, {
    abortEarly: false
});
var permissions = graphqlShield.shield({
    Query: {
        narrations: graphqlShield.and(hasClassNameOrId, isAuthenticated)
    }
});

console.log('Starting server...');
var cors = microCors__default['default']();
var issuer = 'https://dev-zah-ux2d.us.auth0.com/';
var client = jwks__default['default']({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: issuer + ".well-known/jwks.json"
});
var getKey = function (header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
};
var schema = graphqlMiddleware.applyMiddleware(schema$1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
}), permissions);
var apolloServer = new apolloServerMicro.ApolloServer({
    schema: schema,
    introspection: true,
    context: function (_a) {
        var req = _a.req;
        return __awaiter(void 0, void 0, void 0, function () {
            var token_1, isValid, getUserInfo, userInfo, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!req.headers.authorization || req.headers.authorization === '') {
                            return [2 /*return*/, {}];
                        }
                        token_1 = req.headers.authorization.replace('Bearer ', '');
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                return jsonwebtoken.verify(token_1, getKey, {
                                    issuer: issuer,
                                    audience: 'https://project-dusk.vercel.app/api',
                                    algorithms: ['RS256']
                                }, function (err, decoded) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(decoded);
                                    }
                                });
                            })];
                    case 1:
                        isValid = _b.sent();
                        if (!isValid) {
                            console.error('invalid token');
                            return [2 /*return*/, {}];
                        }
                        return [4 /*yield*/, fetch__default['default'](issuer + "userinfo", {
                                headers: {
                                    'Content-Type': 'Application/json',
                                    Authorization: req.headers.authorization
                                }
                            })];
                    case 2:
                        getUserInfo = _b.sent();
                        return [4 /*yield*/, getUserInfo.json()];
                    case 3:
                        userInfo = _b.sent();
                        return [2 /*return*/, { user: userInfo }];
                    case 4:
                        e_1 = _b.sent();
                        console.error('context error', e_1);
                        return [2 /*return*/, {}];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
});
var graphql = apolloServer
    .start()
    .then(function () {
    console.log('Graphql server started 🚀');
    var handler = apolloServer.createHandler({ path: '/api/graphql' });
    return cors(function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(req.method === 'OPTIONS')) return [3 /*break*/, 1];
                _a = res.send('ok');
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, handler(req, res)];
            case 2:
                _a = _b.sent();
                _b.label = 3;
            case 3: return [2 /*return*/, _a];
        }
    }); }); });
})["catch"](function (err) { return console.error('app error: ', err); });

module.exports = graphql;
