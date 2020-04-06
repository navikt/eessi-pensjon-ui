import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import labels from './Dashboard.labels'
import DashboardControlPanel, { DashboardControlPanelProps } from './DashboardControlPanel'

describe('applications/Dashboard/DashboardControlPanel', () => {
  let wrapper: ReactWrapper
  const initialMockProps: DashboardControlPanelProps = {
    addMode: false,
    editMode: false,
    labels: labels,
    onAddChange: jest.fn(),
    onCancelEdit: jest.fn(),
    onEditModeOn: jest.fn(),
    onResetEdit: jest.fn(),
    onSaveEdit: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<DashboardControlPanel {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    //expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('div.c-dashboard__controlPanel')).toBeTruthy()
  })

  it('Clicking on Edit button', () => {
    expect(wrapper.exists('.c-dashboard__controlPanel-edit-icon')).toBeTruthy()
    wrapper.find('#c-dashboard__controlPanel-edit-icon-id').hostNodes().simulate('click')
    expect(initialMockProps.onEditModeOn).toHaveBeenCalled()
  })

  it('Control Panel in Edit mode', () => {
    wrapper = mount(<DashboardControlPanel {...initialMockProps} editMode />)
    expect(wrapper.exists('.c-dashboard__controlPanel-add-button')).toBeTruthy()
    expect(wrapper.exists('.c-dashboard__controlPanel-save-button')).toBeTruthy()
    expect(wrapper.exists('.c-dashboard__controlPanel-cancel-button')).toBeTruthy()

    wrapper.find('#c-dashboard__controlPanel-add-button-id').hostNodes().simulate('click')
    expect(initialMockProps.onAddChange).toHaveBeenCalled()

    wrapper.find('#c-dashboard__controlPanel-save-button-id').hostNodes().simulate('click')
    expect(initialMockProps.onSaveEdit).toHaveBeenCalled()

    wrapper.find('#c-dashboard__controlPanel-cancel-button-id').hostNodes().simulate('click')
    expect(initialMockProps.onCancelEdit).toHaveBeenCalled()
  })
})
