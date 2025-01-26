export const speakVietnamese = (text: string): void => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    window.speechSynthesis.speak(utterance);
}