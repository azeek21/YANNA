function useDebouncer(
  callback: (...args: unknown[]) => unknown,
  delay: number
): (...args: unknown[]) => void {
  let timeoutId: undefined | NodeJS.Timeout;
  if (!this.debounced) {
    this.debounced = function debounced(...args: unknown[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(...arguments);
      }, delay);
    };
  }
  return this.debounced;
}

export default useDebouncer;
