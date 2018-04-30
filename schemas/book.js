const graphql = require('graphql');
const bookController = require('../controllers/book');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const BookFields = {
    book: {
        type: BookType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
            return bookController.getBookById(args.id);
        }
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return bookController.getBooks();
        }
    }
}

const BookMutations = {
    addBook: {
        type: BookType,
        args: { 
            name: { type: GraphQLString },
            genre: { type: GraphQLString}
         },
        resolve(parent, args) {
            return bookController.addBook(args);
        }
    },
}

module.exports = { BookFields, BookMutations, BookType};