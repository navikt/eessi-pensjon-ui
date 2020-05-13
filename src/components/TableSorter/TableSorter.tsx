import classNames from 'classnames'
import WaitingPanel from 'components/WaitingPanel/WaitingPanel'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useEffect, useState } from 'react'
import Tooltip from 'rc-tooltip'
import { Checkbox, Input, Lenke, Normaltekst } from 'Nav'
import Icons from '../Icons/Icons'
import Pagination from '../Pagination/Pagination'
import './TableSorter.css'

export interface Item {
  key: string;
  [k: string]: any;
}

export type Items = Array<Item>

export interface Column {
  id: string;
  label: string;
  type: string;
  filterText?: string;
  needle?: (item: Item) => string;
  renderCell?: (item: Item, value: any, context: any) => JSX.Element;
}

export type SortOrder = 'none' | 'ascending' | 'descending'

export interface Sort {
 column: string;
 order: SortOrder
}

export interface TableSorterProps {
  animatable?: boolean;
  className?: string;
  compact?: boolean;
  context?: any;
  columns: Array<Column>;
  initialPage?: number;
  items?: Items;
  itemsPerPage ?: number;
  labels?: any;
  loading?: boolean;
  onRowSelectChange ?: (i: Items) => void;
  pagination?: boolean;
  searchable?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  sort?: Sort;
}

