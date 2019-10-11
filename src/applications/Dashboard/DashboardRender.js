import React from 'react'
import PT from 'prop-types'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { createDragApiRef } from 'react-grid-layout'
import WidgetAddArea from './WidgetAddArea'
import DashboardGrid from './DashboardGrid'
import DashboardControlPanel from './DashboardControlPanel'
import WaitingPanel from '../../components/WaitingPanel/WaitingPanel'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './Dashboard.css'

const dragApi = createDragApiRef()

export const DashboardRender = ({
  addMode, availableWidgets, currentBreakpoint, editMode, labels, layouts, mounted, MyWidgets, onAddChange,
  onBreakpointChange, onCancelEdit, onEditModeOn, onLayoutChange, onResetEdit, onSaveEdit,
  onWidgetDelete, onWidgetResize, onWidgetUpdate, setWidgets, widgets
}) => {
  if (!mounted) {
    return (
      <WaitingPanel className='c-dashboard__loading' style={{ paddingTop: '3rem' }} message={labels.loading} />
    )
  } else {
    return (
      <div className='c-dashboard'>
        <DndProvider backend={HTML5Backend}>
          <DashboardControlPanel
            labels={labels}
            currentBreakpoint={currentBreakpoint}
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
              labels={labels}
              currentBreakpoint={currentBreakpoint}
              availableWidgets={availableWidgets}
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
            onLayoutChange={onLayoutChange}
            onWidgetUpdate={onWidgetUpdate}
            onWidgetResize={onWidgetResize}
            onWidgetDelete={onWidgetDelete}
            availableWidgets={availableWidgets}
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
  layouts: PT.object.isRequired,
  onAddChange: PT.func.isRequired,
  onBreakpointChange: PT.func.isRequired,
  onCancelEdit: PT.func.isRequired,
  onEditModeOn: PT.func.isRequired,
  onLayoutChange: PT.func.isRequired,
  onResetEdit: PT.func.isRequired,
  onSaveEdit: PT.func.isRequired,
  onWidgetDelete: PT.func.isRequired,
  onWidgetResize: PT.func.isRequired,
  onWidgetUpdate: PT.func.isRequired,
  widgets: PT.array
}
export default DashboardRender
