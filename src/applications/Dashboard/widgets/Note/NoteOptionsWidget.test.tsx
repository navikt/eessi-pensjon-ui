import { WidgetProps } from 'declarations/Dashboard.d'
import NoteWidget from 'applications/Dashboard/widgets/Note/NoteWidget'
import { mount, ReactWrapper } from 'enzyme'
import _ from 'lodash'
import React from 'react'
import NoteOptionsWidget from './NoteOptionsWidget'

describe('widgets/Note/NoteOptionsWidget', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetProps = {
    onFullFocus: jest.fn(),
    onRestoreFocus: jest.fn(),
    onResize: jest.fn(),
    onUpdate: jest.fn(),
    widget: {
      ..._.cloneDeep(NoteWidget.properties),
      i: 'w-1-note',
      visible: true
    }
  }

  beforeEach(() => {
    wrapper = mount(<NoteOptionsWidget {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.w-NoteOptionsWidget')).toBeTruthy()
    expect(wrapper.exists('#w-NoteOptionsWidget__color-select-id')).toBeTruthy()
  })

  it('Saves color when changed', () => {
    const mockColor = 'mockColor'
    const select = wrapper.find('#w-NoteOptionsWidget__color-select-id select').hostNodes()
    select.simulate('change', { target: { value: mockColor } })
    expect(initialMockProps.onUpdate).toHaveBeenCalledWith({
      ...initialMockProps.widget,
      options: {
        ...initialMockProps.widget!.options,
        backgroundColor: mockColor
      }
    })
  })
})
