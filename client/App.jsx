import React, { useState, useEffect } from 'react'
import Planets from './Planets.jsx'
import Residents from './Residents.jsx'
import Person from './Person.jsx'
import api from '../server/apiconnect'
import logo from '../public/star-wars-logo.png'

export default function App() {

  const [data, setData] = useState([])
  const [page, setPage] = useState('planets')
  const [planetIdx, setPlanetIdx] = useState()
  const [personIdx, setPersonIdx] = useState()

  const [filteredPlanets, setFilteredPlanets] = useState([])
  const [filteredStatus, setFilteredStatus] = useState(false)
  const [currentPlanets, setCurrentPlanets] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const getData = (url) => {
    api.getPlanets(url)
      .then((resp) => {
        setData(prevState => [...prevState, ...resp.data.results])
        setCurrentPlanets(prevState => [...prevState, ...resp.data.results])
        if (resp.data.next) {
          getData(resp.data.next)
        }
      })
      .catch((err) => console.log('err getting in client', err))
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    filteredStatus ? null : setCurrentPlanets(data)
  }, [filteredStatus]);


  useEffect(() => {
    setCurrentPlanets(filteredPlanets)
  }, [filteredPlanets])


  const showPage = () => {
    if (page === 'planets') {
      return <Planets currentPlanets={currentPlanets} data={data} setPage={setPage} setPlanetIdx={setPlanetIdx} setFilteredPlanets={setFilteredPlanets} setFilteredStatus={setFilteredStatus} setSearchTerm={setSearchTerm} searchTerm={searchTerm} filteredStatus={filteredStatus} />
    }
    if (page === 'residents') {
      return <Residents data={data} setPage={setPage} planetIdx={planetIdx} setPersonIdx={setPersonIdx} setFilteredStatus={setFilteredStatus} />
    }
    if (page === 'person') {
      return <Person data={data} setPage={setPage} planetIdx={planetIdx} personIdx={personIdx} />
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={logo} alt="Star Wars" style={{ marginTop: 50 }} />
      {data && showPage()}
    </div >
  )
}

