const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql-types/graphql-types')
const { BookAPI, AnimalAPI, SearchAPI, CatFactsAPI } = require('./datasources/index')

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
        addBook: (_: any, args: any, context: any) => context.BookAPI.putBook(args.title, args.author),
    },
    Query: {
        books: (_: any, __: any, context: any) => context.bookAPI.getBooks(),
        animals: (_: any, __: any, context: any) => context.animalAPI.getAnimals(),
        search: (_: any, args: any, context: any) => context.searchAPI.getSearch(args),
        catFacts: (_: any, __: any, context: any) => context.catFactAPI.getCatFacts(),
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    dataSources: () => {
        return {
          bookAPI: new BookAPI(),
          animalAPI: new AnimalAPI(),
          searchAPI: new SearchAPI(),
          catFactsAPI: new CatFactsAPI(),
        };
      },
    
});

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
});