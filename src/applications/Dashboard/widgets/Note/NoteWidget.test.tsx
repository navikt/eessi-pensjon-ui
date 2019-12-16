import { WidgetComponentProps } from 'applications/Dashboard/declarations/Dashboard'
import { mount, ReactWrapper } from 'enzyme'
import _ from 'lodash'
import React from 'react'
import NoteWidget from './NoteWidget'

describe('widgets/Note/NoteWidget', () => {
  let wrapper: ReactWrapper
  let spy: jest.SpyInstance
  const initialMockProps: WidgetComponentProps = {
    id: 'mock-id',
    onResize: jest.fn(),
    onUpdate: jest.fn(),
    widget: {
      i: 'w-1-note',
      visible: true,
      ..._.cloneDeep(NoteWidget.properties)
    }
  }

  beforeAll(() => {
    spy = jest.spyOn(document, 'getElementById')
    spy.mockReturnValue({
      offsetWidth: 999,
      offsetHeight: 999
    })
  })

  beforeEach(() => {
    wrapper = mount(<NoteWidget {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.w-NoteWidget')).toBeTruthy()
    expect(wrapper.exists('.w-NoteWidget__content')).toBeTruthy()
  })

  it('Saves content when blurred', () => {
    const div = wrapper.find('.w-NoteWidget__content').hostNodes()
    div.simulate('blur')
    expect(initialMockProps.onResize).toHaveBeenCalledWith(999, 999)
    expect(initialMockProps.onUpdate).toHaveBeenCalledWith({
      ...initialMockProps.widget,
      options: {
        ...initialMockProps.widget!.options,
        content: '<ul><li>Eggs</li><li>Milk</li><li>Bread</li></ul>'
      }
    },
    initialMockProps.layout)
  })

  it('Has properties', () => {
    expect(NoteWidget.properties).toHaveProperty('type')
    expect(NoteWidget.properties).toHaveProperty('title')
    expect(NoteWidget.properties).toHaveProperty('description')
    expect(NoteWidget.properties).toHaveProperty('layout')
    expect(NoteWidget.properties).toHaveProperty('options')
  })
})
