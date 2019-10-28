import React, { useState, useEffect } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import WaitingPanel from '../../components/WaitingPanel/WaitingPanel'
import DashboardConfig from './config/DashboardConfig'
import DashboardRender from './DashboardRender'
import defaultLabels from './Dashboard.labels'
import * as DashboardAPI from './DashboardAPI'
import * as Widgets from './widgets'

const Dashboard = ({
  allowedWidgets = undefined, defaultConfig, defaultWidgets, defaultLayout, defaultTabIndex, extraWidgets,
  id, labels, afterLayoutChange
}) => {
  const [editMode, setEditMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [fullFocusMode, setFullFocusMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [widgets, setWidgets] = useState([])
  const [layouts, _setLayouts] = useState([])
  const [config, setConfig] = useState({})
  const [currentTabIndex, setCurrentTabIndex] = useState(defaultTabIndex || 0)
  const [backupLayouts, setBackupLayouts] = useState({})
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [availableWidgets, setAvailableWidgets] = useState([])
  const _labels = { ...defaultLabels, labels }
  const MyWidgets = { ...extraWidgets, ...Widgets }

  const initDashboard = async () => {
    const _availableWidgets = DashboardAPI.loadAvailableWidgets(MyWidgets, allowedWidgets)
    setAvailableWidgets(_availableWidgets)
    const [_widgets, _layouts, _config] = await DashboardAPI.loadDashboard(id, defaultWidgets, defaultLayout, defaultConfig, allowedWidgets)
    setWidgets(_widgets)
    setLayouts(_layouts)
    setConfig(_config)
  }

  useEffect(() => {
    initDashboard()
    setMounted(true)
  }, [])

  const onWidgetFullFocus = (focusedWidget) => {
    if (!fullFocusMode) {
      setFullFocusMode(true)
      const newWidgets = widgets.map((widget) => ({
        ...widget,
        visible: focusedWidget.i === widget.i
      }))
      const newLayouts = _.cloneDeep(layouts)
      Object.keys(newLayouts[currentTabIndex].body).forEach((breakpoint) => {
        newLayouts[currentTabIndex].body[breakpoint] = newLayouts[currentTabIndex].body[breakpoint].filter((widget) => {
          const _widget = _.find(newWidgets, (w) => w.i === widget.i)
          return _widget.visible !== false
        })
      })
      setWidgets(newWidgets)
      setBackupLayouts(layouts)
      setLayouts(newLayouts)
    }
  }

  const setLayouts = (layouts) => {
    _setLayouts(layouts)
    if (_(afterLayoutChange).isFunction()) {
      afterLayoutChange(layouts)
    }
  }

  const onWidgetRestoreFocus = () => {
    if (fullFocusMode) {
      setFullFocusMode(false)
      setWidgets(widgets.map((widget) => ({
        ...widget,
        visible: true
      })))
      setLayouts(backupLayouts)
    }
  }

  const onWidgetUpdate = async (updatedWidget, layout) => {
    const newWidgets = widgets.map((widget) => {
      return (widget.i === layout.i) ? updatedWidget : widget
    })
    setWidgets(newWidgets)
    await DashboardAPI.saveWidgets(id, newWidgets)
  }

  const onWidgetResize = (layout) => {
    const newLayout = _.cloneDeep(layouts)
    const index = _.findIndex(newLayout[currentTabIndex].body[currentBreakpoint], { i: layout.i })
    newLayout[currentTabIndex].body[currentBreakpoint][index] = layout
    setLayouts(newLayout)
  }

  const onWidgetDelete = (layout) => {
    setWidgets(_.reject(widgets, { i: layout.i }))
    const newLayout = _.cloneDeep(layouts)
    Object.keys(newLayout[currentTabIndex].body).forEach(breakpoint => {
      newLayout[currentTabIndex].body[breakpoint] = _.reject(newLayout[currentTabIndex].body[breakpoint], { i: layout.i })
    })
    setLayouts(newLayout)
  }

  const onLayoutChange = (layout, changedLayout) => {
    const newLayout = _.cloneDeep(layouts)
    newLayout[currentTabIndex].body = changedLayout
    setLayouts(newLayout)
  }

  const onTabChange = (newTabIndex) => {
    setCurrentTabIndex(newTabIndex)
  }

  const onTabRename = (newTabIndex, newTabLabel) => {
    const newLayouts = _.cloneDeep(layouts)
    newLayouts[newTabIndex].label = newTabLabel
    setLayouts(newLayouts)
  }

  const onTabAdd = (newTabIndex, newTabLabel) => {
    if (newTabLabel === 'new') {
      console.log('Can\'t name new tab \'new\'')
      return
    }
    const newLayouts = _.cloneDeep(layouts)
    newLayouts.splice(newTabIndex, 0, {
      label: newTabLabel,
      body: { lg: [], md: [], sm: [] }
    })
    setCurrentTabIndex(newTabIndex)
    setLayouts(newLayouts)
  }

  const onTabDelete = (newTabIndex) => {
    if (layouts.length <= 1) {
      console.log('wont delete, last dashboard tab')
      return
    }
    const newLayouts = _.cloneDeep(layouts)
    newLayouts.splice(newTabIndex, 1)
    setCurrentTabIndex(0)
    setLayouts(newLayouts)
  }

  const onTabMove = (sourceIndex, howMuch) => {
    const targetIndex = sourceIndex + howMuch
    let newLayouts = _.cloneDeep(layouts)
    const targetLayout = newLayouts[targetIndex]
    const sourceLayout = newLayouts[sourceIndex]
    const currentTab = newLayouts[currentTabIndex]
    newLayouts = newLayouts.map((layout, index) => {
      if (index === targetIndex) {
        return sourceLayout
      }
      if (index === sourceIndex) {
        return targetLayout
      }
      return layouts[index]
    })
    const newCurrentTabIndex = _.findIndex(layouts, (layout) => layout.label === currentTab.label)
    setCurrentTabIndex(newCurrentTabIndex)
    setLayouts(newLayouts)
  }

  const onBreakpointChange = (breakpoint) => {
    setCurrentBreakpoint(breakpoint)
  }

  const onEditModeOn = () => {
    setEditMode(true)
    setAddMode(false)
    setBackupLayouts(layouts)
  }

  const onAddChange = () => {
    setAddMode(!addMode)
  }

  const onCancelEdit = () => {
    setEditMode(false)
    setAddMode(false)
    setLayouts(backupLayouts)
  }

  const onResetEdit = async () => {
    await DashboardAPI.resetDashboard(id, defaultWidgets, defaultLayout, defaultConfig)
    initDashboard()
    setAddMode(false)
    setEditMode(false)
  }

  const onSaveEdit = async () => {
    await DashboardAPI.saveDashboard(id, widgets, layouts, config)
    setAddMode(false)
    setEditMode(false)
  }
  if (!mounted) {
    return <WaitingPanel className='c-dashboard__loading' />
  }

  return (
    <DashboardRender
      addMode={addMode} currentTabIndex={currentTabIndex} editMode={editMode} labels={_labels} onEditModeOn={onEditModeOn} onCancelEdit={onCancelEdit}
      onSaveEdit={onSaveEdit} onResetEdit={onResetEdit} onAddChange={onAddChange} mounted={mounted}
      layouts={layouts} onLayoutChange={onLayoutChange} onBreakpointChange={onBreakpointChange} currentBreakpoint={currentBreakpoint}
      widgets={widgets} availableWidgets={availableWidgets} setWidgets={setWidgets} onWidgetUpdate={onWidgetUpdate}
      onWidgetResize={onWidgetResize} onWidgetDelete={onWidgetDelete} onWidgetFullFocus={onWidgetFullFocus}
      onWidgetRestoreFocus={onWidgetRestoreFocus} onTabAdd={onTabAdd} onTabDelete={onTabDelete} onTabChange={onTabChange}
      onTabRename={onTabRename} onTabMove={onTabMove} MyWidgets={MyWidgets}
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
  labels: PT.object
}

Dashboard.defaultProps = DashboardConfig
export default Dashboard
