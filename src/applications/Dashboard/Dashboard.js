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
  allowedWidgets = undefined, defaultConfig, defaultWidgets, defaultLayout, defaultTab, extraWidgets,
  id, labels, afterLayoutChange
}) => {
  const [editMode, setEditMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [fullFocusMode, setFullFocusMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [widgets, setWidgets] = useState([])
  const [layouts, _setLayouts] = useState({})
  const [config, setConfig] = useState({})
  const [currentTab, setCurrentTab] = useState(defaultTab || config.defaultTab)
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
      Object.keys(newLayouts[currentTab]).forEach((breakpoint) => {
        newLayouts[currentTab][breakpoint] = newLayouts[currentTab][breakpoint].filter((widget) => {
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
    const index = _.findIndex(newLayout[currentTab][currentBreakpoint], { i: layout.i })
    newLayout[currentTab][currentBreakpoint][index] = layout
    setLayouts(newLayout)
  }

  const onWidgetDelete = (layout) => {
    setWidgets(_.reject(widgets, { i: layout.i }))
    const newLayout = _.cloneDeep(layouts)
    Object.keys(newLayout[currentTab]).forEach(breakpoint => {
      newLayout[currentTab][breakpoint] = _.reject(newLayout[currentTab][breakpoint], { i: layout.i })
    })
    setLayouts(newLayout)
  }

  const onLayoutChange = (layout, changedLayout) => {
    const newLayout = _.cloneDeep(layouts)
    newLayout[currentTab] = changedLayout
    setLayouts(newLayout)
  }

  const onTabChange = (newTab) => {
    setCurrentTab(newTab)
  }

  const onTabAdd = (newTab) => {
    if (newTab === 'new') {
      console.log('Can\'t name new tab \'new\'')
      return
    }
    const newLayout = _.cloneDeep(layouts)
    newLayout[newTab] = { lg: [], md: [], sm: [] }
    setCurrentTab(newTab)
    setLayouts(newLayout)
  }

  const onTabDelete = (newTab) => {
    const tabs = Object.keys(layouts)
    if (tabs.length <= 1) {
      console.log('wont delete, last dashboard tab')
      return
    }
    setCurrentTab(_.find(tabs, (value) => value !== newTab))
    setLayouts(_.omitBy(layouts, (value, key) => key === newTab))
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
      addMode={addMode} currentTab={currentTab} editMode={editMode} labels={_labels} onEditModeOn={onEditModeOn} onCancelEdit={onCancelEdit}
      onSaveEdit={onSaveEdit} onResetEdit={onResetEdit} onAddChange={onAddChange} mounted={mounted}
      layouts={layouts} onLayoutChange={onLayoutChange} onBreakpointChange={onBreakpointChange} currentBreakpoint={currentBreakpoint}
      widgets={widgets} availableWidgets={availableWidgets} setWidgets={setWidgets} onWidgetUpdate={onWidgetUpdate}
      onWidgetResize={onWidgetResize} onWidgetDelete={onWidgetDelete} onWidgetFullFocus={onWidgetFullFocus}
      onWidgetRestoreFocus={onWidgetRestoreFocus} onTabAdd={onTabAdd} onTabDelete={onTabDelete} onTabChange={onTabChange} MyWidgets={MyWidgets}
    />
  )
}

Dashboard.propTypes = {
  afterLayoutChange: PT.func,
  allowedWidgets: PT.array,
  defaultConfig: PT.object,
  defaultLayout: PT.object,
  defaultTab: PT.string,
  defaultWidgets: PT.array,
  extraWidgets: PT.object,
  id: PT.string.isRequired,
  labels: PT.object
}

Dashboard.defaultProps = DashboardConfig
export default Dashboard
