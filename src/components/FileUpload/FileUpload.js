/* global window, Uint8Array */

import React, { useEffect, useState, useCallback } from 'react'
import PT from 'prop-types'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import classNames from 'classnames'
import Mustache from 'mustache'
import bytes from 'bytes'
import File from '../File/File'
import Modal from '../Modal/Modal'
import './FileUpload.css'

const defaultLabels = {
  all: 'alle',
  accepted: 'Akseptert',
  size: 'Størrelse',
  download: 'Last ned',
  dropFilesHere: 'Klikk her for å velge filer. Filformat er {{filFormat}}, maks {{maxFiles}} filer, maks størrelse {{maxFileSize}}.',
  fileIsTooBigLimitIs: 'filen {{file}} ({{size}}) er for stor, grensen er {{maxFileSize}}',
  maxFilesExceeded: 'For mange filer, maks er {{maxFiles}} filer',
  rejected: 'Avvist',
  removed: 'Fjernet',
  total: 'Totalt'
}

const FileUpload = ({
  acceptedMimetypes, afterDrop, beforeDrop, className, currentPages, files = [], labels,
  maxFiles = 99, maxFileSize = 10485760, onFileChange, status, tabIndex
}) => {
  const [_files, setFiles] = useState(files)
  const [_currentPages, setCurrentPages] = useState(currentPages || [])
  const [_status, setStatus] = useState(status || {})
  const [modalOpen, setModalOpen] = useState(false)
  const [modal, setModal] = useState(undefined)
  const _labels = { ...defaultLabels, ...labels }

  useEffect(() => {
    if (!_.isEmpty(_files) && _.isEmpty(_currentPages)) {
      setCurrentPages(_files.map(f => { return 1 }))
    }
  }, [_currentPages, _files])

  const closePreview = () => {
    setModal(undefined)
    setModalOpen(false)
  }

  const openPreview = (file, pageNumber) => {
    setModal({
      modalContent: (
        <div style={{ cursor: 'pointer' }} onClick={closePreview}>
          <File labels={_labels} file={file} width={400} height={600} pageNumber={pageNumber} />
        </div>
      )
    })
    setModalOpen(true)
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
    if (_(onFileChange).isFunction()) {
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
    let statusMessage = _labels.accepted + ': ' + acceptedFiles.length + ', '
    statusMessage += _labels.rejected + ': ' + rejectedFiles.length + ', '
    statusMessage += _labels.total + ': ' + newFiles.length
    updateFiles(newFiles, newCurrentPages, statusMessage)
  }, [_currentPages, _files, _labels, updateFiles])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (beforeDrop) {
      beforeDrop()
    }
    if (maxFiles && (_files.length + acceptedFiles.length > maxFiles)) {
      return setStatus({
        message: Mustache.render(_labels.maxFilesExceeded, {
          maxFiles: maxFiles
        }),
        type: 'ERROR'
      })
    }

    processFiles(acceptedFiles, rejectedFiles)

    if (afterDrop) {
      afterDrop()
    }
  }, [_files.length, afterDrop, beforeDrop, _labels, maxFiles, processFiles])

  const onDropRejected = (rejectedFiles) => {
    if (maxFileSize && rejectedFiles[0].size > maxFileSize) {
      setStatus({
        message: Mustache.render(_labels.fileIsTooBigLimitIs, {
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
    const statusMessage = _labels.removed + ' ' + filename
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
    <>
      <Modal modalOpen={modalOpen} modal={modal} />
      <div
        className={classNames('c-fileUpload', 'p-4', { 'c-fileUpload-active ': isDragActive }, className)}
        tabIndex={tabIndex}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className='c-fileUpload-placeholder'>
          <div className='c-fileUpload-placeholder-message'>
            {Mustache.render(_labels.dropFilesHere, {
              maxFiles: maxFiles,
              maxFileSize: bytes(maxFileSize),
              filFormat: acceptedMimetypes ? acceptedMimetypes.map(type => {
                return type.substring(type.indexOf('/') + 1, type.length).toUpperCase()
              }).join(', ') : _labels.all
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
                labels={_labels}
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
    </>
  )
}

FileUpload.propTypes = {
  acceptedMimetypes: PT.oneOfType([PT.string, PT.array]),
  afterDrop: PT.func,
  beforeDrop: PT.func,
  className: PT.string,
  currentPages: PT.array,
  files: PT.array,
  labels: PT.object,
  maxFiles: PT.number,
  maxFileSize: PT.number,
  onFileChange: PT.func,
  status: PT.object,
  tabIndex: PT.number
}
FileUpload.displayName = 'FileUpload'
export default FileUpload
