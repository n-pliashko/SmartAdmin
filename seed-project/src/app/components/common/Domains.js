import React from 'react'
import Msg from '../i18n/Msg'

import {connect} from 'react-redux'

const Domains = React.createClass({
  getInitialState: function() {
    const {user} = this.props;
    let domains = [];
    if (user.groupInfo) {
      user.groupInfo.domains.map( domain => {
        domains.push( {
          "href": "/",
          "title": domain
        })
      })
    }
    return {
      domains: domains
    }
  },

  render: function () {
    let domains = this.state.domains;
    return (
      <div className="project-context hidden-xs dropdown">

                <span className="label">
                    <Msg phrase="Domains" />
                </span>
        <span className="project-selector dropdown-toggle label" data-toggle="dropdown">
                    <Msg phrase="Allowed domains" />
          { domains.length ?
            <i  className="fa fa-angle-down"/>
            : null }
                </span>

        { domains.length ?
          <ul className="dropdown-menu">
            {domains.map(function(domains, idx){
              return (
                <li key={idx}>
                  <a href={domains.href}>{domains.title}</a>
                </li>)
            })}
          </ul> : null}

      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    language: state.language,
    user: state.user
  }
}
export default connect(mapStateToProps)(Domains)