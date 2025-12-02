import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Music, Mic, Wand2, Download, RotateCcw, 
  Sparkles, AlertCircle, Volume2, StopCircle, Edit3, Lock, 
  CreditCard, X, QrCode, Store, Megaphone, ExternalLink, 
  Video, CheckCircle2, Instagram, MessageCircle 
} from 'lucide-react';

import { AppStep, Track, JingleData, TrackGenre, Voice, TrackCategory } from './types';
import { TRACK_LIBRARY, VOICE_LIBRARY, SCRIPT_TEMPLATES } from './constants';
import Button from './components/Button';
import { polishScript, generateSpeech, transcribeAudio } from './services/geminiService';
import { mixAudioTracks, pcmToWavBlob, getTrackPreviewUrl } from './services/audioService';

const GENRE_LABELS: Record<TrackGenre, string> = {
  [TrackGenre.UPBEAT]: 'AGITADO',
  [TrackGenre.CALM]: 'CALMO',
  [TrackGenre.CORPORATE]: 'CORPORATIVO',
  [TrackGenre.DRAMATIC]: 'DRAMÁTICO',
  [TrackGenre.CHRISTMAS]: 'NATALINO',
  [TrackGenre.POLITICAL]: 'POLÍTICO',
};

const PRICE_JINGLE = 49.00;
const PRICE_VIDEO_UPSELL = 29.99;

const WHATSAPP_NUMBER = '5511999999999';

const formatTime = (time: number) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function App() {

  // ⬇️ AQUI ESTÁ O USEEFFECT CORRIGIDO (SEM trackId)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');

    if (status === 'paid' || status === 'approved' || status === 'success') {
      setIsPaid(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
