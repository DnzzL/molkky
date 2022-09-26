import { act, renderHook } from '@testing-library/react-hooks';
import usePlayerForm from './use-player-form';

describe('usePlayerForm', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => usePlayerForm());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
