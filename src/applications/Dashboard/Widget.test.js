import React from 'react'
import Widget from './Widget'
import labels from './Dashboard.labels'

describe('applications/Dashboard/Widget', () => {
  let wrapper
  const initialMockProps = {
    actions: {},
    layout: {},
    onResize: jest.fn(),
    onUpdate: jest.fn(),
    onWidgetDelete: jest.fn(),
    onWidgetUpdate: jest.fn(),
    setMode: jest.fn(),
    labels: labels,
    widget: {
      type: 'foo',
      title: 'mockTitle',
      options: {
        content: 'mockContent'
      }
    }
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
    wrapper.setProps({ widget: { type: 'ekspandertbart', options: { content: 'mockContent' } } })
    expect(wrapper.exists('.w-EkspandertbartWidget')).toBeTruthy()
  })

  it('Renders SmileyWidget', () => {
    wrapper.setProps({ widget: { type: 'smiley', options: { mood: 'mockMood' } } })
    expect(wrapper.exists('.w-SmileyWidget')).toBeTruthy()
  })

  it('Renders CatMidget', () => {
    wrapper.setProps({ widget: { type: 'cat' } })
    expect(wrapper.exists('.w-catMidget')).toBeTruthy()
  })

  it('Renders NoteWidget', () => {
    wrapper.setProps({ widget: { type: 'note', options: { content: 'mockContent' } } })
    expect(wrapper.exists('.w-NoteWidget')).toBeTruthy()
  })

  it('Renders LinksWidget', () => {
    wrapper.setProps({ widget: { type: 'links', options: { collapsed: false } } })
    expect(wrapper.exists('.w-LinksWidget')).toBeTruthy()
  })
})
