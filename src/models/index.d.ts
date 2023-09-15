import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier, CustomIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





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

type EagerGame = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Game, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner_sub: string;
  readonly address: string;
  readonly max_players: number;
  readonly num_cur_players?: number | null;
  readonly small_blind: number;
  readonly big_blind: number;
  readonly longitude: number;
  readonly latitude: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGame = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Game, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner_sub: string;
  readonly address: string;
  readonly max_players: number;
  readonly num_cur_players?: number | null;
  readonly small_blind: number;
  readonly big_blind: number;
  readonly longitude: number;
  readonly latitude: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Game = LazyLoading extends LazyLoadingDisabled ? EagerGame : LazyGame

export declare const Game: (new (init: ModelInit<Game>) => Game) & {
  copyOf(source: Game, mutator: (draft: MutableModel<Game>) => MutableModel<Game> | void): Game;
}

type EagerGameRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly gameID: string;
  readonly requester_sub: string;
  readonly status: string;
  readonly game?: Game | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGameRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly gameID: string;
  readonly requester_sub: string;
  readonly status: string;
  readonly game: AsyncItem<Game | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type GameRequest = LazyLoading extends LazyLoadingDisabled ? EagerGameRequest : LazyGameRequest

export declare const GameRequest: (new (init: ModelInit<GameRequest>) => GameRequest) & {
  copyOf(source: GameRequest, mutator: (draft: MutableModel<GameRequest>) => MutableModel<GameRequest> | void): GameRequest;
}

type EagerUserInfo = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<UserInfo, 'user_sub'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_sub: string;
  readonly first_name?: string | null;
  readonly family_name?: string | null;
  readonly email?: string | null;
  readonly birthdate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserInfo = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<UserInfo, 'user_sub'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user_sub: string;
  readonly first_name?: string | null;
  readonly family_name?: string | null;
  readonly email?: string | null;
  readonly birthdate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserInfo = LazyLoading extends LazyLoadingDisabled ? EagerUserInfo : LazyUserInfo

export declare const UserInfo: (new (init: ModelInit<UserInfo>) => UserInfo) & {
  copyOf(source: UserInfo, mutator: (draft: MutableModel<UserInfo>) => MutableModel<UserInfo> | void): UserInfo;
}