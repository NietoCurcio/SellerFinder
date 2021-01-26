import './App.css'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppState from './context/AppState'
import NavBar from './components/NavBar'
import Alert from './components/Alert'
import ProductDetail from './components/ProductDetail'

function App() {
  return (
    <AppState>
      <Router>
        <NavBar />
        <Alert />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:id" component={ProductDetail} />
        </Switch>
      </Router>
    </AppState>
  )
}

export default App
