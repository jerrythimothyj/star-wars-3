import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PeopleGraph  from './index.js'


configure({adapter: new Adapter})

describe('<PeopleGraph />', () => {
  it('should render PeopleGraph component', () => {
    const wrapper  = shallow(<PeopleGraph />);
    expect(wrapper).toBeDefined();
  })
});