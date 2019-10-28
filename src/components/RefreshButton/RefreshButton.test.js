import React from 'react'
import RefreshButton from './RefreshButton'

describe('components/RefreshButton', () => {
  const initialMockProps = {
    onRefreshClicked: jest.fn(),
    rotating: false,
    labelRefresh: 'mockLabelRefresh'
  }

  it('Renders', () => {
    const wrapper = shallow(<RefreshButton {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    const wrapper = mount(<RefreshButton {...initialMockProps} />)
    expect(wrapper.exists('.c-refreshbutton')).toBeTruthy()
    expect(wrapper.find('.c-refreshbutton').props().title).toEqual(initialMockProps.labelRefresh)
    wrapper.find('.c-refreshbutton').hostNodes().simulate('click')
    expect(initialMockProps.onRefreshClicked).toHaveBeenCalled()
  })
})
