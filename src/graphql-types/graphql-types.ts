const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  """
  This is a random Animal
  """
  type Animal {
    """
    This is the Animal name
    """
    name: String
    "This is the Animal species"
    species: String
    "This is the Animal weight"
    weight: Float
  }

  type CatFact {
    description: String
  }

  union AllItems = Animal | Book

  union SearchResult = Animal | Book

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    animals: [Animal]
    allItems: [AllItems]
    search(contains: String): [SearchResult!]
    catFacts: [CatFact]
  }

  type Mutation {
    addBook(title: String, author: String): [Book]
  }
`;
