import axios from 'axios'

let $backend = axios.create({
  baseURL: '127.0.0.1:8000/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

// Response Interceptor to handle and log errors
$backend.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // eslint-disable-next-line
  console.log(error)
  return Promise.reject(error)
})

$backend.$fetchDocuments = () => {
  return $backend.get('documents/')
    .then(response => response.data)
}

export default $backend
