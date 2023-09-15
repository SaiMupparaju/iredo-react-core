import React, { createContext, useContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState(null);
  
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};