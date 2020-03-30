import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
// Polyfill fetch
import "unfetch/polyfill";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";


let sharedClient;
let token;

/**
 * @summary Set the access token that GraphQL requests will use in the Authorization header
 * @param {String} value New token value
 * @return {undefined}
 */
export function setAccessToken(value) {
  const previousToken = token;
  token = value;

  // "Resets your entire store by clearing out your cache and then re-executing all of your active queries.
  // This makes it so that you may guarantee that there is no data left in your store from a time
  // before you called this method."
  //
  // We do this because we have effectively switched users here. We don't want data from the previous user
  // (or the previous non-authenticated queries) to be kept.
  if (previousToken !== token) {
    if (sharedClient) sharedClient.resetStore();
  }
}

/**
 * @summary Sets the Authorization header for all GraphQL requests done
 *   through simpleClient.
 * @param {Object} client graphql.js client instance
 * @returns {undefined}
 */
export function setSimpleClientTokenHeader(client) {
  if (token) {
    client.headers({ Authorization: token });
  } else {
    client.headers({});
  }
}

/**
 * @name initApollo
 * @summary Initializes Apollo Client
 * @returns {Object} New ApolloClient
 */
export default function initApollo({ graphqlApiUrl }) {
  if (sharedClient) return sharedClient;

  const authenticationLink = new ApolloLink((operation, forward) => {
    if (typeof token === "string") {
      operation.setContext(() => ({
        headers: {
          Authorization: token
        }
      }));
    }

    return forward(operation);
  });

  const httpLink = new HttpLink({ uri: graphqlApiUrl });

  const standardLink = ApolloLink.from([
    authenticationLink,
    httpLink
  ]);

  sharedClient = new ApolloClient({
    link: standardLink,
    cache: new InMemoryCache()
  });

  return sharedClient;
}
