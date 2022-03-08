import React, {memo} from "react";
import GenericChart from "../GenericChart";
import {tooltipFormatterNumber, tooltipLabelFormatterUnits, yaxisFormatterNumber} from "../../helpers";
import {useUsersData} from "../../data/useUsersData";

const UsersChart = () => {
  const {usersData, loading} = useUsersData()
  return (
    <div className="chart-cell">
      <GenericChart
        syncId="syncC"
        loading={loading}
        title="Unique Users"
        data={usersData}
        yaxisDataKey="uniqueCount"
        yaxisTickFormatter={yaxisFormatterNumber}
        tooltipFormatter={tooltipFormatterNumber}
        tooltipLabelFormatter={tooltipLabelFormatterUnits}
        items={[
          { key: 'uniqueCount', name: 'Unique Users'},
          { key: 'uniqueSwapCount', name: 'Swaps'},
          { key: 'uniqueMintBurnCount', name: 'Mint & Burn USDF'}
        ]}
        type="Composed"
      />
    </div>
  )
}


export default memo(UsersChart)