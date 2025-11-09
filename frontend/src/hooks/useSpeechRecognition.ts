/// <reference types="@types/dom-speech-recognition" />

import { useState, useEffect, useRef } from 'react';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const hasRecognitionSupport = !!SpeechRecognition;

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!hasRecognitionSupport) {
      console.log('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening even after a pause
    recognition.interimResults = true; // Get results as the user speaks
    recognition.lang = 'en-US'; // Set language

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // Combine all results into a single transcript string
      const currentTranscript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setTranscript(currentTranscript);
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      // Automatically update listening state when recognition ends
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
  }, []); // This effect runs only once on mount

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript(''); // Clear previous transcript before starting
      recognitionRef.current.start();
    }
    setIsListening(prev => !prev);
  };

  return {
    isListening,
    transcript,
    hasRecognitionSupport,
    toggleListening,
  };
};