import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Specie } from './index';
import '../../mock-localstorage';


Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    logout: jest.fn(),
    isSpecieSearchAllowedFn: jest.fn(),
    searchSpecies: jest.fn(),
    resetSearchSpecieCounterFn: jest.fn(),
  };

  const enzymeWrapper = mount(<Specie {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Specie', () => {
  it('should call wookiee', () => {
    const e = {
      target: {
        checked: true,
      },
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('SearchBox');
    input.props().isWookie(e);
    expect(props.searchSpecies.mock.calls.length).toBe(2);
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
    expect(props.searchSpecies.mock.calls.length).toBe(2);
  });

  it('should call handleChange', () => {
    const e = {
      target: {
        value: 'hutt',
      },
    };
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('SearchBox');
    input.props().handleChange(e);
    expect(props.searchSpecies.mock.calls.length).toBe(1);
  });

  it('should call navToPage', () => {
    const { enzymeWrapper, props } = setup();
    const input = enzymeWrapper.find('NextPrevious');
    input.props().navToPage(2);
    expect(props.searchSpecies.mock.calls.length).toBe(2);
  });
});
