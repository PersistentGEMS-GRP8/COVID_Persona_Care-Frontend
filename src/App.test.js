import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import App from './App';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});