import React, { useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import PT from 'prop-types'
import * as Nav from '../../Nav'
import WaitingPanel from '../WaitingPanel/WaitingPanel'
import './TableSorter.css'

const TableSorter = ({ className, sort = { column: '', order: '' }, columns = [], items = [], loading = false }) => {
  const [_sort, setSort] = useState(sort)
  const [_columns, setColumns] = useState(columns)
  const [seeFilters, setSeeFilters] = useState(false)
  const sortOrder = {
    '': 'asc',
    asc: 'desc',
    desc: ''
  }
  const sortClasses = {
    asc: 'headerSortAsc',
    desc: 'headerSortDesc',
    '': ''
  }

  const sortColumn = (column) => {
    var newSortOrder = sortOrder[_sort.order]
    if (_sort.column !== column) {
      newSortOrder = column.defaultSortOrder
    }
    setSort({ column: column.id, order: newSortOrder })
  }

  const sortClass = (column) => {
    return _sort.column === column.id ? sortClasses[_sort.order] : ''
  }

  const rows = () => {
    const filteredItems = _.filter(items, (item) => {
      return _columns.map((column) => {
        const filterText = column.filterText.toLowerCase()
        switch (column.type) {
          case 'object':
            return filterText ? item[column.id].find(it => column.needle(it).match(filterText)) : true
          case 'date':
            return filterText ? item[column.id].toLocaleDateString().match(filterText) : true
          default:
            return filterText ? item[column.id].toLowerCase().match(filterText) : true
        }
      })
    })

    var sortedItems = _.sortBy(filteredItems, _sort.column)
    if (_sort.order === 'desc') {
      sortedItems.reverse()
    }

    return sortedItems.map((item, index) => {
      const background = index % 2 === 0 ? 'white' : 'whitesmoke'

      return (
        <tr
          key={index}
          style={{ background: background }}
        >
          <td />
          {_columns.map((column, index2) => {
            const value = item[column.id]
            switch (column.type) {
              case 'tag':
                return (
                  <td key={index2}>
                    <Nav.EtikettLiten>{value}</Nav.EtikettLiten>
                  </td>
                )
              case 'date':
                return (
                  <td key={index2}>
                    <Nav.Normaltekst>{value ? value.toLocaleDateString() : '-'}</Nav.Normaltekst>
                  </td>
                )
              case 'object':
                return (
                  <td key={index2}>
                    {column.toTableCell ? column.toTableCell(item, value) : JSON.stringify(value)}
                  </td>
                )
              default:
                return (
                  <td key={index2}>
                    <Nav.Normaltekst>{value}</Nav.Normaltekst>
                  </td>
                )
            }
          })}
        </tr>
      )
    })
  }

  const header = () => {
    return (
      <>
        <th>
          <Nav.Checkbox
            id='c-tablesorter__seefilters-checkbox-id'
            className='c-tablesorter__checkbox'
            label=''
            checked={seeFilters}
            onChange={() => setSeeFilters(!seeFilters)}
          />
        </th>
        {_columns.map((column) => (
          <th
            key={column.id}
            onClick={() => sortColumn(column)}
            className={'header ' + sortClass(column)}
          >
            <Nav.UndertekstBold>{column.label}</Nav.UndertekstBold>
          </th>
        ))}
      </>
    )
  }

  const handleFilterTextChange = (_column, newValue) => {
    setColumns(_columns.map((column) => {
      return _column.id === column.id ? {
        ...column,
        filterText: newValue
      } : column
    }))
  }

  const filterInputs = () => {
    return (
      <>
        <td />
        {_columns.map((column) => {
          return (
            <td key={column.id}>
              <Nav.Input
                id={'c-tablesorter__sort-' + column.id + '-input-id'}
                className='c-tablesorter__sort-input'
                label=''
                value={column.filterText}
                onChange={(e) => handleFilterTextChange(column, e.target.value)}
              />
            </td>
          )
        })}
      </>
    )
  }

  return (
    <div className={classNames('c-tableSorter', className)}>
      <div className='c-tablesorter__status'>
        {loading ? <WaitingPanel size='XS' /> : null}
      </div>
      <div className='c-tablesorter__content'>
        <table cellSpacing='0' className='c-tablesorter__table'>
          <thead>
            <tr>{header()}</tr>
            {seeFilters ? <tr>{filterInputs()}</tr> : null}
          </thead>
          <tbody>{rows()}</tbody>
        </table>
      </div>
    </div>
  )
}

TableSorter.propTypes = {
  className: PT.string,
  columns: PT.array,
  items: PT.array,
  loading: PT.bool,
  sort: PT.object
}

export default TableSorter
