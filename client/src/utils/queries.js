import { gql } from "@apollo/client";

/**
 * 
 */
export const GET_ME = gql`
    query {
        me {
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;