/* global localStorage */

import defaultWidgets from './config/DefaultWidgets'
import defaultLayouts from './config/DefaultLayout'
import defaultConfig from './config/DefaultConfig'
import DashboardConfig from './config/DashboardConfig'
import _ from 'lodash'

const dashboardNeedsUpgrade = (instanceVersion, dashboardVersion) => {
  return dashboardVersion > instanceVersion
}

export const loadDashboard = async (customDefaultWidgets, customDefaultLayout, customDefaultConfig) => {
  let layouts , widgets
  let config = await localStorage.getItem('c-d-config')
  config = config ? JSON.parse(config) : customDefaultConfig
  if (!config) {
    config = defaultConfig
  }

  if (dashboardNeedsUpgrade(config.version, DashboardConfig.version)) {
    layouts = customDefaultLayout || defaultLayouts
    widgets = customDefaultWidgets || defaultWidgets
  } else {
    layouts = await localStorage.getItem('c-d-layouts')
    layouts = layouts ? JSON.parse(layouts) : customDefaultLayout
    if (!layouts) {
      layouts = defaultLayouts
    }
    widgets = await localStorage.getItem('c-d-widgets')
    widgets = widgets ? JSON.parse(widgets) : customDefaultWidgets
    if (!widgets) {
      widgets = defaultWidgets
    }
  }
  return [widgets, layouts, config]
}

export const saveDashboard = async (widgets, layouts, config) => {
  await localStorage.setItem('c-d-config', JSON.stringify(config))
  await localStorage.setItem('c-d-widgets', JSON.stringify(widgets))
  await localStorage.setItem('c-d-layouts', JSON.stringify(layouts))
}

export const saveWidgets = async (widgets) => {
  await localStorage.setItem('c-d-widgets', JSON.stringify(widgets))
}

export const resetDashboard = async () => {
  await localStorage.setItem('c-d-config', JSON.stringify(defaultConfig))
  await localStorage.setItem('c-d-widgets', JSON.stringify(defaultWidgets))
  await localStorage.setItem('c-d-layouts', JSON.stringify(defaultLayouts))
}

export const loadAvailableWidgets = (widgets) => {
  return _.values(widgets).map(widget => widget.properties)
}
