import { Card } from '@govtechsg/sgds-react/Card';

import { Data } from '../shared/types';

export default function DataDisplaySmall({data} : {data: Data[]}) {

  return (
    <div className='mt-3'>
      {data.map((row) => (
        <Card className='my-2' key={row._links.self.href}>
          <Card.Body>
            <Card.Text>
              <div><strong>InvoiceNo</strong>: {row.invoiceNo}</div>
              <div><strong>StockCode</strong>: {row.stockCode}</div>
              <div><strong>Description</strong>: {row.description}</div>
              <div><strong>Quantity</strong>: {row.quantity}</div>
              <div><strong>InvoiceDate</strong>: {row.invoiceDate}</div>
              <div><strong>UnitPrice</strong>: {row.unitPrice}</div>
              <div><strong>CustomerID</strong>: {row.customerId}</div>
              <div><strong>Country</strong>: {row.country}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

}