/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Avatar, Button, message } from 'antd';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import '../assets/VideoDetail.css'
import Sidebar from './Section/Sidebar';
import SubscribeBtn from './Section/SubscribeBtn';
import Comment from './Section/Comment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Meta } = Card;




function VideoDetail(props) {
    const [Subscriber, setSubscriber] = useState(null)
    const [Video, setVideo] = useState(null)
    const [UserTo, setUserTo] = useState('')
    const [EditPower, setEditPower] = useState(false)

    let { videoId } = useParams();
    useEffect(() => {
        let body = {
            id: videoId
        }
        axios.post('/api/video/get-video', body).then(res => {
            setVideo(res.data.video)
            setUserTo(res.data.video.writer._id)
            if (props.user.userData.id == res.data.video.writer._id) setEditPower(true)
        })

    }, [])
    const removeVideo = () => {
        axios.get(`/api/video/remove/${videoId}`).then(res => {
            if(res.data.success) {
                message.success('비디오가 삭제되었습니다.',1)
                props.navigate('/')
            }
        })
    }
    const editVideo = () => {
        props.navigate(`/video/edit/${videoId}`)
    }
    if (Video != null) {
        return (
            <div>
                <Row>
                    <Col lg={18} xs={24}>
                        <div className='detail' style={{ width: '100%', padding: '2rem 4rem 4rem 4rem' }}>
                            <div className="postPage">
                                <video controls style={{ width: '100%', maxHeight : '650px'}}>
                                    <source src={`http://localhost:8080/${Video.videoPath}`}></source>
                                </video>
                                {/* <video autoPlay={true} style={{ width: '100%'}} src={`http://localhost:8080/${Video.videoPath}`}></video> */}
                            </div>
                            <div className='' style={{ width: '100%', padding: '1rem 2.5rem', }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ color: '#222', margin: 0 }}>{Video.title}</h2>
                                    {
                                        EditPower == true ? 
                                        <div>
                                            <Button 
                                                type="primary" ghost shape="round" 
                                                icon={<EditOutlined />} 
                                                size='small' 
                                                onClick={editVideo}
                                                >
                                                수정
                                            </Button>
                                            <Button 
                                                type="primary" ghost shape="round" 
                                                icon={<DeleteOutlined />} 
                                                size='small'
                                                style={{ marginLeft: '0.5rem' }}
                                                onClick={removeVideo}
                                                >
                                                삭제
                                            </Button>
                                        </div>
                                        : null
                                    }
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.3rem'}}>
                                    <h3 style={{ color: '#555', fontSize: '0.9rem', padding: '0.5rem 0.2rem', margin: 0 }}>조회수 : {Video.views}회</h3>
                                    <h3 style={{ color: '#555', fontSize: '0.9rem', padding: '0.5rem 0.2rem', margin: 0 }}>/</h3>
                                    <h4 style={{ color: '#555', fontSize: '0.9rem', padding: '0.5rem 0.2rem', margin: 0 }}>{moment(Video.createdAt).format("MMM Do YY")}</h4>
                                </div>
                                <p style={{ color: '#777' }}>{Video.description}</p>
                            </div>
                            <div style={{ width: '100%', padding: '1rem 1rem', }}>
                                <Card style={{ width: '100%', boxSizing: 'border-box' }}>
                                    <div className='card-detail' style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{
                                            flex: 0.5,
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}>
                                            <div className='channel-move' style={{ width: '50px', textAlign: 'center' }}>
                                                <Link className='channel-move' to={`/users/channel/${UserTo}`}>
                                                    <img
                                                        src='https://joeschmoe.io/api/v1/random'
                                                        alt='img'
                                                        style={{ width: '80%' }}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                        <div style={{ flex: 6, marginLeft: '1rem' }}>
                                            <Link className='channel-move' to={`/users/channel/${UserTo}`}>
                                                <span style={{ fontWeight: 'bold' }}>{Video.writer.name}</span>
                                            </Link>
                                            <p style={{ color: '#777' }}>구독자 : {
                                                Subscriber == null ? Video.writer.subscriber : Subscriber
                                            }명</p>
                                        </div>
                                        <SubscribeBtn userTo={UserTo} user={props.user} setSubscriber={setSubscriber} />
                                    </div>
                                </Card>
                            </div>
                            <div>
                                <Comment currentUser={props.user} videoId={videoId}/>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} xs={24} style={{maxWidth : '80%', margin : '0 auto'}}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }

}

export default VideoDetail

