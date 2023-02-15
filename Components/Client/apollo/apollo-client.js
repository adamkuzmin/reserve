import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  HttpLink,
} from "@apollo/client";

const defaultOptions = {
  query: {
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://hasura.aino.world/v1/graphql",
    headers: {
      "x-hasura-admin-secret": "M98i98jhdfnju342",
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
