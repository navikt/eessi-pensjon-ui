import React, { useState, useEffect } from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Flatknapp } from '../../Nav'
import './Pagination.css'

const Pagination = ({ className, numberOfItems, initialPage, itemsPerPage, maxPageButtons = 9, onChange }) => {
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(numberOfItems / itemsPerPage))
  const [currentPage, setCurrentPage] = useState(initialPage)

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfItems / itemsPerPage))
  }, [numberOfItems, itemsPerPage])

  if (!numberOfItems || !itemsPerPage || numberOfPages === 1) {
    return null
  }

  const onPreviousButtonClicked = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (_.isFunction(onChange)) {
      onChange(currentPage - 1)
    }
    setCurrentPage(currentPage - 1)
  }

  const onNextButtonClicked = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (_.isFunction(onChange)) {
      onChange(currentPage + 1)
    }
    setCurrentPage(currentPage + 1)
  }

  const onPageClicked = (page) => {
    if (_.isFunction(onChange)) {
      onChange(page)
    }
    setCurrentPage(page)
  }

  let pages = _.range(1, numberOfPages + 1)

  if (pages.length >= maxPageButtons) {
    // we want at least 1 pages on left, 1 on the right, the active one plus 3 each side
    const newRange = [pages[0], pages[pages.length - 1]]
    let spread = 0
    let direction = 1
    while (newRange.length <= maxPageButtons) {
      const currentPageIndex = pages.indexOf(currentPage)
      const nextIndex = currentPageIndex + (spread * direction)
      if (nextIndex in pages) {
        const targetedElement = pages[nextIndex]
        if (!_.includes(newRange, targetedElement)) {
          newRange.push(targetedElement)
        }
      }
      if (direction === -1) {
        direction = 1
      } else {
        spread++
        direction = -1
      }
    }
    pages = newRange.sort((a, b) => (a - b))
  }

  return (
    <div className={classNames('c-pagination', className)}>
      <div>
        <Flatknapp
          className='c-pagination__button c-pagination__prev-button'
          form='kompakt'
          disabled={currentPage === 1}
          onClick={onPreviousButtonClicked}
        >◄
        </Flatknapp>
      </div>
      {pages.map((page, index) => (
        <div key={page}>
          {index > 0 && page - pages[index - 1] !== 1 ? <span key={page + '...'}>...</span> : null}
          <Flatknapp
            key={page}
            className='c-pagination__button c-pagination__page-button'
            form='kompakt'
            disabled={page === currentPage}
            onClick={() => onPageClicked(page)}
          >
            {page}
          </Flatknapp>
        </div>
      ))}
      <div>
        <Flatknapp
          className='c-pagination__button c-pagination__next-button'
          form='kompakt'
          disabled={currentPage === numberOfPages}
          onClick={onNextButtonClicked}
        >►
        </Flatknapp>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  className: PT.string,
  numberOfItems: PT.number.isRequired,
  initialPage: PT.number,
  itemsPerPage: PT.number.isRequired,
  maxPageButtons: PT.number,
  onChange: PT.func
}

export default Pagination
