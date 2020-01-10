import {
  Widget,
  WidgetFC,
  WidgetProps,
  WidgetPropType,
  WidgetTemplate
} from 'applications/Dashboard/declarations/Dashboard.d'
import _ from 'lodash'
import * as Nav from 'Nav'
import PT from 'prop-types'
import React from 'react'
import ReactResizeDetector from 'react-resize-detector'
import Links from './Links'

import './LinksWidget.css'

const LinksWidget: WidgetFC<WidgetProps> = ({ onResize, onUpdate, widget }: WidgetProps): JSX.Element => {
  const onClick = (): void => {
    const newWidget: Widget = _.cloneDeep(widget!)
    newWidget.options.collapsed = !newWidget.options.collapsed
    onUpdate!(newWidget)
  }

  const _onResize = (w: number, h: number): void => {
    if (_.isFunction(onResize)) {
      // give more 70 for the panel header
      onResize(w, h + 70)
    }
  }

  if (!widget) {
    return <div />
  }

  return (
    <div className='w-LinksWidget'>
      <Nav.Ekspanderbartpanel
        apen={!widget.options.collapsed}
        tittel={widget.title}
        onClick={onClick}
      >
        <div className='w-LinksWidget__content'>
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={_onResize}
          />
          {widget.options.collapsed === true
            ? <div />
            : <Links />}
        </div>
      </Nav.Ekspanderbartpanel>
    </div>
  )
}

const properties: WidgetTemplate = {
  type: 'links',
  title: 'Links widget',
  description: 'Widget with links',
  layout: {
    lg: { minW: 6, maxW: 12, defaultW: 6, minH: 2, defaultH: 4, maxH: 999 },
    md: { minW: 3, maxW: 3, defaultW: 1, minH: 2, defaultH: 4, maxH: 999 },
    sm: { minW: 1, maxW: 1, defaultW: 1, minH: 2, defaultH: 4, maxH: 999 }
  },
  options: {}
}

LinksWidget.properties = properties

LinksWidget.propTypes = {
  onResize: PT.func.isRequired,
  onUpdate: PT.func.isRequired,
  widget: WidgetPropType.isRequired
}

export default LinksWidget
