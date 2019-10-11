import React, { useState, useEffect } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import DashboardConfig from './config/DashboardConfig'
import DashboardRender from './DashboardRender'
import defaultLabels from './Dashboard.labels'
import * as DashboardAPI from './DashboardAPI'
import * as Widgets from './widgets'

const Dashboard = ({ id, defaultConfig, defaultWidgets, defaultLayout, labels, extraWidgets }) => {
  const [editMode, setEditMode] = useState(false)
  const [addMode, setAddMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [widgets, setWidgets] = useState([])
  const [layouts, setLayouts] = useState({})
  const [config, setConfig] = useState({})
  const [backupLayouts, setBackupLayouts] = useState({})
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')
  const [availableWidgets, setAvailableWidgets] = useState([])
  const _labels = { ...defaultLabels, labels }
  const MyWidgets = { ...extraWidgets, ...Widgets }

  const initDashboard = async () => {
    const _availableWidgets = DashboardAPI.loadAvailableWidgets(id, MyWidgets)
    setAvailableWidgets(_availableWidgets)
    const [_widgets, _layouts, _config] = await DashboardAPI.loadDashboard(id, defaultWidgets, defaultLayout, defaultConfig)
    setWidgets(_widgets)
    setLayouts(_layouts)
    setConfig(_config)
  }

  useEffect(() => {
    initDashboard()
    setMounted(true)
  }, [])

  const onWidgetUpdate = async (updatedWidget, layout) => {
    const newWidgets = widgets.map((widget) => {
      return (widget.i === layout.i) ? updatedWidget : widget
    })
    setWidgets(newWidgets)
    await DashboardAPI.saveWidgets(id, newWidgets)
  }

  const onWidgetResize = layout => {
    const newLayout = _.cloneDeep(layouts)
    const index = _.findIndex(newLayout[currentBreakpoint], { i: layout.i })
    newLayout[currentBreakpoint][index] = layout
    setLayouts(newLayout)
  }

  const onWidgetDelete = layout => {
    setWidgets(_.reject(widgets, { i: layout.i }))
    const newLayout = _.cloneDeep(layouts)
    Object.keys(newLayout).forEach(breakpoint => {
      newLayout[breakpoint] = _.reject(newLayout[breakpoint], { i: layout.i })
    })
    setLayouts(newLayout)
  }

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts)
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

  return (
    <DashboardRender
      addMode={addMode} editMode={editMode} labels={_labels} onEditModeOn={onEditModeOn} onCancelEdit={onCancelEdit}
      onSaveEdit={onSaveEdit} onResetEdit={onResetEdit} onAddChange={onAddChange} mounted={mounted}
      layouts={layouts} onLayoutChange={onLayoutChange} onBreakpointChange={onBreakpointChange} currentBreakpoint={currentBreakpoint}
      widgets={widgets} availableWidgets={availableWidgets} setWidgets={setWidgets} onWidgetUpdate={onWidgetUpdate}
      onWidgetResize={onWidgetResize} onWidgetDelete={onWidgetDelete} MyWidgets={MyWidgets}
    />
  )
}

Dashboard.propTypes = {
  id: PT.string.isRequired,
  labels: PT.object,
  extraWidgets: PT.object
}

Dashboard.defaultProps = DashboardConfig
export default Dashboard
