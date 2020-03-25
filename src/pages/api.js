import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
})

export const getBisection = () => api.get('/BisectionEx')

const apis = {
    
    getBisection,
   
}

export default apis