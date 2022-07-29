/* eslint-disable */
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios';
import { Form, Input, Select, Button, message, } from 'antd';
import { PlusOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { TextArea } = Input;
const { Option } = Select;




function VideoUploadPage(props) {
  const [VideoFile, setVideoFile] = useState('')
  const [ThumnailPath, setThumnailPath] = useState('')
  const [inputComment, setinputComment] = useState('Select Video')
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [Privacy, setPrivacy] = useState(0)
  const [Category, setCategory] = useState(0)

  function dropCancleHandler(props) {
    setThumnailPath('')
    const body = {
      ThumnailPath: ThumnailPath
    }
    axios.post('/api/video/thumbnail-delete', body).then(res => {
      console.log(res.data)
    })
  }
  function onDrop(files) {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append('file', files[0]);

    axios.post('/api/video/thumbnail-upload-files', formData, config).then(res => {
      if(res.data.err) {
        props.navigate('/video/upload')
      } else {
        setThumnailPath(res.data.filePath)
      }
    })
  }
  const changeTitle = e => {
    setTitle(e.target.value)
  }
  const changeDescription = e => {
    setDescription(e.target.value)
  }
  const changeType = e => {
    setPrivacy(e)
  }
  const changeCategory = e => {
    setCategory(e)
  }
  const changeVideo = e => {
    let file = e.target.files[0];
    file['path'] = file.name;
    setVideoFile(file)
    setinputComment(file.name)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = () => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append('file', VideoFile)
    // axios.post('/api/video/upload',formData,config).then(res => {
    //   console.log(res.data)
    // })
    axios.post('/api/video/video-save', formData, config).then(res => {
      if (res.data.success) {
        const body = {
          writer: props.user.userData.id,
          title: Title,
          description: Description,
          privacy: Privacy,
          category: Category,
          thumbnailPath: ThumnailPath,
          videoPath: res.data.filePath,
        }
        axios.post('/api/video/upload-video', body).then(res => {
          if (res.data.success) {
            message.success('업로드 성공 ✔')
            props.navigate('/')
          }
        })
      }
    })
  };
  const Continents = [
    { key: 1, value: "Film & Animation" },
    { key: 2, value: "Documentary" },
    { key: 3, value: "Fun" },
    { key: 4, value: "Sports" },
    { key: 5, value: "Music" },
    { key: 6, value: "Food & Mukbang" },
    { key: 7, value: "Pets & Animals" },
  ]
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <Form className='upload-form'
        method="POST"
        encType="multipart/form-data"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
      >
        <label>Thumnail</label>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone onDrop={onDrop} multiple={false} required>
            {({ getRootProps, getInputProps }) => (
              <section>
                {
                  ThumnailPath.length >= 1
                    ? <div
                      className='drop-zone' style={{
                        width: '320px', height: '240px', border: '1px solid lightgray',
                        borderRadius: '5px', marginBottom: '1rem', position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <img src={`http://localhost:8080/${ThumnailPath}`} alt='img' style={{ display: 'block', width: '100%', height: '100%' }} />
                      <CloseOutlined
                        onClick={dropCancleHandler}
                        style={{
                          display: 'block', position: 'absolute', top: '1rem', right: '1rem',
                        }}
                      />
                    </div>
                    : <div className='drop-zone' style={{
                      display: 'flex', width: '320px', height: '240px', border: '1px solid lightgray',
                      borderRadius: '5px', marginBottom: '1rem', alignItems: 'center',
                      justifyContent: 'center',
                    }}
                      {...getRootProps()}>
                      <input {...getInputProps()} />
                      <PlusOutlined style={{ fontSize: '3rem', fontWeight: '400' }} />
                    </div>
                }
              </section>
            )}
          </Dropzone>
        </div>
        <label>Video</label>
        <label className='label' htmlFor='video-input'><UploadOutlined /> {inputComment}</label>
        <Input type='file' accept='video/*' id='video-input' onChange={changeVideo} required />
        <label htmlFor='title'>Title</label>
        <Input id='title' required onChange={changeTitle} />
        <label htmlFor='description'>description</label>
        <TextArea id='description' required onChange={changeDescription} />
        <Select defaultValue="Public" onChange={changeType} style={{ display: 'block', marginBottom: '1rem', textAlign: 'center' }} >
          <Option value="0">Public</Option>
          <Option value="1">Private</Option>
        </Select>
        <Select defaultValue="Film & Animation" onChange={changeCategory} style={{ display: 'block', marginBottom: '1rem', textAlign: 'center' }} >
          {Continents.map((item, i) =>
            <Option key={i} value={item.key}>{item.value}</Option>
          )}
        </Select>
        <Button type="primary" htmlType="submit" style={{ fontWeight: '500' }} >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage 