import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './index.js'
import Header from '../../components/header'

configure({adapter: new Adapter})

describe('<App />', () => {
  it('should render Header component', () => {
    const wrapper  = shallow(<App />);
    expect(wrapper.find(Header))
  })
});