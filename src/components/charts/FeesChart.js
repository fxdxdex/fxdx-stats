import React, {memo} from "react";
import {CHART_HEIGHT, COLORS, tooltipFormatter, tooltipLabelFormatter, YAXIS_WIDTH, yaxisFormatter} from "../../helpers";
import {Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import ChartWrapper from "../ChartWrapper";
import {useFeesData} from "../../data/useFeesData";


const FeesChart = () => {

  const {feesData, loading} = useFeesData()

  const csvFields = [
    {key: 'swap', name: 'Swap'},
    {key: 'mint', name: 'Mint USDF'},
    {key: 'burn', name: 'Burn USDF'},
  ]

  return (
    <div className="chart-cell">
      <ChartWrapper title="Fees" loading={loading} csvFields={csvFields} data={feesData}>
        <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
          <ComposedChart data={feesData} syncId="syncB">
            <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey="timestamp" tickFormatter={tooltipLabelFormatter} minTickGap={10} />
            <YAxis dataKey="mint" interval="preserveStartEnd" tickCount={5} tickFormatter={yaxisFormatter} width={YAXIS_WIDTH} />
            <YAxis dataKey="burn" orientation="right" yAxisId="right" tickFormatter={yaxisFormatter} width={YAXIS_WIDTH} />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={tooltipLabelFormatter}
              contentStyle={{ textAlign: 'left' }}
            />
            <Legend />
            <Bar isAnimationActive={false} type="monotone" dataKey="swap" stackId="a" name="Swap" fill={COLORS[0]} />
            <Bar isAnimationActive={false} type="monotone" dataKey="mint" stackId="a" name="Mint USDF" fill={COLORS[1]} />
            <Bar isAnimationActive={false} type="monotone" dataKey="burn" stackId="a" name="Burn USDF" fill={COLORS[2]} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </div>
  )
}

export default memo(FeesChart)