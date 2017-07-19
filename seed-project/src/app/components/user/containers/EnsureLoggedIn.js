import React from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';

class EnsureLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    const isLoggingOut = localStorage.getItem('token') === null && _.isEmpty(user);
    this.state = {
      isLoggingOut: isLoggingOut,
    }
  }

  componentWillMount() {
    if (this.state.isLoggingOut) {
      hashHistory.push('/login');
    }
  }

  render() {
    if (this.state.isLoggingOut) {
      return null;
    } else {
      return this.props.children
    }
  }
}


function mapStateToProps(state) {
  return {
    user: state.user,
    language: state.language
  }
}

export default connect(mapStateToProps)(EnsureLoggedIn)