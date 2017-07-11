import React from 'react'
import {connect} from 'react-redux'

import UiValidate from '../../../components/forms/validation/UiValidate'
import showDialog from '../../../components/ui/uiDialog'

import config from '../../../config/config.json'
import { authUser } from '../../../components/user/UserActions'
import { hashHistory } from 'react-router'

class Login extends React.Component {

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
    $.post(config.urlApiHost + 'auth', {email: self.state.email, password: self.state.password})
      .then((data) => {
        if (!data.error) {
          dispatch(authUser(data));
          hashHistory.push('translations/gettexts');
        } else {
          showDialog({
            header: 'Error Authorization',
            icon: 'fa fa-fw fa-warning',
            classes: {
              "ui-dialog-title": "text-align-center ui-dialog-title txt-color-red"
            },
            content: <div><p>{data.error.reason}</p></div>
          });
        }
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
                    <h4 className="paragraph-header">Developer preview
                      Modules is working, but unstable sometimes :)</h4>
                  </div>
                  <img src="assets/img/demo/iphoneview.png" className="pull-right display-image" alt=""
                       style={{width: '210px'}}/>
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

                          <div className="note">
                            <a href="#/forgot">Forgot password?</a>
                          </div>
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
                <h5 className="text-center"> - Or sign in using -</h5>
                <ul className="list-inline text-center">
                  <li>
                    <a href="#" className="btn btn-primary btn-circle"><i className="fa fa-facebook"/></a>
                  </li>
                  <li>
                    <a href="#" className="btn btn-info btn-circle"><i className="fa fa-twitter"/></a>
                  </li>
                  <li>
                    <a href="#" className="btn btn-warning btn-circle"><i className="fa fa-linkedin"/></a>
                  </li>
                </ul>
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