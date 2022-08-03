import '@testing-library/jest-dom';
import { render } from "@testing-library/react";

import DataDisplaySmall from "../components/DataDisplaySmall";
import { Data } from "../shared/types";

test('no cards shown with empty dataset', () => {
  const data: Data[] = [];

  const component = render(<DataDisplaySmall data={data}/>);

  const enc_div = component.container.querySelector('div');
  expect(enc_div?.childElementCount).toBe(0);
});

test('cards count should match item count in dataset', () => {
  const data: Data[] = [
    {invoiceNo: 'invoiceNo1', stockCode: 'stockCode1', description: 'description1', quantity: 1, invoiceDate: '1/1/2022 08:00', unitPrice: 1.23, customerId: 'customerId1', country: 'SG', _links: {self: {href: 'link1'}}},
    {invoiceNo: 'invoiceNo2', stockCode: 'stockCode2', description: 'description2', quantity: 2, invoiceDate: '2/2/2022 08:00', unitPrice: 1.25, customerId: 'customerId2', country: 'UK', _links: {self: {href: 'link2'}}},
    {invoiceNo: 'invoiceNo3', stockCode: 'stockCode3', description: 'description3', quantity: 3, invoiceDate: '3/3/2022 08:00', unitPrice: 4.56, customerId: 'customerId3', country: 'US', _links: {self: {href: 'link3'}}}
  ];

  const component = render(<DataDisplaySmall data={data}/>);

  // Assert that cards count is the same as item count in dataset
  const enc_div = component.container.querySelector('div');
  expect(enc_div?.childElementCount).toBe(data.length);
});