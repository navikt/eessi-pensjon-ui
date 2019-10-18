import React, { useState } from 'react'
import PT from 'prop-types'
import { Input, Knapp, Tabs } from '../../Nav'
import Icons from '../../components/Icons/Icons'

const DashboardTabs = ({ currentTab, editMode, layouts, onTabChange, onTabAdd, onTabDelete }) => {
  const [newTabLabel, setNewTabLabel] = useState(undefined)
  const [seeNewTab, setSeeNewTab] = useState(false)
  const tabs = Object.keys(layouts)

  const onDeleteTabHandler = (key) => {
    if (window.confirm('delete ' + key + '?')) {
      onTabDelete(key)
    }
  }

  const tabLabels = tabs.map(key => ({
    label: (
      <>
        <span>{key}</span>
        {editMode ? (
          <Icons
            className='ml-2' kind='close' onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDeleteTabHandler(key)
            }}
          />
        ) : null}
      </>
    )
  }))

  if (!editMode && tabs.length <= 1) {
    return null
  }

  return (
    <div className='d-flex align-items-center'>
      <Tabs
        tabs={tabLabels}
        defaultAktiv={tabs.indexOf(currentTab)}
        onChange={(e, i) => {
          if (tabs[i] !== 'new') {
            onTabChange(tabs[i])
          }
        }}
      />
      {editMode ? (
        seeNewTab ? (
          <div className='d-flex p-0'>
            <Input
              label=''
              onChange={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setNewTabLabel(e.target.value)
              }}
            />
            <Knapp
              mini className='ml-2' onClick={(e) => {
                e.preventDefault()
                onTabAdd(newTabLabel)
                setNewTabLabel(undefined)
                setSeeNewTab(false)
              }}
            >+
            </Knapp>
          </div>
        ) : (
          <Icons
            kind='plus' onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setSeeNewTab(true)
            }}
          />
        )
      ) : null}
    </div>
  )
}

DashboardTabs.propTypes = {
  currentTab: PT.string.isRequired,
  layouts: PT.object.isRequired,
  onTabAdd: PT.func.isRequired,
  onTabDelete: PT.func.isRequired,
  onTabChange: PT.func.isRequired
}
export default DashboardTabs
