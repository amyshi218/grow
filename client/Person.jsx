import React, { useState, useEffect } from 'react'
import api from '../server/apiconnect'

export default function Person({ data, setPage, planetIdx, personIdx }) {

  const [info, setInfo] = useState()

  const getPersonInfo = () => {
    const personInfo = data[planetIdx].residents[personIdx]
    api.getPerson(personInfo)
      .then((data) => {
        setInfo(data.data)
      })
      .catch((err) => console.log('Error getting person info', err))
  }

  const formatDate = (str) => {
    const date = new Date(str)
    const month = date.getMonth() > 8 ? date.getMonth() + 1 : '0' + date.getMonth() + 1
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  useEffect(() => {
    getPersonInfo()
  }, [])

  return (
    <div style={{ marginBottom: 50 }}>
      <button type="button" className="btn btn-outline-success" style={{ margin: 20, width: 100 }} onClick={() => setPage('residents')}>Back</button>
      <div className="table-container" style={{ width: '80%', margin: '50px auto' }}>
        <table className="table table-dark" id="person-table" style={{ marginBottom: 50 }} >
          <thead>
            <tr>
              <th style={{ color: '#FFE81F' }}>{data[planetIdx].name} Resident Info</th>
            </tr>
          </thead>
          {info && (
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{info.name}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#FF00FF' }}>Height</th>
                <td>{info.height}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#15f2fd' }}>Mass</th>
                <td>{info.mass}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#2FF924' }}>Hair Color</th>
                <td>{info.hair_color}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#FFF01F' }}>Skin Color</th>
                <td>{info.skin_color}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#EB212E' }}>Eye Color</th>
                <td>{info.eye_color}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#FF00FF' }}>Birth Year</th>
                <td>{info.birth_year}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#15f2fd' }}>Gender</th>
                <td>{info.gender}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#2FF924' }}>Home World</th>
                <td>{info.homeworld}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#FFF01F' }}>Films</th>
                <td>{info.films.map((film, idx) => (<div key={idx}>{film}</div>))}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#EB212E' }}>Species</th>
                <td>{info.species.map((spec, idx) => (<div key={idx}>{spec}</div>))}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#FF00FF' }}>Vehicles</th>
                <td>{info.vehicles.map((vehicle, idx) => (<div key={idx}>{vehicle}</div>))}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#15f2fd' }}>Starships</th>
                <td>{info.starships.map((starship, idx) => (<div key={idx}>{starship}</div>))}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#2FF924' }}>Created</th>
                <td>{formatDate(info.created)}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#FFF01F' }}>Edited</th>
                <td>{formatDate(info.edited)}</td>
              </tr>
              <tr>
                <th scope="row" style={{ color: '#EB212E' }}>URL</th>
                <td>{info.url}</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

