import {useGraph} from "../hooks/useGraph";

const USERS_QUERY = `{
    userStats{
      id
      uniqueCount
      timestamp
      uniqueSwapCount
      uniqueMintBurnCount
    }
  }
`

export function useUsersData() {

  const [graphData, loading] = useGraph(USERS_QUERY)

  let usersData = []
  let totalUsers

  if (graphData) {
    totalUsers = graphData.userStats.find(item => item.id === 'total').uniqueCount

    for (const stat of graphData.userStats){
      if(stat.id !== 'total'){
        usersData.push({
          timestamp: stat.timestamp,
          uniqueSwapCount: stat.uniqueSwapCount,
          uniqueMintBurnCount: stat.uniqueMintBurnCount,
          uniqueCount: stat.uniqueCount
        })
      }
    }
  }

  return {
    usersData,
    totalUsers,
    loading
  }
}