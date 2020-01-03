import defaultLabels from 'applications/Dashboard/Dashboard.labels'
import DashboardRender from 'applications/Dashboard/DashboardRender'
import * as DashboardDefaultWidgets from 'applications/Dashboard/widgets'
import WaitingPanel from 'components/WaitingPanel/WaitingPanel'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import DashboardConfig from './config/DashboardConfig'
import * as DashboardAPI from './DashboardAPI'
import {
  Breakpoint,
  Config,
  DroppedItem,
  DroppingItem,
  Labels,
  Layout, LayoutBody,
  Layouts,
  LayoutTab,
  LayoutTabs,
  Widget,
  WidgetMap, WidgetPlaceholder,
  Widgets,
  WidgetTemplates
} from './declarations/Dashboard'

export interface DashboardProps {
  allowedWidgets: Array<string> | undefined;
  defaultConfig?: Config;
  defaultWidgets?: Widgets;
  defaultLayouts?: LayoutTabs;
  defaultTabIndex: number;
  extraWidgets ?: WidgetMap;
  id: string;
  initialBreakpoint: Breakpoint;
  labels: Labels;
  afterLayoutChange ?: Function;
}

const Dashboard = ({
  afterLayoutChange, allowedWidgets = undefined, defaultConfig, defaultLayouts, defaultTabIndex, defaultWidgets,
  extraWidgets, id, initialBreakpoint = 'lg', labels
}: DashboardProps): JSX.Element => {
  const [addMode, setAddMode] = useState<boolean>(false)
  const [availableWidgets, setAvailableWidgets] = useState<WidgetTemplates>([])
  const [backupLayouts, setBackupLayouts] = useState<LayoutTabs>([])
  const [config, setConfig] = useState<Config>({} as Config)
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(initialBreakpoint)
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(defaultTabIndex || 0)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [fullFocusMode, setFullFocusMode] = useState<boolean>(false)
  const [layouts, _setLayouts] = useState<LayoutTabs>([])
  const [mounted, setMounted] = useState<boolean>(false)
  const [widgets, setWidgets] = useState<Widgets>([])
  const _labels: Labels = { ...defaultLabels, ...labels }
  const [droppingItem, setDroppingItem] = useState<DroppingItem>({ i: '', w: 0, h: 0 })
  const myWidgets: WidgetMap = { ...extraWidgets, ...(DashboardDefaultWidgets as WidgetMap) }
  const droppingItemId: string = '__dropping-elem__'

  const initDashboard = useCallback(async () => {
    const _availableWidgets: WidgetTemplates = DashboardAPI.loadAvailableWidgets(myWidgets, allowedWidgets)
    setAvailableWidgets(_availableWidgets)
    const [_widgets, _layouts, _config]: [Widgets, LayoutTabs, Config] =
      await DashboardAPI.loadDashboard(id, defaultWidgets, defaultLayouts, defaultConfig, allowedWidgets)
    setWidgets(_widgets)
    _setLayouts(_layouts)
    setConfig(_config)
  }, [allowedWidgets, defaultConfig, defaultLayouts, defaultWidgets, id, myWidgets, _setLayouts])

  useEffect(() => {
    if (!mounted) {
      initDashboard()
      setMounted(true)
    }
  }, [initDashboard, mounted])

  const onWidgetFullFocus = (focusedWidget: Widget): void => {
    if (!fullFocusMode) {
      setFullFocusMode(true)
      const newWidgets: Widgets = widgets.map((widget: Widget) => ({
        ...widget,
        visible: focusedWidget.i === widget.i
      }))
      const newLayouts: LayoutTabs = _.cloneDeep(layouts)
      Object.keys(newLayouts[currentTabIndex].body).forEach(breakpoint => {
        newLayouts[currentTabIndex].body[breakpoint as Breakpoint] = newLayouts[currentTabIndex].body[breakpoint as Breakpoint].filter((layout: Layout) => {
          const widget: Widget = _.find(newWidgets, (w) => w.i === layout.i)!
          return widget.visible
        })
      })
      setWidgets(newWidgets)
      setBackupLayouts(layouts)
      setLayouts(newLayouts)
    }
  }

  const setLayouts = (layouts: LayoutTabs): void => {
    _setLayouts(layouts)
    if (_.isFunction(afterLayoutChange)) {
      afterLayoutChange(layouts)
    }
  }

  const onWidgetRestoreFocus = (): void => {
    if (fullFocusMode) {
      setFullFocusMode(false)
      setWidgets(widgets.map((widget: Widget) => ({
        ...widget,
        visible: true
      })))
      setLayouts(backupLayouts)
    }
  }

  const onWidgetUpdate = async (updatedWidget: Widget, layout: Layout): Promise<any> => {
    const newWidgets: Widgets = widgets.map((widget) => {
      return (widget.i === layout.i) ? updatedWidget : widget
    })
    setWidgets(newWidgets)
    await DashboardAPI.saveWidgets(id, newWidgets)
  }

  const onWidgetAdd = async (newWidget: Widget): Promise<any> => {
    const newWidgets: Widgets = widgets.concat(newWidget)
    setWidgets(newWidgets)
  }

  const onPlaceholderWidgetAdd = async (placeholderWidget: WidgetPlaceholder): Promise<any> => {
    placeholderWidget.i = droppingItemId
    setDroppingItem({
      i: droppingItemId,
      w: placeholderWidget.defaultLayout[currentBreakpoint].defaultW,
      h: placeholderWidget.defaultLayout[currentBreakpoint].defaultH
    } as DroppingItem)
    onWidgetAdd(placeholderWidget)
  }

  const onWidgetResize = (layout: Layout): void => {
    const newLayout: LayoutTabs = _.cloneDeep(layouts)
    const index: number = _.findIndex(newLayout[currentTabIndex].body[currentBreakpoint], { i: layout.i })
    newLayout[currentTabIndex].body[currentBreakpoint][index] = layout
    setLayouts(newLayout)
  }

  const onWidgetDelete = (layout: Layout): void => {
    setWidgets(_.reject(widgets, { i: layout.i }))
    const newLayout: LayoutTabs = _.cloneDeep(layouts)
    Object.keys(newLayout[currentTabIndex].body).forEach(breakpoint => {
      newLayout[currentTabIndex].body[breakpoint as Breakpoint] = _.reject(newLayout[currentTabIndex].body[breakpoint as Breakpoint], { i: layout.i })
    })
    setLayouts(newLayout)
  }

  const onWidgetDrop = async (elem: DroppedItem): Promise<any> => {
    const newLayout: LayoutTabs = _.cloneDeep(layouts)
    const newWidget: WidgetPlaceholder = (_.find(widgets, { i: droppingItemId }) as WidgetPlaceholder)
    if (newWidget) {
      newWidget.i = 'w-' + new Date().getTime()
      // replace placeholder with new widget
      const newWidgets = widgets.map((widget) => {
        return widget.i === droppingItemId ? {
          i: newWidget.i,
          type: newWidget.type,
          title: newWidget.title,
          visible: newWidget.visible,
          options: newWidget.options
        } : widget
      })
      // replace placeholder in layout with new widget layout, fill out non-active breakpoints
      Object.keys(newLayout[currentTabIndex].body).forEach(breakpoint => {
        const placeholderLayout = _.find(newLayout[currentTabIndex].body[breakpoint as Breakpoint], { i: droppingItemId })
        if (placeholderLayout) {
          newLayout[currentTabIndex].body[breakpoint as Breakpoint] = newLayout[currentTabIndex].body[breakpoint as Breakpoint].map(layout => {
            return layout.i === droppingItemId ? {
              ...layout,
              i: newWidget.i
            } : layout
          })
        } else {
          newLayout[currentTabIndex].body[breakpoint as Breakpoint].push({
            i: newWidget.i,
            x: 0,
            y: 0,
            w: elem.w <= newWidget.defaultLayout[breakpoint as Breakpoint].maxW ? elem.w : newWidget.defaultLayout[breakpoint as Breakpoint].defaultW,
            h: elem.h <= newWidget.defaultLayout[breakpoint as Breakpoint].maxH ? elem.h : newWidget.defaultLayout[breakpoint as Breakpoint].defaultH,
            minW: newWidget.defaultLayout[breakpoint as Breakpoint].minW,
            minH: newWidget.defaultLayout[breakpoint as Breakpoint].minH,
            maxW: newWidget.defaultLayout[breakpoint as Breakpoint].maxW,
            maxH: newWidget.defaultLayout[breakpoint as Breakpoint].maxH
          })
        }
      })
      setWidgets(newWidgets)
      setLayouts(newLayout)
    }
  }

  const onLayoutChange = (changedLayout: Layouts, _layouts: LayoutBody): void => {
    const newLayout: LayoutTabs = _.cloneDeep(layouts)
    newLayout[currentTabIndex].body = _layouts
    setLayouts(newLayout)
  }

  const onTabChange = (newTabIndex: number): void => {
    setCurrentTabIndex(newTabIndex)
  }

  const onTabRename = (newTabIndex: number, newTabLabel: string): void => {
    const newLayout: LayoutTabs = _.cloneDeep(layouts)
    newLayout[newTabIndex].label = newTabLabel
    setLayouts(newLayout)
  }

  const onTabAdd = (newTabIndex: number, newTabLabel: string): void => {
    if (newTabLabel === 'new') {
      console.log('Can\'t name new tab \'new\'')
      return
    }
    const newLayout: LayoutTabs = _.cloneDeep(layouts)
    newLayout.splice(newTabIndex, 0, {
      label: newTabLabel,
      body: { lg: [], md: [], sm: [] }
    })
    setCurrentTabIndex(newTabIndex)
    setLayouts(newLayout)
  }

  const onTabDelete = (newTabIndex: number): void => {
    if (layouts.length <= 1) {
      console.log('wont delete, last dashboard tab')
      return
    }
    const newLayout: LayoutTabs = _.cloneDeep(layouts)
    newLayout.splice(newTabIndex, 1)
    setCurrentTabIndex(0)
    setLayouts(newLayout)
  }

  const onTabMove = (sourceIndex: number, howMuch: number): void => {
    const targetIndex: number = sourceIndex + howMuch
    let newLayout: LayoutTabs = _.cloneDeep(layouts)
    const targetLayout: LayoutTab = newLayout[targetIndex]
    const sourceLayout: LayoutTab = newLayout[sourceIndex]
    const currentTab: LayoutTab = newLayout[currentTabIndex]
    newLayout = newLayout.map((layout, index) => {
      if (index === targetIndex) {
        return sourceLayout
      }
      if (index === sourceIndex) {
        return targetLayout
      }
      return layouts[index]
    })
    const newCurrentTabIndex: number = _.findIndex(layouts, (layout) => layout.label === currentTab.label)
    setCurrentTabIndex(newCurrentTabIndex)
    setLayouts(newLayout)
  }

  const onBreakpointChange = (breakpoint: Breakpoint): void => {
    setCurrentBreakpoint(breakpoint)
  }

  const onEditModeOn = (): void => {
    setEditMode(true)
    setAddMode(false)
    setBackupLayouts(layouts)
  }

  const onAddChange = (): void => {
    setAddMode(!addMode)
  }

  const onCancelEdit = (): void => {
    setEditMode(false)
    setAddMode(false)
    setLayouts(backupLayouts)
  }

  const onResetEdit = async (): Promise<any> => {
    await DashboardAPI.resetDashboard(id, defaultWidgets, defaultLayouts, defaultConfig)
    initDashboard()
    setAddMode(false)
    setEditMode(false)
  }

  const onSaveEdit = async (): Promise<any> => {
    await DashboardAPI.saveDashboard(id, widgets, layouts, config)
    setAddMode(false)
    setEditMode(false)
  }

  if (!mounted) {
    return <WaitingPanel className='c-dashboard__loading' style={{ paddingTop: '3rem' }} message={_labels.loading} />
  }

  return (
    <DashboardRender
      addMode={addMode} availableWidgets={availableWidgets} currentBreakpoint={currentBreakpoint} droppingItem={droppingItem}
      currentTabIndex={currentTabIndex} editMode={editMode} labels={_labels} layouts={layouts}
      myWidgets={myWidgets} onEditModeOn={onEditModeOn} onCancelEdit={onCancelEdit} onSaveEdit={onSaveEdit}
      onPlaceholderWidgetAdd={onPlaceholderWidgetAdd} onResetEdit={onResetEdit}
      onAddChange={onAddChange} onLayoutChange={onLayoutChange} onBreakpointChange={onBreakpointChange}
      onWidgetUpdate={onWidgetUpdate} onWidgetResize={onWidgetResize}
      onWidgetDelete={onWidgetDelete} onWidgetFullFocus={onWidgetFullFocus} onWidgetDrop={onWidgetDrop}
      onWidgetRestoreFocus={onWidgetRestoreFocus} onTabAdd={onTabAdd} onTabDelete={onTabDelete}
      onTabChange={onTabChange} onTabRename={onTabRename} onTabMove={onTabMove} widgets={widgets}
    />
  )
}

Dashboard.propTypes = {
  afterLayoutChange: PT.func,
  allowedWidgets: PT.array,
  defaultConfig: PT.object,
  defaultLayout: PT.array,
  defaultTabIndex: PT.number,
  defaultWidgets: PT.array,
  extraWidgets: PT.object,
  id: PT.string.isRequired,
  initialBreakpoint: PT.string,
  labels: PT.object
}

Dashboard.defaultProps = DashboardConfig
export default Dashboard
