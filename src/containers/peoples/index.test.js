import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { People } from './index';
import '../../mock-localstorage';


Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    logout: jest.fn(),
    isPeopleSearchAllowedFn: jest.fn(),
    searchPeoples: jest.fn(),
    resetSearchPeopleCounterFn: jest.fn(),
  };

  const enzymeWrapper = mount(<People {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('People', () => {
  it('should call wookiee', () => {
    const e = {
      target: {
        checked: true,
      },
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('SearchBox');
    input.props().isWookie(e);
    expect(props.searchPeoples.mock.calls.length).toBe(2);
  });

  it('should call not wookiee', () => {
    const e = {
      target: {
        checked: false,
      },
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('SearchBox');
    input.props().isWookie(e);
    expect(props.searchPeoples.mock.calls.length).toBe(2);
  });

  it('should call handleChange', () => {
    const e = {
      target: {
        value: 'luke',
      },
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('SearchBox');
    input.props().handleChange(e);
    expect(props.searchPeoples.mock.calls.length).toBe(1);
  });

  it('should call navToPage', () => {
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('NextPrevious');
    input.props().navToPage(2);
    expect(props.searchPeoples.mock.calls.length).toBe(2);
  });
});
