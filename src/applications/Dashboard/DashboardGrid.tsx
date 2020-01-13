import DashboardTabs from 'applications/Dashboard/DashboardTabs'
import {
  Breakpoint,
  DroppingItem,
  Layout,
  LayoutBody,
  Layouts,
  LayoutTabs,
  Widget,
  WidgetMap,
  Widgets
} from 'declarations/Dashboard.d'
import {
  BreakpointPropType,
  DroppingItemPropType,
  LayoutTabsPropType,
  WidgetsPropType
} from 'declarations/Dashboard.pt'
import WidgetContainer from 'applications/Dashboard/WidgetContainer'
import classNames from 'classnames'
import _ from 'lodash'
import PT from 'prop-types'
import React from 'react'
import { Responsive, WidthProvider, Layout as ILayout, Layouts as ILayouts } from 'react-grid-layout'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import DashboardConfig from './config/DashboardConfig'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export interface DashboardGridProps {
  currentTabIndex: number;
  currentBreakpoint: Breakpoint;
  editMode: boolean;
  droppingItem: DroppingItem;
  labels: Labels;
  layouts: LayoutTabs;
  myWidgets: WidgetMap;
  onBreakpointChange: (breakpoint: Breakpoint) => void;
  onLayoutChange: (changedLayout: Layouts, layouts: LayoutBody) => void;
  onWidgetDelete: (layout: Layout) => void;
  onWidgetDrop: (e: any) => void;
  onWidgetFullFocus: (focusedWidget: Widget) => void;
  onWidgetResize: (layout: Layout) => void;
  onWidgetRestoreFocus: () => void;
  onWidgetUpdate: (widget: Widget, layout: Layout) => void;
  onTabChange: (i: number) => void;
  onTabAdd: (i: number, s: string) => void;
  onTabRename: (i: number, s: string) => void;
  onTabMove: (i: number, howMuch: number) => void;
  onTabDelete: (i: number) => void;
  rowHeight: number;
  widgets: Widgets
}

export const DashboardGrid: React.FC<DashboardGridProps> = (props: DashboardGridProps): JSX.Element => {
  const { currentTabIndex, currentBreakpoint, droppingItem, editMode, labels, layouts, myWidgets } = props
  const { onBreakpointChange, onLayoutChange, onWidgetDrop, onWidgetFullFocus, onWidgetRestoreFocus, onWidgetUpdate } = props
  const { onWidgetResize, onWidgetDelete, onTabAdd, onTabChange, onTabRename, onTabDelete, onTabMove, rowHeight, widgets } = props

  if (_.isEmpty(layouts) || _.isNil(currentTabIndex)) {
    return <div />
  }

  return (
    <div
      id='dashboardGrid'
      className={classNames('c-dashboard__grid', {
        canDrop: false
      })}
    >
      <DashboardTabs
        editMode={editMode}
        onTabAdd={onTabAdd}
        onTabDelete={onTabDelete}
        onTabChange={onTabChange}
        onTabRename={onTabRename}
        onTabMove={onTabMove}
        currentTabIndex={currentTabIndex}
        layouts={layouts}
      />
      <ResponsiveReactGridLayout
        {...props}
        breakpoints={DashboardConfig.breakpoints as unknown as {[P: string]: number}}
        droppingItem={droppingItem}
        autoSize
        margin={DashboardConfig.margin as [number, number]}
        containerPadding={DashboardConfig.containerPadding as [number, number]}
        isDraggable={editMode}
        isResizable={editMode}
        layouts={layouts[currentTabIndex].body as unknown as ILayouts}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={onLayoutChange as unknown as (currentLayout: ILayout[], allLayouts: ILayouts) => void}
        measureBeforeMount
        useCSSTransforms
        preventCollision={false}
        isDroppable
        onDrop={onWidgetDrop}
        draggableHandle='.draggableHandle'
      >
        {_.map(layouts[currentTabIndex].body[currentBreakpoint], (layout) => {
          const widget: Widget | undefined = _.find(widgets, { i: layout.i })
          return widget ? (
            <div id={'widget-' + layout.i} key={layout.i}>
              <WidgetContainer
                widget={widget}
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
                myWidgets={myWidgets}
              />
            </div>
          ) : null
        })}
      </ResponsiveReactGridLayout>
    </div>
  )
}

DashboardGrid.propTypes = {
  currentBreakpoint: BreakpointPropType.isRequired,
  currentTabIndex: PT.number.isRequired,
  droppingItem: DroppingItemPropType.isRequired,
  editMode: PT.bool.isRequired,
  labels: LabelsPropType.isRequired,
  layouts: LayoutTabsPropType.isRequired,
  onBreakpointChange: PT.func.isRequired,
  onLayoutChange: PT.func.isRequired,
  onWidgetUpdate: PT.func.isRequired,
  onWidgetDrop: PT.func.isRequired,
  onWidgetResize: PT.func.isRequired,
  onWidgetDelete: PT.func.isRequired,
  onWidgetFullFocus: PT.func.isRequired,
  onWidgetRestoreFocus: PT.func.isRequired,
  onTabAdd: PT.func.isRequired,
  onTabDelete: PT.func.isRequired,
  onTabChange: PT.func.isRequired,
  onTabRename: PT.func.isRequired,
  onTabMove: PT.func.isRequired,
  rowHeight: PT.number.isRequired,
  widgets: WidgetsPropType.isRequired
}

DashboardGrid.defaultProps = DashboardConfig

export default DashboardGrid
