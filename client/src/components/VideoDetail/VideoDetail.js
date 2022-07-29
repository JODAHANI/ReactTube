/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Avatar } from 'antd';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import '../assets/VideoDetail.css'
import Sidebar from './Section/Sidebar';
import SubscribeBtn from './Section/SubscribeBtn';
const { Meta } = Card;



function VideoDetail(props) {
    const [Video, setVideo] = useState(null)
    const [UserTo, setUserTo] = useState('')
    let { videoId } = useParams();
    useEffect(() => {
            let body = {
                id: videoId
            }
            axios.post('/api/video/get-video', body).then(res => {
                setVideo(res.data.video)
                setUserTo(res.data.video.writer._id)
            })
            
    }, [])
    if (Video != null) {
        return (
            <div>
                <Row>
                    <Col lg={18} xs={24}>
                        <div className='detail' style={{ width: '100%', padding: '2rem 4rem 4rem 4rem' }}>
                            <div className="postPage">
                                <video controls style={{ width: '100%', }}>
                                    <source src={`http://localhost:8080/${Video.videoPath}`}></source>
                                </video>
                                {/* <video autoPlay={true} style={{ width: '100%'}} src={`http://localhost:8080/${Video.videoPath}`}></video> */}
                            </div>
                            <div className='' style={{ width: '100%', padding: '1rem 2.5rem', }}>
                                <h2 style={{ color: '#222', margin: 0 }}>{Video.title}</h2>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
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
                                            <div style={{ width: '50px', textAlign: 'center' }}>
                                                <img
                                                    src='https://joeschmoe.io/api/v1/random'
                                                    alt='img'
                                                    style={{ width: '80%' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ flex: 6, marginLeft: '1rem' }}>
                                            <p style={{ fontWeight: 'bold' }}>{Video.writer.name}</p>
                                            <p style={{ color: '#777' }}>구독자 : {Video.writer.subscriber}명</p>
                                        </div>
                                        <SubscribeBtn userTo={UserTo} user={props.user}/>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} xs={24}>
                        <Sidebar />
                    </Col>
                </Row>
            </div>
        )
    }

}

export default VideoDetail

