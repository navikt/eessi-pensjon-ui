/* global localStorage */

import defaultWidgets from './config/DefaultWidgets'
import defaultLayouts from './config/DefaultLayout'
import defaultConfig from './config/DefaultConfig'
import DashboardConfig from './config/DashboardConfig'
import _ from 'lodash'

let hasLocalStorage
try {
  hasLocalStorage = localStorage || window.localStorage
  hasLocalStorage = true
} catch (e) {
  hasLocalStorage = false
  console.error('Can\'t access localStorage')
}

const dashboardNeedsUpgrade = (instanceVersion, dashboardVersion) => {
  return dashboardVersion > instanceVersion
}

export const loadDashboard = async (id, customDefaultWidgets, customDefaultLayout, customDefaultConfig, allowedWidgets) => {
  let layouts, widgets, config
  if (hasLocalStorage) {
    config = await localStorage.getItem(id + '-config')
  }
  config = config ? JSON.parse(config) : customDefaultConfig
  if (!config) {
    config = defaultConfig
  }
  if (dashboardNeedsUpgrade(config.version, DashboardConfig.version)) {
    layouts = customDefaultLayout || defaultLayouts
    widgets = customDefaultWidgets || defaultWidgets
  } else {
    if (hasLocalStorage) {
      layouts = await localStorage.getItem(id + '-layouts')
    }
    layouts = layouts ? JSON.parse(layouts) : customDefaultLayout
    if (!layouts) {
      layouts = defaultLayouts
    }
    if (hasLocalStorage) {
      widgets = await localStorage.getItem(id + '-widgets')
    }
    widgets = widgets ? JSON.parse(widgets) : customDefaultWidgets
    if (!widgets) {
      widgets = defaultWidgets
    }
  }

  // modernizing old layouts
  if (!_.isArray(layouts)) {
    if (!Object.prototype.hasOwnProperty.call(layouts, 'default') && Object.prototype.hasOwnProperty.call(layouts, 'lg')) {
      layouts = [{
        label: 'default',
        body: {
          lg: layouts.lg,
          md: layouts.md,
          sm: layouts.sm
        }
      }]
    } else {
      layouts = Object.keys(layouts).map(key => ({
        label: key,
        body: layouts[key]
      }))
    }
  }

  widgets = allowedWidgets ? widgets.filter((w) => {
    return _.includes(allowedWidgets, w.type)
  }) : widgets
  const widgetIds = widgets.map(w => w.i)
  if (!_.isEmpty(widgetIds)) {
    layouts.forEach((tab, index) => {
      Object.keys(layouts[index].body).forEach((breakpoint) => {
        layouts[index].body[breakpoint] = layouts[index].body[breakpoint].filter((w) => {
          return _.includes(widgetIds, w.i)
        })
      })
    })
  }
  return [widgets, layouts, config]
}

export const saveDashboard = async (id, widgets, layouts, config) => {
  if (!hasLocalStorage) {
    return
  }
  await localStorage.setItem(id + '-config', JSON.stringify(config))
  await localStorage.setItem(id + '-widgets', JSON.stringify(widgets))
  await localStorage.setItem(id + '-layouts', JSON.stringify(layouts))
}

export const saveWidgets = async (id, widgets) => {
  if (!hasLocalStorage) {
    return
  }
  await localStorage.setItem(id + '-widgets', JSON.stringify(widgets))
}

export const resetDashboard = async (id, customDefaultWidgets, customDefaultLayout, customDefaultConfig) => {
  if (!hasLocalStorage) {
    return
  }
  await localStorage.setItem(id + '-config', JSON.stringify(customDefaultConfig || defaultConfig))
  await localStorage.setItem(id + '-widgets', JSON.stringify(customDefaultWidgets || defaultWidgets))
  await localStorage.setItem(id + '-layouts', JSON.stringify(customDefaultLayout || defaultLayouts))
}

export const loadAvailableWidgets = (widgets, allowedWidgets) => {
  if (!allowedWidgets) {
    return _.values(widgets).map(widget => widget.properties)
  }
  return _.values(widgets)
    .filter(widget => {
      return _.includes(allowedWidgets, widget.properties.type)
    })
    .map(widget => widget.properties)
}
