import React from 'react'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { userReducer } from '../src/app/components/user'

var assert  = require('assert');

const user = {
  "_id": "596341326bf5651b74351bd4",
  "info": {
    "name": "China",
    "surname": "Users",
    "country": "China"
  },
  "_group_id": "56a9da979a0bf84c09c31777",
  "email": "china@selectspecs.com",
  "__service": {
    "created": "2017-07-10T08:56:18.670Z",
    "updated": "2017-07-12T12:06:29.508Z"
  }
}

const user_access = [
  {"_id":"5971be952b8bdf2598864b32",
    "admin":false,
    "subgroups":false,
    "access":"full",
    "collection_name":"*"
  }
];

const user_group = {
  "_id":"56a9da979a0bf84c09c31777",
  "name":"SelectSpecs CHINA",
  "description":"china department",
  "_parent_group_id":"56a9da979a0bf84c09c316ca",
  "rules":{
    "stats":[],
    "payment":[{"must_be_inherit":false,"inherited":false,"value":"true","rule":"full_access"}],
    "domain":[{"must_be_inherit":false,"inherited":false,"value":"true","rule":"full_access"}],
    "manager":[{"must_be_inherit":false,"inherited":false,"value":"true","rule":"full_access"}],
    "user":[{"must_be_inherit":false,"inherited":false,"value":"true","rule":"full_access"}],
    "guest":[{"must_be_inherit":false,"inherited":false,"value":"true","rule":"full_access"}]
  },
  "_manager_user_id":[],"__service":{"created":"2016-09-07T09:08:39.345Z","updated":"2016-09-07T09:08:39.345Z"},
  "languages":["CN"],
  "domains":["cn.selectspecs.com"],
  "active":true,
  "_parent_groups_tree":["56a9da969a0bf84c09c316be","56a9da979a0bf84c09c316ca"]
}

const initialState = {};


describe('User Reducer Test', function() {
  describe('check actions', function() {
    it('calls not defined action type USER, nextState assert {}', function() {
      const action = {
        type: 'USER',
        data: user
      };

      const nextState = userReducer(initialState, action);
      assert.equal(nextState, initialState);
    });

    it('calls action USER_INFO with param `data`', function() {
      const action = {
        type: 'USER_INFO',
        data: user
      };

      const nextState = userReducer(initialState, action);
      assert.equal(nextState, user);
    });

    it('calls action USER_ACCESS with param `access`', function() {
      const action = {
        type: 'USER_ACCESS',
        access: user_access
      };

      const nextState = userReducer(initialState, action);
      assert.deepEqual(nextState, {accessInfo: user_access});
    });

    it('calls action USER_ACCESS with invalid action param', function() {
      const action = {
        type: 'USER_ACCESS',
        user_access
      };
      const nextState = userReducer(initialState, action);
      assert.notDeepEqual(nextState, {accessInfo: user_access});
      assert.deepEqual(nextState, { accessInfo: undefined });
    });

    it('calls action USER_GROUP with param `group`', function() {
      const action = {
        type: 'USER_GROUP',
        group: user_group
      };

      const nextState = userReducer(initialState, action);
      assert.deepEqual(nextState, {groupInfo: user_group});
    });
  });

  describe('Consistent calls to action USER_INFO, USER_ACCESS, USER_GROUP', function() {
    it('should bethe object like {..., accessInfo: {...}, groupInfo: {...}', function () {
      let nextState = userReducer(initialState,  {
        type: 'USER_INFO',
        data: user
      });
      nextState = userReducer(nextState, {
        type: 'USER_ACCESS',
        access: user_access
      });
      nextState = userReducer(nextState, {
        type: 'USER_GROUP',
        group: user_group
      });
      const result = Object.assign({}, user, {accessInfo: user_access}, {groupInfo: user_group});
      assert.deepEqual(nextState, result);
    });
  })
});