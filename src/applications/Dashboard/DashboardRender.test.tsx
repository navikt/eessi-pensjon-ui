import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import DashboardRender, { DashboardRenderProps } from './DashboardRender'
import labels from './Dashboard.labels'

jest.mock('./Widget', () => {
  return () => { return <div className='mock-c-d-widget' /> }
})

describe('applications/Dashboard/Dashboard', () => {
  let wrapper: ReactWrapper
  const initialMockProps: DashboardRenderProps = {
    addMode: false,
    availableWidgets: [],
    editMode: false,
    labels: labels,
    layouts: [{
      label: 'default',
      body: { lg: [], md: [], sm: [] }
    }],
    currentTabIndex: 0,
    currentBreakpoint: 'lg',
    droppingItem: { i: '', w: 0, h: 0 },
    onEditModeOn: jest.fn(),
    myWidgets: {},
    onCancelEdit: jest.fn(),
    onSaveEdit: jest.fn(),
    onAddChange: jest.fn(),
    onLayoutChange: jest.fn(),
    onBreakpointChange: jest.fn(),
    onResetEdit: jest.fn(),
    onPlaceholderWidgetAdd: jest.fn(),
    onWidgetDrop: jest.fn(),
    onWidgetUpdate: jest.fn(),
    onWidgetResize: jest.fn(),
    onWidgetDelete: jest.fn(),
    onTabChange: jest.fn(),
    onTabAdd: jest.fn(),
    onTabDelete: jest.fn(),
    onTabRename: jest.fn(),
    onTabMove: jest.fn(),
    onWidgetFullFocus: jest.fn(),
    onWidgetRestoreFocus: jest.fn(),
    rowHeight: 30,
    widgets: []
  }

  it('Renders', () => {
    wrapper = mount(<DashboardRender {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('Has proper HTML structure: loading', () => {
    wrapper = mount(<DashboardRender {...initialMockProps} />)
    expect(wrapper.exists('div.c-dashboardrender__loading')).toBeTruthy()
    wrapper.unmount()
  })

  it('Has proper HTML structure: loaded', () => {
    wrapper = mount(<DashboardRender {...initialMockProps} />)
    expect(wrapper.exists('div.c-dashboard')).toBeTruthy()
    expect(wrapper.exists('DashboardControlPanel')).toBeTruthy()
    expect(wrapper.exists('DashboardGrid')).toBeTruthy()
    wrapper.unmount()
  })

  it('Has Add mode', () => {
    wrapper = mount(<DashboardRender {...initialMockProps} />)
    expect(wrapper.exists('WidgetAddArea')).toBeFalsy()
    wrapper.setProps({ ...initialMockProps })
    expect(wrapper.exists('.c-dashboard__controlPanel-buttons')).toBeTruthy()
    expect(wrapper.exists('#c-dashboard__controlPanel-edit-icon-id')).toBeTruthy()
    wrapper.setProps({ ...initialMockProps, editMode: true })
    expect(wrapper.exists('#c-dashboard__controlPanel-add-button-id')).toBeTruthy()
    wrapper.setProps({ ...initialMockProps, addMode: true })
    expect(wrapper.exists('WidgetAddArea')).toBeTruthy()
    wrapper.unmount()
  })
})
