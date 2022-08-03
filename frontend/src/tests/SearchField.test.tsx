import '@testing-library/jest-dom';
import { fireEvent, render } from "@testing-library/react";

import SearchField from "../components/SearchField";

test('emit empty search params when search term is blank', () => {
  const mockHandleSearch = jest.fn();
  const component = render(<SearchField handleSearch={mockHandleSearch}/>);

  const searchTerm = component.getByRole('textbox');
  fireEvent.change(searchTerm, {target: {value: 'test'}});
  fireEvent.change(searchTerm, {target: {value: ''}});

  expect(mockHandleSearch.mock.calls.length).toBe(1);
  expect(mockHandleSearch.mock.calls[0][0].field).toBe('');
  expect(mockHandleSearch.mock.calls[0][0].term).toBe('');
});

test('emit search params when enter key is pressed', () => {
  const mockHandleSearch = jest.fn();
  const component = render(<SearchField handleSearch={mockHandleSearch}/>);

  // Change in search term
  const searchTerm = component.getByRole('textbox');
  fireEvent.change(searchTerm, {target: {value: 'test'}});
  fireEvent.keyUp(searchTerm, {key: 'Enter', code: 'Enter'});

  expect(mockHandleSearch.mock.calls.length).toBe(1);
  expect(mockHandleSearch.mock.calls[0][0].field).toBe('invoiceNo');    // Default selection
  expect(mockHandleSearch.mock.calls[0][0].term).toBe('test');

  // Change in search field
  const searchField = component.getByRole('combobox');
  fireEvent.change(searchField, {target: {value: 'description'}});
  fireEvent.keyUp(searchTerm, {key: 'Enter', code: 'Enter'});

  expect(mockHandleSearch.mock.calls.length).toBe(2);
  expect(mockHandleSearch.mock.calls[1][0].field).toBe('description');
  expect(mockHandleSearch.mock.calls[1][0].term).toBe('test');
});