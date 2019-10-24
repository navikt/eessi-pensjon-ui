/* global window, Uint8Array */

import React, { useState, useCallback } from 'react'
import PT from 'prop-types'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import classNames from 'classnames'
import Mustache from 'mustache'
import bytes from 'bytes'
import File from '../File/File'
import Modal from '../Modal/Modal'
import defaultLabels from './FileUpload.labels'
import './FileUpload.css'

const FileUpload = ({
  acceptedMimetypes, afterFileDrop, beforeFileDrop, className, files = [], labels,
  maxFiles = 99, maxFileSize = 10485760, onFilesChanged
}) => {
  const [_files, setFiles] = useState(files.map(file => ({
    ...file,
    id: file.id || file.name + ' ' + new Date().getTime()
  })))
  const [_status, setStatus] = useState({})
  const [modal, setModal] = useState(undefined)
  const _labels = { ...defaultLabels, ...labels }

  const closePreview = () => {
    setModal(undefined)
  }

  const openPreview = (file, initialPage) => {
    setModal({
      modalContent: (
        <div style={{ cursor: 'pointer' }} onClick={closePreview}>
          <File file={file} width={400} height={600} initialPage={initialPage} onContentClick={closePreview} />
        </div>
      )
    })
  }

  const updateFiles = useCallback((newFiles, statusMessage) => {
    setFiles(newFiles)
    if (statusMessage) {
      setStatus({
        message: (statusMessage || _status),
        type: 'OK'
      })
    }
    if (_(onFilesChanged).isFunction()) {
      onFilesChanged(newFiles)
    }
  }, [_status, onFilesChanged])

  const processFiles = useCallback((acceptedFiles, rejectedFiles) => {
    const newFiles = _.clone(_files)
    acceptedFiles.forEach((file) => {
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
          id: !_.includes(_files, { name: file.name }) ? file.name : file.name + '-' + new Date().getTime(),
          size: file.size,
          name: file.name,
          mimetype: file.type,
          content: {
            base64: base64
          }
        })
        let statusMessage = _labels.accepted + ': ' + acceptedFiles.length + ', '
        statusMessage += _labels.rejected + ': ' + rejectedFiles.length + ', '
        statusMessage += _labels.total + ': ' + newFiles.length
        updateFiles(newFiles, statusMessage)
      }
    })
  }, [_files, _labels, updateFiles])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (_.isFunction(beforeFileDrop)) {
      beforeFileDrop()
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
    if (_.isFunction(afterFileDrop)) {
      afterFileDrop()
    }
  }, [_files.length, afterFileDrop, beforeFileDrop, _labels, maxFiles, processFiles])

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

  const removeFile = (file) => {
    let statusMessage = _labels.removed
    const newFiles = _.filter(_files, f => {
      if (file.id === f.id) {
        statusMessage += ' ' + f.name
        return false
      }
      return true
    })
    console.log(statusMessage)
    updateFiles(newFiles, statusMessage)
  }

  const onLoadSuccess = (file) => {
    const newFiles = _files.map(f => {
      return file.id === f.id ? file : f
    })
    updateFiles(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    onDropRejected: onDropRejected,
    accept: acceptedMimetypes,
    maxSize: maxFileSize
  })

  return (
    <div
      className={classNames('c-fileUpload', { 'c-fileUpload-active ': isDragActive }, className)}
      {...getRootProps()}
    >
      <Modal modal={modal} />
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
        {_files.map((file, i) => (
          <div key={i} className='mr-2'>
            <File
              file={file}
              showDeleteButton
              showDownloadButton
              showPreviewButton
              onLoadSuccess={onLoadSuccess}
              onDeleteFile={removeFile}
              onPreviewFile={openPreview}
            />
          </div>
        )
        )}
      </div>
    </div>
  )
}

FileUpload.propTypes = {
  acceptedMimetypes: PT.oneOfType([PT.string, PT.array]),
  afterFileDrop: PT.func,
  beforeFileDrop: PT.func,
  className: PT.string,
  files: PT.array,
  labels: PT.object,
  maxFiles: PT.number,
  maxFileSize: PT.number,
  onFilesChanged: PT.func
}
FileUpload.displayName = 'FileUpload'
export default FileUpload
