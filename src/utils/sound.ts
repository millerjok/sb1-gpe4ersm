export function playSound(soundPath: string) {
  try {
    const audio = new Audio(soundPath);
    return audio.play().catch(error => {
      console.warn('Failed to play sound:', error);
    });
  } catch (error) {
    console.warn('Error creating audio:', error);
    return Promise.reject(error);
  }
}