import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import WidgetContainer, { WidgetContainerProps } from './WidgetContainer'
import labels from './Dashboard.labels'

Object.defineProperty(document, 'getElementById', () => ({
  offsetWidth: 0,
  offsetHeight: 0
}))

describe('applications/Dashboard/WidgetContainer', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetContainerProps = {
    currentBreakpoint: 'lg',
    editMode: false,
    labels: labels,
    layout: { h: 0, maxH: 0, maxW: 0, minH: 0, minW: 0, w: 0, x: 0, y: 0, i: 'i' },
    onWidgetUpdate: jest.fn(),
    onWidgetResize: jest.fn(),
    onWidgetFullFocus: jest.fn(),
    onWidgetRestoreFocus: jest.fn(),
    rowHeight: 0,
    myWidgets: {},
    widget: {
      i: 'w-1-x',
      type: 'x',
      title: 'title',
      visible: true,
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
