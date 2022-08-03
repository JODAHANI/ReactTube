import React, { useState } from 'react'
import { Button, Form,  } from 'antd'
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios';

function Comment(props) {
    const [userComment, setuserComment] = useState('')
    const onFinish = () => {
        let currentUser = props.currentUser.userData
        const body ={
            id : props.videoId,
            writer : currentUser.id,
            text : userComment,
        }
        axios.post('/api/comment/make',body).then(res => {
            console.log(res.data)
        })
    }
    const commentHandler = (e) => {
        setuserComment(e.target.value)
    }
    return (
        <div className='reply' style={{ marginTop: '1.5rem' }}>
            <div className='reply-write-user' style={{ display: 'flex', alignItems: 'center' }}>
                <div className='user-left' style={{ flex: '1', textAlign: 'center' }}>
                    <img
                        src='https://joeschmoe.io/api/v1/random'
                        alt='img'
                        style={{ maxWidth: '40px' }}
                    />
                </div>
                <div className='user-right' style={{ flex: '9', padding: '0 1rem', }}>
                    <Form
                        style={{ display: 'flex' }}
                        onFinish={onFinish}
                    >
                        <div style={{ flex: '9' }}>
                            <input className='reply-input'placeholder='댓글추가' onChange={commentHandler}/>
                            <div className='reply-input-under-line'></div>
                        </div>
                        <div style={{ flex: '1', marginLeft: '1rem' }}>
                            <Button type="primary" icon={<SendOutlined />} onClick={onFinish} />
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Comment