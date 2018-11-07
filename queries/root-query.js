const graphql = require('graphql');

// Resolvers
const UserResolver = require('../resolvers/user');
const AuthenticationResolver = require('../resolvers/authentication');
const DashboardResolver = require('../resolvers/dashboard');

// Graphql types
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType
} = graphql;

const authorize = (user) => {
    return user ? true : false
}

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    })
})

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

const DashboardType = new GraphQLObjectType({
    name: 'Dashboard',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        widgets: {
            type: new GraphQLList(WidgetType),
            resolve(parent, args, context) {
                return DashboardResolver.getWidgetsByDashboardId(parent.id);
            }
        }
    })
})

const WidgetType = new GraphQLObjectType({
    name: 'Widget',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        width: { type: GraphQLInt },
        height: { type: GraphQLInt }
    })
})

const WidgetInputType = new GraphQLInputObjectType({
    name: 'WidgetInput',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        width: { type: GraphQLInt },
        height: { type: GraphQLInt }
    })
})

const validateAuthentication = (user) => {
    if (!user) throw new Error('You are not authorized!')
}

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(_, __, context) {
                validateAuthentication(context.user);
                return UserResolver.getUsers();
            }
        },
        dashboards: {
            type: new GraphQLList(DashboardType),
            resolve(_, args, context) {
                return DashboardResolver.getDashboards()
            }
        },
        widgets: {
            type: new GraphQLList(WidgetType),
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return DashboardResolver.getWidgetsByDashboardId(args.id);
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addDashboard: {
            type: DashboardType,
            args: {
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                widgets: {
                    type: new GraphQLList(WidgetInputType)
                }
            },
            resolve(_, args) {
                return DashboardResolver.addDashboard(args);
            }

        },
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

