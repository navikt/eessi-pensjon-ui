/* global window,localStorage */

import defaultLayouts from 'applications/Dashboard/config/DefaultLayouts'
import {
  Breakpoint,
  Config,
  Layout,
  LayoutTabs,
  WidgetMap,
  Widgets,
  WidgetTemplate
} from 'declarations/Dashboard.d'
import _ from 'lodash'
import DashboardConfig from './config/DashboardConfig'
import defaultConfig from './config/DefaultConfig'
import defaultWidgets from './config/DefaultWidgets'

let hasLocalStorage: boolean = false
try {
  hasLocalStorage = !!(localStorage || window.localStorage)
  hasLocalStorage = true
} catch (e) {}

if (process && process.env && process.env.NODE_ENV === 'production' && !hasLocalStorage) {
  console.warn('Browser has no access to local storage')
}

const dashboardNeedsUpgrade = (instanceVersion: number, dashboardVersion: number): boolean => {
  return dashboardVersion > instanceVersion
}

export const loadDashboard = async (
  id: string,
  customDefaultWidgets?: Widgets,
  customDefaultLayouts?: LayoutTabs,
  customDefaultConfig?: Config,
  allowedWidgets?: Array<string> | undefined
): Promise<[Widgets, LayoutTabs, Config]> => {
  let layouts: LayoutTabs
  let widgets: Widgets
  let config: Config
  let layoutString: string | null = null
  let widgetString: string | null = null
  let configString: string | null = null

  if (hasLocalStorage) {
    configString = await localStorage.getItem(id + '-config')
  }
  config = configString ? JSON.parse(configString) : customDefaultConfig
  if (!config) {
    config = defaultConfig as Config
  }
  if (dashboardNeedsUpgrade(config.version, DashboardConfig.version)) {
    layouts = customDefaultLayouts || defaultLayouts as LayoutTabs
    widgets = customDefaultWidgets || defaultWidgets
  } else {
    if (hasLocalStorage) {
      layoutString = await localStorage.getItem(id + '-layouts')
    }
    layouts = layoutString ? JSON.parse(layoutString) : customDefaultLayouts
    if (!layouts) {
      layouts = defaultLayouts
    }
    if (hasLocalStorage) {
      widgetString = await localStorage.getItem(id + '-widgets')
    }
    widgets = widgetString ? JSON.parse(widgetString) : customDefaultWidgets
    if (!widgets) {
      widgets = defaultWidgets
    }
  }

  widgets = allowedWidgets ? widgets.filter((w) => {
    return _.includes(allowedWidgets, w.type)
  }) : widgets

  const widgetIds: Array<string> = widgets.map(w => w.i)

  if (!_.isEmpty(widgetIds)) {
    layouts.forEach((tab, index: number) => {
      Object.keys(layouts[index].body).forEach((breakpoint) => {
        layouts[index].body[breakpoint as Breakpoint] = layouts[index].body[breakpoint as Breakpoint].filter((w: Layout) => {
          return _.includes(widgetIds, w.i)
        })
      })
    })
  }
  return [widgets, layouts, config]
}

export const saveDashboard = async (id: string, widgets: Widgets, layouts: LayoutTabs, config: Config): Promise<any> => {
  if (!hasLocalStorage) {
    return
  }
  await localStorage.setItem(id + '-config', JSON.stringify(config))
  await localStorage.setItem(id + '-widgets', JSON.stringify(widgets))
  await localStorage.setItem(id + '-layouts', JSON.stringify(layouts))
}

export const saveWidgets = async (id: string, widgets: Widgets): Promise<any> => {
  if (!hasLocalStorage) {
    return
  }
  await localStorage.setItem(id + '-widgets', JSON.stringify(widgets))
}

export const resetDashboard = async (
  id: string,
  customDefaultWidgets ?: Widgets,
  customDefaultLayout ?: LayoutTabs,
  customDefaultConfig ?: Config
): Promise<any> => {
  if (!hasLocalStorage) {
    return
  }
  await localStorage.setItem(id + '-config', JSON.stringify(customDefaultConfig || defaultConfig))
  await localStorage.setItem(id + '-widgets', JSON.stringify(customDefaultWidgets || defaultWidgets))
  await localStorage.setItem(id + '-layouts', JSON.stringify(customDefaultLayout || defaultLayouts))
}

export const loadAvailableWidgets = (widgets: WidgetMap, allowedWidgets ?: Array<string> | undefined): Array<WidgetTemplate> => {
  if (!allowedWidgets) {
    return _.values(widgets).map(widget => widget.properties!)
  }
  return _.values(widgets)
    .filter(widget => {
      return _.includes(allowedWidgets, widget.properties!.type)
    })
    .map(widget => widget.properties!)
}
