import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import labels from './Dashboard.labels'
import WidgetAddArea, { WidgetAddAreaProps } from './WidgetAddArea'

jest.mock('./WidgetAdd', () => () => (<div className='mock-widgetadd' />))

describe('applications/Dashboard/WidgetAddArea', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetAddAreaProps = {
    availableWidgets: [],
    labels: labels,
    onPlaceholderWidgetAdd: jest.fn(),
    myWidgets: {}
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
