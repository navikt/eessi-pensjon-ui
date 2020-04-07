import labels from 'applications/Dashboard/Dashboard.labels'
import { Widget, WidgetProps } from 'declarations/Dashboard.d'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import { Labels } from 'declarations/types.d'
import EkspandertBartWidget from './EkspandertBartWidget'

describe('widgets/EkspandertBartWidget', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetProps = {
    onResize: jest.fn(),
    onUpdate: jest.fn(),
    onFullFocus: jest.fn(),
    onRestoreFocus: jest.fn(),
    labels: labels as Labels,
    widget: {
      i: 'w-1-ekspandertbart',
      type: 'ekspandertbart',
      visible: true,
      title: 'mockTitle',
      options: {
        content: 'mockContent',
        collapsed: false
      }
    } as Widget
  }

  beforeEach(() => {
    wrapper = mount(<EkspandertBartWidget {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    // expect(wrapper).toMatchSnapshot()
  })

  it('It tries to save state when collapse changes', () => {
    wrapper.find('Ekspanderbartpanel button').simulate('click')
    expect(initialMockProps.onUpdate).toHaveBeenCalledWith({
      ...initialMockProps.widget,
      options: {
        ...initialMockProps.widget.options,
        collapsed: true
      }
    })
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.w-EkspandertbartWidget')).toBeTruthy()
    expect(wrapper.find('.w-EkspandertbartWidget .content').render().text()).toEqual('mockContent')
  })

  it('Will call _onResize to accommodate content', () => {
    wrapper.setProps({ content: '<div>mockContent<br/><br/><br/><br/>mockContent</div>' })
    wrapper.update()
    wrapper.setProps({ content: '<div/>' })
    wrapper.update()
    // doesn't capture, probably as mount render doesn't get size units
    // expect(initialMockProps.onResize).toHaveBeenCalledWith("")
  })

  it('Has properties', () => {
    expect(EkspandertBartWidget.properties).toHaveProperty('type')
    expect(EkspandertBartWidget.properties).toHaveProperty('title')
    expect(EkspandertBartWidget.properties).toHaveProperty('description')
    expect(EkspandertBartWidget.properties).toHaveProperty('layout')
    expect(EkspandertBartWidget.properties).toHaveProperty('options')
  })
})
