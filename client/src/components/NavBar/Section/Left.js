import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  Link
} from "react-router-dom";

function LeftMenu() {
  return (
    <Link to="/">
      <div className='nav-left nav-items' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faYoutube} size='2x' style={{ color: '#1890ff' }} />
        <h2 style={{ margin: 0 }}>ReactTube</h2>
      </div>
    </Link>
  )
}


export default LeftMenu



