import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {Card} from 'antd'
import SubscribeBtn from '../VideoDetail/Section/SubscribeBtn'

function Channel(props) {
    const { id } = useParams();
    const [VideoOwner, setVideoOwner] = useState(null)
    const [Video, setVideo] = useState([])
    const [UserTo, setUserTo] = useState('')
    const [Subscriber,setSubscriber] = useState(null)
    useEffect(() => {
        axios.get(`/api/users/${id}`).then(res => {
            console.log(res.data)
            setVideoOwner(res.data.user)
            setVideo(res.data.video)
            setUserTo(res.data.user._id)
        })
    }, [])
    if (VideoOwner != null) {
        return (
            <div style={{ width: '80%', padding: '1rem 1rem', margin : '0 auto'}}>
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
            </div>
        )
    }
}

export default Channel