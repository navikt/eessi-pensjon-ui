import React from 'react'
import PT from 'prop-types'
import { Hovedknapp, Knapp, Modal as NavModal, Undertittel } from '../../Nav'
import './Modal.css'
import Icons from '../Icons/Icons'

export const Modal = (props) => {
  const { onModalClose, modal, modalOpen } = props

  const closeModal = () => {
    onModalClose()
  }

  return (
    <NavModal
      className='c-modal'
      ariaHideApp={false}
      isOpen={modalOpen}
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
          {modal.modalContent
            ? modal.modalContent
            : (
              <div className='c-modal__text m-4 text-center'>
                {modal.modalText}
              </div>
            )}
          {modal.modalButtons
            ? (
              <div className='c-modal__buttons text-center'>
                {modal.modalButtons.map(button => {
                  const handleClick = button.onClick
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
  onModalClose: PT.func.isRequired,
  modal: PT.object,
  modalOpen: PT.bool.isRequired
}
Modal.displayName = 'Modal'
export default Modal
