import { WidgetComponentProps, WidgetTemplate } from 'applications/Dashboard/declarations/Dashboard'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import NoteOptionsWidget from './NoteOptionsWidget'
import './NoteWidget.css'

const NoteWidget = ({ id, layout, onResize, onUpdate, widget }: WidgetComponentProps) => {
  const [mounted, setMounted] = useState<boolean>(false)
  const [content, setContent] = useState<JSX.Element | string>(widget!.options.content)

  useEffect(() => {
    if (!mounted && onResize) {
      onResize()
      setMounted(true)
    }
  }, [mounted, onResize])

  const _id : string = id || 'widget-note-' + (layout !== undefined ? layout.i : '' + new Date().getTime())

  const resize = () => {
    const el: HTMLElement | null = document.getElementById(_id)
    if (el && _.isFunction(onResize)) {
      onResize(el.offsetWidth, el.offsetHeight)
    }
  }

  const onBlur = (e: React.ChangeEvent<HTMLDivElement>): void => {
    resize()
    saveContent(e)
  }

  const saveContent = (e: React.ChangeEvent<HTMLDivElement>): void => {
    const newContent = e.target.innerHTML
    const newWidget = _.cloneDeep(widget)
    newWidget!.options.content = newContent
    setContent(newContent)
    if (_.isFunction(onUpdate)) {
      onUpdate(newWidget)
    }
  }

  return (
    <div
      id={_id}
      className='p-3 w-NoteWidget'
    >
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={onResize}
      />
      <h4>{widget!.title}</h4>
      <div
        className='w-NoteWidget__content'
        contentEditable='true'
        onBlur={onBlur}
        dangerouslySetInnerHTML={{ __html: content.toString() }}
      />
    </div>
  )
}

const properties: WidgetTemplate = {
  type: 'note',
  title: 'Note widget',
  description: 'Post-it notes',
  layout: {
    lg: { minW: 4, maxW: 6, defaultW: 4, minH: 5, defaultH: 5, maxH: 999 },
    md: { minW: 2, maxW: 3, defaultW: 2, minH: 5, defaultH: 5, maxH: 999 },
    sm: { minW: 1, maxW: 1, defaultW: 1, minH: 5, defaultH: 5, maxH: 999 }
  },
  options: {
    content: '<ul><li>Eggs</li><li>Milk</li><li>Bread</li></ul>',
    backgroundColor: 'yellow',
    availableColors: ['white', 'yellow', 'orange', 'pink', 'lightgreen']
  }
}

NoteWidget.properties = properties
NoteWidget.edit = NoteOptionsWidget

NoteWidget.propTypes = {
  id: PT.string,
  onResize: PT.func.isRequired,
  widget: PT.object.isRequired,
  layout: PT.object.isRequired,
  onUpdate: PT.func.isRequired
}

export default NoteWidget
