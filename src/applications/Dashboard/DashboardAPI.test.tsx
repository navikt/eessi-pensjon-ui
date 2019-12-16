/* global localStorage */

import _ from 'lodash'
import defaultConfig from './config/DefaultConfig'
import defaultLayouts from './config/DefaultLayouts'
import defaultWidgets from './config/DefaultWidgets'
import * as DashboardAPI from './DashboardAPI'
import * as Widgets from './widgets'

describe('applications/Dashboard/DashboardAPI', () => {
  const id = 'test'
  it('loadDashboard() - no localStorage', async (done) => {
    const [widgets, layouts, config] = await DashboardAPI.loadDashboard(id)
    expect(widgets).toEqual(defaultWidgets)
    expect(layouts).toEqual(defaultLayouts)
    expect(config).toEqual(defaultConfig)
    done()
  })

  it('loadDashboard() - with localStorage', async (done) => {
    localStorage.setItem('test-layouts', JSON.stringify(defaultLayouts))
    localStorage.setItem('test-widgets', JSON.stringify(defaultWidgets))
    localStorage.setItem('test-config', JSON.stringify(defaultConfig))
    const [widgets, layouts, config] = await DashboardAPI.loadDashboard(id)
    expect(widgets).toEqual(defaultWidgets)
    expect(layouts).toEqual(defaultLayouts)
    expect(config).toEqual(defaultConfig)
    done()
  })

  it('saveDashboard()', async (done) => {
    await DashboardAPI.saveDashboard(id, defaultWidgets, defaultLayouts, defaultConfig)
    const savedLayouts = localStorage.getItem('test-layouts')
    const savedWidgets = localStorage.getItem('test-widgets')
    const savedConfig = localStorage.getItem('test-config')
    expect(savedLayouts).toEqual(JSON.stringify(defaultLayouts))
    expect(savedWidgets).toEqual(JSON.stringify(defaultWidgets))
    expect(savedConfig).toEqual(JSON.stringify(defaultConfig))
    done()
  })

  it('resetDashboard()', async (done) => {
    await localStorage.setItem('test-layouts', 'mockLayout')
    await localStorage.setItem('test-widgets', 'mockWidgets')
    await localStorage.setItem('test-config', 'mockConfig')
    await DashboardAPI.resetDashboard(id)
    const savedLayouts = localStorage.getItem('test-layouts')
    const savedWidgets = localStorage.getItem('test-widgets')
    const savedConfig = localStorage.getItem('test-config')
    expect(savedLayouts).toEqual(JSON.stringify(defaultLayouts))
    expect(savedWidgets).toEqual(JSON.stringify(defaultWidgets))
    expect(savedConfig).toEqual(JSON.stringify(defaultConfig))
    done()
  })

  it('loadAvailableWidgets()', async (done) => {
    const loadedAvailableWidgets = await DashboardAPI.loadAvailableWidgets(Widgets)
    const expectedWidgets = _.values(Widgets).map(widget => widget.properties)
    expect(loadedAvailableWidgets).toEqual(expectedWidgets)
    done()
  })
})
