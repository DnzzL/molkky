import { render } from '@testing-library/react';

import Pin from './pin';

describe('Pin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pin />);
    expect(baseElement).toBeTruthy();
  });
});
