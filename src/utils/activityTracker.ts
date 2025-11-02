export function setupActivityTracking(
  onInactive: () => void,
  timeoutMs: number = 300000
): () => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  const DEBOUNCE_DELAY = 300; // Debounce activity tracking by 300ms

  function resetTimer(): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      onInactive();
    }, timeoutMs);
  }

  function handleActivity(): void {
    // Debounce rapid activity events
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      resetTimer();
    }, DEBOUNCE_DELAY);
  }

  resetTimer();

  window.addEventListener('mousemove', handleActivity);
  window.addEventListener('keypress', handleActivity);
  window.addEventListener('mousedown', handleActivity);
  window.addEventListener('scroll', handleActivity);
  window.addEventListener('touchstart', handleActivity);

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    window.removeEventListener('mousemove', handleActivity);
    window.removeEventListener('keypress', handleActivity);
    window.removeEventListener('mousedown', handleActivity);
    window.removeEventListener('scroll', handleActivity);
    window.removeEventListener('touchstart', handleActivity);
  };
}

