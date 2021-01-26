let baseUrl
console.log(process.env)

if (process.env.NODE_ENV === 'production') {
  console.log('CHEGUEI AQUI IF')
  baseUrl = process.env.BASEURL
} else {
  console.log('CHEGUEI AQUI IF')
  baseUrl = 'http://localhost:5000'
}

export default baseUrl
