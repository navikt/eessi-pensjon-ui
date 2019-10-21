import React from 'react'
import DashboardRender from './DashboardRender'
import labels from './Dashboard.labels'

jest.mock('react-dnd', () => {
  return {
    DndProvider: (props) => {
      return (
        <div className='mock-dndprovider'>
          {props.children}
        </div>
      )
    },
    DragSource: (name, opts, conn) => WrappedComponent => {
      return (props) => {
        return <WrappedComponent {...props} />
      }
    },
    DropTarget: (name, opts, conn) => WrappedComponent => {
      return (props) => {
        return (
          <WrappedComponent
            {...props}
            connectDropTarget={WC => { return WC }}
          />
        )
      }
    },
    DragLayer: (opts) => WrappedComponent => {
      return (props) => {
        return <WrappedComponent {...props} />
      }
    }
  }
})

jest.mock('react-dnd-html5-backend', () => {
  return () => { return undefined }
})

jest.mock('./Widget', () => {
  return () => { return <div className='mock-c-d-widget' /> }
})

describe('applications/Dashboard/Dashboard', () => {
  const initialMockProps = {
    addMode: false,
    availableWidgets: [],
    editMode: false,
    mounted: false,
    labels: labels,
    layouts: { default: { lg: [] } },
    currentTab: 'default',
    currentBreakpoint: 'lg',
    onEditModeOn: jest.fn(),
    onCancelEdit: jest.fn(),
    onSaveEdit: jest.fn(),
    onAddChange: jest.fn(),
    onLayoutChange: jest.fn(),
    onBreakpointChange: jest.fn(),
    onResetEdit: jest.fn(),
    onWidgetUpdate: jest.fn(),
    onWidgetResize: jest.fn(),
    onWidgetDelete: jest.fn(),
    onTabChange: jest.fn(),
    onTabAdd: jest.fn(),
    onTabDelete: jest.fn(),
    onWidgetFullFocus: jest.fn(),
    onWidgetRestoreFocus: jest.fn(),
    setWidgets: jest.fn(),
    widgets: []
  }

  it('Renders', () => {
    const wrapper = mount(<DashboardRender {...initialMockProps} />)
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('Has proper HTML structure: loading', () => {
    const wrapper = mount(<DashboardRender {...initialMockProps} />)
    expect(wrapper.exists('div.c-dashboardrender__loading')).toBeTruthy()
    wrapper.unmount()
  })

  it('Has proper HTML structure: loaded', () => {
    const wrapper = mount(<DashboardRender {...initialMockProps} mounted />)
    expect(wrapper.exists('div.c-dashboard')).toBeTruthy()
    expect(wrapper.exists('DashboardControlPanel')).toBeTruthy()
    expect(wrapper.exists('DashboardGrid')).toBeTruthy()
    wrapper.unmount()
  })

  it('Has Add mode', () => {
    const wrapper = mount(<DashboardRender {...initialMockProps} />)
    expect(wrapper.exists('WidgetAddArea')).toBeFalsy()
    wrapper.setProps({ ...initialMockProps, mounted: true })
    expect(wrapper.exists('.c-dashboard__controlPanel-buttons')).toBeTruthy()
    expect(wrapper.exists('#c-dashboard__controlPanel-edit-icon-id')).toBeTruthy()
    wrapper.setProps({ ...initialMockProps, mounted: true, editMode: true })
    expect(wrapper.exists('#c-dashboard__controlPanel-add-button-id')).toBeTruthy()
    wrapper.setProps({ ...initialMockProps, mounted: true, addMode: true })
    expect(wrapper.exists('WidgetAddArea')).toBeTruthy()
    wrapper.unmount()
  })
})
