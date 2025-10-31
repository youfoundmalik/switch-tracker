export function setupActivityTracking(
  onInactive: () => void,
  timeoutMs: number = 300000
): () => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function resetTimer(): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      onInactive();
    }, timeoutMs);
  }

  function handleActivity(): void {
    resetTimer();
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
    window.removeEventListener('mousemove', handleActivity);
    window.removeEventListener('keypress', handleActivity);
    window.removeEventListener('mousedown', handleActivity);
    window.removeEventListener('scroll', handleActivity);
    window.removeEventListener('touchstart', handleActivity);
  };
}

