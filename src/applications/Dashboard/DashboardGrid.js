import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { DropTarget } from 'react-dnd'
import classNames from 'classnames'
import WidgetContainer from './WidgetContainer'
import DashboardConfig from './config/DashboardConfig'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export const DashboardGrid = (props) => {
  const { canDrop, connectDropTarget, currentBreakpoint, dragApi, editMode, labels, layouts, MyWidgets } = props
  const { onBreakpointChange, onLayoutChange, onWidgetFullFocus, onWidgetRestoreFocus, onWidgetUpdate } = props
  const { onWidgetResize, onWidgetDelete, rowHeight, widgets } = props

  return connectDropTarget(
    <div
      id='dashboardGrid'
      className={classNames('c-dashboard__grid', {
        canDrop: canDrop
      })}
    >
      <ResponsiveReactGridLayout
        {...props}
        breakpoints={DashboardConfig.breakpoints}
        autoSize
        margin={DashboardConfig.margin}
        containerPadding={DashboardConfig.containerPadding}
        isDraggable={editMode}
        isResizable={editMode}
        layouts={layouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={false}
        preventCollision={false}
        draggableHandle='.draggableHandle'
        dragApiRef={dragApi}
      >
        {_.map(layouts[currentBreakpoint], (layout) => {
          return (
            <div id={'widget-' + layout.i} key={layout.i}>
              <WidgetContainer
                widget={_.find(widgets, { i: layout.i })}
                currentBreakpoint={currentBreakpoint}
                editMode={editMode}
                layout={layout}
                labels={labels}
                onWidgetResize={onWidgetResize}
                onWidgetUpdate={onWidgetUpdate}
                onWidgetDelete={onWidgetDelete}
                onWidgetFullFocus={onWidgetFullFocus}
                onWidgetRestoreFocus={onWidgetRestoreFocus}
                rowHeight={rowHeight}
                MyWidgets={MyWidgets}
              />
            </div>
          )
        })}
      </ResponsiveReactGridLayout>
    </div>)
}

DashboardGrid.propTypes = {
  connectDropTarget: PT.func.isRequired,
  currentBreakpoint: PT.string.isRequired,
  dragApi: PT.object.isRequired,
  editMode: PT.bool.isRequired,
  labels: PT.object,
  layouts: PT.object.isRequired,
  onBreakpointChange: PT.func.isRequired,
  onLayoutChange: PT.func.isRequired,
  onWidgetUpdate: PT.func.isRequired,
  onWidgetResize: PT.func.isRequired,
  onWidgetDelete: PT.func.isRequired,
  onWidgetFullFocus: PT.func.isRequired,
  onWidgetRestoreFocus: PT.func.isRequired,
  rowHeight: PT.number.isRequired,
  widgets: PT.array.isRequired
}

DashboardGrid.defaultProps = DashboardConfig

const WidgetDropTarget = DropTarget(
  ['newWidget'],
  {
    canDrop: props => {
      return true
    },
    drop: (props, monitor, component) => {
      const position = monitor.getSourceClientOffset()
      // this removes placeholder, dragApi will add widget to layout
      props.dragApi.value.stop({
        position: {
          left: position.x,
          top: position.y
        }
      })
    },
    hover: (props, monitor, component) => {
      const hoverItem = monitor.getItem()
      const position = monitor.getSourceClientOffset()
      const dashboardPosition = {
        x: document.getElementById('dashboardGrid').offsetLeft,
        y: document.getElementById('dashboardGrid').offsetTop
      }

      if (props.dragApi.value) {
        if (dashboardPosition.x < position.x && dashboardPosition.y < position.y) {
          const widget = hoverItem.widget.layout[props.currentBreakpoint]
          props.dragApi.value.dragIn({
            i: hoverItem.newId,
            w: widget.defaultW,
            h: widget.defaultH,
            minH: widget.minH,
            maxH: widget.maxH,
            minW: widget.minW,
            maxW: widget.maxW,
            position: {
              left: position.x,
              top: position.y
            }
          })
        } else {
          props.dragApi.value.dragOut({
            position: {
              left: position.x,
              top: position.y
            }
          })
        }
      }
    }
  },
  (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    }
  }
)(DashboardGrid)

export default WidgetDropTarget
