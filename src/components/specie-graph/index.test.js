import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SpecieGraph  from './index.js'


configure({adapter: new Adapter})

describe('<SpecieGraph />', () => {
  it('should render SpecieGraph component', () => {
    const wrapper  = shallow(<SpecieGraph />);
    expect(wrapper).toBeDefined();
  })
});