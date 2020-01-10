import {
  Layout,
  Widget as IWidget,
  WidgetFC,
  WidgetMap,
  WidgetMapPropType,
  WidgetPropType
} from 'applications/Dashboard/declarations/Dashboard.d'
import WidgetDelete from 'applications/Dashboard/WidgetDelete'
import WidgetEdit from 'applications/Dashboard/WidgetEdit'
import _ from 'lodash'
import Mustache from 'mustache'
import PT from 'prop-types'
import React from 'react'
import { Labels, LabelsPropType } from 'types.d'

export interface WidgetProps {
  labels: Labels;
  layout: Layout;
  mode?: string;
  onResize: (w: number, h: number) => void;
  onUpdate: (w: IWidget) => void;
  onFullFocus: () => void;
  onRestoreFocus: () => void;
  onDelete: () => void;
  setMode: (mode: string) => void;
  myWidgets: WidgetMap;
  widget: IWidget;
}

const Widget: React.FC<WidgetProps> = (props: WidgetProps): JSX.Element => {
  const { labels, mode, myWidgets, widget } = props
  if (mode === 'edit') {
    return <WidgetEdit {...props} />
  }

  if (mode === 'delete') {
    return <WidgetDelete {...props} />
  }

  const FoundWidget: WidgetFC<WidgetProps> = _.find(_.values(myWidgets), (it: WidgetFC<WidgetProps>) => {
    return it.properties ? it.properties.type === widget.type : false
  })

  if (FoundWidget) {
    return <FoundWidget {...props} />
  }

  return <div>{Mustache.render(labels.noWidgetForType!, { type: widget.type })}</div>
}

Widget.propTypes = {
  labels: LabelsPropType.isRequired,
  mode: PT.string,
  myWidgets: WidgetMapPropType.isRequired,
  widget: WidgetPropType.isRequired
}

export default Widget
