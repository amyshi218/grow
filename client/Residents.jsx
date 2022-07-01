import React, { useState, useEffect } from 'react'
import api from '../server/apiconnect'

export default function Residents({ data, setPage, planetIdx, setPersonIdx, setFilteredStatus }) {

  const [residents, setResidents] = useState([])

  const getResidentNames = async () => {
    for (let resident of data[planetIdx].residents) {
      await api.getResidents(resident)
        .then((data) => {
          setResidents(prevState => [...prevState, data.data])
        })
        .catch((err) => console.log('asdasdasd', err))
    }
  }

  useEffect(() => {
    getResidentNames()
  }, [])

  return (
    <div style={{ marginBottom: 50 }}>
      <button type="button" className="btn btn-outline-success" style={{ margin: 20, width: 100 }} onClick={() => { setPage('planets'); setFilteredStatus(false) }}>Back</button>

      <div className="table-container" style={{ width: '80%', margin: '50px auto' }}>
        <table className="table table-hover table-dark" id="residents-table"  >
          <thead>
            <tr>
              <th>Residents</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident, idx) => (
              <tr key={idx} onClick={() => { setPage('person'); setPersonIdx(idx) }}>
                <td >{resident.name}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

