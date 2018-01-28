import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SpecieGrid from './index';
import '../../mock-localstorage';
import speciesData from '../../../mock/species.json';


configure({ adapter: new Adapter() });

describe('<SpecieGrid />', () => {
  it('should render SpecieGrid component', () => {
    const species = speciesData;
    const wrapper = shallow(<SpecieGrid species={species} />);
    expect(wrapper).toBeDefined();
  });
});
