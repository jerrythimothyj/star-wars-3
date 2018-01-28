import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Planet } from './index';
import '../../mock-localstorage';


Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    logout: jest.fn(),
    isPlanetSearchAllowedFn: jest.fn(),
    searchPlanets: jest.fn(),
    resetSearchPlanetCounterFn: jest.fn(),
  };

  const enzymeWrapper = mount(<Planet {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Planet', () => {
  it('should call wookiee', () => {
    const e = {
      target: {
        checked: true,
      },
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('SearchBox');
    input.props().isWookie(e);
    expect(props.searchPlanets.mock.calls.length).toBe(2);
  });

  it('should not call wookiee', () => {
    const e = {
      target: {
        checked: false,
      },
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('SearchBox');
    input.props().isWookie(e);
    expect(props.searchPlanets.mock.calls.length).toBe(2);
  });

  it('should call handleChange', () => {
    const e = {
      target: {
        value: 'aldareen',
      },
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('SearchBox');
    input.props().handleChange(e);
    expect(props.searchPlanets.mock.calls.length).toBe(1);
  });

  it('should call navToPage', () => {
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('NextPrevious');
    input.props().navToPage(2);
    expect(props.searchPlanets.mock.calls.length).toBe(2);
  });
});
