import React, { useState, useEffect } from 'react';

interface Track {
  title: string;
  listen_url: string;
  tags: Array<string>;
  copyright: string;
}

function TracksView() {
  const [tracks, setTracks] = useState<Array<Partial<Track>> | null>(null);
  useEffect(() => {
    fetch('https://funkwhale.it/api/v1/tracks')
      .then((response) => response.json())
      .then((result) => setTracks(result.results));
  }, []);
  return (
    <>
      <div>Songs view</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tracks?.map((track) => (
          <>
            <p>{track.title}</p>
            <p>{track.listen_url}</p>
          </>
        ))}
      </div>
    </>
  );
}

export default TracksView;
