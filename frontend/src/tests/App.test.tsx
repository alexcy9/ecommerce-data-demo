import '@testing-library/jest-dom';
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, waitFor } from "@testing-library/react";

import App from '../App';
import { Data } from "../shared/types";

const data: Data[] = [
  {invoiceNo: 'invoiceNo1', stockCode: 'stockCode1', description: 'description1', quantity: 1, invoiceDate: '1/1/2022 08:00', unitPrice: 1.23, customerId: 'customerId1', country: 'SG', _links: {self: {href: 'link1'}}},
  {invoiceNo: 'invoiceNo2', stockCode: 'stockCode2', description: 'description2', quantity: 2, invoiceDate: '2/2/2022 08:00', unitPrice: 1.25, customerId: 'customerId2', country: 'UK', _links: {self: {href: 'link2'}}},
  {invoiceNo: 'invoiceNo3', stockCode: 'stockCode3', description: 'description3', quantity: 3, invoiceDate: '3/3/2022 08:00', unitPrice: 4.56, customerId: 'customerId3', country: 'US', _links: {self: {href: 'link3'}}}
];

const server = setupServer(
  rest.get('/api/transactions', (req, res, ctx) => {
    return res(ctx.json({
      _embedded: {transactions: data},
      page: {
        size: 8,
        totalElements: data.length,
        totalPages: Math.ceil(data.length / 8),
        number: 0
      }
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetch data from server', async () => {
  const mockRequestHandler = jest.fn();
  server.events.on('request:end', mockRequestHandler);

  const component = render(<App />);

  await waitFor(() => expect(mockRequestHandler).toHaveBeenCalledTimes(1));

  const table = component.container.querySelector('table');
  expect(table).toBeInTheDocument();
  
  // Assert that table row count is the same as item count in dataset
  const tbody = table?.querySelector('tbody');
  expect(tbody).toBeInTheDocument();
  expect(tbody?.childElementCount).toBe(data.length);
});

test('table should be empty on fetch error', async () => {
  server.use(
    rest.get('/api/transactions', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const mockRequestHandler = jest.fn();
  server.events.on('request:end', mockRequestHandler);

  const component = render(<App />);

  await waitFor(() => expect(mockRequestHandler).toHaveBeenCalledTimes(1));

  const table = component.container.querySelector('table');
  expect(table).toBeInTheDocument();

  // Assert that table row count is zero
  const tbody = table?.querySelector('tbody');
  expect(tbody).toBeInTheDocument();
  expect(tbody?.childElementCount).toBe(0);
});

test('pagination on large dataset', async () => {
  server.use(
    rest.get('/api/transactions', (req, res, ctx) => {
      return res(ctx.json({
        _embedded: {transactions: data},
        page: {
          size: 8,
          totalElements: 45,
          totalPages: 6,
          number: 0
        }
      }));
    })
  );

  const mockRequestHandler = jest.fn();
  server.events.on('request:end', mockRequestHandler);

  const component = render(<App />);

  await waitFor(() => expect(mockRequestHandler).toHaveBeenCalledTimes(1));

  const pagination = component.container.getElementsByClassName('pagination')[0];
  expect(pagination.childElementCount).toBe(8);     // 6 pages + prev + next
});