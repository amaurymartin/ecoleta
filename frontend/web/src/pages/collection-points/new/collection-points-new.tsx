import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import './collection-points-new.css'

import logo from '../../../assets/logo.svg'

import api from '../../../services/api'

interface RecyclingType {
  id: number
  description: string
  // eslint-disable-next-line camelcase
  image_url: string
}

const { REACT_APP_API_SCHEME, REACT_APP_API_DOMAIN, REACT_APP_API_PORT } = process.env

const CollectionPointsNew = () => {
  const [recyclingTypes, setRecyclingTypes] = useState<RecyclingType[]>([])

  useEffect(() => {
    api.get('recycling-types').then(res => {
      setRecyclingTypes(res.data)
    })
  }, [])

  return (
    <div id="collection-points-new">
        <header>
          <img src={logo} alt="Ecoleta" />

          <Link to="/">
            <FiArrowLeft />
            Home
          </Link>
        </header>

        <form action="">
          <h1>New collection point</h1>

          <fieldset>
            <legend>
              <h2>Infos</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="text"
                />
              </div>
              <div className="field">
                <label htmlFor="nickname">Nickname</label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Address</h2>
              <span>Select your address on the map</span>
            </legend>

            <div className="field">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                name="street"
                type="text"
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="number">Number</label>
                <input
                  id="number"
                  name="number"
                  type="text"
                />
              </div>
              <div className="field">
                <label htmlFor="complement">Complement</label>
                <input
                  id="complement"
                  name="complement"
                  type="text"
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="state">State</label>
                <select id="state" name="state">
                  <option value="0">Select your state</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">City</label>
                <select id="city" name="city">
                  <option value="0">Select your city</option>
                </select>
              </div>
            </div>

            <MapContainer center={[-3.7436121, -38.5194538]} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-3.7436121, -38.5194538]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Recyclabes</h2>
              <span>Select your recyclabes</span>
            </legend>

            <ul className="recyclabes-grid">
              {console.log(recyclingTypes)}
              {
                recyclingTypes.map(recyclingType => (
                  <li key={recyclingType.id}>
                    <img
                      src={`${REACT_APP_API_SCHEME}://${REACT_APP_API_DOMAIN}:${REACT_APP_API_PORT}${recyclingType.image_url}.svg`}
                      alt={recyclingType.description}
                    />
                    <span>{recyclingType.description}</span>
                  </li>
                ))
              }
            </ul>
          </fieldset>

          <button type="submit">
            Save
          </button>
        </form>
    </div>
  )
}

export default CollectionPointsNew