import '@testing-library/jest-dom';
import { render } from "@testing-library/react";

import FileUploader from "../components/FileUploader";

test('upload button disabled if no files are selected', () => {
  const mockOnComplete = jest.fn();
  const component = render(<FileUploader onComplete={mockOnComplete} />);

  const uploadButton = component.getByText(/Upload file/);
  expect(uploadButton).toBeDisabled();
});