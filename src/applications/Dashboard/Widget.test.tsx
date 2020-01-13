import Widget, { WidgetProps } from 'applications/Dashboard/Widget'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import labels from './Dashboard.labels'
import * as Widgets from './widgets'
import { Widget as IWidget } from 'declarations/Dashboard.d'

jest.mock('./widgets/Links/Links', () => () => (<div className='mock-w-links' />))

describe('applications/Dashboard/Widget', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetProps = {
    onResize: jest.fn(),
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    onFullFocus: jest.fn(),
    onRestoreFocus: jest.fn(),
    mode: 'view',
    setMode: jest.fn(),
    labels: labels,
    layout: { h: 0, i: 'i', maxH: 0, maxW: 0, minH: 0, minW: 0, w: 0, x: 0, y: 0 },
    myWidgets: Widgets,
    widget: {
      i: 'w-1-foo',
      visible: true,
      type: 'foo',
      title: 'mockTitle',
      options: {
        content: 'mockContent'
      }
    } as IWidget
  }

  beforeEach(() => {
    wrapper = mount(<Widget {...initialMockProps} mode='view' />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Renders WidgetEdit', () => {
    wrapper.setProps({ mode: 'edit' })
    expect(wrapper.exists('WidgetEdit')).toBeTruthy()
  })

  it('Renders WidgetDelete', () => {
    wrapper.setProps({ mode: 'delete' })
    expect(wrapper.exists('WidgetDelete')).toBeTruthy()
  })

  it('Renders EkspandertbartWidget', () => {
    wrapper.setProps({ widget: { i: 'i', visible: true, type: 'ekspandertbart', title: 'mockTitle', options: { content: 'mockContent' } } })
    expect(wrapper.exists('.w-EkspandertbartWidget')).toBeTruthy()
  })

  it('Renders SmileyWidget', () => {
    wrapper.setProps({ widget: { i: 'i', visible: true, title: 'Smiley', type: 'smiley', options: { mood: 'mockMood' } } })
    expect(wrapper.exists('.w-SmileyWidget')).toBeTruthy()
  })

  it('Renders CatMidget', () => {
    wrapper.setProps({ widget: { i: 'i', visible: true, title: 'Cat', type: 'cat', options: {} } })
    expect(wrapper.exists('.w-catMidget')).toBeTruthy()
  })

  it('Renders NoteWidget', () => {
    wrapper.setProps({ widget: { i: 'i', visible: true, title: 'Note', type: 'note', options: { content: 'mockContent' } } })
    expect(wrapper.exists('.w-NoteWidget')).toBeTruthy()
  })

  it('Renders LinksWidget', () => {
    wrapper.setProps({ widget: { i: 'i', visible: true, title: 'Links', type: 'links', options: { collapsed: false } } })
    expect(wrapper.exists('.w-LinksWidget')).toBeTruthy()
  })
})