const TableSorter: React.FC<TableSorterProps> = ({
  animatable = true, className, compact = false, context, columns = [],
  initialPage = 1, items = [], itemsPerPage = 10,
  labels = {}, loading = false, onRowSelectChange,
  pagination = true, searchable = true, selectable = false,
  sortable = true, sort = { column: '', order: 'none' }
}: TableSorterProps): JSX.Element => {
  const [_sort, setSort] = useState<Sort>(sort)
  const [_items, setItems] = useState<Items>(items)
  const [_columns, setColumns] = useState<Array<Column>>(columns)
  const [seeFilters, setSeeFilters] = useState<boolean>(false)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  const sortOrder: {[k: string]: SortOrder} = {
    none: 'ascending',
    '': 'ascending',
    ascending: 'descending',
    descending: 'none'
  }
  const sortClasses: {[k in SortOrder]: string} = {
    ascending: 'tabell__th--sortert-asc',
    descending: 'tabell__th--sortert-desc',
    none: 'none'
  }

  useEffect(() => {
    if (!_.isEqual(
      items.map((e, i) => e.key || i),
      _items.map((e, i) => e.key || i)
    )) {
      setItems(items)
    }
  }, [items, _items])

  const sortColumn = (column: Column): void => {
    if (!sortable) { return }
    const newSortOrder = sortOrder[_sort.order]
    setSort({ column: column.id, order: newSortOrder })
  }

  const sortClass = (column: Column): string => {
    if (!sortable) { return '' }
    return _sort.column === column.id ? sortClasses[_sort.order] : 'none'
  }

  const onCheckAllClicked = (): void => {
    const newItems: Items = _items.map(item => ({
      ...item,
      selected: !checkAll
    }))

    if (_.isFunction(onRowSelectChange)) {
      onRowSelectChange(newItems)
    }
    setCheckAll(!checkAll)
    setItems(newItems)
  }

  const onCheckClicked = (changedItem: Item) => {
    const newItems: Items = _items.map(item => ({
      ...item,
      selected: _.isEqual(changedItem, item) ? !item.selected : item.selected
    }))
    if (_.isFunction(onRowSelectChange)) {
      onRowSelectChange(newItems)
    }
    setItems(newItems)
  }

  const rows: () => Array<JSX.Element> = () => {
    const filteredItems: Items = _.filter(_items, (item) => {
      return _.every(_columns, (column) => {
        const filterText: string = column.filterText ? column.filterText.toLowerCase() : ''
        let regex
        try {
          regex = new RegExp(filterText)
        } catch (e) {}
        switch (column.type) {
          case 'date':
            return regex
              ? item[column.id].toLocaleDateString
                ? item[column.id].toLocaleDateString().match(regex)
                : item[column.id].toString().match(regex)
              : true
          default:
            return regex
              ? column.needle
                ? column.needle(item[column.id]).toLowerCase().match(regex)
                : item[column.id].toLowerCase().match(regex)
              : true
        }
      })
    })

    const sortedItems: Items = _.sortBy(filteredItems, _sort.column)
    if (_sort.order === 'descending') {
      sortedItems.reverse()
    }

    return sortedItems.filter((item, index) => {
      return pagination
        ? ((currentPage - 1) * itemsPerPage <= index && index < (currentPage * itemsPerPage))
        : true
    }).map((item, index) => {
      return (
        <tr
          key={item.key || index}
          aria-selected={selectable && item.selected === true}
          style={{ animationDelay: (0.07 * index) + 's' }}
          className={classNames({
            slideAnimate: animatable,
            'tabell__tr--valgt': selectable && item.selected
          })}
        >
          {selectable ? (
            <td>
              <Checkbox
                id={'c-tableSorter__row-checkbox-id-' + item.key}
                className='c-tableSorter__row-checkbox'
                label={'Velg ' + item.key} checked={!!item.selected} onChange={() =>
                  onCheckClicked(item)}
              />
            </td>
          ) : <td />}
          {_columns.map((column, index2) => {
            const value: any = item[column.id]
            switch (column.type) {
              case 'date':
                return (
                  <td key={index2} className={classNames({ 'tabell__td--sortert': sortable && _sort.column === column.id })}>
                    {_.isFunction(column.renderCell)
                      ? column.renderCell(item, value, context)
                      : <Normaltekst>{_.isFunction(value.toLocaleDateString) ? value.toLocaleDateString() : value.toString()}</Normaltekst>}
                  </td>
                )
              case 'object':
                return (
                  <td key={index2} className={classNames({ 'tabell__td--sortert': sortable && _sort.column === column.id })}>
                    {_.isFunction(column.renderCell)
                      ? column.renderCell(item, value, context)
                      : <Normaltekst>JSON.stringify(value)</Normaltekst>}
                  </td>
                )
              default:
                return (
                  <td key={index2} className={classNames({ 'tabell__td--sortert': sortable && _sort.column === column.id })}>
                    {_.isFunction(column.renderCell)
                      ? column.renderCell(item, value, context)
                      : (
                        <Normaltekst>
                          {labels[column.id] && labels[column.id][value] ? (
                            <Tooltip placement='top' trigger={['hover']} overlay={<span>{labels[column.id][value]}</span>}>
                              <span>{value}</span>
                            </Tooltip>
                          ) : <span>{value}</span>}
                        </Normaltekst>
                      )}
                  </td>
                )
            }
          })}
        </tr>
      )
    })
  }

  const handleFilterTextChange = (_column: Column, newValue: string): void => {
    setColumns(_columns.map((column) => {
      return _column.id === column.id ? {
        ...column,
        filterText: newValue
      } : column
    }))
  }

  const tableRows = rows()

  return (
    <div className={classNames('c-tableSorter', 'tabell', { compact: compact }, className)}>
      <div className='c-tableSorter__content'>
        {loading ? (
          <div className='c-tableSorter__loading'>
            <WaitingPanel size='XL' message='' />
          </div>
        ) : null}
        <table cellSpacing='0' className='c-tableSorter__table w-100'>
          <thead>
            <tr className='c-tableSorter__header'>
              <th style={{ width: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {selectable ? (
                    <Checkbox
                      label='Velg alle'
                      id='c-tableSorter__checkAll-checkbox-id'
                      className='c-tableSorter__checkAll-checkbox d-flex mr-2'
                      checked={checkAll}
                      onChange={onCheckAllClicked}
                    />
                  ) : null}
                  {searchable ? (
                    <Icons
                      kind='search'
                      size={24}
                      className='c-tableSorter___seefilters-icon'
                      id='c-tableSorter__seefilters-icon-id'
                      onClick={() => setSeeFilters(!seeFilters)}
                    />) : null}
                </div>
              </th>
              {_columns.map((column) => {
                const filterText: string = column.filterText ? column.filterText.toLowerCase() : ''
                return (
                  <th
                    role='columnheader'
                    aria-sort='none'
                    key={column.id}
                    className={classNames('header', { [sortClass(column)]: column.label !== '' })}
                  >
                    {sortable && column.label ? (
                      <Lenke
                        href='#' onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          sortColumn(column)
                        }}
                      >
                        {column.label + (filterText ? ' (' + filterText + ')' : '')}
                      </Lenke>
                    ) : column.label + (filterText ? ' (' + filterText + ')' : '')}
                  </th>
                )
              })}
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
                        value={column.filterText || ''}
                        onChange={(e) => handleFilterTextChange(column, e.target.value)}
                      />
                    </td>
                  )
                })}
              </tr>
            ) : null}
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        {pagination ? (
          <Pagination
            className='c-tableSorter__pagination'
            numberOfItems={tableRows.length}
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
  animatable: PT.bool,
  className: PT.string,
  context: PT.object,
  columns: PT.array.isRequired,
  initialPage: PT.number,
  items: PT.array,
  itemsPerPage: PT.number,
  labels: PT.any,
  loading: PT.bool,
  onRowSelectChange: PT.func,
  pagination: PT.bool,
  searchable: PT.bool,
  selectable: PT.bool,
  sortable: PT.bool,
  sort: PT.oneOf<Sort>([])
}

export default TableSorter
