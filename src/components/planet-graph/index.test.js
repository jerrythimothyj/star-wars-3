import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlanetGraph  from './index.js'


configure({adapter: new Adapter})

describe('<PlanetGraph />', () => {
  it('should render PlanetGraph component', () => {
    const wrapper  = shallow(<PlanetGraph />);
    expect(wrapper).toBeDefined();
  })
});