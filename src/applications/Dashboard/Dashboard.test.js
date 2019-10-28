import React from 'react'
import Dashboard from './Dashboard'
import DashboardRender from './DashboardRender'
import labels from './Dashboard.labels'
import _ from 'lodash'
import mockLayouts from './config/DefaultLayout'
import mockWidgets from './config/DefaultWidgets'
import mockConfig from './config/DefaultConfig'
const defaultLocalStorage = window.localStorage

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => {
      return store[key] || null
    },
    setItem: (key, value) => {
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

jest.mock('applications/Dashboard/DashboardRender', () => {
  return () => { return <div /> }
})

describe('applications/Dashboard/Dashboard', () => {
  let wrapper
  const initialMockProps = {
    labels: labels,
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

  it('Mounts', () => {
    expect(wrapper.exists(DashboardRender)).toBeFalsy()
    act(() => {
      wrapper.update()
    })
    expect(wrapper.find(DashboardRender).props().mounted).toBeTruthy()
  })

  it('onLayoutChange', () => {
    act(() => {
      wrapper.update()
    })
    const props = () => wrapper.find(DashboardRender).props()
    act(() => {
      props().onLayoutChange(null, 'mockLayoutValue')
    })
    act(() => {
      wrapper.update()
    })
    expect(props().layouts).toEqual([{ label: 'default', body: 'mockLayoutValue' }])
  })

  it('onBreakpointChange', () => {
    act(() => {
      wrapper.update()
    })
    const props = () => wrapper.find(DashboardRender).props()
    act(() => {
      props().onBreakpointChange('mockBreakpointValue')
    })
    act(() => {
      wrapper.update()
    })
    expect(props().currentBreakpoint).toEqual('mockBreakpointValue')
  })

  it('setWidgets', () => {
    const props = () => wrapper.find(DashboardRender).props()
    act(() => {
      wrapper.update()
    })
    expect(props().widgets).toEqual(mockWidgets)
    act(() => {
      props().setWidgets('MockValue')
    })
    act(() => {
      wrapper.update()
    })
    expect(props().widgets).toEqual('MockValue')
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
      props().onLayoutChange(null, { lg: [] })
    })

    act(() => {
      wrapper.update()
    })
    expect(props().layouts).toEqual([{ label: 'default', body: { lg: [] } }])
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
      props().onTabChange(0)
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
    act(() => {
      props().onLayoutChange(null, { lg: [] })
    })
    act(() => {
      props().setWidgets([])
    })

    act(() => {
      wrapper.update()
    })

    expect(props().layouts).toEqual([{ label: 'default', body: { lg: [] } }])
    expect(props().widgets).toEqual([])
    await act(async () => {
      await props().onSaveEdit()
    })

    act(() => {
      wrapper.update()
    })
    const widgets = await window.localStorage.getItem('test-widgets')
    const layouts = await window.localStorage.getItem('test-layouts')

    expect(props().editMode).toEqual(false)
    expect(JSON.parse(layouts)).toEqual([{ label: 'default', body: { lg: [] } }])
    expect(JSON.parse(widgets)).toEqual([])
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
      options: { legs: 4, mane: true }
    }
    const mockLayout = _.find(mockLayouts[0].body.lg, w => w.i === 'w-1-note')
    await act(async () => {
      await props().onWidgetUpdate(newWidgetUpdate, mockLayout)
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
    const newLayoutSize = { i: 'w-1-note', x: 99, y: 99, w: 99, h: 99, minW: 99, maxW: 99, minH: 99, maxH: 99 }
    act(() => {
      props().onWidgetResize(newLayoutSize)
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
    expect(props().layouts[0].body.lg.map(w => w.i)).toEqual(['w-1-note', 'w-2-smiley', 'w-3-cat'])

    act(() => {
      props().onWidgetDelete({ i: 'w-2-smiley' })
    })
    act(() => {
      wrapper.update()
    })
    expect(props().layouts[0].body.lg.map(w => w.i)).toEqual(['w-1-note', 'w-3-cat'])
  })
})
