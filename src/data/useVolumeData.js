import {useGraph} from "../hooks/useGraph";

const VOLUME_QUERY = `{
    volumeStats{
      id
      mint
      burn
      period
    }
  }
`

export function useVolumeData() {

  const [graphData, loading] = useGraph(VOLUME_QUERY)

  let volumeData = []
  let totalVolume
  let totalVolumeDelta = 0

  if (graphData){
    const totalVolumeStat = graphData.volumeStats.find(item=>item.id === 'total')
    totalVolume = (totalVolumeStat.mint - totalVolumeStat.burn)/ Math.pow(10, 6)

    for (const stat of graphData.volumeStats){
      if(stat.id !== 'total'){
        volumeData.push({
          timestamp: parseFloat(stat.id),
          mint: parseFloat(stat.mint) / Math.pow(10, 6),
          burn: parseFloat(stat.burn) / Math.pow(10, 6),
          swap: 0
        })
      }
    }
  }

  return {
    volumeData,
    totalVolume,
    totalVolumeDelta,
    loading
  }
}
