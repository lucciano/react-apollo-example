import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { ApolloProvider } from "react-apollo";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";


const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>{`${currency}: ${rate}`}</p>
        </div>
      ));
    }}
  </Query>
);


const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app <span role="img" aria-label="rocket">🚀</span></h2>
    </div>
    <div>
	<ExchangeRates/> 
    </div>
  </ApolloProvider>
);

export default App;
