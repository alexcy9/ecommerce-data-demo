import '@testing-library/jest-dom';
import { render } from "@testing-library/react";

import DataDisplayLarge from "../components/DataDisplayLarge";
import { Data } from "../shared/types";

test('show only headers with empty dataset', () => {
  const data: Data[] = [];

  const component = render(<DataDisplayLarge data={data}/>);

  const table = component.container.querySelector('table');
  expect(table).toBeInTheDocument();

  const thead = table?.querySelector('thead');
  expect(thead).toBeInTheDocument();
  expect(thead?.querySelector('tr')?.childElementCount).toBe(8);

  const tbody = table?.querySelector('tbody');
  expect(tbody).toBeInTheDocument();
  expect(tbody?.childElementCount).toBe(0);
});

test('table rows should match dataset', () => {
  const data: Data[] = [
    {invoiceNo: 'invoiceNo1', stockCode: 'stockCode1', description: 'description1', quantity: 1, invoiceDate: '1/1/2022 08:00', unitPrice: 1.23, customerId: 'customerId1', country: 'SG', _links: {self: {href: 'link1'}}},
    {invoiceNo: 'invoiceNo2', stockCode: 'stockCode2', description: 'description2', quantity: 2, invoiceDate: '2/2/2022 08:00', unitPrice: 1.25, customerId: 'customerId2', country: 'UK', _links: {self: {href: 'link2'}}},
    {invoiceNo: 'invoiceNo3', stockCode: 'stockCode3', description: 'description3', quantity: 3, invoiceDate: '3/3/2022 08:00', unitPrice: 4.56, customerId: 'customerId3', country: 'US', _links: {self: {href: 'link3'}}}
  ];

  const component = render(<DataDisplayLarge data={data} />);

  const table = component.container.querySelector('table');
  expect(table).toBeInTheDocument();

  // Assert that table columns matches columns in dataset (i.e. 8)
  const thead = table?.querySelector('thead');
  expect(thead).toBeInTheDocument();
  expect(thead?.querySelector('tr')?.childElementCount).toBe(8);

  // Assert that table row count is the same as item count in dataset
  const tbody = table?.querySelector('tbody');
  expect(tbody).toBeInTheDocument();
  expect(tbody?.childElementCount).toBe(data.length);

  // Assert that contents of table matches dataset
  const rows = tbody?.querySelectorAll('tr');
  rows?.forEach((row, i) => {
    const cells = row.querySelectorAll('td');
    
    expect(cells.length).toBe(8);
    expect(cells[0].textContent).toEqual(data[i].invoiceNo);
    expect(cells[1].textContent).toEqual(data[i].stockCode);
    expect(cells[2].textContent).toEqual(data[i].description);
    expect(cells[3].textContent).toEqual(data[i].quantity.toString());
    expect(cells[4].textContent).toEqual(data[i].invoiceDate);
    expect(cells[5].textContent).toEqual(data[i].unitPrice.toString());
    expect(cells[6].textContent).toEqual(data[i].customerId);
    expect(cells[7].textContent).toEqual(data[i].country);
  });
});