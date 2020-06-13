import { setContext } from "apollo-link-context";
import { GRAPHQL_URL as uri } from 'react-native-dotenv';
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { getToken } from "./containers/Auth";

console.log('GRAPHQL_URL:', uri);

const httpLink = new HttpLink({ uri: "http://localhost:8080/api" });
const authLink = setContext(async (_, { headers }) => {
  let accessToken;

  try {
    accessToken = await getToken();
  } catch (e) {
    // Ignore error
  }

  return ({
    headers: {
      ...headers,
      'Accept-Language': 'en',
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== "production",
});
