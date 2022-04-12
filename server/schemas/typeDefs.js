const { gql } = require("apollo-server-express");

module.exports = gql`
    type Book {
        bookId: String
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    input BookInput {
        bookId: String
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String, password: String): Auth
        addUser(username: String, email: String, password: String): Auth
        saveBook(input: BookInput): User
        removeBook(bookId: ID): User
    }
`;