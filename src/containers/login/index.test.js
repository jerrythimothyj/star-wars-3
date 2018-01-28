import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from './index';
import '../../mock-localstorage';


Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    login: jest.fn(),
    logout: jest.fn(),
  };

  const enzymeWrapper = mount(<Login {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Login', () => {
  it('should execute login', () => {
    const e = {
      preventDefault() {},
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('form');
    input.props().onSubmit(e);
    expect(props.login.mock.calls.length).toBe(0);
  });

  it('should execute input', () => {
    const e = {
      target: {
        value: 'Luke Skywalker',
      },
    };
    const f = {
      target: {
        value: '19BBY',
      },
    };
    const g = {
      preventDefault() {},
    };
    const { enzymeWrapper, props } = setup();
    let input = enzymeWrapper.find('#username');
    input.props().onChange(e);
    input = enzymeWrapper.find('#password');
    input.props().onChange(f);
    input = enzymeWrapper.find('form');
    input.props().onSubmit(g);
    expect(props.login.mock.calls.length).toBe(0);
  });
});
