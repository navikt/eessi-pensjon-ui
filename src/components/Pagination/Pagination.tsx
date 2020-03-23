import React, { useState, useEffect } from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Flatknapp } from 'Nav'
import './Pagination.css'

export interface PaginationProps {
  className?: string;
  numberOfItems: number;
  initialPage?: number;
  itemsPerPage: number;
  maxPageButtons?: number;
  onChange ?: (e: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  className, numberOfItems, initialPage = 1, itemsPerPage, maxPageButtons = 9, onChange
}: PaginationProps): JSX.Element | null => {
  const [numberOfPages, setNumberOfPages] = useState<number>(Math.ceil(numberOfItems / itemsPerPage))
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfItems / itemsPerPage))
  }, [numberOfItems, itemsPerPage])

  if (!numberOfItems || !itemsPerPage || numberOfPages === 1) {
    return null
  }

  const onPreviousButtonClicked = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    if (_.isFunction(onChange)) {
      onChange(currentPage - 1)
    }
    setCurrentPage(currentPage - 1)
  }

  const onNextButtonClicked = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    if (_.isFunction(onChange)) {
      onChange(currentPage + 1)
    }
    setCurrentPage(currentPage + 1)
  }

  const onPageClicked = (page: number): void => {
    if (_.isFunction(onChange)) {
      onChange(page)
    }
    setCurrentPage(page)
  }

  let pages: Array<number> = _.range(1, numberOfPages + 1)

  if (pages.length >= maxPageButtons) {
    // we want at least 1 pages on left, 1 on the right, the active one plus 3 each side
    const newRange: Array<number> = [pages[0], pages[pages.length - 1]]
    let spread: number = 0
    let direction: number = 1
    while (newRange.length < maxPageButtons) {
      const currentPageIndex: number = pages.indexOf(currentPage)
      const nextIndex: number = currentPageIndex + (spread * direction)
      if (nextIndex in pages) {
        const targetedElement: number = pages[nextIndex]
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
          kompakt
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
            kompakt
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
          kompakt
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
