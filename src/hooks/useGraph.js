import {ApolloClient, gql, HttpLink, InMemoryCache} from "@apollo/client";
import fetch from "cross-fetch";
import {useEffect, useState} from "react";

function getChainSubgraph() {
  return "lovetrading10/fxdxsubgraph12"
}

export function useGraph(querySource) {

  const query = gql(querySource)
  const subgraph = getChainSubgraph()
  const subgraphUrl = `https://api.thegraph.com/subgraphs/name/${subgraph}`;

  const client = new ApolloClient({
    link: new HttpLink({uri: subgraphUrl, fetch}),
    cache: new InMemoryCache()
  })

  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
  }, [querySource, setLoading])

  useEffect(() => {
    client.query({query}).then(res => {
      setData(res.data)
      setLoading(false)
    }).catch(ex => {
      console.warn('Subgraph request failed error: %s subgraphUrl: %s', ex.message, subgraphUrl)
      setError(ex)
      setLoading(false)
    })
  }, [querySource, setData, setError, setLoading])

  return [data, loading, error]
}