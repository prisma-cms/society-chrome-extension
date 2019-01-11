

import gql from "graphql-tag";

import { split, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';

import { ApolloClient } from 'apollo-client';

import {
  InMemoryCache,
  // IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';

if (typeof window !== undefined) {


  // Create an http link:
  // const httpLink = new HttpLink({
  //   uri: "http://localhost:4000"
  // });

  const httpUri = "http://localhost:4000";

  // const wsLink = new WebSocketLink({
  //   uri: `ws://localhost:4000`,
  //   options: {
  //     reconnect: true
  //   }
  // });

  const wsUri = "ws://localhost:4000";


  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  // const link = split(
  //   // split based on operation type
  //   ({ query }) => {
  //     const { kind, operation } = getMainDefinition(query);

  //     console.log("query", query);

  //     return kind === 'OperationDefinition' && operation === 'subscription';
  //   },
  //   wsLink,
  //   httpLink,
  // );

  // 1. Create Apollo Link that's connected to the underlying GraphQL API
  const httpLink = new HttpLink({ uri: httpUri });

  // Auth link
  const httpAuthLink = setContext((request, previousContext) => ({
    headers: {
      Authorization: localStorage && localStorage.token || undefined,
    },
  }));

  // WebSocket link
  const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    from([
      httpAuthLink,
      httpLink,
    ]),
  );

  const cache = new InMemoryCache({
    // fragmentMatcher: new IntrospectionFragmentMatcher({
    //   introspectionQueryResultData: fragmentTypes
    // })
  });

  const client = new ApolloClient({
    link,
    cache
  });

  // console.log("link", link);
  // console.log("client", client);


  // const subscribeMessages = gql`
  //   subscription chatMessage(
  //     $where: ChatMessageSubscriptionWhereInput
  //   ){
  //     chatMessage(
  //       where: $where
  //     ){
  //       mutation
  //       node{
  //         id
  //         createdAt
  //         contentText
  //       }
  //     }
  //   }
  // `

  // const me = gql`
  //   query me{
  //     test: me{
  //       id
  //       username
  //     }
  //   }
  // `


  Object.assign(window, {
    // link,
    // client: link,
    client,
    // subscribeMessages,
    // me,
    gql,
  });

  // console.log("link", link, link && link.request);

  // const result = client.query({
  //   query: me,
  //   variables: {},
  // }).then(r => {

  //   console.log("link result r", r);

  // })
  
  // console.log("link result", result);

}

