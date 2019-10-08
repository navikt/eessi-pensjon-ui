import React from 'react'
import TableSorter from './TableSorter'

describe('components/TableSorter/TableSorter', () => {
  let wrapper
  const initialMockProps = {
    columns: [
      { id: 'name', label: 'ui:title', type: 'string', filterText: '', defaultSortOrder: '' },
      { id: 'tema', label: 'ui:tema', type: 'tag', filterText: '', defaultSortOrder: '' },
      { id: 'date', label: 'ui:date', type: 'date', filterText: '', defaultSortOrder: '' },
      {
        id: 'varianter',
        label: 'ui:variant',
        type: 'object',
        filterText: '',
        defaultSortOrder: '',
        needle: (it) => it.label.toLowerCase(),
        toTableCell: (item, value) => {
          return JSON.stringify(value)
        }
      }
    ],
    items: [{
      raw: {},
      id: '1',
      name: 'name',
      tema: 'tema',
      date: new Date(1970, 1, 1),
      varianter: [{
        label: 'label',
        variant: 'variant',
        selected: false,
        focused: false
      }]
    }],
    loading: false,
    sort: {
      column: 'name',
      order: 'desc'
    }
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

  it('Has proper HTML structure: loading', () => {
    expect(wrapper.exists('div.c-tableSorter')).toBeTruthy()
  })
})
