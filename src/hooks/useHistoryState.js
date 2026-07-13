import { useState, useCallback } from 'react';

/**
 * Custom hook to manage an Undo/Redo stack for the Template Editor.
 */
export const useHistoryState = (initialState) => {
  const [state, setState] = useState(initialState);
  const [history, setHistory] = useState([initialState]);
  const [pointer, setPointer] = useState(0);

  const setWithHistory = useCallback((newState) => {
    // Determine what the new state evaluates to (could be a function)
    const resolvedState = typeof newState === 'function' ? newState(state) : newState;
    
    // If the state hasn't changed, do nothing
    if (JSON.stringify(resolvedState) === JSON.stringify(state)) return;

    // Slice history up to current pointer, discarding "future" states if we've undone
    const newHistory = history.slice(0, pointer + 1);
    newHistory.push(resolvedState);

    // Keep history from growing infinitely (cap at 50)
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setPointer(prev => prev + 1);
    }

    setHistory(newHistory);
    setState(resolvedState);
  }, [history, pointer, state]);

  const undo = useCallback(() => {
    if (pointer > 0) {
      setPointer(prev => prev - 1);
      setState(history[pointer - 1]);
    }
  }, [history, pointer]);

  const redo = useCallback(() => {
    if (pointer < history.length - 1) {
      setPointer(prev => prev + 1);
      setState(history[pointer + 1]);
    }
  }, [history, pointer]);

  return [state, setWithHistory, { undo, redo, canUndo: pointer > 0, canRedo: pointer < history.length - 1 }];
};
