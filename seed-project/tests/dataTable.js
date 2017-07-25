import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import {Table} from '../src/app/components/table-schema/Table';
import store from '../src/app/store/configureStore'

var assert  = require('assert');

describe('<Table/> - dataTables component', function() {
  const wrapper = mount(<Table store={store}/>);

  it("calls constructor, should initial state key {  lang: .., search: '',  table: null,  schema: ..., regex: true }", () => {
    expect(wrapper.state()).to.not.have.all.keys('lang', 'search',  'table',  'schema', 'regex');
  });
})
