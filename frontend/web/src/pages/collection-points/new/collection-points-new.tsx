import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from './locationMarker'

import './collection-points-new.css'

import logo from '../../../assets/logo.svg'

import api from '../../../services/api'

import ibge from '../../../services/ibge'

interface RecyclingType {
  id: number
  description: string
  // eslint-disable-next-line camelcase
  image_url: string
}

interface IbGEUFResponse {
  sigla: string
  nome: string
}

const { REACT_APP_API_SCHEME, REACT_APP_API_DOMAIN, REACT_APP_API_PORT } = process.env

const CollectionPointsNew = () => {
  const [brazilianStates, setBrazilianStates] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState<string>('0')

  const [brazilianStateCities, setBrazilianStateCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('0')

  const [initialPosition, setInitialPosition] = useState<[number, number]>([-3.7436121, -38.5194538])
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([-3.7436121, -38.5194538])

  const [recyclingTypes, setRecyclingTypes] = useState<RecyclingType[]>([])
  const [recyclables, setRecyclables] = useState<number[]>([])

  const [formData, setFormData] = useState({
    name: null,
    nickname: null,
    email: null,
    whatsapp: null,
    street: null,
    number: null,
    complement: null
  })

  const history = useHistory()

  useEffect(() => {
    api.get('recycling-types').then(res => {
      setRecyclingTypes(res.data)
    })
  }, [])

  useEffect(() => {
    ibge.get<IbGEUFResponse[]>('localidades/estados?orderBy=nome').then(res => {
      setBrazilianStates(res.data.map(state => state.sigla))
    })
  }, [])

  useEffect(() => {
    if (selectedState === '0') return

    ibge.get<IbGEUFResponse[]>(`localidades/estados/${selectedState}/municipios?orderBy=nome`)
      .then(res => {
        setBrazilianStateCities(res.data.map(city => city.nome))
      })
  }, [selectedState])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setInitialPosition([position.coords.latitude, position.coords.longitude])
    })
  }, [])

  function selectState (event: ChangeEvent<HTMLSelectElement>) {
    setSelectedState(event.target.value)
  }

  function selectCity (event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value)
  }

  function fillForm (event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  function selectRecyclingType (recyclingTypeId: number) {
    if (recyclables.includes(recyclingTypeId)) {
      setRecyclables(recyclables.filter(recyclabe => recyclabe !== recyclingTypeId))
    } else {
      setRecyclables([...recyclables, recyclingTypeId])
    }
  }

  async function createCollectionPoint (event: FormEvent) {
    event.preventDefault()

    const { name, nickname, email, whatsapp, street, number, complement } = formData

    const payload = {
      collectionPoint: {
        name: name,
        nickname: nickname,
        whatsapp: whatsapp,
        email: email,
        imageBase64: 'imageBase64',
        recyclables: recyclables,
        address: {
          street: street,
          number: number,
          complement: complement,
          city: selectedCity,
          state: selectedState,
          country: 'Brazil',
          latitude: currentPosition[0],
          longitude: currentPosition[1]
        }
      }
    }

    // TODO: catch failure
    await api.post('collection-points', payload)
    alert('Collection point created')

    history.push('/')
  }

  return (
    <div id="collection-points-new">
        <header>
          <img src={logo} alt="Ecoleta" />

          <Link to="/">
            <FiArrowLeft />
            Home
          </Link>
        </header>

        <form onSubmit={createCollectionPoint}>
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
                onChange={fillForm}
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={fillForm}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="text"
                  onChange={fillForm}
                />
              </div>
              <div className="field">
                <label htmlFor="nickname">Nickname</label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  onChange={fillForm}
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
                onChange={fillForm}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="number">Number</label>
                <input
                  id="number"
                  name="number"
                  type="text"
                  onChange={fillForm}
                />
              </div>
              <div className="field">
                <label htmlFor="complement">Complement</label>
                <input
                  id="complement"
                  name="complement"
                  type="text"
                  onChange={fillForm}
                />
              </div>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="state">State</label>
                <select id="state" name="state" value={selectedState} onChange={selectState}>
                  <option value="0">Select your state</option>
                  {brazilianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">City</label>
                <select id="city" name="city" value={selectedCity} onChange={selectCity}>
                  <option value="0">Select your city</option>
                  {brazilianStateCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <MapContainer center={initialPosition} zoom={13}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
              />
            </MapContainer>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Recyclabes</h2>
              <span>Select your recyclabes</span>
            </legend>

            <ul className="recyclabes-grid">
              {
                recyclingTypes.map(recyclingType => (
                  <li
                    key={recyclingType.id}
                    className={recyclables.includes(recyclingType.id) ? 'selected' : '' }
                    onClick={() => selectRecyclingType(recyclingType.id)}
                  >
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
