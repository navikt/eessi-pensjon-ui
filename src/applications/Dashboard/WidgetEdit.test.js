import React from 'react'
import WidgetEdit from './WidgetEdit'
import labels from './Dashboard.labels'

describe('applications/Dashboard/WidgetEdit', () => {
  let wrapper

  const initialMockProps = {
    labels: labels,
    setMode: jest.fn(),
    widget: {
      type: 'foo'
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
