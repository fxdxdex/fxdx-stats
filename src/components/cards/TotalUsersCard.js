import React, {memo} from 'react'
import {formatNumber} from "../../helpers";
import {RiLoader5Fill} from "react-icons/ri";
import {useUsersData} from "../../data/useUsersData";


const TotalUsersCard = () => {

  const {totalUsers} = useUsersData();

  return (
    <div className="chart-cell stats">
      {
        totalUsers ? (
          <>
            <div className="total-stat-label">Total Users</div>
            <div className="total-stat-value mt-2">
              {formatNumber(totalUsers)}
            </div>
          </>
        ) : (
          <RiLoader5Fill size="3em" className="loader"/>
        )
      }
    </div>
  )
}

export default memo(TotalUsersCard);