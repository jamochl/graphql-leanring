export type Book = {
    title: string,
    author: string
}

export type Animal = {
    name: string,
    species: string,
    weight: number
}

export type SearchResult = (Book | Animal);

export type CatFact = {
    description : string
}
