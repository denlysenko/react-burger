import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { BurgerBuilder } from '.';
import BuildControls from '../../components/Burger/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ ingredients: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
