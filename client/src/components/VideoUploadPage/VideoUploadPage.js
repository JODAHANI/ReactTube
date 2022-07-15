import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Form, Input, Select, Button, } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;



function VideoUploadPage() {
  const [files, setFiles] = useState(null);
  const [inputComment, setinputComment] = useState('Select Video')
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [Type, setType] = useState(0)
  const [Category, setCategory] = useState(0)


  function onDrop(file) {
    let url = URL.createObjectURL(file[0])
    setFiles(url);
  }

  function formFinish() {
    console.log(Title, Description, Type, Category)
  }
  const changeTitle = e => {
    setTitle(e.target.value)
  }
  const changeDescription = e => {
    setDescription(e.target.value)
  }
  const changeType = e => {
    setType(e)
  }
  const changeCategory = e => {
    setCategory(e)
  }
  const changeVideo = e => {
    let file = e.target.files[0];
    setinputComment(file.name)
  }
  const Continents = [
    { key: 1, value: "Film & Animation" },
    { key: 2, value: "Documentary" },
    { key: 3, value: "Fun" },
    { key: 4, value: "Sport" },
    { key: 5, value: "Music" },
    { key: 6, value: "Food & Mukbang" },
    { key: 7, value: "Pets & Animals" },
  ]
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <Form className='upload-form' onFinish={formFinish}>
        <label>Thumnail</label>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone onDrop={onDrop} multiple={false} >
            {({ getRootProps, getInputProps }) => (
              <section>
                {
                  files != null
                    ? <div
                      className='drop-zone' style={{
                        display: 'flex', width: '300px', height: '240px', border: '1px solid lightgray',
                        borderRadius: '5px', marginBottom: '1rem', alignItems: 'center',
                        justifyContent: 'center', 
                      }}
                    >
                      <img src={files} alt='img' style={{display:'block',width:'100%', height:'100%'}}/>
                    </div>
                    : <div className='drop-zone' style={{
                      display: 'flex', width: '300px', height: '240px', border: '1px solid lightgray',
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
        <Input type='file' id='video-input' onChange={changeVideo} required />
        <label htmlFor='title'>Title</label>
        <Input id='title' required onChange={changeTitle} />
        <label htmlFor='description'>description</label>
        <TextArea id='description' required onChange={changeDescription} />
        <div style={{ display: 'flex', justifyContent: 'space-evenly', }}>
          <Select defaultValue="Public" onChange={changeType} style={{ marginBottom: '1rem', width: '45%', textAlign: 'center' }} >
            <Option value="0">Public</Option>
            <Option value="1">Private</Option>
          </Select>
          <Select defaultValue="Film & Animation" onChange={changeCategory} style={{ marginBottom: '1rem', width: '45%', textAlign: 'center' }} >
            {Continents.map((item, i) =>
              <Option key={i} value={item.key}>{item.value}</Option>
            )}
          </Select>
        </div>
        <Button type="primary" htmlType="submit" style={{ fontWeight: '500' }}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage 