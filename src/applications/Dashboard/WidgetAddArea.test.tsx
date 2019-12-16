import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import WidgetAddArea, { WidgetAddAreaProps } from './WidgetAddArea'
import labels from './Dashboard.labels'

jest.mock('./WidgetAdd', () => {
  return () => { return <div className='mock-widgetadd' /> }
})

describe('applications/Dashboard/WidgetAddArea', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetAddAreaProps = {
    availableWidgets: [],
    labels: labels,
    onPlaceholderWidgetAdd: jest.fn(),
    myWidgets: {},
    widgets: []
  }

  beforeEach(() => {
    wrapper = mount(<WidgetAddArea {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-d-widgetAddArea')).toBeTruthy()
  })
})
