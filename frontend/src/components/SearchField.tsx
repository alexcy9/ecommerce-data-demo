import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { Row } from '@govtechsg/sgds-react/Row';
import { Col } from '@govtechsg/sgds-react/Col';
import { Form } from '@govtechsg/sgds-react/Form';

import { SearchParams } from '../shared/types';

export default function SearchField({handleSearch}: {handleSearch: (searchParams: SearchParams) => void}) {

  const [searchField, setSearchField] = useState('invoiceNo');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeSearchField = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchField(event.target.value);
  };

  const handleChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    // Call handle to reload page when searchTerm is cleared
    if (event.target.value === '') {
      handleSearch({field: '', term: ''});
    }
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch({field: searchField, term: searchTerm});
    }
  };

  return (
      <Row>
        <Col lg='3' md='4' sm='5' xs='12'>
          <Form.Group>
            <Form.Label>Search Field</Form.Label>
            <Form.Select
              value={searchField}
              onChange={handleChangeSearchField}
            >
              <option value='invoiceNo'>InvoiceNo</option>
              <option value='stockCode'>StockCode</option>
              <option value='description'>Description</option>
              <option value='quantity'>Quantity</option>
              <option value='invoiceDate'>InvoiceDate</option>
              <option value='unitPrice'>UnitPrice</option>
              <option value='customerId'>CustomerID</option>
              <option value='country'>Country</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg='4' md='6' sm='7' xs='12'>
          <Form.Group>
            <Form.Label>Search Term</Form.Label>
            <Form.Control
              value={searchTerm}
              onChange={handleChangeSearchTerm}
              onKeyUp={handleEnterKey}
            />
          </Form.Group>
        </Col>
      </Row>
  );

}