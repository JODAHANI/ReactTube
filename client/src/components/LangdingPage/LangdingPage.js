/* eslint-disable */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import antd, { Col, Row, Avatar, Card } from 'antd'
import moment from 'moment';
import { Link } from 'react-router-dom';

const { Meta } = Card;


function LangdingPage(props) {
  const [Video, setVideo] = useState([])
  useEffect(() => {
    axios.get('/api/video/get-videos').then(res => {
      if (res.data.success) {
        setVideo(res.data.video)
      }
    })
  }, [props.navigate])
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


  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Row gutter={[50, 16]}>
        {renderCards}
      </Row>
    </div>
  )
}

export default LangdingPage