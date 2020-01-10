import {
  Breakpoint,
  BreakpointPropType,
  DroppingItem,
  Layout,
  LayoutBody,
  Layouts,
  LayoutTabs,
  LayoutTabsPropType,
  Widget,
  WidgetMap,
  WidgetPlaceholder,
  Widgets,
  WidgetsPropType,
  WidgetTemplates,
  WidgetTemplatesPropType
} from 'applications/Dashboard/declarations/Dashboard.d'
import WidgetAddArea from 'applications/Dashboard/WidgetAddArea'
import classNames from 'classnames'
import PT from 'prop-types'
import React from 'react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Labels, LabelsPropType } from 'types.d'
import './Dashboard.css'
import DashboardControlPanel from './DashboardControlPanel'
import DashboardGrid from './DashboardGrid'

export interface DashboardRenderProps {
  addMode: boolean;
  availableWidgets: WidgetTemplates;
  currentTabIndex: number;
  currentBreakpoint: Breakpoint;
  droppingItem: DroppingItem;
  editMode: boolean;
  labels: Labels;
  layouts: LayoutTabs;
  myWidgets: WidgetMap;
  onAddChange: () => void;
  onBreakpointChange: (breakpoint: Breakpoint) => void;
  onCancelEdit: () => void;
  onEditModeOn: () => void;
  onLayoutChange: (changedLayout: Layouts, layouts: LayoutBody) => void;
  onResetEdit: () => Promise<any>;
  onSaveEdit: () => Promise<any>;
  onTabAdd: (newTabIndex: number, newTabLabel: string) => void;
  onTabChange: (newTabIndex: number) => void;
  onTabDelete: (newTabIndex: number) => void;
  onTabMove: (sourceIndex: number, howMuch: number) => void;
  onTabRename: (newTabIndex: number, newTabLabel: string) => void;
  onPlaceholderWidgetAdd: (newWidget: WidgetPlaceholder) => void;
  onWidgetDelete: (layout: Layout) => void;
  onWidgetDrop: (e: any) => void;
  onWidgetFullFocus: (focusedWidget: Widget) => void;
  onWidgetResize: (layout: Layout) => void;
  onWidgetRestoreFocus: () => void;
  onWidgetUpdate: (widget: Widget, layout: Layout) => void;
  rowHeight: number;
  widgets: Widgets;
}

export const DashboardRender: React.FC<DashboardRenderProps> = ({
  addMode, availableWidgets, currentTabIndex, currentBreakpoint, droppingItem, editMode, labels, layouts,
  myWidgets, onAddChange, onBreakpointChange, onCancelEdit, onEditModeOn, onLayoutChange, onPlaceholderWidgetAdd,
  onResetEdit, onSaveEdit, onTabAdd, onTabChange, onTabDelete, onTabRename, onTabMove, onWidgetDrop,
  onWidgetFullFocus, onWidgetRestoreFocus, onWidgetDelete, onWidgetResize, onWidgetUpdate, rowHeight, widgets
}: DashboardRenderProps): JSX.Element => (
  <div className={classNames('c-dashboard', currentBreakpoint)}>
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
        myWidgets={myWidgets}
        onPlaceholderWidgetAdd={onPlaceholderWidgetAdd}
      />
    ) : null}
    <DashboardGrid
      currentTabIndex={currentTabIndex}
      droppingItem={droppingItem}
      editMode={editMode}
      layouts={layouts}
      currentBreakpoint={currentBreakpoint}
      onBreakpointChange={onBreakpointChange}
      onLayoutChange={onLayoutChange}
      onTabAdd={onTabAdd}
      onTabChange={onTabChange}
      onTabDelete={onTabDelete}
      onTabMove={onTabMove}
      onTabRename={onTabRename}
      onWidgetDelete={onWidgetDelete}
      onWidgetDrop={onWidgetDrop}
      onWidgetFullFocus={onWidgetFullFocus}
      onWidgetResize={onWidgetResize}
      onWidgetRestoreFocus={onWidgetRestoreFocus}
      onWidgetUpdate={onWidgetUpdate}
      labels={labels}
      rowHeight={rowHeight}
      widgets={widgets}
      myWidgets={myWidgets}
    />
  </div>
)

DashboardRender.propTypes = {
  addMode: PT.bool.isRequired,
  availableWidgets: WidgetTemplatesPropType.isRequired,
  currentBreakpoint: BreakpointPropType.isRequired,
  editMode: PT.bool.isRequired,
  labels: LabelsPropType.isRequired,
  layouts: LayoutTabsPropType.isRequired,
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
  onWidgetDrop: PT.func.isRequired,
  onWidgetResize: PT.func.isRequired,
  onWidgetUpdate: PT.func.isRequired,
  onWidgetFullFocus: PT.func.isRequired,
  onWidgetRestoreFocus: PT.func.isRequired,
  widgets: WidgetsPropType.isRequired
}
export default DashboardRender
