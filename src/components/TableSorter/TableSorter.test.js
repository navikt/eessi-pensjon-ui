import React from 'react'
import TableSorter from './TableSorter'

describe('components/TableSorter/TableSorter', () => {
  let wrapper
  const initialMockProps = {
    columns: [
      { id: 'string', label: 'ui:string', type: 'string' },
      { id: 'date', label: 'ui:date', type: 'date' },
      {
        id: 'object',
        label: 'ui:variant',
        type: 'object',
        needle: (it) => it.label.toLowerCase(),
        renderCell: (item, value) => {
          return <span>{value.label}</span>
        }
      }
    ],
    items: [
      { key: '01', string: 'String 01', date: new Date(2020, 1, 1), object: { label: 'Object 01' } },
      { key: '02', string: 'String 02', date: new Date(2020, 1, 2), object: { label: 'Object 02' } },
      { key: '03', string: 'String 03', date: new Date(2020, 1, 3), object: { label: 'Object 03' } },
      { key: '04', string: 'String 04', date: new Date(2020, 1, 4), object: { label: 'Object 04' } },
      { key: '05', string: 'String 05', date: new Date(2020, 1, 5), object: { label: 'Object 05' } },
      { key: '06', string: 'String 06', date: new Date(2020, 1, 6), object: { label: 'Object 06' } },
      { key: '07', string: 'String 07', date: new Date(2020, 1, 7), object: { label: 'Object 07' } },
      { key: '08', string: 'String 08', date: new Date(2020, 1, 8), object: { label: 'Object 08' } },
      { key: '09', string: 'String 09', date: new Date(2020, 1, 9), object: { label: 'Object 09' } },
      { key: '10', string: 'String 10', date: new Date(2020, 1, 10), object: { label: 'Object 10' } },
      { key: '11', string: 'String 11', date: new Date(2020, 1, 11), object: { label: 'Object 11' } }
    ],
    loading: false,
    sortable: true,
    searchable: true,
    selectable: true,
    animatable: true,
    itemsPerPage: 5,
    onRowSelectChange: jest.fn(),
    pagination: true
  }

  beforeEach(() => {
    wrapper = mount(<TableSorter {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Renders: Not sortable', () => {
    wrapper = mount(<TableSorter {...initialMockProps} sortable={false} />)
    expect(wrapper.find('thead tr th').last().exists('a')).toBeFalsy()
  })

  it('Has proper HTML structure: loading', () => {
    expect(wrapper.exists('div.c-tableSorter')).toBeTruthy()
  })

  it('UseEffect: new items', () => {
    wrapper.setProps({
      items: initialMockProps.items.slice(initialMockProps.items.length - 1)
    })
    wrapper.update()
    expect(wrapper.exists('div.c-tableSorter')).toBeTruthy()
    expect(wrapper.find('tbody tr').length).toEqual(1)
  })

  it('Sort order', () => {
    let lastHeader = wrapper.find('thead tr th').last()
    expect(lastHeader.props().className).toEqual('header none')

    lastHeader.find('a').simulate('click')
    lastHeader = wrapper.find('thead tr th').last()
    expect(lastHeader.props().className).toEqual('header tabell__th--sortert-asc')

    lastHeader.find('a').simulate('click')
    lastHeader = wrapper.find('thead tr th').last()
    expect(lastHeader.props().className).toEqual('header tabell__th--sortert-desc')

    lastHeader.find('a').simulate('click')
    lastHeader = wrapper.find('thead tr th').last()
    expect(lastHeader.props().className).toEqual('header none')
  })

  it('onCheckAllClicked triggered', () => {
    initialMockProps.onRowSelectChange.mockReset()
    wrapper.find('.c-tableSorter__checkAll-checkbox input').hostNodes().simulate('change', { target: { checked: true } })
    expect(initialMockProps.onRowSelectChange).toHaveBeenCalledWith(initialMockProps.items.map(item => ({
      ...item,
      selected: true
    })))
    wrapper.find('.c-tableSorter__checkAll-checkbox input').hostNodes().simulate('change', { target: { checked: false } })
    expect(initialMockProps.onRowSelectChange).toHaveBeenCalledWith(initialMockProps.items.map(item => ({
      ...item,
      selected: false
    })))
  })

  it('onCheckClicked triggered', () => {
    initialMockProps.onRowSelectChange.mockReset()
    wrapper.find('.c-tableSorter__row-checkbox input').hostNodes().first().simulate('change', { target: { checked: true } })
    expect(initialMockProps.onRowSelectChange).toHaveBeenCalledWith(initialMockProps.items.map((item, index) => ({
      ...item,
      selected: index === 0 ? true : undefined
    })))
    wrapper.find('.c-tableSorter__row-checkbox input').hostNodes().first().simulate('change', { target: { checked: true } })
    expect(initialMockProps.onRowSelectChange).toHaveBeenCalledWith(initialMockProps.items.map((item, index) => ({
      ...item,
      selected: index === 0 ? false : undefined
    })))
  })

  it('handleFilterTextChange()', () => {
    initialMockProps.onRowSelectChange.mockReset()
    wrapper.find('.c-tableSorter___seefilters-icon').hostNodes().simulate('click')
    wrapper.update()
    wrapper.find('.c-tableSorter__sort-input input').hostNodes().first().simulate('change', { target: { value: 'String 07' } })
    wrapper.update()
    expect(wrapper.find('tbody tr').length).toEqual(1)
    expect(wrapper.find('tbody tr').render().text()).toEqual(['Velg 07', 'String 07', '2/7/2020', 'Object 07'].join(''))
  })
})
