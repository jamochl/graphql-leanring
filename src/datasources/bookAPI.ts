import { Book } from '../types/types';

class BookAPI {
    books: Book[] = [
        {
            title: 'The Awakening',
            author: 'Kate Chopin',
        },
        {
            title: 'City of Glass',
            author: 'Paul Auster',
        },
    ];

    getBooks() : Book[] {
        return this.books;
    }
    pushBook(title: string, author: string) : Book {
        const newBook = {
            title: `${title}`,
            author: `${author}`
        }
        this.books.push(newBook);
        return newBook;
    }
}
