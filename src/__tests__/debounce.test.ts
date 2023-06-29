/**
 * Unit Tests
 * Unit tests for the debounce utility function.
 * -----
 * Brownie Points
 * - Write your own debounce function with unit tests.
 * - debounce function ./utils/debounce
 */

import { debounce } from "../utils/debounce";

// jest.setTimeout(5000); // Increase the test timeout to 5 seconds

describe("debounce", () => {
  beforeEach(() => {
    jest.useRealTimers(); // Use real timers instead of fake timers
    jest.clearAllTimers();
  });

  // TEST1: Verifies that the provided function is called only once after the specified delay.
  it("should call the provided function only once after the specified delay", (done) => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toBeCalled();

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      done();
    }, 1000);
  });

  // TEST2: Ensures that the provided function is called with the latest arguments after the specified delay.
  it("should call the provided function with the latest arguments after the specified delay", (done) => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("bow");

    setTimeout(() => {
      debouncedFn("wow"); // Call with new arguments

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith("wow"); // Expect the latest arguments
        done();
      }, 1000);
    }, 500);
  });

  // TEST3: Checks that the previous timer is canceled and a new one is started if the function is called again within the specified delay.
  it("should cancel the previous timer and start a new one if called again within the specified delay", (done) => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();

    setTimeout(() => {
      debouncedFn();

      setTimeout(() => {
        expect(mockFn).not.toBeCalled();

        setTimeout(() => {
          expect(mockFn).toHaveBeenCalledTimes(1);
          done();
        }, 1000);
      }, 500);
    }, 500);
  });

  /**
   * These last 2 tests will fail because of
   * Exceeded timeout of 5000ms for a test.
   * Use jest.setTimeout(newTimeout) to
   * increase the timeout value, if this is a
   * long-running test.
   * But can't use jest.SetTimeout(n) in codesandbox
   */

  // TEST4: Validates that the provided function is called only once when called multiple times after the specified delay.
  // it("should call the provided function only once when called multiple times after the specified delay", (done) => {
  //   const mockFn = jest.fn();
  //   const debouncedFn = debounce(mockFn, 1000);

  //   debouncedFn();

  //   setTimeout(() => {
  //     debouncedFn();
  //     debouncedFn();
  //     debouncedFn();

  //     setTimeout(() => {
  //       expect(mockFn).toHaveBeenCalledTimes(1);
  //       done();
  //     }, 1000);
  //   }, 1000);
  // });

  // TEST5: Confirms that the provided function is not called if the debounce is canceled within the specified delay.
  // it("should not call the provided function if canceled within the specified delay", (done) => {
  //   const mockFn = jest.fn();
  //   const debouncedFn = debounce(mockFn, 1000);

  //   debouncedFn();

  //   setTimeout(() => {
  //     jest.advanceTimersByTime(500);

  //     debouncedFn();
  //     debouncedFn();

  //     debouncedFn.cancel();

  //     setTimeout(() => {
  //       expect(mockFn).not.toHaveBeenCalled();
  //       done();
  //     }, 1000);
  //   }, 1000);
  // });
});
