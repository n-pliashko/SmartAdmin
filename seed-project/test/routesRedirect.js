import React from 'react';
import { Router } from 'react-router';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import routes from '../src/app/routes';

var assert  = require('assert');


describe('Routes', function() {
  let router;
  before(function (done) {
    Router.run(routes, location, function (error, state) {
      router = React.render(
        <Router {...state} />, el
      );
      done();
    });
  });

  after(function () {
    router.stop();
  });
  // const wrapper = mount(routerComponent);
  // console.log(wrapper);
  it('Routes should only have paths declared in src/routing/paths.js', () => {
    console.log(router);
    /*const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
    console.log(pathMap);*/

   // expect(routesDefined.every(isDeclaredInPaths)).to.be.true;
  });
});