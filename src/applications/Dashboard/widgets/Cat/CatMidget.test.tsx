import { WidgetComponentProps } from 'applications/Dashboard/declarations/Dashboard'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import CatMidget from './CatMidget'

describe('widgets/Cat/CatMidget', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetComponentProps = {
    onResize: jest.fn(),
    widget: {
      visible: true,
      i: 'w-1-cat',
      options: {},
      title: 'cat',
      type: 'cat'
    }
  }

  beforeEach(() => {
    (initialMockProps.onResize as jest.Mock).mockReset()
    wrapper = mount(<CatMidget {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('UseEffect: it tries to resize', () => {
    expect(initialMockProps.onResize).toHaveBeenCalled()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.w-catMidget')).toBeTruthy()
    expect(wrapper.find('img')).toBeTruthy()
  })

  it('Has properties', () => {
    expect(CatMidget.properties).toHaveProperty('type')
    expect(CatMidget.properties).toHaveProperty('title')
    expect(CatMidget.properties).toHaveProperty('description')
    expect(CatMidget.properties).toHaveProperty('layout')
    expect(CatMidget.properties).toHaveProperty('options')
  })
})
