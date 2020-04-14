import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { RootReducer } from '../redux/features/root';
import { useDispatch } from 'react-redux';
import { pauseMusic, playMusic, playMusicFailure } from '../redux/features/musicPlayer';

interface MusicPlayer {
  songURL: string;
}

function useMusicPlayer(): [Howl, number, (arg0: number) => void, () => void] {
  const dispatch = useDispatch();
  const [sound, setSound] = useState<Howl | null>();
  const [volume, setVolume] = useState<number>(0.5);
  const [mute, setMute] = useState<boolean>(false);
  const isSoundPaused = useSelector((state: RootReducer) => state.musicPlayer.isPaused);
  const isSoundPlaying = useSelector((state: RootReducer) => state.musicPlayer.isPlaying);
  const soundURL = useSelector((state: RootReducer) => state.musicPlayer.soundURL);

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
      onplayerror: (id, error): void => {
        dispatch(playMusicFailure(error));
      },
    });
    return sound;
  };

  const playSound = (): void => {
    sound?.play();
  };

  const pauseSound = (): void => {
    sound?.pause();
  };

  const stopSound = (): void => {
    sound?.stop();
  };

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

  return [sound as Howl, volume, handleVolume, toggleSoundMute];
}

export default useMusicPlayer;
