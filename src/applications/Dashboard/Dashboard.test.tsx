import mockLayouts from 'applications/Dashboard/config/DefaultLayouts'
import labels from 'applications/Dashboard/Dashboard.labels'
import DashboardRender from 'applications/Dashboard/DashboardRender'
import { Breakpoint, Layout } from 'applications/Dashboard/declarations/Dashboard'
import { mount, ReactWrapper } from 'enzyme'
import _ from 'lodash'
import React from 'react'
import { act } from 'react-dom/test-utils'
import mockConfig from './config/DefaultConfig'
import mockWidgets from './config/DefaultWidgets'
import Dashboard, { DashboardProps } from './Dashboard'

const defaultLocalStorage = window.localStorage

const localStorageMock = (() => {
  let store: {[k: string]: string} = {}
  return {
    getItem: (key: string) => {
      return store[key] || null
    },
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
    initializeStore: () => {
      store = {
        'test-widgets': JSON.stringify(mockWidgets),
        'test-layouts': JSON.stringify(mockLayouts),
        'test-config': JSON.stringify(mockConfig)
      }
    }
  }
})()

jest.mock('applications/Dashboard/DashboardRender', () => () => (<div />))

describe('applications/Dashboard/Dashboard', () => {
  let wrapper: ReactWrapper
  const initialMockProps: DashboardProps = {
    allowedWidgets: undefined,
    initialBreakpoint: 'lg' as Breakpoint,
    labels: labels,
    defaultTabIndex: 0,
    afterLayoutChange: jest.fn(),
    id: 'test'
  }

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: defaultLocalStorage
    })
  })

  beforeEach(async () => {
    window.localStorage.initializeStore()
    await act(async () => {
      wrapper = await mount(<Dashboard {...initialMockProps} />)
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Renders', () => {
    expect(wrapper.isEmptyRender()).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })

  it('onLayoutChange', () => {
    act(() => {
      wrapper.update()
    })

    act(() => {
      wrapper.find(DashboardRender).props().onLayoutChange([], {
        lg: [{
          i: 'i'
        } as Layout],
        md: [],
        sm: []
      })
    })
    act(() => {
      wrapper.update()
    })
    expect(wrapper.find(DashboardRender).props().layouts[0].body).toEqual({ lg: [{ i: 'i' }], md: [], sm: [] })
  })

  it('onBreakpointChange', () => {
    act(() => {
      wrapper.update()
    })
    act(() => {
      wrapper.find(DashboardRender).props().onBreakpointChange('sm')
    })
    act(() => {
      wrapper.update()
    })
    expect(wrapper.find(DashboardRender).props().currentBreakpoint).toEqual('sm')
  })

  it('onEditModeOn', () => {
    const props = () => wrapper.find(DashboardRender).props()
    act(() => {
      wrapper.update()
    })
    expect(props().editMode).toEqual(false)
    expect(props().addMode).toEqual(false)
    act(() => {
      props().onEditModeOn()
    })
    act(() => {
      wrapper.update()
    })
    expect(props().editMode).toEqual(true)
    expect(props().addMode).toEqual(false)
  })

  it('onCancelEdit', () => {
    const props = () => wrapper.find(DashboardRender).props()

    act(() => {
      wrapper.update()
    })
    expect(props().layouts).toEqual(mockLayouts)
    act(() => {
      props().onEditModeOn()
    })

    act(() => {
      wrapper.update()
    })
    expect(props().editMode).toEqual(true)
    act(() => {
      props().onLayoutChange([], { lg: [], md: [], sm: [] })
    })

    act(() => {
      wrapper.update()
    })
    expect(props().layouts).toEqual([{ label: 'default', body: { lg: [], md: [], sm: [] } }])
    act(() => {
      props().onCancelEdit()
    })

    act(() => {
      wrapper.update()
    })
    expect(props().editMode).toEqual(false)
    expect(props().layouts).toEqual(mockLayouts)
  })

  it('onSaveEdit', async () => {
    const props = () => wrapper.find(DashboardRender).props()

    act(() => {
      wrapper.update()
    })
    act(() => {
      props().onTabChange!(0)
    })
    act(() => {
      wrapper.update()
    })
    expect(props().layouts).toEqual(mockLayouts)
    expect(props().widgets).toEqual(mockWidgets)
    act(() => {
      props().onEditModeOn()
    })

    act(() => {
      wrapper.update()
    })
    expect(props().editMode).toEqual(true)

    const newLayouts = {
      lg: mockLayouts[0].body.lg.filter(l => l.i !== 'w-1-note'),
      md: mockLayouts[0].body.md.filter(l => l.i !== 'w-1-note'),
      sm: mockLayouts[0].body.sm.filter(l => l.i !== 'w-1-note')
    }
    const newWidgets = mockWidgets.filter(l => l.i !== 'w-1-note')
    act(() => {
      props().onLayoutChange([], newLayouts)
      props().onWidgetDelete({ i: 'w-1-note', x: 0, y: 0, w: 4, h: 5, minW: 4, maxW: 6, minH: 5, maxH: 999 })
    })

    act(() => {
      wrapper.update()
    })

    expect(props().layouts).toEqual([{ label: 'default', body: newLayouts }])
    expect(props().widgets).toEqual(newWidgets)
    await act(async () => {
      await props().onSaveEdit()
    })

    act(() => {
      wrapper.update()
    })
    const widgets: string | null = await window.localStorage.getItem('test-widgets')
    const layouts: string | null = await window.localStorage.getItem('test-layouts')

    expect(props().editMode).toEqual(false)
    expect(JSON.parse(layouts!)).toEqual([{ label: 'default', body: newLayouts }])
    expect(JSON.parse(widgets!)).toEqual(newWidgets)
  })

  it('onAddChange', () => {
    const props = () => wrapper.find(DashboardRender).props()
    act(() => {
      wrapper.update()
    })
    expect(props().addMode).toEqual(false)
    act(() => {
      props().onAddChange()
    })
    act(() => {
      wrapper.update()
    })
    expect(props().addMode).toEqual(true)
    act(() => {
      props().onAddChange()
    })
    act(() => {
      wrapper.update()
    })
    expect(props().addMode).toEqual(false)
  })

  it('onWidgetUpdate', async (done) => {
    act(() => {
      wrapper.update()
    })
    const props = () => wrapper.find(DashboardRender).props()
    const newWidgetUpdate = {
      i: 'w-1-note',
      type: 'horse',
      title: 'horse widget',
      visible: true,
      options: { legs: 4, mane: true }
    }
    const mockLayout = _.find(mockLayouts[0].body.lg, w => w.i === 'w-1-note')
    await act(async () => {
      await props().onWidgetUpdate!(newWidgetUpdate, mockLayout!)
    })
    act(() => {
      wrapper.update()
    })
    expect(_.find(props().widgets, w => w.i === 'w-1-note')).toMatchObject(newWidgetUpdate)
    done()
  })

  it('onWidgetResize', () => {
    act(() => {
      wrapper.update()
    })
    const props = () => wrapper.find(DashboardRender).props()
    act(() => {
      props().onBreakpointChange('lg')
    })
    act(() => {
      wrapper.update()
    })
    const newLayoutSize: Layout = ({ i: 'w-1-note', x: 99, y: 99, w: 99, h: 99, minW: 99, maxW: 99, minH: 99, maxH: 99 } as Layout)
    act(() => {
      props().onWidgetResize!(newLayoutSize)
    })
    act(() => {
      wrapper.update()
    })

    expect(_.find(props().layouts[0].body.lg, w => w.i === 'w-1-note')).toMatchObject(newLayoutSize)
  })

  it('onWidgetDelete', () => {
    act(() => {
      wrapper.update()
    })
    const props = () => wrapper.find(DashboardRender).props()
    expect(props().layouts[0].body.lg.map((w: Layout) => w.i)).toEqual(['w-1-note', 'w-2-smiley', 'w-3-cat'])

    act(() => {
      const widgetToDelete: Layout = ({ i: 'w-2-smiley', x: 0, y: 0, h: 0, w: 0, maxH: 0, maxW: 0, minH: 0, minW: 0 } as Layout)
      props().onWidgetDelete!(widgetToDelete)
    })
    act(() => {
      wrapper.update()
    })
    expect(props().layouts[0].body.lg.map((w: Layout) => w.i)).toEqual(['w-1-note', 'w-3-cat'])
  })
})
