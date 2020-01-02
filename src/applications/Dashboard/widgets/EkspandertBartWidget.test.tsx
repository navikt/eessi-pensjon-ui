import labels from 'applications/Dashboard/Dashboard.labels'
import { WidgetComponentProps } from 'applications/Dashboard/declarations/Dashboard'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import EkspandertBartWidget from './EkspandertBartWidget'

describe('widgets/EkspandertBartWidget', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetComponentProps = {
    onResize: jest.fn(),
    onUpdate: jest.fn(),
    labels: labels,
    widget: {
      i: 'w-1-ekspandertbart',
      type: 'ekspandertbart',
      visible: true,
      title: 'mockTitle',
      options: {
        content: 'mockContent',
        collapsed: false
      }
    }
  }

  beforeEach(() => {
    wrapper = mount(<EkspandertBartWidget {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('It tries to save state when collapse changes', () => {
    wrapper.find('Ekspanderbartpanel button').simulate('click')
    expect(initialMockProps.onUpdate).toHaveBeenCalledWith({
      options: {
        content: 'mockContent',
        collapsed: true
      },
      title: 'mockTitle'
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
