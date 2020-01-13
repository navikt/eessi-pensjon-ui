import { WidgetProps, WidgetFC, WidgetTemplate } from 'declarations/Dashboard.d'
import PT from 'prop-types'
import React, { useEffect, useState } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import cat from './cat.jpg'
import './CatMidget.css'

const CatMidget: WidgetFC<WidgetProps> = ({ onResize }: WidgetProps): JSX.Element => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    if (!mounted && onResize) {
      onResize()
      setMounted(true)
    }
  }, [mounted, onResize])

  return (
    <div className='w-catMidget'>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={onResize}
      />
      <img alt='cat midget' src={cat} />
    </div>
  )
}

const properties: WidgetTemplate = {
  type: 'cat',
  title: 'Cat midget',
  description: 'A 🐈 midget in a widget',
  layout: {
    lg: { minW: 4, maxW: 6, defaultW: 4, minH: 8, defaultH: 8, maxH: 999 },
    md: { minW: 2, maxW: 3, defaultW: 2, minH: 8, defaultH: 8, maxH: 999 },
    sm: { minW: 1, maxW: 1, defaultW: 1, minH: 8, defaultH: 8, maxH: 999 }
  },
  options: {
    backgroundColor: 'white'
  }
}

CatMidget.properties = properties
CatMidget.propTypes = {
  onResize: PT.func
}

export default CatMidget
