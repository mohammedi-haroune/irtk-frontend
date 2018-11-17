import axios from 'axios'

let $backend = axios.create({
  baseURL: 'http://127.0.0.1:8000/polls/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

// Response Interceptor to handle and log errors
$backend.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // eslint-disable-next-line
  console.error(error)
  return Promise.reject(error)
})

$backend.$fetchDocuments = () => {
  return $backend.get('docs/')
    .then(response => response.data)
}

$backend.$find = (term) => {
  return $backend.get('find/?', {
    params: { 'term': term }
  })
    .then(response => response.data)
}

$backend.$vector = (query) => {
  return $backend.get('vector_model/?', {
    params: { 'query': query }
  })
    .then(response => response.data)
}

$backend.$boolean = (query) => {
  return $backend.get('boolean_model/', {
    params: { 'query': query }
  })
    .then(response => response.data)
}

$backend.$findInformation = () => {
  return $backend.get('find/?term=information')
    .then(response => response.data)
}

$backend.$getCorporas = () => {
  return $backend.get('corporas/')
    .then(response => response.data)
}

$backend.$selectedCorpus = () => {
  return $backend.get('selected_corpus/')
    .then(response => response.data)
}

$backend.$selectCorpus = (corpusName) => {
  var config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const data = new FormData()
  data.append('CORPUS_NAME', corpusName)
  return $backend.post('select_corpus/', data, config)
}

$backend.$cookies = () => $backend.get('cookies/')

export default $backend
