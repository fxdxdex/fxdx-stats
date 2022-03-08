import {useGraph} from "../hooks/useGraph";

const FEE_QUERY = `{
    feeStats{
      id
      mint
      burn
      period
    }
  }
`

export function useFeesData() {

  const [graphData, loading] = useGraph(FEE_QUERY)

  let feesData = []
  let totalFee
  let feeDelta = 0

  if (graphData){
    const totalFeeStat = graphData.feeStats.find(item=>item.id === 'total')
    totalFee = totalFeeStat.mint / Math.pow(10, 6)

    for (const stat of graphData.feeStats){
      if (stat.id !== 'total'){
        feesData.push({
          timestamp: parseFloat(stat.id),
          mint: parseFloat(stat.mint) / Math.pow(10, 6),
          burn: parseFloat(stat.burn) / Math.pow(10, 6),
          swap: 0
        })
      }
    }
  }

  return {
    feesData,
    totalFee,
    feeDelta,
    loading
  }
}
