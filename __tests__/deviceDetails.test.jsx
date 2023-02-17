import { render, screen, waitFor } from '@testing-library/react';

import {
  mockItemDetailsWithObjects,
  mockItemDetailsWithUrls
} from './__fixtures__/mockData';

import { DeviceDetails } from '../src/components/detailPage/deviceDetails.jsx';

describe('test deviceDetails', () => {
  it('checks objects are not displaying in the detail list', () => {
    const content = Object.assign(
      {},
      Object.entries(mockItemDetailsWithObjects)
    );
    render(<DeviceDetails data={mockItemDetailsWithObjects} />);
    waitFor(() => {
      const component = screen.queryByTestId('list-details');
      expect(component).not.toHaveTextContent(JSON.stringify(content));
    });
  });
  it('checks url are not displaying in the detail list', () => {
    const content = Object.assign({}, Object.entries(mockItemDetailsWithUrls));
    render(<DeviceDetails data={mockItemDetailsWithUrls} />);
    waitFor(() => {
      const component = screen.queryByTestId('list-details');
      expect(component).not.toHaveTextContent(JSON.stringify(content));
    });
  });
});
