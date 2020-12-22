require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import helmet from "helmet";
import { typeDefs, resolvers } from "./schema";

const SERVER_PORT = process.env.PORT || 4500;
const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "/graphql";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const PLAYGROUND = !process.env.PLAYGROUND || process.env.PLAYGROUND === "true";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: !IS_PRODUCTION,
  playground: PLAYGROUND,
});

server.applyMiddleware({ app, path: GRAPHQL_ENDPOINT });

app.use(helmet());

app.listen({ port: SERVER_PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${SERVER_PORT}${server.graphqlPath}`
  );
});
