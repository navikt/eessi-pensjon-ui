import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import Mustache from 'mustache'
import WidgetEdit from './WidgetEdit'
import WidgetDelete from './WidgetDelete'

const Widget = (props) => {
  const { labels, mode, MyWidgets, widget } = props
  if (mode === 'edit') {
    return <WidgetEdit {...props} />
  }

  if (mode === 'delete') {
    return <WidgetDelete {...props} />
  }

  const FoundWidget = _.find(MyWidgets, (it) => {
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
  widget: PT.object.isRequired
}

export default Widget
