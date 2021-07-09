import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './home.css'

import logo from '../../assets/logo.svg'

const Home = () => {
  return (
    <div id="home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Your marketplace<br/>for recycling</h1>
          <p>We help people to find collection points efficiently</p>

          <Link to="/collection-points/new">
            <span><FiLogIn /></span>
            <strong>Sign Up</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home
