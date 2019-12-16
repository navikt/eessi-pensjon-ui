import { WidgetComponentProps } from 'applications/Dashboard/declarations/Dashboard'
import SmileyWidget from 'applications/Dashboard/widgets/Smiley/SmileyWidget'
import { mount, ReactWrapper } from 'enzyme'
import _ from 'lodash'
import React from 'react'
import SmileyOptionsWidget from './SmileyOptionsWidget'

describe('widgets/Smiley/SmileyOptionsWidget', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetComponentProps = {
    onUpdate: jest.fn(),
    widget: {
      i: 'w-1-smiley',
      visible: true,
      ..._.cloneDeep(SmileyWidget.properties)
    }
  }

  beforeEach(() => {
    wrapper = mount(<SmileyOptionsWidget {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.w-SmileyOptionsWidget')).toBeTruthy()
    expect(wrapper.exists('#w-SmileyOptionsWidget__mood-select-id')).toBeTruthy()
  })

  it('Saves mood when changed', () => {
    const mockMood = 'mockMood'
    const select = wrapper.find('#w-SmileyOptionsWidget__mood-select-id select').hostNodes()
    select.simulate('change', { target: { value: mockMood } })
    expect(initialMockProps.onUpdate).toHaveBeenCalledWith({
      ...initialMockProps.widget,
      options: {
        ...initialMockProps.widget.options,
        mood: mockMood
      }
    })
  })
})
