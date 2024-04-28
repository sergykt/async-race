import { useEffect } from 'react';

export const useSetEngineIds = (
  engineIds: number[],
  setSelectedEngines: (ids: number[]) => void,
) => {
  useEffect(() => {
    setSelectedEngines(engineIds);
  }, [engineIds, setSelectedEngines]);
};
