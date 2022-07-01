import React, { useState, useEffect } from 'react'

export default function Planets({ currentPlanets, data, setPage, setPlanetIdx, setFilteredPlanets, setFilteredStatus, setSearchTerm, searchTerm, filteredStatus }) {

  const searchBarChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const searchPlanets = () => {
    let filtered = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        data[i].idx = i
        filtered.push(data[i])
      }
    }
    setFilteredPlanets(filtered)
    setFilteredStatus(true)
  }

  useEffect(() => {
    searchTerm.length >= 3 ? searchPlanets() : setFilteredStatus(false)
  }, [searchTerm])



  return (
    <div style={{ marginBottom: 50 }} >
      <div className="searchbar" style={{ width: 400, margin: 'auto' }}>
        <input type="search" className="form-control rounded" placeholder="Begin Typing To Search Planets" aria-label="Search" aria-describedby="search-addon" style={{ margin: 20 }} onChange={searchBarChange} />
      </div>

      <div className="table-container" style={{ width: '80%', margin: 'auto' }}>

        <table className="table table-hover table-dark" id="planets-table" >
          <thead>
            <tr>
              <th>Planet</th>
              <th>Population</th>
              <th>Residents</th>
            </tr>
          </thead>
          <tbody>
            {!filteredStatus ?
              data.map((planet, idx) => (
                <tr key={idx} onClick={() => { setPage('residents'); setPlanetIdx(idx) }}>
                  <td >{planet.name}</td>
                  <td >{planet.population}</td>
                  <td >{planet.residents.length}</td>
                </tr>
              ))
              :
              currentPlanets.map((planet, idx) => (
                <tr key={idx} onClick={() => { setPage('residents'); setPlanetIdx(planet.idx) }}>
                  <td >{planet.name}</td>
                  <td >{planet.population}</td>
                  <td >{planet.residents.length}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}