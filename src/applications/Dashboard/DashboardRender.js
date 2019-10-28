import React from 'react'
import PT from 'prop-types'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { createDragApiRef } from 'react-grid-layout'
import classNames from 'classnames'
import WidgetAddArea from './WidgetAddArea'
import DashboardGrid from './DashboardGrid'
import DashboardControlPanel from './DashboardControlPanel'
import WaitingPanel from '../../components/WaitingPanel/WaitingPanel'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './Dashboard.css'

const dragApi = createDragApiRef()

export const DashboardRender = ({
  addMode, availableWidgets, currentTabIndex, currentBreakpoint, editMode, labels, layouts, mounted, MyWidgets, onAddChange,
  onBreakpointChange, onCancelEdit, onEditModeOn, onLayoutChange, onResetEdit, onSaveEdit, onTabAdd, onTabDelete, onTabChange,
  onTabRename, onTabMove, onWidgetFullFocus, onWidgetRestoreFocus, onWidgetDelete, onWidgetResize, onWidgetUpdate,
  setWidgets, widgets
}) => {
  if (!mounted) {
    return (
      <WaitingPanel className='c-dashboardrender__loading' style={{ paddingTop: '3rem' }} message={labels.loading} />
    )
  } else {
    return (
      <div className={classNames('c-dashboard', currentBreakpoint)}>
        <DndProvider backend={HTML5Backend}>
          <DashboardControlPanel
            labels={labels}
            addMode={addMode}
            editMode={editMode}
            onEditModeOn={onEditModeOn}
            onCancelEdit={onCancelEdit}
            onSaveEdit={onSaveEdit}
            onResetEdit={onResetEdit}
            onAddChange={onAddChange}
          />
          {addMode ? (
            <WidgetAddArea
              availableWidgets={availableWidgets}
              labels={labels}
              currentBreakpoint={currentBreakpoint}
              widgets={widgets}
              setWidgets={setWidgets}
              dragApi={dragApi}
            />
          )
            : null}
          <DashboardGrid
            editMode={editMode}
            layouts={layouts}
            widgets={widgets}
            mounted={mounted}
            currentBreakpoint={currentBreakpoint}
            onBreakpointChange={onBreakpointChange}
            currentTabIndex={currentTabIndex}
            onTabChange={onTabChange}
            onTabAdd={onTabAdd}
            onTabDelete={onTabDelete}
            onTabRename={onTabRename}
            onTabMove={onTabMove}
            onLayoutChange={onLayoutChange}
            onWidgetUpdate={onWidgetUpdate}
            onWidgetResize={onWidgetResize}
            onWidgetDelete={onWidgetDelete}
            onWidgetFullFocus={onWidgetFullFocus}
            onWidgetRestoreFocus={onWidgetRestoreFocus}
            labels={labels}
            dragApi={dragApi}
            MyWidgets={MyWidgets}
          />
        </DndProvider>
      </div>
    )
  }
}

DashboardRender.propTypes = {
  addMode: PT.bool.isRequired,
  availableWidgets: PT.array.isRequired,
  currentBreakpoint: PT.string.isRequired,
  editMode: PT.bool.isRequired,
  labels: PT.object,
  layouts: PT.array.isRequired,
  onAddChange: PT.func.isRequired,
  onBreakpointChange: PT.func.isRequired,
  onCancelEdit: PT.func.isRequired,
  onEditModeOn: PT.func.isRequired,
  onLayoutChange: PT.func.isRequired,
  onResetEdit: PT.func.isRequired,
  onTabAdd: PT.func.isRequired,
  onTabChange: PT.func.isRequired,
  onTabRename: PT.func.isRequired,
  onTabDelete: PT.func.isRequired,
  onTabMove: PT.func.isRequired,
  onSaveEdit: PT.func.isRequired,
  onWidgetDelete: PT.func.isRequired,
  onWidgetResize: PT.func.isRequired,
  onWidgetUpdate: PT.func.isRequired,
  onWidgetFullFocus: PT.func.isRequired,
  onWidgetRestoreFocus: PT.func.isRequired,
  widgets: PT.array
}
export default DashboardRender
