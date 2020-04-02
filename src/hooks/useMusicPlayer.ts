import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';

function createSound(...urls: Array<string>): Howl {
  const sound = new Howl({
    src: [...urls],
    format: ['mp3', 'aac', 'flac', 'oog'],
    volume: 0.5,
    /**
     * html5 Boolean false
     * Set to true to force HTML5 Audio. This should be used for large audio files so
     * that you don't have to wait for the full file to be downloaded and decoded before playing.
     */
    html5: true,
    onend: (): void => {
      console.log('Finished playing!');
    },
  });
  return sound;
}

interface MusicPlayer {
  songURL: string;
}

function useMusicPlayer({ songURL }: MusicPlayer): Howl {
  const [currentSongURL, setCurrentSongURL] = useState<string | null>('');
  console.log('howler', currentSongURL);
  useEffect(() => {
    setCurrentSongURL(songURL);
  }, [songURL]);

  const sound = createSound(currentSongURL as string);
  return sound;
}

export default useMusicPlayer;
