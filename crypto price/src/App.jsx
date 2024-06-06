import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [crypto, setCrypto] =useState([])
  const [search, setSearch]=useState("")

  

  useEffect(() => {
    
    async function fetchData() {
      try {
        const response = await axios.get('https://openapiv1.coinstats.app/coins',{
          headers: {'X-API-KEY': 'BKRvvcdViDZxSYWNZMTn44MzbzSNXEab9+MLQ+ivOXw='}
        })
        setCrypto(response.data.result)
        console.log(response.data.result)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData()
  
  }, [])
  
  return (
    <div className='max-w-xl bg-sky-700 text-white m-8 text-center '>
    <h1 className='text-3xl m-4 pt-7'>Chime Exchange Price</h1>
    <input type="text" onChangee={(e) => setSearch(e.target.value)} className='inline-block w-45 border-none outline-none text-black' placeholder='Search..'  />
    
    <table className='w-5/6 m-8 '>
      <thead >
        <tr>
          <th>Rank</th>
          <th>Crypto</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {
          crypto.filter((crypto) => {
            return crypto.name.toLowerCase().includes(search.toLowerCase())
          }).map(crypto => {
            return <tr key={crypto.id} >
              <td className='p-3'>{crypto.rank}</td>
              <td  className='inline-flex p-3  items-center gap-3'>
                <img src={crypto.icon} className='w-7' />
                {crypto.name}
              </td>
              <td className='p-3'>
                {crypto.price.toFixed(2)}
              </td>

            </tr>
          })
        }
      </tbody>
    </table>
    </div>
  )
}

export default App