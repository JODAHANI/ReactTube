/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { CheckOutlined,SmileOutlined } from '@ant-design/icons';
import axios from 'axios'

function SubscribeBtn(props) {
    const [CheckSubscriber, setCheckSubscriber] = useState(false)
    useEffect(() => {
        let data = {
            userTo: props.userTo
        }
        axios.post('/api/subscribe/', data).then(res => {
            if (res.data.success) {
                console.log(res.data.subscriber)
                let videoHost = res.data.subscriber
                let currentUser = props.user.userData.id
                let find = videoHost.userFrom.indexOf(currentUser);
                (find === -1) ? setCheckSubscriber(false) : setCheckSubscriber(true)
            }
        })
    }, [])
    const subscriptionManagement = () => {
        if(!CheckSubscriber) {
            let body = { 
                userToId : props.userTo,
                userFromId : props.user.userData.id
            }
            axios.post('/api/subscribe/on-subscribe',body).then(res => {
                console.log(res.data)
                setCheckSubscriber(true)
            })
        } else {
            let body = { 
                userToId : props.userTo,
                userFromId : props.user.userData.id
            }
            axios.post('/api/subscribe/on-subscribe',body).then(res => {
                console.log(res.data)
                setCheckSubscriber(false)
            })
        }
    }
    return (
        <div>
            {!CheckSubscriber 
                ? <button className='subscribe-btn' onClick={subscriptionManagement}>
                    <SmileOutlined />
                    <span style={{marginLeft: '0.5rem'}}>subscribe</span>
                </button>
                : <button className='unsubscribe-btn' onClick={subscriptionManagement}>
                    <CheckOutlined />
                    <span style={{marginLeft: '0.5rem'}}>subscribing</span>
                </button>
            }
        </div>
    )
}

export default SubscribeBtn