import React from "react";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

import {
  yaxisFormatter,
  tooltipLabelFormatter as tooltipLabelFormatter_,
  tooltipFormatter as tooltipFormatter_,
  CHART_HEIGHT,
  COLORS,
} from '../helpers'

import ChartWrapper from './ChartWrapper'

export default function GenericChart(props) {
  const {
// eslint-disable-next-line react/prop-types
    loading,
// eslint-disable-next-line react/prop-types
    title,
// eslint-disable-next-line react/prop-types
    data,
// eslint-disable-next-line react/prop-types
    description,
// eslint-disable-next-line react/prop-types
    height = CHART_HEIGHT,
// eslint-disable-next-line react/prop-types
    yaxisDataKey = 'all',
// eslint-disable-next-line react/prop-types
    yaxisTickFormatter = yaxisFormatter,
// eslint-disable-next-line react/prop-types
    yaxisDomain,
// eslint-disable-next-line react/prop-types
    xaxisDataKey = 'timestamp',
// eslint-disable-next-line react/prop-types
    xaxisTickFormatter = tooltipLabelFormatter_,
// eslint-disable-next-line react/prop-types
    tooltipFormatter = tooltipFormatter_,
// eslint-disable-next-line react/prop-types
    tooltipLabelFormatter = tooltipLabelFormatter_,
// eslint-disable-next-line react/prop-types
    items,
// eslint-disable-next-line react/prop-types
    type,
// eslint-disable-next-line react/prop-types
    syncId,
// eslint-disable-next-line react/prop-types
    children,
// eslint-disable-next-line react/prop-types
    rightYaxisDataKey,
  } = props

  let ChartComponent
  if (type === 'Line') {
    ChartComponent = LineChart
  } else if (type === 'Bar') {
    ChartComponent = BarChart
  } else {
    ChartComponent = ComposedChart
  }

  const htmlItems = (items || []).map((item, i) => {
    const props = {
      type: "monotone",
      dataKey: item.key,
      stackId: "a",
      name: item.name || item.key,
      fill: item.color || COLORS[i % COLORS.length],
      stroke: item.color || COLORS[i % COLORS.length],
      dot: item.dot || false,
      key: 'item-' + i,
      unit: item.unit,
      strokeWidth: item.strokeWidth,
      yAxisId: item.yAxisId
    }
    if (item.type === 'Line' || type === 'Line') {
      return <Line {...props} isAnimationActive={false} />
    }
    // eslint-disable-next-line react/jsx-key
    return <Bar {...props} isAnimationActive={false} />
  })

  // eslint-disable-next-line react/prop-types
  const csvFields = items.map(item => ({ key: item.key, name: item.name }))

  return <ChartWrapper title={title} loading={loading} data={data} csvFields={csvFields}>
    <ResponsiveContainer width="100%" height={height}>
      {React.createElement(ChartComponent, { data, syncId }, [
        <CartesianGrid strokeDasharray="10 10" key="a" />,
        <XAxis dataKey={xaxisDataKey} tickFormatter={xaxisTickFormatter} minTickGap={30} key="b" />,
        <YAxis domain={yaxisDomain} dataKey={yaxisDataKey} tickFormatter={yaxisTickFormatter} key="c" />,
        (
          rightYaxisDataKey ?
            <YAxis dataKey={rightYaxisDataKey} tickFormatter={yaxisTickFormatter} orientation="right" yAxisId="right" key="c2" />
            : null
        ),
        <Tooltip
          formatter={tooltipFormatter}
          labelFormatter={tooltipLabelFormatter}
          contentStyle={{ textAlign: 'left' }}
          key="d"
        />,
        <Legend key="e" />,
        ...htmlItems,
        children
      ])}
    </ResponsiveContainer>
    {description && (
      <div className="chart-description">
        {description}
      </div>
    )}
  </ChartWrapper>
}
