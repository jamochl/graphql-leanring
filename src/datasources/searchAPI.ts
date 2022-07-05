import { SearchResult } from '../types/types';
import { AnimalAPI } from './animalAPI';
import { BookAPI } from './bookAPI';

export class SearchAPI {
    bookAPI;
    animalAPI;

    constructor(bookAPI: BookAPI, animalAPI: AnimalAPI) {
        this.bookAPI = bookAPI;
        this.animalAPI = animalAPI;
    }

    getSearch(contains: string) : SearchResult[] {
        const bookList = this.bookAPI.getBooks();
        const animalList = this.animalAPI.getAnimals();
        console.log(`book List: ${bookList}`)
        console.log(`Animal List: ${animalList}`)
        const allList = [...animalList, ...bookList];
        const searchList : SearchResult[] = [];
        allList.forEach(item => {
            for (const [key, value] of Object.entries(item)) {
                if (typeof value === 'string') {
                    if (value.includes(contains)) {
                        searchList.push(item);
                        break;
                    }
                }
            }
        })
        console.log(`Contains is: ${contains}`)
        console.log(`Search list is: ${searchList}`);
        for (const item of searchList) {
            console.log(`Item is: ${JSON.stringify(item)}`);
            console.log("Test! 😃");
        }
        return searchList;
    }
}
