let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.baseUrl
} else {
  baseUrl = 'http://localhost:5000'
}

export default baseUrl
