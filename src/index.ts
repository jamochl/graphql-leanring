const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql-types/graphql-types')
const { BookAPI, AnimalAPI, SearchAPI, CatFactAPI } = require('./datasources/index')
// const { BookAPI } = require('./datasources/bookAPI')
// const { AnimalAPI } = require('./datasources/animalAPI')
// const { SearchAPI } = require('./datasources/searchAPI')
// const { CatFactAPI } = require('./datasources/catFactAPI')

// console.log(typeDefs);

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    SearchResult: {
        __resolveType(obj: any, context: any, info: any) {
            if (obj.name) {
                return 'Animal';
            }
            if (obj.title) {
                return 'Book';
            }
            return null;
        }
    },
    Mutation: {
        addBook: (_: any, { title, author }: any, { dataSources }: any) => dataSources.BookAPI.putBook(title, author),
    },
    Query: {
        books: (_: any, __: any, { dataSources }: any) => dataSources.bookAPI.getBooks(),
        animals: (_: any, __: any, { dataSources }: any) => dataSources.animalAPI.getAnimals(),
        search: (_: any, { contains }: any, { dataSources }: any) => dataSources.searchAPI.getSearch(contains),
        catFacts: async (_: any, __: any, { dataSources }: any) => dataSources.catFactAPI.getCatFacts(),
    },
};

const bookAPI = new BookAPI();
const animalAPI = new AnimalAPI();
const searchAPI = new SearchAPI(bookAPI, animalAPI);
const catFactAPI = new CatFactAPI();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    dataSources: () => {
        return {
            bookAPI: bookAPI,
            animalAPI: animalAPI,
            searchAPI: searchAPI,
            catFactAPI: catFactAPI,
            // bookAPI: new BookAPI(),
            // animalAPI: new AnimalAPI(),
            // searchAPI: searchAPI,
            // catFactAPI: new CatFactAPI(),
        };
    },
});

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
});