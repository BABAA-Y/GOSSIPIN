const keyStrokeSound = [
    new Audio('/sound/keystroke1.mp3'),
    new Audio('/sound/keystroke2.mp3'),
    new Audio('/sound/keystroke3.mp3'),
    new Audio('/sound/keystroke4.mp3'),
]

function useKeyboardSound(){
    const playRandomKeyStrokeSound = () => {
        const randomSound = keyStrokeSound[Math.floor(Math.random() * keyStrokeSound.length)];

        randomSound.currentTime=0 // this is for a  better ux def add this
        randomSound.play().catch(error => console.error("Audio play Error:", error)
        )
    }

    return{playRandomKeyStrokeSound};
}

export default useKeyboardSound;