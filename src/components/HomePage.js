import React, { useEffect, useContext } from 'react'
import AppContext from '../context/appContext'
import Spinner from './SpinnerState'

function HomePage() {
  const appContext = useContext(AppContext)

  useEffect(() => {
    appContext.getMostPurchased()
  }, [])

  return (
    <div className="container">
      <h1 className="my-3">Most Purchased</h1>
      {appContext.loading ? <Spinner /> : <h2>Loaded</h2>}
    </div>
  )
}

export default HomePage
