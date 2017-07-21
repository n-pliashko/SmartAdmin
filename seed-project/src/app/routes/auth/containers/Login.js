import React from 'react'
import {connect} from 'react-redux'

import UiValidate from '../../../components/forms/validation/UiValidate'
import { showDialogError } from '../../../components/ui/uiDialog'

import config from '../../../config/config.json'
import { requestUserInfo, showErrorAuth } from '../../../components/user/UserActions'
import { hashHistory } from 'react-router'

export class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.onLogin = this.onLogin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onLogin(e) {
    e.preventDefault();
    let dispatch = this.props.dispatch;
    let self = this;

    $.post(config.urlApiHost + 'manager/auth', {email: self.state.email, password: self.state.password})
      .then((data) => {
        if (!data.error) {
          localStorage.setItem('token', data.token);
          dispatch(requestUserInfo());
          hashHistory.push('translations/gettexts');
        } else {
          showDialogError('Error Authorization', data.error.reason);
        }
      }).fail(function (error) {
      error = JSON.parse(error.responseText).error;
      dispatch(showErrorAuth(error));
    })
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    const onSubmit = this.onLogin;
    return (
      <div id="extr-page">
        <header id="header" className="animated fadeInDown">

          <div id="logo-group">
            <span id="logo"> <img src="assets/img/ss_logo.png" alt="SelectSpecs"/> </span>
          </div>

        </header>
        <div id="main" role="main" className="animated fadeInDown">

          <div id="content" className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
                <h1 className="txt-color-red login-header-big">SelectSpecs API administration system</h1>

                <div className="hero">
                  <div className="pull-left login-desc-box-l">
                    <img src="assets/img/demo/content-health.jpg" className="pull-right display-image" alt=""/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <h5 className="about-heading">Our contacts:</h5>

                    <p>
                      <a href="http://selectspecs.com">http://selectspecs.com</a>
                    </p>
                    <p>
                      © SelectSpecs.com 2016
                    </p>
                    <p>
                      UK Company No: 6435182.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                <div className="well no-padding">
                  <UiValidate options={{
                    submitHandler: function(form, event) {
                      onSubmit(event);
                    }
                  }}>
                    <form action="#/translations/gettext" id="login-form" className="smart-form client-form"  method="POST">
                      <header>
                        Sign In
                      </header>
                      <fieldset>
                        <section>
                          <label className="label">E-mail</label>
                          <label className="input"> <i className="icon-append fa fa-user"/>
                            <input type="email" name="email" data-smart-validate-input="" data-required="" data-email=""
                                   data-message-required="Please enter your email address"
                                   data-message-email="Please enter a VALID email address"
                                   ref="email"
                                   value={this.state.email} onChange={this.handleInputChange}/>
                            <b className="tooltip tooltip-top-right"><i className="fa fa-user txt-color-teal"/>
                              Please enter email address/username</b></label>
                        </section>
                        <section>
                          <label className="label">Password</label>
                          <label className="input"> <i className="icon-append fa fa-lock"/>
                            <input type="password" name="password" data-smart-validate-input="" data-required=""
                                   data-minlength="3" data-maxnlength="20"
                                   data-message="Please enter your email password"
                                   value={this.state.password} onChange={this.handleInputChange}/>
                            <b className="tooltip tooltip-top-right"><i className="fa fa-lock txt-color-teal"/> Enter
                              your password</b> </label>
                          {/*<div className="note">
                            <a href="#/forgot">Forgot password?</a>
                          </div>*/}
                        </section>
                      </fieldset>
                      <footer>
                        <button type="submit" className="btn btn-primary">
                          Sign in
                        </button>
                      </footer>
                    </form>
                  </UiValidate>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="dialogErrorResult">
        </div>
      </div>
    )
  }
}

export default connect((state) => state)(Login)