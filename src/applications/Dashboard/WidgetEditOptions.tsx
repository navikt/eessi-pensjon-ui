import {
  Widget,
  WidgetFC,
  WidgetMap,
  WidgetProps
} from 'declarations/Dashboard.d'
import {
  WidgetMapPropType,
  WidgetPropType
} from 'declarations/Dashboard.pt'
import _ from 'lodash'
import React from 'react'

export interface WidgetEditOptionsProps {
  myWidgets: WidgetMap;
  widget: Widget;
}

const WidgetEditOptions: React.FC<WidgetEditOptionsProps> = (props: WidgetEditOptionsProps): JSX.Element => {
  const { myWidgets, widget } = props

  const FoundWidget: WidgetFC<WidgetProps> = _.find(_.values(myWidgets), (it) => {
    return it.properties ? it.properties.type === widget.type : false
  })

  if (FoundWidget && FoundWidget.edit) {
    return <FoundWidget.edit {...props} />
  }
  return <div />
}

WidgetEditOptions.propTypes = {
  myWidgets: WidgetMapPropType.isRequired,
  widget: WidgetPropType.isRequired
}

export default WidgetEditOptions
