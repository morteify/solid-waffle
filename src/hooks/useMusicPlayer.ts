import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

interface MusicPlayerHookProps {
  soundURL: string;
}

interface MusicPlayerHook {
  sound: Howl;
  soundID: number;
  isSoundPlaying: boolean;
  playSound: () => void;
  pauseSound: () => void;
  getVolume: () => number;
  setVolume: (value: number) => void;
  isMuted: boolean;
  toggleSoundMute: () => void;
  getSoundDuration: () => number;
  currentSoundPosition: number;
  setCurrentSoundPosition: (value: number) => void;
  changeCurrentSoundPosition: (value: number) => void;
  isLoading: boolean;
}

function useMusicPlayer({ soundURL }: MusicPlayerHookProps): MusicPlayerHook {
  const [sound, setSound] = useState<Howl | null>();
  const [soundID, setSoundID] = useState<number>();
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volumeValue, setVolumeValue] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSoundPositionValue, setCurrentSoundPositionValue] = useState(0);

  const createSound = (...urls: Array<string>): Howl => {
    const sound = new Howl({
      src: [...urls],
      format: ['mp3', 'aac', 'flac', 'oog'],
      html5: true,
      volume: volumeValue,
      preload: true,
      mute: isMuted,
      onload: (): void => {
        setIsLoading(false);
      },
      onloaderror: (id, error): void => {},
      onplay: (id): void => {},
      onpause: (id): void => {},
      onplayerror: (id, error): void => {},
      onend: (id): void => {
        stopSound();
      },
      onseek: (id): void => {},
    });
    return sound;
  };

  useEffect(() => {
    if (soundURL != '') {
      setIsLoading(true);
    }
    stopSound();
    setSound(createSound(soundURL as string));
  }, [soundURL]);

  useEffect(() => {
    if (!isLoading) {
      playSound();
    }
  }, [isLoading]);

  const toggleSoundMute = (): void => {
    if (!isMuted) {
      sound?.mute(true);
      setIsMuted(true);
    } else {
      sound?.mute(false);
      setIsMuted(false);
    }
  };

  const getVolume = (): number => {
    return volumeValue;
  };

  const setVolume = (value: number): void => {
    sound?.volume(value);
    setVolumeValue(value);
  };

  const playSound = (): void => {
    setIsSoundPlaying(true);
    setSoundID(sound?.play());
  };

  const pauseSound = (): void => {
    setIsSoundPlaying(false);
    sound?.pause();
  };

  const stopSound = (): void => {
    setIsSoundPlaying(false);
    setCurrentSoundPosition(0);
    sound?.stop();
  };

  const getSoundDuration = (): number => {
    try {
      const duration = sound?.duration(soundID) as number;
      return duration;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const setCurrentSoundPosition = (value: number): void => {
    setCurrentSoundPositionValue(value);
  };

  const changeCurrentSoundPosition = (value: number): void => {
    setCurrentSoundPositionValue(value);
    sound?.seek(value, soundID);
  };

  return {
    sound: sound as Howl,
    soundID: soundID as number,
    isSoundPlaying,
    playSound,
    pauseSound,
    getVolume,
    setVolume,
    isMuted,
    toggleSoundMute,
    getSoundDuration,
    currentSoundPosition: currentSoundPositionValue,
    setCurrentSoundPosition,
    changeCurrentSoundPosition,
    isLoading,
  };
}

export default useMusicPlayer;
