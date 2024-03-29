import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';
import Login from '../pages/Login';
import axios from 'axios';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MockAdapter from 'axios-mock-adapter';

const queryClient = new QueryClient();

test('login sends post request with valid credentials', async () => {
  // arrange
    const mock = new MockAdapter(axios);

    const userPayload = {
      username: 'peterpan1',
      password: '123',
    };
   
    await waitFor(()=>{mock.onPost('https://mighty-mini-minds-backend.onrender.com/users/login', userPayload)}, {timeout: 10000})
    // mock.onPost('https://mighty-mini-minds-backend.onrender.com/users/login').reply(200, { data: userPayload });

    // Create sinon stubs for handleAuthentication and navigate functions
    // const handleAuthentication = sinon.stub();

    render(
        <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
        </QueryClientProvider>,
        test.wrapper // may not be needed
      );

  // Act
  fireEvent.change(screen.getByLabelText('username'), { target: { value: 'peterpan1' } });
  fireEvent.change(screen.getByLabelText('password'), { target: { value: '123' } });
  fireEvent.click(screen.getByText('Login'));

  // Assert
  await waitFor(() => expect(mock.history.post.length).toBe(1));

  const requestPayload = JSON.parse(mock.history.post[0].data);
  expect(mock.history.post[0].url).toBe('https://mighty-mini-minds-backend.onrender.com/users/login');
  expect(requestPayload).toEqual({
    username: 'peterpan1',
    password: '123',
  });

  // Verify the authentication context was updated correctly
  // expect(handleAuthentication.calledWith(true)).toBe(true);
  
  mock.restore();
});



// const navigate = sinon.stub();
// expect(navigate.calledWith('/appLayout/welcomePage')).toBe(true);