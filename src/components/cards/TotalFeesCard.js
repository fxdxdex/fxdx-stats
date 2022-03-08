import React, {memo} from 'react'
import {formatNumber} from "../../helpers";
import {RiLoader5Fill} from "react-icons/ri";
import {useFeesData} from "../../data/useFeesData";


const TotalFeesCard = () => {

  const {totalFee} = useFeesData();

  return (
    <div className="chart-cell stats">
      {
        totalFee ? (
          <>
            <div className="total-stat-label">Total Feeds</div>
            <div className="total-stat-value mt-2">
              {formatNumber(totalFee, {currency: true})}
            </div>
          </>
        ) : (
          <RiLoader5Fill size="3em" className="loader"/>
        )
      }
    </div>
  )
}

export default memo(TotalFeesCard);