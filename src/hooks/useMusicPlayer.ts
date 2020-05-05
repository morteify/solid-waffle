import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { RootReducer } from '../redux/features/root';
import { useDispatch } from 'react-redux';
import { pauseMusic, playMusic, playMusicFailure, stopMusic } from '../redux/features/musicPlayer';

function useMusicPlayer(): [
  Howl,
  number,
  number,
  (arg0: number) => void,
  boolean,
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
  // const isLoaded = useSelector((state: RootReducer) => !state.musicPlayer.isLoading);
  // const shouldPauseSound = useSelector((state: RootReducer) => state.musicPlayer.isPaused);
  // const shouldPlaySound = useSelector((state: RootReducer) => state.musicPlayer.isPlaying);
  // const soundURL = useSelector((state: RootReducer) => state.musicPlayer.soundURL);
  let timer: number;

  // const runTimer = (): void => {
  //   timer = setInterval(() => {
  //     const val = Math.round(sound?.seek(soundID) as number);
  //     if (!Number.isNaN(val)) setCurrentSoundPosition(val);
  //   }, 1000);
  // };

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

  const playSound = (): void => {
    setSoundID(sound?.play());
  };

  const pauseSound = (): void => {
    sound?.pause();
  };

  const stopSound = (): void => {
    sound?.stop();
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
        //runTimer();
      },
      onpause: (id): void => {
        clearInterval(timer);
      },
      onplayerror: (id, error): void => {
        dispatch(playMusicFailure(error));
      },
      onend: (id): void => {
        clearInterval(timer);
        dispatch(stopMusic());
      },
      onseek: (id): void => {
        //stopTimer();
      },
    });
    return sound;
  };

  useEffect(() => {
    stopSound();
    setSound(createSound(soundURL as string));
  }, [soundURL]);

  useEffect(() => {
    timer = setInterval(() => {
      const val = Math.round(sound?.seek(soundID) as number);
      if (!Number.isNaN(val)) setCurrentSoundPosition(val);
    }, 1000);
  }, [sound?.seek(soundID)]);

  useEffect(() => {
    const time = Number(sound?.seek(soundID)) || 0;
    setCurrentSoundPosition(time);
    setSongDuration(sound?.duration(soundID));

    return () => {
      setCurrentSoundPosition(0);
    };
  }, [sound, soundID]);

  useEffect(() => {
    if (shouldPauseSound) {
      pauseSound();
    }
    if (shouldPlaySound) {
      playSound();
    }
  }, [shouldPauseSound, shouldPlaySound]);

  return [
    sound as Howl,
    soundID as number,
    volume,
    handleVolume,
    mute,
    toggleSoundMute,
    currentSoundPosition as number,
    setCurrentSoundPosition,
    songDuration as number,
  ];
}

export default useMusicPlayer;
