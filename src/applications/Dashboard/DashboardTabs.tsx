import { LayoutTabs, LayoutTabsPropType } from 'applications/Dashboard/declarations/Dashboard.d'
import Icons from 'components/Icons/Icons'
import { Input, Knapp, Tabs } from 'Nav'
import PT from 'prop-types'
import React, { useState } from 'react'
import DashboardTabRename from './DashboardTabRename'

export interface DashboardTabsProps {
  currentTabIndex: number;
  editMode: boolean;
  layouts: LayoutTabs;
  onTabChange: (i: number) => void;
  onTabAdd: (i: number, s: string) => void;
  onTabRename: (i: number, s: string) => void;
  onTabMove: (i: number, howMuch: number) => void;
  onTabDelete: (i: number) => void;
}

export interface TabLabel {
  label: JSX.Element;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  currentTabIndex, editMode, layouts, onTabChange, onTabAdd, onTabRename, onTabMove, onTabDelete
}: DashboardTabsProps): JSX.Element => {
  const [newTabLabel, setNewTabLabel] = useState<string | undefined>(undefined)
  const [seeNewTab, setSeeNewTab] = useState<boolean>(false)
  const [tabRenameIndex, setTabRenameIndex] = useState<number | undefined>(undefined)
  const tabs: Array<string> = layouts.map(layout => layout.label)

  const onDeleteTabHandler = (key: number): void => {
    if (window.confirm('delete ' + key + '?')) {
      onTabDelete(key)
    }
  }

  const handleNewTab = (e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    if (newTabLabel) {
      onTabAdd(tabs.length, newTabLabel)
    }
    setNewTabLabel(undefined)
    setSeeNewTab(false)
  }

  const handleAcceptRenameTab = (newLabel: string): void => {
    onTabRename(tabRenameIndex!, newLabel)
    setTabRenameIndex(undefined)
  }

  const handleRejectRenameTab = (): void => {
    setTabRenameIndex(undefined)
  }

  const tabLabels: Array<TabLabel> = tabs.map((key, index): TabLabel => ({
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
                  onClick={(e: React.MouseEvent) => {
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
    return <div />
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
  editMode: PT.bool.isRequired,
  layouts: LayoutTabsPropType.isRequired,
  onTabAdd: PT.func.isRequired,
  onTabChange: PT.func.isRequired,
  onTabDelete: PT.func.isRequired,
  onTabMove: PT.func.isRequired,
  onTabRename: PT.func.isRequired
}
export default DashboardTabs
