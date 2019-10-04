/* global window, Uint8Array */

import React, { useEffect, useState, useCallback } from 'react'
import PT from 'prop-types'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import classNames from 'classnames'
import Mustache from 'mustache'
import bytes from 'bytes'
import File from '../File/File'
import './FileUpload.css'

const defaultLabels = {
  accepted: 'Akseptert',
  size: 'Størrelse',
  download: 'Last ned',
  dropFilesHere: 'Klikk her for å velge filer. Filformat er JPG, PNG og PDF, maks {{maxFiles}} filer.',
  fileIsTooBigLimitIs: 'filen {{file}} ({{size}}) er for stor, grensen er {{maxFileSize}}',
  maxFilesExceeded: 'For mange filer, maks er {{maxFiles}} filer',
  rejected: 'Avvist',
  removed: 'Fjernet',
  total: 'Totalt'
}

const FileUpload = ({
  acceptedMimetypes, afterDrop, beforeDrop, className, closeModal, currentPages, files, labels = defaultLabels,
  maxFiles, maxFileSize, onFileChange, openModal, status, tabIndex
}) => {
  const [_files, setFiles] = useState(files)
  const [_currentPages, setCurrentPages] = useState(currentPages || [])
  const [_status, setStatus] = useState(status || {})

  useEffect(() => {
    if (!_.isEmpty(_files) && _.isEmpty(_currentPages)) {
      setCurrentPages(_files.map(f => { return 1 }))
    }
  }, [_currentPages, _files])

  const openPreview = (file, pageNumber) => {
    openModal({
      modalContent: (
        <div style={{ cursor: 'pointer' }} onClick={closeModal}>
          <File labels={labels} file={file} width={400} height={600} pageNumber={pageNumber} />
        </div>
      )
    })
  }

  const updateFiles = useCallback((newFiles, newCurrentPages, statusMessage) => {
    setFiles(newFiles)
    if (newCurrentPages) {
      setCurrentPages(newCurrentPages)
    }
    if (statusMessage) {
      setStatus({
        message: (statusMessage || _status),
        type: 'OK'
      })
    }
    if (onFileChange) {
      onFileChange(newFiles)
    }
  }, [_status, onFileChange])

  const processFiles = useCallback((acceptedFiles, rejectedFiles) => {
    const newFiles = _.clone(_files)
    const newCurrentPages = _.clone(_currentPages)
    acceptedFiles.forEach((file, index) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onerror = error => { console.log(error) }
      reader.onloadend = async (e) => {
        const blob = new Uint8Array(e.target.result)
        var len = blob.byteLength
        var x = ''
        for (var i = 0; i < len; i++) {
          x += String.fromCharCode(blob[i])
        }
        const base64 = window.btoa(x)
        newFiles.push({
          size: file.size,
          name: file.name,
          mimetype: file.type,
          content: {
            base64: base64
          }
        })
        newCurrentPages[newCurrentPages.length] = 1
      }
    })
    let statusMessage = labels.accepted + ': ' + acceptedFiles.length + ', '
    statusMessage += labels.rejected + ': ' + rejectedFiles.length + ', '
    statusMessage += labels.total + ': ' + newFiles.length
    updateFiles(newFiles, newCurrentPages, statusMessage)
  }, [_currentPages, _files, updateFiles])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (beforeDrop) {
      beforeDrop()
    }
    if (maxFiles && (_files.length + acceptedFiles.length > maxFiles)) {
      return setStatus({
        message: Mustache.render(labels.maxFilesExceeded, {
          maxFiles: maxFiles
        }),
        type: 'ERROR'
      })
    }

    processFiles(acceptedFiles, rejectedFiles)

    if (afterDrop) {
      afterDrop()
    }
  }, [_files.length, afterDrop, beforeDrop, labels, maxFiles, processFiles])

  const onDropRejected = (rejectedFiles) => {
    if (maxFileSize && rejectedFiles[0].size > maxFileSize) {
      setStatus({
        message: Mustache.render(labels.fileIsTooBigLimitIs, {
          maxFileSize: bytes(maxFileSize),
          size: bytes(rejectedFiles[0].size),
          file: rejectedFiles[0].name
        }),
        type: 'ERROR'
      })
    }
  }

  const removeFile = (fileIndex) => {
    const newFiles = _.cloneDeep(_files)
    const newCurrentPages = _.cloneDeep(_currentPages)
    newFiles.splice(fileIndex, 1)
    newCurrentPages.splice(fileIndex, 1)
    const filename = _files[fileIndex].name
    const statusMessage = labels.removed + ' ' + filename
    updateFiles(newFiles, newCurrentPages, statusMessage)
  }

  const onLoadSuccess = (index, event) => {
    if (index !== undefined && event && event.numPages) {
      const newFiles = _.cloneDeep(_files)
      newFiles[index].numPages = event.numPages
      updateFiles(newFiles)
    }
  }

  const onPreviousPageRequest = (fileIndex) => {
    const newCurrentPages = _.cloneDeep(_currentPages)
    newCurrentPages[fileIndex] = newCurrentPages[fileIndex] - 1
    setCurrentPages(newCurrentPages)
  }

  const onNextPageRequest = (fileIndex) => {
    const newCurrentPages = _.cloneDeep(_currentPages)
    newCurrentPages[fileIndex] = newCurrentPages[fileIndex] + 1
    setCurrentPages(newCurrentPages)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    onDropRejected: onDropRejected,
    accept: acceptedMimetypes,
    maxSize: maxFileSize
  })

  return (
    <div
      className={classNames('c-fileUpload', 'p-4', { 'c-fileUpload-active ': isDragActive }, className)}
      tabIndex={tabIndex}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className='c-fileUpload-placeholder'>
        <div className='c-fileUpload-placeholder-message'>
          {Mustache.render(labels.dropFilesHere, {
            maxFiles: maxFiles
          })}
        </div>
        <div className={classNames('c-fileUpload-placeholder-status', 'c-fileUpload-placeholder-status-' + _status.type)}>
          {_status.message || ''}
        </div>
      </div>
      <div className='c-fileUpload-files scrollable'>
        {_files.map((file, i) => {
          return (
            <File
              className='mr-2' key={i} file={file}
              currentPage={_currentPages[i]}
              deleteLink downloadLink previewLink
              index={i}
              labels={labels}
              onPreviousPage={onPreviousPageRequest}
              onNextPage={onNextPageRequest}
              onLoadSuccess={onLoadSuccess}
              onDeleteDocument={removeFile}
              onPreviewDocument={openPreview}
            />
          )
        })}
      </div>
    </div>
  )
}

FileUpload.propTypes = {
  acceptedMimetypes: PT.oneOfType([PT.string, PT.array]),
  afterDrop: PT.func,
  beforeDrop: PT.func,
  className: PT.string,
  closeModal: PT.func.isRequired,
  currentPages: PT.array,
  files: PT.array.isRequired,
  maxFiles: PT.number,
  maxFileSize: PT.number,
  onFileChange: PT.func.isRequired,
  openModal: PT.func.isRequired,
  tabIndex: PT.number
}
FileUpload.displayName = 'FileUpload'
export default FileUpload
