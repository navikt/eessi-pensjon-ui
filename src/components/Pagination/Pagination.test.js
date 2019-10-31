import React from 'react'
import Pagination from './Pagination'

describe('components/Pagination/Pagination', () => {
  let wrapper
  const initialMockProps = {
    numberOfItems: 100,
    itemsPerPage: 10,
    initialPage: 5,
    onChange: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<Pagination {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-pagination')).toBeTruthy()
  })

  it('Renders 12 buttons (10 pages plus two arrows)', () => {
    expect(wrapper.find('.c-pagination__button').hostNodes().length).toEqual(12)
  })
})
