let baseUrl

if (process.env.NODE_ENV === 'production') {
  console.log('CHEGUEI AQUI IF')
  console.log(process.env)
  baseUrl = process.env.BASEURL
  console.log(baseUrl)
} else {
  console.log('CHEGUEI AQUI ELSE')
  baseUrl = 'http://localhost:5000'
}

export default baseUrl
