import React from "react";
import {RiLoader5Fill} from 'react-icons/ri'
import CsvLink from './CsvLink'

export default function ChartWrapper(props) {
  const {
// eslint-disable-next-line react/prop-types
    title,
// eslint-disable-next-line react/prop-types
    loading,
// eslint-disable-next-line react/prop-types
    csvFields,
// eslint-disable-next-line react/prop-types
    data,
// eslint-disable-next-line react/prop-types
    children
  } = props
  return <>
    <h3>
      {title}
      <CsvLink
        fields={csvFields}
        name={title}
        data={data}
      />
    </h3>
    {loading && <RiLoader5Fill size="3em" className="loader"/>}
    {children}
  </>
}