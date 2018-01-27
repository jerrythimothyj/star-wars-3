import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SpecieGrid } from './index';
import '../../mock-localstorage';


configure({ adapter: new Adapter() });

describe('<SpecieGrid />', () => {
  it('should render SpecieGrid component', () => {
    const species = [{
      name: 'Hutt', classification: 'gastropod', designation: 'sentient', average_height: '300', skin_colors: 'green, brown, tan', hair_colors: 'n/a', eye_colors: 'yellow, red', average_lifespan: '1000', homeworld: 'https://swapi.co/api/planets/24/', language: 'Huttese', people: ['https://swapi.co/api/people/16/'], films: ['https://swapi.co/api/films/3/', 'https://swapi.co/api/films/1/'], created: '2014-12-10T17:12:50.410000Z', edited: '2014-12-20T21:36:42.146000Z', url: 'https://swapi.co/api/species/5/',
    }];
    const wrapper = shallow(<SpecieGrid species={species} />);
    expect(wrapper).toBeDefined();
  });
});
