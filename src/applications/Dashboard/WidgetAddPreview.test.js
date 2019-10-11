import React from 'react'
import { WidgetAddPreview } from './WidgetAddPreview'
import labels from './Dashboard.labels'
jest.mock('react-dnd', () => {
  return {
    DragLayer: (name, opts, conn) => WrappedComponent => {
      return (props) => {
        return <WrappedComponent {...props} />
      }
    }
  }
})

document.getElementById = (el) => {
  return {
    offsetWidth: 0
  }
}

describe('applications/Dashboard/WidgetAddPreview', () => {
  let wrapper

  const initialMockProps = {
    currentBreakpoint: 'lg',
    currentOffset: { x: 0, y: 0 },
    initialOffset: {},
    isDragging: true,
    labels: labels,
    item: {
      widget: {
        layout: {
          lg: {
            defaultH: 1,
            defaultW: 1
          }
        }
      }
    }
  }

  beforeEach(() => {
    wrapper = mount(<WidgetAddPreview {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-d-widgetAddPreview')).toBeTruthy()
    expect(wrapper.exists('Widget')).toBeTruthy()
  })
})
