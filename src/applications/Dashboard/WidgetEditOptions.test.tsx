import { WidgetMap } from 'applications/Dashboard/declarations/Dashboard'
import * as DashboardDefaultWidgets from 'applications/Dashboard/widgets'
import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import WidgetEditOptions, { WidgetEditOptionsProps } from './WidgetEditOptions'

describe('applications/Dashboard/WidgetEditOptions', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetEditOptionsProps = {
    widget: {
      type: 'note',
      title: 'Note',
      i: 'w-0-note',
      visible: true,
      options: {
        backgroundColor: 'mockColor'
      }
    },
    myWidgets: { ...(DashboardDefaultWidgets as WidgetMap) }
  }

  beforeEach(() => {
    wrapper = mount(<WidgetEditOptions {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.w-NoteOptionsWidget')).toBeTruthy()
  })
})
