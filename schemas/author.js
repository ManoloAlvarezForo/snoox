const graphql = require('graphql');
const authorController = require('../controllers/author');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema,
    GraphQLList
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLString }
    })
})

const AuthorFields = {
    author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return authorController.getAuthorById(args.id);
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            return authorController.getAuthors();
        }
    }
}

const AuthorMutations = {
    addAuthor: {
        type: AuthorType,
        args: { 
            name: { type: GraphQLString },
            age: { type: GraphQLInt }
        },
        resolve(parent, args) {
            return authorController.addAuthor(args);
        }
    }
}

module.exports = { AuthorFields, AuthorMutations, AuthorType};