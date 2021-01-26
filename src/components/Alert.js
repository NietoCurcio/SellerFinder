import React, { useContext, useEffect } from 'react'
import AppContext from '../context/appContext'
import { Alert as BootStrapAlert } from 'react-bootstrap'

const Alert = () => {
  const appContext = useContext(AppContext)

  useEffect(() => {
    console.log(appContext.error)
    if (appContext.error.msg.length) appContext.removeAlert()
  }, [appContext.error])

  return appContext.error.msg ? (
    <BootStrapAlert className="alert mt-3" variant={appContext.error.status}>
      {appContext.error.msg}
    </BootStrapAlert>
  ) : (
    <React.Fragment></React.Fragment>
  )
}

export default Alert
