import React from 'react';
import { mount, shallow } from 'enzyme';
import {Login} from '../src/app/routes/auth/containers/Login';
import store from '../src/app/store/configureStore'

var assert  = require('assert');

describe('<Login/>', function() {
  const wrapper = mount(<Login store={store}/>);
  it("calls constructor, should initial state {  email: '', password: '' }", () => {
    assert.deepEqual(wrapper.state(), {email: '', password: ''});
  });

  describe('constructor()', function () {
    it('init state with empty value', function () {
      const wrapper = mount(<Login store={store}/>);
      /* const email = wrapper.find('input[name="email"]');
       email.node.value = 'test@test.ru';
       email.simulate('change', email);*/
      console.log(wrapper.state());
      const input = wrapper.find('input[name="email"]');
      input.simulate('change', {target: {value: 'test@test.ru'}});
      assert.equal(wrapper.state().email, 'test@test.ru');
    });
  });
});