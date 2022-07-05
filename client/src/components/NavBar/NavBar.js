import React from 'react'
import LeftMenu from './Section/Left';
import RightMenu  from './Section/Right';

function NavBar() {
  return (
    <nav className='navigation'>
      <LeftMenu />
      <RightMenu  />
    </nav>
  )
}

export default NavBar