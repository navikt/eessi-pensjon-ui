import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import { DashboardGrid, DashboardGridProps } from './DashboardGrid'

describe('applications/Dashboard/DashboardGrid', () => {
  let wrapper: ReactWrapper
  const initialMockProps: DashboardGridProps = {
    currentBreakpoint: 'lg',
    currentTabIndex: 0,
    editMode: false,
    droppingItem: { i: '', w: 0, h: 0 },
    labels: {},
    layouts: [{
      label: 'default',
      body: { lg: [], md: [], sm: [] }
    }],
    myWidgets: {},
    onBreakpointChange: jest.fn(),
    onLayoutChange: jest.fn(),
    onTabAdd: jest.fn(),
    onTabChange: jest.fn(),
    onTabDelete: jest.fn(),
    onTabRename: jest.fn(),
    onTabMove: jest.fn(),
    onWidgetDrop: jest.fn(),
    onWidgetUpdate: jest.fn(),
    onWidgetResize: jest.fn(),
    onWidgetDelete: jest.fn(),
    onWidgetFullFocus: jest.fn(),
    onWidgetRestoreFocus: jest.fn(),
    rowHeight: 30,
    widgets: []
  }

  beforeEach(() => {
    wrapper = mount(<DashboardGrid {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('div.c-dashboard__grid')).toBeTruthy()
  })
})
