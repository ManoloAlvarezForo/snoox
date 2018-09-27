const graphql = require('graphql');

// Resolvers
const AuthorResolvers = require('../resolvers/author');
const PostResolvers = require('../resolvers/post');
const CommentResolvers = require('../resolvers/comment');

// Graphql types
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
   // GraphQLInputObjectType
} = graphql;

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email:  { type: GraphQLString },
        body:  { type: GraphQLString },
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString},
        body: { type: GraphQLString},
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, _) {
                return PostResolvers.getCommentsByPostId(parent.id);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        website: { type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, _) {
                return AuthorResolvers.getPostsByAuthorId(parent.id);
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        author: {
            type:  AuthorType,
            args: { authorId: { type: GraphQLID } },
            resolve(_, args) {
                return AuthorResolvers.getAuthorById(args.authorId);
            }
        },
        authors: {
            type:  new GraphQLList(AuthorType),
            resolve(_) {
                return AuthorResolvers.all();
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            args: { authorId: { type: GraphQLID } },
            resolve(_, args) {
                return AuthorResolvers.getPostsByAuthorId(args.authorId);
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            args: { postId: { type: GraphQLID } },
            resolve(_, args) {
                return CommentResolvers.getCommentsByPostId(args.postId);
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                website: { type: GraphQLString },
            },
            resolve(_, args) {
                return AuthorResolvers.addAuthor(args);
            }

        },
        addPost: {
            type: PostType,
            args: {
                authorId: { type: GraphQLID},
                title: { type: GraphQLString},
                body: { type: GraphQLString}
            },
            resolve(_, args) {
               return PostResolvers.addPost(args);
            }
        },
        addComment: {
            type: CommentType,
            args: {
                postId: { type: GraphQLID},
                name: { type: GraphQLString},
                email: { type: GraphQLString},
                body: { type: GraphQLString}
            },
            resolve(_, args) {
              return  CommentResolvers.addComment(args);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});

