import { useState } from 'react';
import axios from 'axios';

import { Card } from '@govtechsg/sgds-react/Card';
import { Row } from '@govtechsg/sgds-react/Row';
import { Col } from '@govtechsg/sgds-react/Col';
import { Form } from '@govtechsg/sgds-react/Form';
import { FileUpload } from '@govtechsg/sgds-react/FileUpload';
import { Button } from '@govtechsg/sgds-react';
import { ProgressBar } from '@govtechsg/sgds-react/ProgressBar';

export default function FileUploader({onComplete}: {onComplete: Function}) {

  const [selectedFile, setSelectedFile] = useState({});
  const handleSelectedFile = (data: FileList) => {
    setSelectedFile(data);
    handleUploadStatus('selected');
  };

  const [uploadStatus, setUploadStatus] = useState('primary');
  const handleUploadStatus = (status: string) => {
    switch (status) {
      case 'selected':
      default:
        setUploadStatus('primary');
        setDisableUpload(false);
        setShowProgress(false);
        setErrorMessage('');
        break;
      case 'uploading':
        setUploadStatus('primary');
        setDisableUpload(true);
        setShowProgress(true);
        setProgress(0);
        setErrorMessage('');
        break;
      case 'error':
        setUploadStatus('danger');
        setDisableUpload(false);
        setShowProgress(true);
        setProgress(100);
        break;
      case 'success':
        setUploadStatus('success');
        setDisableUpload(true);
        setShowProgress(true);
        setProgress(100);
        setErrorMessage('');
        break;
    }
  };

  const [disableUpload, setDisableUpload] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileUpload = () => {
    handleUploadStatus('uploading');

    axios.postForm('/api/transactions', {'file': (selectedFile as FileList).item(0)}, {
      onUploadProgress: (progressEvent) => {
        setProgress(progressEvent.loaded / progressEvent.total * 100 * 0.5);
      }
    }).then((response) => {
      handleUploadStatus('success');
      onComplete();
    }).catch((error) => {
      handleUploadStatus('error');

      if (error.response.data.message) {
        setErrorMessage('Error: ' + error.response.data.message);
      } else {
        setErrorMessage('Error: Server error');
      }

    });
  };

  return (
    <Card className='p-4 col-lg-6'>
      <Form>
        <Row>
          <Col sm='auto'>
            <FileUpload
              variant='outline-primary'
              controlId='fileUpload'
              onChangeFile={handleSelectedFile}
              selectedFile={selectedFile}
            >
              <i className='bi bi-file-earmark me-2'></i>Select file
            </FileUpload>
          </Col>

          <Col sm>
            <Button
              className='mb-2'
              disabled={disableUpload}
              onClick={handleFileUpload}
            >
              <i className='bi bi-upload me-2'></i>Upload file
            </Button>
          </Col>
        </Row>

        <Row>
          <Col sm>
            <ProgressBar
              animated={progress !== 100}
              variant={uploadStatus}
              isChild={!showProgress}
              now={progress}
            />
          </Col>
        </Row>

        {errorMessage &&
          <Row>
            <Col sm>
              <div className='text-danger'>{errorMessage}</div>
            </Col>
          </Row>
        }
      </Form>
    </Card>
  );
}