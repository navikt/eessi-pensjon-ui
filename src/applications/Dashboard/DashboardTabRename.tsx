import Icons from 'components/Icons/Icons'
import { Input } from 'nav-frontend-skjema'
import React, { useState } from 'react'

export interface DashboardTabRenameProps {
  initialValue: string;
  handleAcceptRenameTab: (s: string) => void;
  handleRejectRenameTab: () => void;
}

const DashboardTabRename: React.FC<DashboardTabRenameProps> = ({
  initialValue, handleAcceptRenameTab, handleRejectRenameTab
}: DashboardTabRenameProps): JSX.Element => {
  const [tabRenameLabel, setTabRenameLabel] = useState<string>(initialValue)
  return (
    <div className='c-dashboard__tabs-rename'>
      <Input
        className='c-dashboard__tabs-rename-input'
        label=''
        value={tabRenameLabel}
        onChange={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setTabRenameLabel(e.target.value)
        }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      />
      <Icons kind='checkCircle' size={16} className='ml-2' onClick={() => handleAcceptRenameTab(tabRenameLabel)} />
      <Icons kind='removeCircle' size={16} className='ml-2' onClick={() => handleRejectRenameTab()} />
    </div>
  )
}

export default DashboardTabRename
