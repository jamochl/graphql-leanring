import { SearchResult } from '../types/types';

export class SearchAPI {
    context;

    constructor(context: any) {
        this.context = context;
    }

    getSearch(args: any) : SearchResult[] {
        const contains: string = args.contains;
        const animalList = this.context.AnimalAPI.getAnimals();
        const bookList = this.context.BookAPI.getBooks();
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
