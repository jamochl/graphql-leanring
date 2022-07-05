import { Animal } from '../types/types';

const randomWords = require('random-words');

export class AnimalAPI {
    getAnimals() : Animal[] {
        const maxAnimals: number = 10
        const numAnimals: number = Math.floor(Math.random() * maxAnimals)
        const animalList: Animal[] = []
        for (let i = 0; i < numAnimals; i++) {
            animalList.push({
                name: `${randomWords()}`,
                species: `${randomWords()}`,
                weight: Math.random() * 100
            });
        }
        return animalList
    }
}
