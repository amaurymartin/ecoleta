import React from 'react'
import { FiLogIn } from 'react-icons/fi'

import './home.css'

import logo from '../../assets/logo.svg'

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Your marketplace</h1>
          <h1>for recycling</h1>
          <p>We help people find collection points efficiently</p>

          <a href="/collection-points/new">
            <span><FiLogIn /></span>
            <strong>Sign Up</strong>
          </a>
        </main>
      </div>
    </div>
  )
}

export default Home
