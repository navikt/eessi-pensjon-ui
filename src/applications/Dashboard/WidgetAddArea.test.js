import React from 'react'
import WidgetAddArea from './WidgetAddArea'
import labels from './Dashboard.labels'

jest.mock('react-dnd', () => {
  return {
    DragSource: () => WrappedComponent => {
      return (props) => {
        return <WrappedComponent {...props} />
      }
    },
    DragLayer: () => WrappedComponent => {
      return (props) => {
        return <WrappedComponent {...props} />
      }
    }
  }
})

jest.mock('react-dnd-html5-backend', () => {
  return {
    getEmptyImage: () => { return undefined }
  }
})

jest.mock('./WidgetAdd', () => {
  return () => { return <div className='mock-widgetadd' /> }
})

describe('applications/Dashboard/WidgetAddArea', () => {
  let wrapper

  const initialMockProps = {
    availableWidgets: [{
      foo: 'mockAvailableWidget'
    }],
    currentBreakpoint: 'lg',
    currentTab: 'default',
    dragApi: {},
    labels: labels,
    onTabAdd: jest.fn(),
    onTabDelete: jest.fn(),
    setWidgets: jest.fn(),
    widgets: []
  }

  beforeEach(() => {
    wrapper = mount(<WidgetAddArea {...initialMockProps} />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-d-widgetAddArea')).toBeTruthy()
  })
})
