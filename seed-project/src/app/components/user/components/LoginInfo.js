import React from 'react'
import ToggleShortcut from './ToggleShortcut'


import {connect} from 'react-redux';

class LoginInfo extends React.Component {

  componentWillMount() {

  }

  render() {
    const {user} = this.props;
    let group_name = user.groupInfo ? user.groupInfo.name : '';
    return (
      <div className="login-info">
			    <span>
			        <ToggleShortcut>
			            <img src={this.props.picture} alt="me"
                       className="online"/><span>{ group_name }</span><i className="fa fa-angle-down"/>
			        </ToggleShortcut>
			     </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    language: state.language,
    user: state.user
  }
}

export default connect(mapStateToProps)(LoginInfo)