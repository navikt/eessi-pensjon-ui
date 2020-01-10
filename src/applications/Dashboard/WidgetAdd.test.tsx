import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import { WidgetAdd, WidgetAddProps } from './WidgetAdd'

describe('applications/Dashboard/WidgetAdd', () => {
  let wrapper: ReactWrapper
  const initialMockProps: WidgetAddProps = {
    widgetTemplate: {
      title: 'mockTitle',
      description: 'mockDescription',
      type: 'foo',
      options: {},
      layout: {
        lg: { minW: 0, maxW: 0, defaultW: 0, minH: 0, defaultH: 0, maxH: 0 },
        md: { minW: 0, maxW: 0, defaultW: 0, minH: 0, defaultH: 0, maxH: 0 },
        sm: { minW: 0, maxW: 0, defaultW: 0, minH: 0, defaultH: 0, maxH: 0 }
      }
    },
    myWidgets: {
      mockWidget: {
        properties: {
          title: 'mockTitle',
          description: 'mockDescription',
          type: 'foo',
          options: {},
          layout: {
            lg: { minW: 0, maxW: 0, defaultW: 0, minH: 0, defaultH: 0, maxH: 0 },
            md: { minW: 0, maxW: 0, defaultW: 0, minH: 0, defaultH: 0, maxH: 0 },
            sm: { minW: 0, maxW: 0, defaultW: 0, minH: 0, defaultH: 0, maxH: 0 }
          }
        }
      }
    },
    onPlaceholderWidgetAdd: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<WidgetAdd {...initialMockProps} />)
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('Has proper HTML structure', () => {
    expect(wrapper.exists('.c-d-widgetAdd')).toBeTruthy()
    expect(wrapper.find('.c-d-widgetAdd__title').render().text()).toEqual('mockTitle')
    expect(wrapper.find('.c-d-widgetAdd__description').render().text()).toEqual('mockDescription')
  })
})
