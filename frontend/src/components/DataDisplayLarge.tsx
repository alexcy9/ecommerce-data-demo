import { Table } from '@govtechsg/sgds-react/Table';

import { Data } from '../shared/types';

export default function DataDisplayLarge({data} : {data: Data[]}) {

  return (
    <Table size='sm' className='mt-3'>
      <thead>
        <tr>
          <th>InvoiceNo</th>
          <th>StockCode</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>InvoiceDate</th>
          <th>UnitPrice</th>
          <th>CustomerID</th>
          <th>Country</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row._links.self.href}>
            <td>{row.invoiceNo}</td>
            <td>{row.stockCode}</td>
            <td>{row.description}</td>
            <td>{row.quantity}</td>
            <td>{row.invoiceDate}</td>
            <td>{row.unitPrice}</td>
            <td>{row.customerId}</td>
            <td>{row.country}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

}