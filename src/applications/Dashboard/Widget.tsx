import { Labels, Layout, Widget as IWidget, WidgetFC, WidgetMap } from 'applications/Dashboard/declarations/Dashboard'
import _ from 'lodash'
import Mustache from 'mustache'
import PT from 'prop-types'
import React from 'react'
import WidgetDelete from 'applications/Dashboard/WidgetDelete'
import WidgetEdit from 'applications/Dashboard/WidgetEdit'

export interface WidgetProps {
  labels: Labels;
  layout: Layout;
  mode: string;
  onResize: (w: number, h: number) => void;
  onUpdate: (w: IWidget) => void;
  onFullFocus: () => void;
  onRestoreFocus: () => void;
  onDelete: () => void;
  setMode: (mode: string) => void;
  myWidgets: WidgetMap;
  widget: IWidget;
}

const Widget = (props: WidgetProps): JSX.Element => {
  const { labels, mode, myWidgets, widget } = props
  if (mode === 'edit') {
    return <WidgetEdit {...props} />
  }

  if (mode === 'delete') {
    return <WidgetDelete {...props} />
  }

  const FoundWidget = _.find(myWidgets, (it: WidgetFC) => {
    return it.properties ? it.properties.type === widget.type : false
  })

  if (FoundWidget) {
    return <FoundWidget {...props} />
  }

  return <div>{Mustache.render(labels.noWidgetForType, { type: widget.type })}</div>
}

Widget.propTypes = {
  labels: PT.object,
  mode: PT.string,
  myWidgets: PT.object,
  widget: PT.object.isRequired
}

export default Widget
