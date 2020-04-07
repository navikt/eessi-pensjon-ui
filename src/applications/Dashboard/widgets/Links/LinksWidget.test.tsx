import { WidgetProps } from 'declarations/Dashboard.d'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import LinksWidget from './LinksWidget'

jest.mock('./Links', () => {
  return () => { return <div className='mock-w-links' /> }
})

describe('widgets/Links/LinksWidget', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetProps = {
    onResize: jest.fn(),
    onUpdate: jest.fn(),
    onFullFocus: jest.fn(),
    onRestoreFocus: jest.fn(),
    widget: {
      i: 'w-1-links',
      type: 'links',
      visible: true,
      title: 'mockTitle',
      options: {
        collapsed: false
      }
    }
  }

  beforeEach(() => {
    wrapper = mount(<LinksWidget {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    // expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.w-LinksWidget')).toBeTruthy()
    expect(wrapper.find('.mock-w-links')).toBeTruthy()
  })

  it('It tries to save state when collapse changes', () => {
    (initialMockProps.onUpdate as jest.Mock).mockReset()
    wrapper.find('Ekspanderbartpanel button').simulate('click')
    expect(initialMockProps.onUpdate).toHaveBeenCalledWith({
      ...initialMockProps.widget,
      options: {
        ...initialMockProps.widget.options,
        collapsed: true
      }
    })
  })

  it('Has properties', () => {
    expect(LinksWidget.properties).toHaveProperty('type')
    expect(LinksWidget.properties).toHaveProperty('title')
    expect(LinksWidget.properties).toHaveProperty('description')
    expect(LinksWidget.properties).toHaveProperty('layout')
    expect(LinksWidget.properties).toHaveProperty('options')
  })
})
