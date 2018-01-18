import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ConnectedApp, { Header}  from './index.js'
import '../../mock-localstorage'


configure({adapter: new Adapter})

describe('<Header />', () => {
  it('should render Header component', () => {
    const wrapper  = shallow(<Header />);
    expect(wrapper).toBeDefined();
  })
});