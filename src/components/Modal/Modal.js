import React, { useState, useEffect } from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Hovedknapp, Lukknapp, Knapp, Modal as NavModal, Undertittel } from '../../Nav'
import './Modal.css'

export const Modal = ({ appElement = document.body, className, onModalClose, closeButton = true, closeButtonLabel = '', modal }) => {
  const [_modal, setModal] = useState(modal)

  useEffect(() => {
    if (!_.isEqual(_modal, modal)) {
      setModal(modal)
    }
  }, [modal, _modal])

  const closeModal = () => {
    if (_(onModalClose).isFunction()) {
      onModalClose()
    }
  }

  const onCloseButtonClicked = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (_(onModalClose).isFunction()) {
      onModalClose()
    }
  }

  NavModal.setAppElement(appElement)

  return (
    <NavModal
      className={classNames('c-modal', className)}
      ariaHideApp={false}
      isOpen={!_(_modal).isNil()}
      onRequestClose={closeModal}
      closeButton={false}
      contentLabel='contentLabel'
    >
      {_modal ? (
        <div>
          {closeButton ? (
            <Lukknapp
              className='c-modal__close-button'
              onClick={onCloseButtonClicked}
            >
              {closeButtonLabel}
            </Lukknapp>
          ) : null}
          {_modal.modalTitle
            ? (
              <Undertittel className='m-3 c-modal__title'>{_modal.modalTitle}</Undertittel>
            ) : null}
          {_modal.modalContent || (
            <div className='c-modal__text m-4 text-center'>
              {_modal.modalText}
            </div>
          )}
          {_modal.modalButtons
            ? (
              <div className='c-modal__buttons text-center'>
                {_modal.modalButtons.map(button => {
                  const handleClick = _(button.onClick).isFunction() ? () => {
                    button.onClick()
                    closeModal()
                  } : closeModal
                  return button.main
                    ? (
                      <Hovedknapp
                        id='c-modal__main-button-id'
                        disabled={button.disabled || false}
                        className='c-modal__main-button mr-3 mb-3'
                        key={button.text}
                        onClick={handleClick}
                      >
                        {button.text}
                      </Hovedknapp>
                    )
                    : (
                      <Knapp
                        id='c-modal__other-button-id'
                        className='c-modal__other-button mr-3 mb-3'
                        key={button.text}
                        onClick={handleClick}
                      >
                        {button.text}
                      </Knapp>
                    )
                })}
              </div>
            ) : null}
        </div>
      ) : null}
    </NavModal>
  )
}

Modal.propTypes = {
  appElement: PT.node,
  className: PT.string,
  closeButton: PT.bool,
  closeButtonLabel: PT.string,
  onModalClose: PT.func,
  modal: PT.object
}
Modal.displayName = 'Modal'
export default Modal
