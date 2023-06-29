/**
 * debounce function
 * Delays the execution of a given function until a certain amount of time has
 * passed without any new calls (1s in this case).
 * It ensures that only last call made within that time period will actually trigger the execution 
 * of the function.
 * 
 * Brownie Points
 * - Write your own debounce function with unit tests.
 * - unit tests ./tests/debounce.test
 */

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timerId: NodeJS.Timeout | null;

  const debouncedFn = (...args: Parameters<T>) => {
    clearTimeout(timerId!);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debouncedFn.cancel = () => {
    clearTimeout(timerId!);
  };

  return debouncedFn;
}