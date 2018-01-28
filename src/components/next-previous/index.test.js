import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NextPrevious from './index';
import '../../mock-localstorage';


configure({ adapter: new Adapter() });

describe('<NextPrevious />', () => {
  it('should render NextPrevious component', () => {
    const previousAllowed = true;
    const nextAllowed = true;
    const page = 2;
    const navToPage = () => {

    };

    const wrapper = shallow(<NextPrevious
      previousAllowed={previousAllowed}
      nextAllowed={nextAllowed}
      page={page}
      navToPage={pageNo => navToPage(pageNo)}
    />);
    expect(wrapper).toBeDefined();
  });
});
