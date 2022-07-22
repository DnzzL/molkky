import { render } from '@testing-library/react';

import PinGroup from './pin-group';

describe('PinGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PinGroup />);
    expect(baseElement).toBeTruthy();
  });
});
