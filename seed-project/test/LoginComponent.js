import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import {Login} from '../src/app/routes/auth/containers/Login';
import store from '../src/app/store/configureStore'

var assert  = require('assert');

describe('<Login/>', function() {
  const wrapper = mount(<Login store={store}/>);
  const input_email = wrapper.find('input[name="email"]');
  const input_password = wrapper.find('input[name="password"]');

  it("calls constructor, should initial state {  email: '', password: '', errors: [] }", () => {
    assert.deepEqual(wrapper.state(), {email: '', password: '', errors: []});
  });

  describe('Login component mounted', function() {
    it('should contains <input name="email"/>', function () {
      assert.equal(input_email.length, 1);
    });

    it('should contains <input name="password"/>', function () {
      assert.equal(input_password.length, 1);
    });
  });

  describe('simulated events', function() {
    const wrapper = mount(<Login store={store}/>);
    const input_email = wrapper.find('input[name="email"]');
    const input_password = wrapper.find('input[name="password"]');
    const form = wrapper.ref('loginForm');

    it('call change email event, should be test@test.ru', function () {
      input_email.simulate('change', {target: {value: 'test@test.ru', name: 'email'}});
      assert.equal(wrapper.state().email, 'test@test.ru');
    });

   /* it('should display an error "Please enter your email password" when no password value is input', (done) => {
      form.simulate('submit', { preventDefault(){} });
      setTimeout(function() {
        done();
      }, 0);
      expect(form.html()).to.have.string('Please enter your email password');
    });*/

    it('call login event', function (done) {
      input_email.simulate('change', {target: {value: 'test@test.ru', name: 'email'}});
      input_password.simulate('change', {target: {value: '123456', name: 'password'}});
      form.simulate('submit', { preventDefault(){} });

      setTimeout(function(){
        done();
      }, 0);
      expect('Error Authorization').to.be.oneOf(wrapper.state().errors);
    });
  });
});