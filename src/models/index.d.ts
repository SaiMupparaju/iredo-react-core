import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPokerGame = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PokerGame, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner_sub: string;
  readonly max_players: number;
  readonly num_cur_players?: number | null;
  readonly small_blind: number;
  readonly big_blind: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPokerGame = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PokerGame, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner_sub: string;
  readonly max_players: number;
  readonly num_cur_players?: number | null;
  readonly small_blind: number;
  readonly big_blind: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PokerGame = LazyLoading extends LazyLoadingDisabled ? EagerPokerGame : LazyPokerGame

export declare const PokerGame: (new (init: ModelInit<PokerGame>) => PokerGame) & {
  copyOf(source: PokerGame, mutator: (draft: MutableModel<PokerGame>) => MutableModel<PokerGame> | void): PokerGame;
}