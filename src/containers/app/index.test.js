import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './index';
import { Header } from '../../components';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('should render Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header));
  });
});
