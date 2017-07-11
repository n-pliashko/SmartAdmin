import React from 'react'

export default class NotFound extends React.Component {
  render () {
    return (
      <div id="extr-page">
        <header id="header" className="animated fadeInDown">

          <div id="logo-group">
            <span id="logo"> <img src="assets/img/ss_logo.png" alt="SelectSpecs"/> </span>
          </div>

          <div style={{float: 'right'}}>
            <a href="/" style={{lineHeight: '69px'}}>Go Home</a>
          </div>
        </header>
        <div id="main" role="main" className="animated fadeInDown">

          <div id="content" className="container">
            <h1 className="text-align-center txt-color-red login-header-big">Page Not Found</h1>
          </div>
        </div>
      </div>
    )
  }
}