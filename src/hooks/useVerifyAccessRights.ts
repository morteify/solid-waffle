import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootReducer } from '../redux/features/root';
import { useHistory } from 'react-router-dom';

interface VerifyAccessRights {
  redirectTo: string;
}

function useVerifyAccessRights({ redirectTo }: VerifyAccessRights) {
  const history = useHistory();
  const url = useSelector((state: RootReducer) => state.currentSession.url);
  const [hasAccessRights, setHasAccessRights] = useState<boolean | null>(null);

  useEffect(() => {
    if (!url) setHasAccessRights(false);
    else setHasAccessRights(true);
  }, [url]);

  useEffect(() => {
    if (hasAccessRights === false) history.push(redirectTo);
  }, [hasAccessRights]);

  return { hasAccessRights };
}

export default useVerifyAccessRights;
