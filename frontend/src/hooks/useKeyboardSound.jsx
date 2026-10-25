const keyStrokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyboardSound() {
  const playRandomKeyStrokeSound = () => {
    try {
      const soundIndex = Math.floor(Math.random() * keyStrokeSounds.length);
      const sound = keyStrokeSounds[soundIndex];
      const soundClone = sound.cloneNode();
      soundClone.volume = 0.6;
      soundClone.play().catch((error) => console.log("Audio play Error:", error));
    } catch (error) {
      console.log("Audio error:", error);
    }
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
