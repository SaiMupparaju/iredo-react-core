// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PokerGame, Game, GameRequest, UserInfo } = initSchema(schema);

export {
  PokerGame,
  Game,
  GameRequest,
  UserInfo
};