import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBox from './index';
import '../../mock-localstorage';


configure({ adapter: new Adapter() });

describe('<SearchBox />', () => {
  it('should render SearchBox component', () => {
    const planet = 'aldareen';
    const isSearchAllowed = true;
    const remainingSeconds = 2;
    const handleChange = () => {

    };

    const wrapper = shallow(<SearchBox
      toSearch="Search Planets"
      isWookie={e => this.isWookie(e)}
      searchKey={planet}
      searchBox="planet"
      handleChange={e => handleChange(e)}
      isSearchAllowed={isSearchAllowed}
      remainingSeconds={remainingSeconds}
    />);
    expect(wrapper).toBeDefined();
  });
});
