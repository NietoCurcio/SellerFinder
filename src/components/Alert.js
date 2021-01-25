import React, { useContext } from 'react'
import AppContext from '../context/appContext'
import { Alert as BootStrapAlert } from 'react-bootstrap'

const Alert = () => {
  const appContext = useContext(AppContext)
  return appContext.error.msg ? (
    <BootStrapAlert
      className="container mt-3"
      variant={appContext.error.status}
    >
      {appContext.error.msg}
    </BootStrapAlert>
  ) : (
    <React.Fragment></React.Fragment>
  )
}

export default Alert
