import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import labels from './Dashboard.labels'
import WidgetEdit, { WidgetEditProps } from './WidgetEdit'

describe('applications/Dashboard/WidgetEdit', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetEditProps = {
    labels: labels,
    setMode: jest.fn(),
    myWidgets: {},
    widget: {
      i: 'w-1-foo',
      type: 'foo',
      title: 'foo',
      options: {},
      visible: true
    }
  }

  beforeEach(() => {
    wrapper = mount(<WidgetEdit {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-d-WidgetEdit')).toBeTruthy()
  })
})
