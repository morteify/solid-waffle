import { renderHook, act } from '@testing-library/react-hooks';
import useMusicPlayer from './useMusicPlayer';
import { Howl } from 'howler';

const soundURL = 'https://funkwhale.com';
const createSound = (...urls: Array<string>): Howl => {
  const sound = new Howl({
    src: [...urls],
    format: ['mp3', 'aac', 'flac', 'oog'],
    html5: true,
    volume: 0.5,
    mute: false,
    onload: (): void => {},
    onloaderror: (id, error): void => {},
    onplay: (id): void => {},
    onpause: (id): void => {},
    onplayerror: (id, error): void => {},
    onend: (id): void => {},
    onseek: (id): void => {},
  });
  return sound;
};

beforeEach(() => {
  // disables errors in console's output to make it more readable
  console.error = jest.fn();
});

describe('MusicPlayer custom hook', () => {
  test('should create basic howler object', () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = createSound(soundURL as string);
    expect(JSON.stringify(result.current.sound)).toEqual(JSON.stringify(expected));
  });

  test('should play sound', () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = true;
    act(() => {
      result.current.playSound();
    });
    expect(result.current.isSoundPlaying).toBe(expected);
  });

  test('should pause sound', () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = false;
    act(() => {
      result.current.pauseSound();
    });
    expect(result.current.isSoundPlaying).toBe(expected);
  });

  test('should set soundID when music starts playing', () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = '1002';
    act(() => {
      result.current.playSound();
    });
    expect(result.current.soundID.toString()).toBe(expected);
  });

  test("should return volume's initial value", () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = 0.5;
    expect(result.current.getVolume()).toBe(expected);
  });

  test('should set volume', () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = 0.31;
    act(() => {
      result.current.setVolume(0.31);
    });
    expect(result.current.getVolume()).toBe(expected);
  });

  test('should mute sound', () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = true;
    act(() => {
      result.current.toggleSoundMute(); // true
      result.current.toggleSoundMute(); // false
      result.current.toggleSoundMute(); // true
    });
    expect(result.current.isMuted).toBe(expected);
  });

  test("should return sound's duration", () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = 0;
    expect(result.current.getSoundDuration()).toBe(expected);
  });

  test("should return sound's initial position", () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = 0;
    expect(result.current.currentSoundPosition).toBe(0);
  });

  test("should set sound's current position", () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = 0;
    act(() => {
      result.current.setCurrentSoundPosition(3982173174);
    });
    expect(result.current.currentSoundPosition).toBe(3982173174);
  });

  test("should change sound's current position", () => {
    const { result } = renderHook(() => useMusicPlayer({ soundURL }));
    const expected = 0;
    act(() => {
      result.current.changeCurrentSoundPosition(1212311111);
    });
    expect(result.current.currentSoundPosition).toBe(1212311111);
  });
});
