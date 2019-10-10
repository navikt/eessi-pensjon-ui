import React from 'react'
import WidgetDelete from './WidgetDelete'
import labels from './Dashboard.labels'

describe('components/Dashboard/Widget/WidgetDelete', () => {
  let wrapper

  const initialMockProps = {
    layout: { foo: 'bar' },
    labels: labels,
    onResize: jest.fn(),
    onWidgetDelete: jest.fn(),
    setMode: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<WidgetDelete {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-d-WidgetDelete')).toBeTruthy()
  })

  it('Deletes widget when delete button is clicked', () => {
    wrapper.find('#c-d-WidgetDelete__delete-button-id').hostNodes().simulate('click')
    expect(initialMockProps.onWidgetDelete).toHaveBeenCalledWith(initialMockProps.layout)
  })

  it('Returns to edit mode when cancel button is clicked', () => {
    wrapper.find('#c-d-WidgetDelete__cancel-button-id').hostNodes().simulate('click')
    expect(initialMockProps.setMode).toHaveBeenCalledWith('edit')
  })
})
