import { Widget, WidgetProps, WidgetTemplate } from 'applications/Dashboard/declarations/Dashboard'
import PT from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import SmileyOptionsWidget from './SmileyOptionsWidget'
import './SmileyWidget.css'

const SmileyWidget = ({ onResize, widget }: WidgetProps) => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    if (!mounted && onResize) {
      onResize()
      setMounted(true)
    }
  }, [mounted, onResize])

  return (
    <div className='w-SmileyWidget p-3 text-center'>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={onResize}
      />
      <h4>Today's mood</h4>
      <p style={{
        fontSize: '100px'
      }}
      >
        <span className='w-SmileyWidget__smiley' role='img' aria-label='smiley'>
          {widget.options.mood}
        </span>
      </p>
    </div>
  )
}

const properties: WidgetTemplate = {
  type: 'smiley',
  title: 'Smiley widget',
  description: 'Widget with a 😁',
  layout: {
    lg: { minW: 2, maxW: 4, defaultW: 2, minH: 6, defaultH: 6, maxH: 999 },
    md: { minW: 1, maxW: 3, defaultW: 1, minH: 6, defaultH: 6, maxH: 999 },
    sm: { minW: 1, maxW: 1, defaultW: 1, minH: 6, defaultH: 6, maxH: 999 }
  },
  options: {
    backgroundColor: 'white',
    mood: '😁',
    availableMoods: [
      { label: 'grin', value: '😁' },
      { label: 'happy', value: '😃' },
      { label: 'smiling', value: '😊' },
      { label: 'unamused', value: '😒' },
      { label: 'angry', value: '😠' },
      { label: 'pouting', value: '😡' }
    ]
  }
}

SmileyWidget.properties = properties
SmileyWidget.edit = SmileyOptionsWidget

SmileyWidget.propTypes = {
  onResize: PT.func.isRequired,
  widget: PT.oneOf<Widget>([]).isRequired
}

export default SmileyWidget
