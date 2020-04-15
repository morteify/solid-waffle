import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { RootReducer } from '../redux/features/root';
import { useDispatch } from 'react-redux';
import { pauseMusic, playMusic, playMusicFailure } from '../redux/features/musicPlayer';

interface MusicPlayer {
  songURL: string;
}

function useMusicPlayer(): [
  Howl,
  number,
  number,
  (arg0: number) => void,
  () => void,
  number,
  (arg0: number) => void,
  number,
] {
  const dispatch = useDispatch();
  const [sound, setSound] = useState<Howl | null>();
  const [volume, setVolume] = useState<number>(0.5);
  const [mute, setMute] = useState<boolean>(false);
  const [soundID, setSoundID] = useState<number>();
  const [currentSoundPosition, setCurrentSoundPosition] = useState<number>();
  const [songDuration, setSongDuration] = useState<number>();
  const isSoundPaused = useSelector((state: RootReducer) => state.musicPlayer.isPaused);
  const isSoundPlaying = useSelector((state: RootReducer) => state.musicPlayer.isPlaying);
  const soundURL = useSelector((state: RootReducer) => state.musicPlayer.soundURL);
  let timer: number;

  const handleCurrentSoundPosition = (value: number): void => {
    // (sound as any)._sounds[0]._seek
    console.log('value', value);
    console.log('value but current', currentSoundPosition);
    sound?.seek(value, soundID);
    setCurrentSoundPosition(value);
    console.log('value but current 2', currentSoundPosition);
  };

  const runTimer = (): void => {
    timer = setInterval(() => {
      console.log('ehh', currentSoundPosition);
      setCurrentSoundPosition((value: number | undefined) => (value as number) + 1);
      console.log('ehh 2', currentSoundPosition);
    }, 1000);
  };

  const stopTimer = (): void => {
    clearInterval(timer);
  };

  const toggleSoundMute = (): void => {
    if (!mute) {
      sound?.mute(true);
      setMute(true);
    } else {
      sound?.mute(false);
      setMute(false);
    }
  };

  const handleVolume = (value: number): void => {
    sound?.volume(value);
    setVolume(value);
  };

  const createSound = (...urls: Array<string>): Howl => {
    const sound = new Howl({
      src: [...urls],
      format: ['mp3', 'aac', 'flac', 'oog'],
      html5: true,
      volume: volume,
      mute: mute,
      onload: (): void => {
        dispatch(playMusic());
      },
      onloaderror: (id, error): void => {
        dispatch(playMusicFailure(error));
      },
      onplay: (id): void => {
        console.log('run timer');
        runTimer();
      },
      onpause: (id): void => {
        console.log('stopped timer');
        stopTimer();
      },
      onplayerror: (id, error): void => {
        dispatch(playMusicFailure(error));
      },
    });
    return sound;
  };

  const playSound = (): void => {
    setSoundID(sound?.play());
  };

  const pauseSound = (): void => {
    sound?.pause();
  };

  const stopSound = (): void => {
    sound?.stop();
  };

  useEffect(() => {
    return (): void => stopTimer();
  }, []);

  useEffect(() => {
    console.log('eooo');
    const time = Number(sound?.seek(soundID)) || 0;
    setCurrentSoundPosition(time);
    setSongDuration(sound?.duration(soundID));
  }, [sound, soundID]);

  useEffect(() => {
    console.log('changed', currentSoundPosition);
  }, [currentSoundPosition]);

  useEffect(() => {
    setSongDuration(sound?.duration(soundID) as number);
  }, [sound]);

  useEffect(() => {
    stopSound();
    setSound(createSound(soundURL as string));
  }, [soundURL]);

  useEffect(() => {
    if (isSoundPaused) {
      pauseSound();
    }
    if (isSoundPlaying) {
      playSound();
    }
  }, [isSoundPaused, isSoundPlaying]);

  return [
    sound as Howl,
    soundID as number,
    volume,
    handleVolume,
    toggleSoundMute,
    currentSoundPosition as number,
    handleCurrentSoundPosition,
    songDuration as number,
  ];
}

export default useMusicPlayer;
