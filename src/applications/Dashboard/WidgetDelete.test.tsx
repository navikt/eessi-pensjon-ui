import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import labels from './Dashboard.labels'
import WidgetDelete, { WidgetDeleteProps } from './WidgetDelete'

describe('applications/Dashboard/WidgetDelete', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetDeleteProps = {
    labels: labels,
    onResize: jest.fn(),
    onDelete: jest.fn(),
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
    expect(initialMockProps.onDelete).toHaveBeenCalled()
  })

  it('Returns to edit mode when cancel button is clicked', () => {
    wrapper.find('#c-d-WidgetDelete__cancel-button-id').hostNodes().simulate('click')
    expect(initialMockProps.setMode).toHaveBeenCalledWith('edit')
  })
})
