const graphql = require('graphql');

// Resolvers.
const UserResolver = require('../resolvers/user');
const AuthenticationResolver = require('../resolvers/authentication');
const ProductResolver = require('../resolvers/product');

// Graphql types.
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType
} = graphql;

/**
 * Authorized message.
 */
const AUTHORIZED_MESSAGE = 'You are not authorized!';

/**
 * User GraphQL model type.
 */
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})

/**
 * Payload GraphQL model type.
 */
const AuthPayLoadType = new GraphQLObjectType({
    name: 'AuthPayLoad',
    fields: () => (
        {
            token: { type: GraphQLString },
            user: {
                type: UserType
            }
        }
    )
})

/**
 * Product GraphQL model type.
 */
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        productId: { type: GraphQLInt},
        description: { type: GraphQLString},
        price: { type: GraphQLInt},
        availableAmmount: { type: GraphQLInt},
        category: { type: GraphQLString},
        images: { type: new GraphQLList(GraphQLString)}
    })
})

/**
 * Evaluates if the user authenticated exists.
 * 
 * @param {User to be evaluated} user 
 */
const validateAuthentication = (user) => {
    if (!user) throw new Error(AUTHORIZED_MESSAGE)
}


/**
 * Contains all GraphQL queries.
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        /**
         * Query to gets the all users of the Database.
         */
        users: {
            type: new GraphQLList(UserType),
            resolve(_, __, context) {
                validateAuthentication(context.user);
                return UserResolver.getUsers();
            }
        },
        /**
         * Query to gets the all products of the Database.
         */
        products: {
            type: new GraphQLList(ProductType),
            resolve(_, args, context) {
                // validateAuthentication(context.user);
                return ProductResolver.getAllProducts()
            }
        }
    }
});

/**
 * Contains all GraphQL mutations. 
 */
const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        /**
         * Mutation to add a new product in the Database.
         */
        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString},
                description: { type: GraphQLString},
                price: { type: GraphQLInt},
                availableAmmount: { type: GraphQLInt},
                category: { type: GraphQLString},
                images: { type: new GraphQLList(GraphQLString)}
            },
            resolve(_, args) {
                return ProductResolver.addProduct(args);
            }
        },
        /**
         * Mutation to Log in.
         */
        login: {
            type: AuthPayLoadType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthenticationResolver.login(args);
            }
        },
        /**
         * Mutation to Sign Up a new account.
         */
        signup: {
            type: AuthPayLoadType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                name: { type: GraphQLString }
            },
            resolve(_, args) {
                return AuthenticationResolver.signup(args);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});

