import React from 'react'
import WidgetContainer from './WidgetContainer'
import labels from './Dashboard.labels'

document.getElementById = () => {
  return {
    offsetWidth: 0,
    offsetHeight: 0
  }
}

describe('applications/Dashboard/WidgetContainer', () => {
  let wrapper

  const initialMockProps = {
    currentBreakpoint: 'lg',
    editMode: false,
    labels: labels,
    layout: { foo: 'bar' },
    onWidgetUpdate: jest.fn(),
    onWidgetResize: jest.fn(),
    rowHeight: 0,

    widget: {
      options: {
        backgroundColor: 'mockColor'
      }
    }
  }

  beforeEach(() => {
    wrapper = mount(<WidgetContainer {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-d-Widget')).toBeTruthy()
    expect(wrapper.exists('Widget')).toBeTruthy()
  })
})
