const graphql = require('graphql');
const BookResolver = require('../resolvers/book');
const AuthorResolver = require('../resolvers/author');
const UserResolver = require('../resolvers/user');
const AuthenticationResolver = require('../resolvers/authentication');
const DashboardResolver = require('../resolvers/dashboard');

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

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return BookResolver.getBookByAuthorId(parent.id);
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return AuthorResolver.getAuthorById(parent.authorId);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        email: { type: GraphQLString},
    })
})

const AuthPayLoadType = new GraphQLObjectType({
    name: 'AuthPayLoad',
    fields: () => (
        {
            token: { type: GraphQLString},
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
        name: { type: GraphQLString},
        description: { type: GraphQLString},
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
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        width: { type: GraphQLInt},
        height: { type: GraphQLInt}
    })
})

const WidgetInputType = new GraphQLInputObjectType({
    name: 'WidgetInput',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        width: { type: GraphQLInt},
        height: { type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return AuthorResolver.getAuthorById(args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(_, args, context) {
                return AuthorResolver.getAuthors();
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(_, args, context) {
                return BookResolver.getBookById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(_, args, context) {
                let temp = BookResolver.getBooks();
                return temp;
            }
        },
        users: {
            type:  new GraphQLList(UserType),
            resolve(_, args, context) {
                if (authorize(context.user)) {
                    return UserResolver.getUsers()
                } else {
                   throw new Error('No Authorized')
                }
                
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
            resolve(_, args, context) {
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
            resolve(_, args, context) {
                return DashboardResolver.addDashboard(args);
            }

        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return AuthorResolver.addAuthor(args);
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                return BookResolver.addBook(args);
            }
        },
        login: {
            type: AuthPayLoadType,
            args: {
                email: { type: GraphQLString},
                password: { type: GraphQLString}
            },
            resolve(parent, args, context) {
               return AuthenticationResolver.login(args);
            }
        },
        signup: {
            type: AuthPayLoadType,
            args: {
                email: { type: GraphQLString},
                password: { type: GraphQLString},
                name: { type: GraphQLString}
            },
            resolve(parent, args) {
              return  AuthenticationResolver.signup(args);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});

