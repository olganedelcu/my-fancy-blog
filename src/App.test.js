// __tests__/fetch.test.js
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './components/HomePage';
import {Browser as Router, Switch, Route} from 'react-router-dom';

// mock for the server
const server = setupServer(
  rest.get('http://localhost:3004/posts', (req, res, ctx) => {
    return res(ctx.json([
      {
        "title": "A demo title",
        "description": "Some description",
        "id": 3
      }
    ]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('loads and displays greeting', async () => {
  render(<Router>
    <HomePage/>
  </Router>)


  await waitFor(() => screen.getByTestId('title-3'))

  expect(screen.getByTestId('title-3')).toHaveTextContent('A demo title')
  expect(screen.getByTestId('description-3')).toHaveTextContent('Some description')

})