import React from 'react'

const NotFoundPage = () => {
  const styleP = {
    textAlign: 'center',
    fontFamily: 'cursive',
    fontSize: 35,
    marginTop: '14%'
  }
  const styleH = {
    textAlign: 'center',
    fontFamily: 'cursive',
    fontSize: 100
  }
  return (
    <div>
      <p style={styleP} >OOPS! - Could not Find it</p>
      <h1 style={styleH} >404</h1>
    </div>
  )
}

export default NotFoundPage
