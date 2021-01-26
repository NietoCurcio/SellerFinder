let baseUrl

if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.BASEURL
  console.log(process.env)
  if (!baseUrl) baseUrl = 'https://seller-finder.herokuapp.com'
} else {
  baseUrl = 'http://localhost:5000'
}

export default baseUrl
