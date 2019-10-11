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
      raw: {
        journalpostId: '1',
        tittel: 'blue.pdf',
        tema: 'foo',
        dokumentInfoId: '4',
        datoOpprettet: '2018-12-27T13:42:24.000Z',
        varianter: [{
          variantformat: 'ARKIV',
          filnavn: '23534345.pdf'
        }, {
          variantformat: 'DUMMY',
          filnavn: '908745345.pdf'
        }]
      },
      journalpostId: '1',
      dokumentInfoId: '4',
      name: 'blue.pdf',
      tema: 'foo',
      date: '2018-12-27T13:42:24.000Z',
      varianter: [{
        variant: {
          variantformat: 'ARKIV',
          filnavn: '23534345.pdf'
        },
        label: 'ARKIV (23534345.pdf)',
        selected: false,
        focused: false
      }, {
        variant: {
          variantformat: 'DUMMY',
          filnavn: '908745345.pdf'
        },
        label: 'DUMMY (908745345.pdf)',
        selected: false,
        focused: false
      }]
    }, {
      raw: {
        journalpostId: '2',
        tittel: 'red.pdf',
        tema: 'bar',
        dokumentInfoId: '5',
        datoOpprettet: '2018-12-17T13:42:24.000Z',
        varianter: [{
          variantformat: 'ARKIV',
          filnavn: '98734213487.pdf'
        }, {
          variantformat: 'DUMMY',
          filnavn: '998424576.pdf'
        }]
      },
      journalpostId: '2',
      dokumentInfoId: '5',
      name: 'red.pdf',
      tema: 'bar',
      date: '2018-12-17T13:42:24.000Z',
      varianter: [{
        variant: {
          variantformat: 'ARKIV',
          filnavn: '98734213487.pdf'
        },
        label: 'ARKIV (98734213487.pdf)',
        selected: false,
        focused: false
      }, {
        variant: {
          variantformat: 'DUMMY',
          filnavn: '998424576.pdf'
        },
        label: 'DUMMY (998424576.pdf)',
        selected: false,
        focused: false
      }]
    }, {
      raw: {
        journalpostId: '3',
        tittel: 'yellow.pdf',
        tema: 'fuzz',
        dokumentInfoId: '6',
        datoOpprettet: '2018-12-07T13:42:24.000Z',
        varianter: [{
          variantformat: 'ARKIV',
          filnavn: '1078475197.pdf'
        }, {
          variantformat: 'DUMMY',
          filnavn: '09873539824762.pdf'
        }]
      },
      journalpostId: '3',
      dokumentInfoId: '6',
      name: 'yellow.pdf',
      tema: 'fuzz',
      date: '2018-12-07T13:42:24.000Z',
      varianter: [{
        variant: {
          variantformat: 'ARKIV',
          filnavn: '1078475197.pdf'
        },
        label: 'ARKIV (1078475197.pdf)',
        selected: false,
        focused: false
      }, {
        variant: {
          variantformat: 'DUMMY',
          filnavn: '09873539824762.pdf'
        },
        label: 'DUMMY (09873539824762.pdf)',
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
