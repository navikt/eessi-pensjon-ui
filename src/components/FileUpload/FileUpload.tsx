/* global window, Uint8Array */

import bytes from 'bytes'
import classNames from 'classnames'
import defaultLabels from 'components/FileUpload/FileUpload.labels'
import Modal, { ModalContent } from 'components/Modal/Modal'
import _ from 'lodash'
import Mustache from 'mustache'
import PT from 'prop-types'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Labels } from 'declarations/types'
import FileFC, { IFile, IFiles } from '../File/File'
import './FileUpload.css'

interface Status {
  type?: string;
  message?: string;
}

export interface FileUploadProps {
  acceptedMimetypes?: Array<string>;
  afterFileDrop?: () => void;
  beforeFileDrop ?: () => void;
  className ?: string;
  files?: IFiles;
  labels?: Labels;
  maxFiles?: number;
  maxFileSize?: number;
  onFilesChanged?: (f: IFiles) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  acceptedMimetypes, afterFileDrop, beforeFileDrop, className, files = [], labels,
  maxFiles = 99, maxFileSize = 10485760, onFilesChanged
}: FileUploadProps): JSX.Element => {
  const [_files, setFiles] = useState<IFiles>(files.map(file => ({
    ...file,
    id: file.id || file.name + ' ' + new Date().getTime()
  })))
  const [_status, setStatus] = useState<Status>({})
  const [modal, setModal] = useState<ModalContent | undefined>(undefined)
  const _labels: Labels = { ...defaultLabels, ...labels }

  const closePreview = (): void => {
    setModal(undefined)
  }

  const openPreview = (file: IFile, initialPage: number): void => {
    setModal({
      modalContent: (
        <div style={{ cursor: 'pointer' }} onClick={closePreview}>
          <FileFC file={file} width={400} height={600} initialPage={initialPage} onContentClick={closePreview} />
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
    if (_.isFunction(onFilesChanged)) {
      onFilesChanged(newFiles)
    }
  }, [_status, onFilesChanged])

  const processFiles = useCallback((acceptedFiles: Array<File>, rejectedFiles: Array<File>) => {
    const newFiles = _.clone(_files)
    acceptedFiles.forEach((file: File) => {
      const reader: FileReader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onerror = error => { console.log(error) }
      reader.onloadend = async (e) => {
        // @ts-ignore
        const blob: Uint8Array = new Uint8Array(e.target.result)
        const len: number = blob.byteLength
        let buffer: string = ''
        for (let i: number = 0; i < len; i++) {
          buffer += String.fromCharCode(blob[i])
        }
        const base64: string = window.btoa(buffer)
        newFiles.push({
          id: !_.includes(_files, { name: file.name } as IFile) ? file.name : file.name + '-' + new Date().getTime(),
          size: file.size,
          name: file.name,
          mimetype: file.type,
          content: {
            base64: base64
          }
        })
        let statusMessage: string = _labels.accepted + ': ' + acceptedFiles.length + ', '
        statusMessage += _labels.rejected + ': ' + rejectedFiles.length + ', '
        statusMessage += _labels.total + ': ' + (acceptedFiles.length + rejectedFiles.length)
        updateFiles(newFiles, statusMessage)
      }
    })
    rejectedFiles.forEach(() => {
      let statusMessage: string = _labels.accepted + ': ' + acceptedFiles.length + ', '
      statusMessage += _labels.rejected + ': ' + rejectedFiles.length + ', '
      statusMessage += _labels.total + ': ' + (acceptedFiles.length + rejectedFiles.length)
      setStatus({
        message: statusMessage,
        type: 'OK'
      })
    })
  }, [_files, _labels, updateFiles])

  const onDrop = useCallback((acceptedFiles: Array<File>, rejectedFiles: Array<File>) => {
    if (_.isFunction(beforeFileDrop)) {
      beforeFileDrop()
    }
    if (maxFiles && (_files.length + acceptedFiles.length > maxFiles)) {
      return setStatus({
        message: Mustache.render(_labels.maxFilesExceeded!, {
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

  const onDropRejected = (rejectedFiles: Array<File>): void => {
    if (maxFileSize && rejectedFiles[0].size > maxFileSize) {
      setStatus({
        message: Mustache.render(_labels.fileIsTooBigLimitIs!, {
          maxFileSize: bytes(maxFileSize),
          size: bytes(rejectedFiles[0].size),
          file: rejectedFiles[0].name
        }),
        type: 'ERROR'
      })
    }
  }

  const removeFile = (file: IFile): void => {
    let statusMessage: string = _labels.removed!
    const newFiles: IFiles = _.filter(_files, f => {
      if (file.id === f.id) {
        statusMessage += ' ' + f.name
        return false
      }
      return true
    })
    updateFiles(newFiles, statusMessage)
  }

  const onLoadSuccess = (file: IFile): void => {
    const newFiles: IFiles = _files.map(f => {
      return file.id === f.id ? file : f
    })
    updateFiles(newFiles, undefined)
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
          {Mustache.render(_labels.dropFilesHere!, {
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
            <FileFC
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
  acceptedMimetypes: PT.array,
  afterFileDrop: PT.func,
  beforeFileDrop: PT.func,
  className: PT.string,
  files: PT.arrayOf(PT.shape({
    id: PT.string,
    size: PT.number.isRequired,
    name: PT.string.isRequired,
    numPages: PT.number,
    mimetype: PT.string.isRequired,
    content: PT.shape({
      text: PT.string,
      base64: PT.string
    }).isRequired
  }).isRequired).isRequired,
  labels: PT.object.isRequired,
  maxFiles: PT.number,
  maxFileSize: PT.number,
  onFilesChanged: PT.func
}
FileUpload.displayName = 'FileUpload'
export default FileUpload
