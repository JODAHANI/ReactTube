import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';

function Sidebar() {
    const [SideVideos, setSideVideos] = useState([])
    useEffect(() => {
        axios.get('/api/video/get-videos').then((res) => {
            if (res.data.success) {
                setSideVideos(res.data.video)
            }
        })
    }, [])
    const renderSideCard = SideVideos.map((video, i) =>
        <a key={i} href={`/video/detail/${video._id}`}>
            <div className='side-bar' style={{ display: 'flex', margin: '0.5rem 0' }}>
                <div className='left' style={{ flex: '5', width: '65%' }}>
                    <img src={`http://localhost:8080/${video.thumbnailPath}`} alt='img' style={{ width: '100%' }} />
                </div>
                <div className='right' style={{ flex: '5', padding: '0 1rem' }}>
                    <h2 style={{ fontSize: '0.9rem' }}>{video.title}</h2>
                    <h3 style={{ fontSize: '0.9rem', marginBottom: '0.8rem' }}>{video.writer.name}</h3>
                    <h4 style={{ fontSize: '0.7rem' }}>조회수 : {video.views} 회</h4>
                    <h4 style={{ fontSize: '0.7rem' }}>{moment(video.createdAt).format("MMM Do YY")}</h4>
                </div>
            </div>
        </a>
    )
    if (SideVideos.length > 0) {
        return (
            <div style={{ padding: '2rem 0' }}>
                {renderSideCard}
            </div>
        )
    }
}

export default Sidebar