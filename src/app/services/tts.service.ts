import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TtsService {
  private synth = window.speechSynthesis;
  
  // Reactive states for UI bindings
  isSpeaking = signal(false);
  currentText = signal<string | null>(null);

  // Store a strong reference to prevent Chrome Garbage Collection bugs where events stop firing
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  toggleSpeak(text: string, rate: number = 1.0) {
    // If currently speaking the exact same text, stop it and return
    if (this.synth.speaking && this.currentText() === text) {
      this.stop();
      return;
    }
    
    // Stop any ongoing speech before starting a new one
    this.stop();

    // Eagerly set the signal for immediate UI reactivity
    this.isSpeaking.set(true);
    this.currentText.set(text);

    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.rate = rate;
    this.currentUtterance.lang = 'en-US';
    
    // Ensure cleanup happens on completion or error
    this.currentUtterance.onend = () => {
      this.isSpeaking.set(false);
      this.currentText.set(null);
    };
    
    this.currentUtterance.onerror = () => {
      this.isSpeaking.set(false);
      this.currentText.set(null);
    };
    
    const voices = this.synth.getVoices();
    const prefferedVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB');
    if (prefferedVoice) {
      this.currentUtterance.voice = prefferedVoice;
    }
    
    this.synth.speak(this.currentUtterance);
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    this.isSpeaking.set(false);
    this.currentText.set(null);
  }
}
