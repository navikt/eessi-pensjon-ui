import React, { useState } from 'react'
import PT from 'prop-types'
import { Input, Knapp, Tabs } from '../../Nav'
import Icons from '../../components/Icons/Icons'
import DashboardTabRename from './DashboardTabRename'

const DashboardTabs = ({ currentTabIndex, editMode, layouts, onTabChange, onTabAdd, onTabRename, onTabMove, onTabDelete }) => {
  const [newTabLabel, setNewTabLabel] = useState(undefined)
  const [seeNewTab, setSeeNewTab] = useState(false)
  const [tabRenameIndex, setTabRenameIndex] = useState(undefined)
  const tabs = layouts.map(layout => layout.label)

  const onDeleteTabHandler = (key) => {
    if (window.confirm('delete ' + key + '?')) {
      onTabDelete(key)
    }
  }

  const handleNewTab = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (newTabLabel) {
      onTabAdd(tabs.length, newTabLabel)
    }
    setNewTabLabel(undefined)
    setSeeNewTab(false)
  }

  const handleAcceptRenameTab = (newLabel) => {
    onTabRename(tabRenameIndex, newLabel)
    setTabRenameIndex(undefined)
  }

  const handleRejectRenameTab = () => {
    setTabRenameIndex(undefined)
  }

  const tabLabels = tabs.map((key, index) => ({
    label: (
      <>
        {editMode && tabRenameIndex === index ? (
          <DashboardTabRename
            initialValue={tabs[index]}
            handleAcceptRenameTab={handleAcceptRenameTab}
            handleRejectRenameTab={handleRejectRenameTab}
          />
        ) : (
          editMode ? (
            <div className='c-dashboardtabs__editMode'>
              {index > 0 ? (
                <Icons
                  className='mr-2' kind='back'
                  size={16}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onTabMove(index, -1)
                  }}
                />
              ) : null}
              <span>{key}</span>
              <Icons
                className='ml-2' kind='removeCircle'
                size={16}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onDeleteTabHandler(index)
                }}
              />
              {index < tabs.length - 1 ? (
                <Icons
                  className='ml-2' kind='next'
                  size={16}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onTabMove(index, 1)
                  }}
                />
              ) : null}
            </div>
          ) : (
            <span>{key}</span>
          )
        )}
      </>
    )
  }))

  if (!editMode && tabs.length <= 1) {
    return null
  }

  return (
    <div className='c-dashboard__tabs'>
      <Tabs
        tabs={tabLabels}
        defaultAktiv={currentTabIndex}
        onChange={(e, i) => {
          if (tabs[i] !== 'new' && i !== currentTabIndex) {
            onTabChange(i)
          }
          if (editMode && tabRenameIndex !== i) {
            setTabRenameIndex(i)
          }
        }}
      />
      {editMode ? (
        seeNewTab ? (
          <div className='c-dashboard__tabs-new p-0'>
            <Input
              className='c-dashboard__tabs-new-input'
              label=''
              onChange={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setNewTabLabel(e.target.value)
              }}
            />
            <Icons kind='checkCircle' size={16} className='ml-2' onClick={handleNewTab} />
            <Icons kind='removeCircle' size={16} className='ml-2' onClick={() => setSeeNewTab(false)} />

          </div>
        ) : (
          <Knapp
            form='kompakt'
            className='ml-2' onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setSeeNewTab(true)
            }}
          >
            <Icons kind='tilsette' size={16} />
          </Knapp>
        )
      ) : null}
    </div>
  )
}

DashboardTabs.propTypes = {
  currentTabIndex: PT.number.isRequired,
  layouts: PT.array.isRequired,
  onTabAdd: PT.func.isRequired,
  onTabDelete: PT.func.isRequired,
  onTabChange: PT.func.isRequired
}
export default DashboardTabs
