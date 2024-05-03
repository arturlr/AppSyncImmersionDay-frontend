import books from "./books.json";
import { API, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { createBook } from "../graphql/mutations";

async function GenerateBooks() {
    var success = [];
    var errors = [];

    for (const book of books) {
        try {
            const res = await API.graphql({
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                query: createBook,
                variables: {
                    input: {
                        id: book.id,
                        title: book.title,
                        authorId: book.authors[0],
                        publisherId: book.publisher_id,
                        genres: book.genres,
                        publicationYear: book.publication_year,
                        image: book.img,
                        description: book.description
                    }
                }
            });
            success.push(res.data.createBook.id);
        }
        catch(err) {
            console.log(err);
            errors.push(book);
        }
    };

    return {total: success.length+errors.length, success: success.length, errors: errors.length};
};

function GenerateAuthors() {

};

function GeneratePublishers() {

};

function GenerateReviews() {

};

export { GenerateBooks, GenerateAuthors, GeneratePublishers, GenerateReviews };