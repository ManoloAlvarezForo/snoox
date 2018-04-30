const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema,GraphQLID , GraphQLString} = graphql;
const { BookFields, BookMutations} = require('../schemas/book');
const { AuthorFields, AuthorMutations } = require('../schemas/author')

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ...BookFields,
        ...AuthorFields
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
       ...BookMutations,
       ...AuthorMutations
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});

