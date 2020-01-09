import {
  Widget,
  WidgetFC,
  WidgetMap,
  WidgetProps
} from 'applications/Dashboard/declarations/Dashboard'
import _ from 'lodash'
import PT from 'prop-types'
import React from 'react'

export interface WidgetEditOptionsProps {
  myWidgets: WidgetMap;
  widget: Widget;
}

const WidgetEditOptions: React.FC<WidgetEditOptionsProps> = (props: WidgetEditOptionsProps): JSX.Element => {
  const { myWidgets, widget } = props

  const FoundWidget: WidgetFC<WidgetProps> = _.find(myWidgets, (it) => {
    return it.properties ? it.properties.type === widget.type : false
  })

  if (FoundWidget && FoundWidget.edit) {
    return <FoundWidget.edit {...props} />
  }
  return <div/>
}

WidgetEditOptions.propTypes = {
  myWidgets: PT.oneOf<WidgetMap>([]).isRequired,
  widget: PT.oneOf<Widget>([]).isRequired
}

export default WidgetEditOptions
