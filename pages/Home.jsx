import React, { useEffect } from 'react'
import api from '../config/axios'

const Home = () => {

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                const response = await api.get('/clothing')
                console.log(response)
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchClothing()
    },[])
  return (
    <div>home</div>
  )
}

export default Home