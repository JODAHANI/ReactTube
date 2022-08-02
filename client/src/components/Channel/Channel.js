/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useParams , Link} from 'react-router-dom'
import axios from 'axios';
import { Card, Row , Col, Avatar } from 'antd'
import moment from 'moment';
import SubscribeBtn from '../VideoDetail/Section/SubscribeBtn'
const { Meta } = Card;
function Channel(props) {
    const { id } = useParams();
    const [VideoOwner, setVideoOwner] = useState(null)
    const [Video, setVideo] = useState([])
    const [UserTo, setUserTo] = useState('')
    const [Subscriber, setSubscriber] = useState(null)
    useEffect(() => {
        axios.get(`/api/users/${id}`).then(res => {
            console.log(res.data)
            setVideoOwner(res.data.user)
            setVideo(res.data.video)
            setUserTo(res.data.user._id)
        })
    }, [])
    const renderCards = Video.map((video, i) =>
        <Col lg={6} md={8} xs={24} key={i} className='video-card'>
            <Link to={`/video/detail/${video._id}`}>
                <Card
                    cover={
                        <img
                            alt="example"
                            src={`http://localhost:8080/${video.thumbnailPath}`}
                        />
                    }
                >
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title={video.title}
                        description={video.writer.name}
                    />
                    <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                        <p style={{ margin: '0.3rem 0 0 3rem', textAlign: 'left' }}>조회수 : {video.views}</p>
                        <p style={{ margin: '-0.3rem 0 0 3rem', textAlign: 'left' }}>{moment(video.createdAt).format("MMM Do YY")}</p>
                    </div>
                </Card>
            </Link>
        </Col>
    );
    if (VideoOwner != null) {
        return (
            <div style={{ width: '80%', padding: '1rem 1rem', margin: '0 auto' }}>
                <Card style={{ width: '100%', boxSizing: 'border-box' }}>
                    <div className='card-detail' style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            flex: 0.5,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <div className='channel-move' style={{ width: '50px', textAlign: 'center' }}>
                                <img
                                    src='https://joeschmoe.io/api/v1/random'
                                    alt='img'
                                    style={{ width: '80%' }}
                                />
                            </div>
                        </div>
                        <div style={{ flex: 6, marginLeft: '1rem' }}>
                            <p style={{ fontWeight: 'bold' }}>{VideoOwner.name}</p>
                            <p style={{ color: '#777' }}>구독자 : {
                                Subscriber == null ? VideoOwner.subscriber : Subscriber
                            } 명
                            </p>
                        </div>
                        <SubscribeBtn userTo={UserTo} user={props.user} setSubscriber={setSubscriber} />
                    </div>
                </Card>
                <Row gutter={[16, 16]} style={{padding : '1rem 1rem'}}>
                    {renderCards}
                </Row>
            </div>
        )
    }
}

export default Channel