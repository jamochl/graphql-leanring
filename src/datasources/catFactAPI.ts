import { CatFact } from '../types/types';
import { HTTPDataSource } from 'apollo-datasource-http'

 
export class CatFactAPI {
    getCatFacts() : CatFact[] {
        return [];
    }
}

// export class CatFactAPI extends HTTPDataSource {
//     constructor() {
//         // global client options
//         super("https://cat-fact.herokuapp.com")
//     }
//     async getCatFacts() : Promise<any> {
//         return this.get(`/facts`, {});
//     }
// }