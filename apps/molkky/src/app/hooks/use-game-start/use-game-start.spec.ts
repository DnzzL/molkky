import { act, renderHook } from '@testing-library/react-hooks';
import useGameStart from './use-game-start';

describe('useGameStart', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useGameStart());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
