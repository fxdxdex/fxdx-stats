import React from "react";
import {RiLoader5Fill} from 'react-icons/ri'
import CsvLink from './CsvLink'
import PropTypes from 'prop-types'

export default function ChartWrapper(props) {
  const {
    title,
    loading,
    csvFields,
    data,
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

ChartWrapper.propTypes  = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  csvFields: PropTypes.array,
  data: PropTypes.object
}