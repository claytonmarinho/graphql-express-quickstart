export const typeDefs = `
  type Query {
    hello: String!
  }

  type Mutation {
    foo(name: String!): String!
  }
`;

export const resolvers = {
  Query: {
    hello: () => "world",
  },
  Mutation: {
    foo: (_, args) => args.name,
  },
};
