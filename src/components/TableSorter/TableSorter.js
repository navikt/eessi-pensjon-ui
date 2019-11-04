import React, { useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import PT from 'prop-types'
import { Checkbox, EtikettLiten, Input, Lenke, Normaltekst } from '../../Nav'
import Icons from '../Icons/Icons'
import WaitingPanel from '../WaitingPanel/WaitingPanel'
import './TableSorter.css'
import Pagination from '../Pagination/Pagination'

const TableSorter = ({
  className, context, columns = [], initialPage = 1, items = [], itemsPerPage = 10,
  loading = false, onRowSelectChange, pagination = true, sort = { column: '', order: 'none' }
}) => {
  const [_sort, setSort] = useState(sort)
  const [_items, setItems] = useState(items)
  const [_columns, setColumns] = useState(columns)
  const [seeFilters, setSeeFilters] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)

  const sortOrder = {
    none: 'ascending',
    '': 'ascending',
    ascending: 'descending',
    descending: 'none'
  }
  const sortClasses = {
    ascending: 'tabell__th--sortert-asc',
    descending: 'tabell__th--sortert-desc',
    none: ''
  }

  const sortColumn = (column) => {
    let newSortOrder = sortOrder[_sort.order]
    if (_sort.column !== column.id) {
      newSortOrder = column.defaultSortOrder
    }
    setSort({ column: column.id, order: newSortOrder })
  }

  const sortClass = (column) => {
    return _sort.column === column.id ? sortClasses[_sort.order] : 'none'
  }

  const onCheckAllClicked = () => {
    const newItems = _items.map(item => ({
      ...item,
      selected: !checkAll
    }))

    if (_.isFunction(onRowSelectChange)) {
      onRowSelectChange(newItems)
    }
    setItems(newItems)
    setCheckAll(!checkAll)
  }

  const onCheckClicked = (changedItem) => {
    const newItems = _items.map(item => ({
      ...item,
      selected: _.isEqual(changedItem, item) ? !item.selected : item.selected
    }))
    if (_.isFunction(onRowSelectChange)) {
      onRowSelectChange(newItems)
    }
    setItems(newItems)
  }

  const rows = () => {
    const filteredItems = _.filter(_items, (item) => {
      return _.every(_columns, (column) => {
        const filterText = column.filterText.toLowerCase()
        switch (column.type) {
          case 'date':
            return filterText
              ? item[column.id].toLocaleDateString
                ? item[column.id].toLocaleDateString().match(filterText)
                : item[column.id].toString().match(filterText)
              : true
          default:
            return filterText
              ? column.needle
                ? column.needle(item[column.id]).toLowerCase().match(filterText.toLowerCase())
                : item[column.id].toLowerCase().match(filterText.toLowerCase())
              : true
        }
      })
    })

    const sortedItems = _.sortBy(filteredItems, _sort.column)
    if (_sort.order === 'descending') {
      sortedItems.reverse()
    }

    return sortedItems.filter((item, index) => {
      return pagination
        ? ((currentPage - 1) * itemsPerPage <= index && index < (currentPage * itemsPerPage))
        : true
    }).map((item, index) => {
      return (
        <tr key={index} aria-selected={item.selected === true} className={item.selected ? 'tabell__tr--valgt' : ''}>
          <td>
            <Checkbox label='Velg' checked={item.selected} onClick={() => onCheckClicked(item)} />
          </td>
          {_columns.map((column, index2) => {
            const value = item[column.id]
            switch (column.type) {
              case 'tag':
                return (
                  <td key={index2} className={classNames({ 'tabell__td--sortert': sort.column === column.id })}>
                    <EtikettLiten>{value}</EtikettLiten>
                  </td>
                )
              case 'date':
                return (
                  <td key={index2} className={classNames({ 'tabell__td--sortert': sort.column === column.id })}>
                    <Normaltekst>{_.isFunction(value.toLocaleDateString) ? value.toLocaleDateString() : value.toString()}</Normaltekst>
                  </td>
                )
              case 'object':
                return (
                  <td key={index2} className={classNames({ 'tabell__td--sortert': sort.column === column.id })}>
                    {typeof column.toTableCell === 'function' ? column.toTableCell(item, value, context) : JSON.stringify(value)}
                  </td>
                )
              default:
                return (
                  <td key={index2} className={classNames({ 'tabell__td--sortert': sort.column === column.id })}>
                    <Normaltekst>{value}</Normaltekst>
                  </td>
                )
            }
          })}
        </tr>
      )
    })
  }

  const handleFilterTextChange = (_column, newValue) => {
    setColumns(_columns.map((column) => {
      return _column.id === column.id ? {
        ...column,
        filterText: newValue
      } : column
    }))
  }

  return (
    <div className={classNames('c-tableSorter', 'tabell', 'tabell__td--sortert', className)}>
      <div className='c-tableSorter__status'>
        {loading ? <WaitingPanel size='XS' message='' /> : null}
      </div>
      <div className='c-tableSorter__content'>
        <table cellSpacing='0' className='c-tableSorter__table w-100'>
          <thead>
            <tr className='c-tableSorter__header'>
              <th width='1'>
                <div className='d-flex align-items-center'>
                  <Checkbox
                    id='c-tableSorter__checkAll-checkbox-id'
                    className='c-tableSorter__checkAll-checkbox d-flex mr-2'
                    checked={checkAll}
                    onChange={onCheckAllClicked}
                  />
                  <Icons
                    kind='search'
                    size={24}
                    className='c-tableSorter___seefilters-icon'
                    id='c-tableSorter__seefilters-icon-id'
                    checked={seeFilters}
                    onClick={() => setSeeFilters(!seeFilters)}
                  />
                </div>
              </th>
              {_columns.map((column) => (
                <th
                  role='columnheader'
                  aria-sort='none'
                  key={column.id}
                  className={'header ' + sortClass(column)}
                >
                  <Lenke
                    href='#' onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      sortColumn(column)
                    }}
                  >{column.label}
                  </Lenke>
                </th>
              ))}
            </tr>
            {seeFilters ? (
              <tr className='c-tableSorter__filter'>
                <td />
                {_columns.map((column) => {
                  return (
                    <td key={column.id}>
                      <Input
                        id={'c-tableSorter__sort-' + column.id + '-input-id'}
                        className='c-tableSorter__sort-input'
                        label=''
                        value={column.filterText}
                        onChange={(e) => handleFilterTextChange(column, e.target.value)}
                      />
                    </td>
                  )
                })}
              </tr>
            ) : null}
          </thead>
          <tbody>{rows()}</tbody>
        </table>
        {pagination ? (
          <Pagination
            className='c-tableSorter__pagination'
            numberOfItems={items.length}
            itemsPerPage={itemsPerPage}
            initialPage={initialPage}
            onChange={(page) => setCurrentPage(page)}
          />
        ) : null}
      </div>
    </div>
  )
}

TableSorter.propTypes = {
  className: PT.string,
  context: PT.object,
  columns: PT.array,
  initialPage: PT.number,
  items: PT.array,
  itemsPerPage: PT.number,
  loading: PT.bool,
  onRowSelectChange: PT.func,
  pagination: PT.bool,
  sort: PT.object
}

export default TableSorter
