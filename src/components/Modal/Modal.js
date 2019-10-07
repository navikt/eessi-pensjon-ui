import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Hovedknapp, Knapp, Modal as NavModal, Undertittel } from '../../Nav'
import './Modal.css'

export const Modal = ({ className, onModalClose, modal }) => {
  const closeModal = () => {
    if (_(onModalClose).isFunction()) {
      onModalClose()
    }
  }

  return (
    <NavModal
      className={classNames('c-modal', className)}
      ariaHideApp={false}
      isOpen={!_(modal).isNil()}
      onRequestClose={closeModal}
      closeButton={false}
      contentLabel='contentLabel'
    >
      {modal ? (
        <div>
          {modal.modalTitle
            ? (
              <div className='m-3 text-center'>
                <Undertittel className='c-modal__title'>{modal.modalTitle}</Undertittel>
              </div>
            )
            : null}
          {modal.modalContent || (
            <div className='c-modal__text m-4 text-center'>
              {modal.modalText}
            </div>
          )}
          {modal.modalButtons
            ? (
              <div className='c-modal__buttons text-center'>
                {modal.modalButtons.map(button => {
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
  className: PT.string,
  onModalClose: PT.func,
  modal: PT.object
}
Modal.displayName = 'Modal'
export default Modal
