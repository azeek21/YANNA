function debouncerFactory<T>(
  func: (...args: T[]) => unknown,
  delay: number
): typeof func {
  let timeoutId: NodeJS.Timeout | undefined;
  return function (...args: T[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      func(...args);
    }, delay);
  };
}

export { debouncerFactory };
