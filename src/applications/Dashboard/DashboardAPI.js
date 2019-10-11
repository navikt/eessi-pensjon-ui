/* global localStorage */

import defaultWidgets from './config/DefaultWidgets'
import defaultLayouts from './config/DefaultLayout'
import defaultConfig from './config/DefaultConfig'
import DashboardConfig from './config/DashboardConfig'
import _ from 'lodash'

const dashboardNeedsUpgrade = (instanceVersion, dashboardVersion) => {
  return dashboardVersion > instanceVersion
}

export const loadDashboard = async (id, customDefaultWidgets, customDefaultLayout, customDefaultConfig) => {
  let layouts, widgets
  let config = await localStorage.getItem(id + '-config')
  config = config ? JSON.parse(config) : customDefaultConfig
  if (!config) {
    config = defaultConfig
  }
  if (dashboardNeedsUpgrade(config.version, DashboardConfig.version)) {
    layouts = customDefaultLayout || defaultLayouts
    widgets = customDefaultWidgets || defaultWidgets
  } else {
    layouts = await localStorage.getItem(id + '-layouts')
    layouts = layouts ? JSON.parse(layouts) : customDefaultLayout
    if (!layouts) {
      layouts = defaultLayouts
    }
    widgets = await localStorage.getItem(id + '-widgets')
    widgets = widgets ? JSON.parse(widgets) : customDefaultWidgets
    if (!widgets) {
      widgets = defaultWidgets
    }
  }
  return [widgets, layouts, config]
}

export const saveDashboard = async (id, widgets, layouts, config) => {
  await localStorage.setItem(id + '-config', JSON.stringify(config))
  await localStorage.setItem(id + '-widgets', JSON.stringify(widgets))
  await localStorage.setItem(id + '-layouts', JSON.stringify(layouts))
}

export const saveWidgets = async (id, widgets) => {
  await localStorage.setItem(id + '-widgets', JSON.stringify(widgets))
}

export const resetDashboard = async (id, customDefaultWidgets, customDefaultLayout, customDefaultConfig) => {
  await localStorage.setItem(id + '-config', JSON.stringify(customDefaultConfig || defaultConfig))
  await localStorage.setItem(id + '-widgets', JSON.stringify(customDefaultWidgets || defaultWidgets))
  await localStorage.setItem(id + '-layouts', JSON.stringify(customDefaultLayout || defaultLayouts))
}

export const loadAvailableWidgets = (widgets) => {
  return _.values(widgets).map(widget => widget.properties)
}
