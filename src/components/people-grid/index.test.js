import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PeopleGrid from './index';
import '../../mock-localstorage';
import peopleData from '../../../mock/peoples.json';


configure({ adapter: new Adapter() });

describe('<PeopleGrid />', () => {
  it('should render PeopleGrid component', () => {
    const peoples = peopleData;
    const wrapper = shallow(<PeopleGrid peoples={peoples} />);
    expect(wrapper).toBeDefined();
  });
});
