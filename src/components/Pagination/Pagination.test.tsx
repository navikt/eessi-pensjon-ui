import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import Pagination, { PaginationProps } from './Pagination'

describe('components/Pagination/Pagination', () => {
  let wrapper: ReactWrapper
  const initialMockProps: PaginationProps = {
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

  it('Renders next page', () => {
    (initialMockProps.onChange as jest.Mock).mockReset()
    wrapper.find('.c-pagination__next-button').hostNodes().simulate('click')
    expect(initialMockProps.onChange).toHaveBeenCalledWith(initialMockProps.initialPage! + 1)
  })

  it('Renders previous page', () => {
    (initialMockProps.onChange as jest.Mock).mockReset()
    wrapper.find('.c-pagination__prev-button').hostNodes().simulate('click')
    expect(initialMockProps.onChange).toHaveBeenCalledWith(initialMockProps.initialPage! - 1)
  })

  it('Renders clicked page', () => {
    (initialMockProps.onChange as jest.Mock).mockReset()
    wrapper.find('.c-pagination__page-button').hostNodes().last().simulate('click')
    expect(initialMockProps.onChange).toHaveBeenCalledWith(10)
  })
})
