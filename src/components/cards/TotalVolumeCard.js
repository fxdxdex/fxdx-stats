import React, {memo} from 'react'
import {formatNumber} from "../../helpers";
import {RiLoader5Fill} from "react-icons/ri";
import {useVolumeData} from "../../data/useVolumeData";


const TotalVolumeCard = () => {

  const {totalVolume} = useVolumeData();

  return (
    <div className="chart-cell stats">
      {
        totalVolume ? (
          <>
            <div className="total-stat-label">Total Volume</div>
            <div className="total-stat-value mt-2">
              {formatNumber(totalVolume, {currency: true})}
            </div>
          </>
        ) : (
          <RiLoader5Fill size="3em" className="loader"/>
        )
      }
    </div>
  )
}

export default memo(TotalVolumeCard);