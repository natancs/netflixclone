import React from 'react';

import './styles.css';

function Header({ black }) {
  return (
    <header 
      className={black ? 'black' : ''} 
    >
      <div className="header--logo">
        <a href="/">
          <img src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png" alt="Netflix"/>
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="Usuário"/>
        </a>
      </div>
    </header>
  )  
}

export default Header;