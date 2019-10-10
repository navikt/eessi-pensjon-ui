import React from 'react'
import PT from 'prop-types'
import DashboardConfig from './config/DashboardConfig'

const DashboardControlPanel = (props) => {
  const { addMode, editMode, labels, onAddChange, onCancelEdit, onEditModeOn, onResetEdit, onSaveEdit } = props

  const onResetEditHandler = () => {
    if (window.confirm(labels.editDashboard + '?')) {
      onResetEdit()
    }
  }

  return (
    <div className='c-dashboard__controlPanel pt-3 pb-1 pr-3 pl-3'>
      <div className='d-inline-block'>
        {editMode
          ? addMode ? labels.dragNewWidgets : labels.arrangeWidgets
          : null}
      </div>
      <div className='c-dashboard__controlPanel-buttons'>
        {editMode ? (
          <button
            id='c-dashboard__controlPanel-add-button-id'
            className='c-dashboard__controlPanel-add-button mr-2'
            onClick={onAddChange}
          >
            {!addMode ? labels.addNewWidgets : labels.hideNewWidgets}
          </button>
        ) : null}
        {!editMode ? (
          <button
            id='c-dashboard__controlPanel-edit-button-id'
            className='c-dashboard__controlPanel-edit-button'
            onClick={onEditModeOn}
          >
            {labels.editDashboard}
          </button>
        ) : (
          <>
            <button
              id='c-dashboard__controlPanel-reset-button-id'
              className='c-dashboard__controlPanel-reset-button mr-2'
              onClick={onResetEditHandler}
            >
              {labels.reset}
            </button>
            <button
              id='c-dashboard__controlPanel-save-button-id'
              className='c-dashboard__controlPanel-save-button mr-2'
              onClick={onSaveEdit}
            >
              {labels.saveChanges}
            </button>
            <button
              id='c-dashboard__controlPanel-cancel-button-id'
              className='c-dashboard__controlPanel-cancel-button mr-2'
              onClick={onCancelEdit}
            >
              {labels.cancelChanges}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

DashboardControlPanel.propTypes = {
  addMode: PT.bool.isRequired,
  editMode: PT.bool.isRequired,
  onAddChange: PT.func.isRequired,
  onCancelEdit: PT.func.isRequired,
  onEditModeOn: PT.func.isRequired,
  onSaveEdit: PT.func.isRequired,
  t: PT.func.isRequired
}

DashboardControlPanel.defaultProps = DashboardConfig
export default DashboardControlPanel
