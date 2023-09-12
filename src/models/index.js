// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PokerGame, Game } = initSchema(schema);

export {
  PokerGame,
  Game
};