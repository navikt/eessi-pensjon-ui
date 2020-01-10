import Icons from 'components/Icons/Icons'
import PT from 'prop-types'
import React from 'react'
import { Labels, LabelsPropType } from 'types.d'
import DashboardConfig from './config/DashboardConfig'

export interface DashboardControlPanelProps {
  addMode: boolean;
  editMode: boolean;
  labels: Labels;
  onAddChange: () => void;
  onCancelEdit: () => void;
  onEditModeOn: () => void;
  onResetEdit: () => Promise<any>;
  onSaveEdit: () => Promise<any>;
}

const DashboardControlPanel: React.FC<DashboardControlPanelProps> = ({
  addMode, editMode, labels, onAddChange, onCancelEdit, onEditModeOn, onResetEdit, onSaveEdit
}: DashboardControlPanelProps): JSX.Element => {
  const onResetEditHandler = (): void => {
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
          <>
            <Icons
              kind='settings'
              style={{ cursor: 'pointer' }}
              title={labels.editDashboard}
              id='c-dashboard__controlPanel-edit-icon-id'
              className='c-dashboard__controlPanel-edit-icon'
              onClick={onEditModeOn}
            />
            <label id='svg-inline--fa-title' style={{ display: 'none' }}>{labels.editDashboard}</label>
          </>
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
  labels: LabelsPropType.isRequired,
  onAddChange: PT.func.isRequired,
  onCancelEdit: PT.func.isRequired,
  onEditModeOn: PT.func.isRequired,
  onSaveEdit: PT.func.isRequired,
  onResetEdit: PT.func.isRequired
}

DashboardControlPanel.defaultProps = DashboardConfig as Partial<DashboardControlPanelProps>
export default DashboardControlPanel
