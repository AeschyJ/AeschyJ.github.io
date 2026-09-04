/**
 * Web Speech API Japanese Pronunciation Engine
 */

class SpeechEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.jaVoice = null;
    this.speedRate = 0.9;
    this.initVoice();
  }

  initVoice() {
    if (!this.synth) return;

    const findVoice = () => {
      const voices = this.synth.getVoices();
      // Look for natural Japanese voices (Google 日本語, Kyoko, Otoya, etc.)
      this.jaVoice = voices.find(v => 
        (v.lang === 'ja-JP' || v.lang === 'ja_JP') && 
        (v.name.includes('Kyoko') || v.name.includes('Otoya') || v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Otoya'))
      ) || voices.find(v => v.lang.startsWith('ja')) || null;
    };

    findVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findVoice;
    }
  }

  setRate(rate) {
    this.speedRate = rate;
  }

  speak(text, customRate = null) {
    return new Promise((resolve, reject) => {
      if (!this.synth) {
        alert('您的瀏覽器不支援語音朗讀功能');
        return reject(new Error('SpeechSynthesis not supported'));
      }

      this.synth.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.jaVoice) {
        utterance.voice = this.jaVoice;
      }
      utterance.lang = 'ja-JP';
      utterance.rate = customRate || this.speedRate;
      utterance.pitch = 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (err) => {
        console.warn('Speech synthesis error', err);
        resolve();
      };

      this.synth.speak(utterance);
    });
  }
}

window.appSpeech = new SpeechEngine();
