import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import Form from '../Components/Form'

describe('results', () => {
    // it.todo('App tests to do!')

    it('renders app as expected', () => {
        render(<App />);
    
        let method = screen.getByTestId('app-method');
        let url = screen.getByTestId('app-url');
        expect(method).toHaveTextContent('Request Method:');       
        expect(url).toHaveTextContent('URL:');      
    })



// import '@testing-library/jest-dom';
// import { fireEvent, render, screen } from '@testing-library/react';
// import App from '../App';
// // import Welcome from '.';

// describe('welcome', () => {
//     it.todo('loads and displays initial state!', () => {
//       render(<Welcome)
//     })
// })