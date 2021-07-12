import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './dropzone.css'

interface DropzoneProps {
  onFileUploaded: (file: File) => void
}

const Dropzone = (props: DropzoneProps) => {
  const onDrop = useCallback(acceptedFiles => {
    setSelectedFileUrl(URL.createObjectURL(acceptedFiles[0]))
    props.onFileUploaded(acceptedFiles[0])
  }, [props.onFileUploaded])

  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('')

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })
  return (
    <div className="dropzone" {...getRootProps()}>
      <input accept='image/*' {...getInputProps()} />

      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt='Collection Point thumbnail' />
          : (
              <p>
                <FiUpload />
                Collection point image
              </p>
            )
      }
    </div>
  )
}

export default Dropzone
