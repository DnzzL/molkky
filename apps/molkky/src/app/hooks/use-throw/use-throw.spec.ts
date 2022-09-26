import { act, renderHook } from '@testing-library/react-hooks';
import useThrow from './use-throw';

describe('useThrow', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useThrow());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
