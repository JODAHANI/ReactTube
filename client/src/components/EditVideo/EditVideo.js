/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Input, Select, Button, message } from 'antd';
const { TextArea } = Input;
const { Option } = Select;


function EditVideo(props) {
    const { id } = useParams();
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Privacy, setPrivacy] = useState(0)
    const [Category, setCategory] = useState(0)
    const body = {
        id
    }
    useEffect(() => {
        axios.post(`/api/video/get-video`, body).then(res => {
            setTitle(res.data.video.title)
            setDescription(res.data.video.description)
            setPrivacy(res.data.video.privacy)
            setCategory(res.data.category)
            console.log(res.data)
        })
    }, [])
    const Continents = [
        { key: 1, value: "Film & Animation" },
        { key: 2, value: "Documentary" },
        { key: 3, value: "Fun" },
        { key: 4, value: "Sports" },
        { key: 5, value: "Music" },
        { key: 6, value: "Food & Mukbang" },
        { key: 7, value: "Pets & Animals" },
    ]
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
    const onFinish = () => {
        if(Category) {
            const body = {
                id,
                title: Title,
                description: Description,
                privacy: Privacy,
                category: Category,
            }
            axios.post(`/api/video/edit`,body).then(res => {
                if(res.data.success) {
                    props.navigate(`/video/detail/${id}`)
                }
            })
        } else {
            message.error('카테고리를 선택해주세요.',1)
        }
        
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Form
                className='upload-form'
                method="POST"
                onFinish={onFinish}
            >
                <label htmlFor='title'>Title</label>
                <Input id='title' required value={Title} onChange={changeTitle} />
                <label htmlFor='description'>description</label>
                <TextArea
                    id='description'
                    required
                    value={Description}
                    onChange={changeDescription}
                    style={{ marginBottom: '1rem', height: '120px', resize: 'none', }}
                />
                <Select
                    defaultValue="Public"
                    onChange={changeType}
                    style={{ display: 'block', marginBottom: '1rem', textAlign: 'center', }}
                >
                    <Option value="0">Public</Option>
                    <Option value="1">Private</Option>
                </Select>
                <Select
                    defaultValue='Select Category'
                    onChange={changeCategory}
                    style={{ display: 'block', marginBottom: '1rem', textAlign: 'center' }} >
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

export default EditVideo
