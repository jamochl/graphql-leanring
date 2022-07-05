import { CatFact } from '../types/types';
import { RESTDataSource } from 'apollo-datasource-rest'

export class CatFactAPI extends RESTDataSource {
    constructor() {
        // global client options
        super();
        this.baseURL = "https://cat-fact.herokuapp.com";
    }
    async getCatFacts() : Promise<CatFact> {
        const data = await this.get(`/facts`, {});
        const mappedFacts = data.map((catFact: any) => { return { description: catFact.text }});
        return mappedFacts;
    }
}