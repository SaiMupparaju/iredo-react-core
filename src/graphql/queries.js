/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGamesNearMe = /* GraphQL */ `
  query GetGamesNearMe($latitude: Float!, $longitude: Float!) {
    getGamesNearMe(latitude: $latitude, longitude: $longitude) {
      id
      owner_sub
      address
      max_players
      num_cur_players
      small_blind
      big_blind
      longitude
      latitude
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const getPokerGame = /* GraphQL */ `
  query GetPokerGame($id: ID!) {
    getPokerGame(id: $id) {
      id
      owner_sub
      max_players
      num_cur_players
      small_blind
      big_blind
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listPokerGames = /* GraphQL */ `
  query ListPokerGames(
    $filter: ModelPokerGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPokerGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner_sub
        max_players
        num_cur_players
        small_blind
        big_blind
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPokerGames = /* GraphQL */ `
  query SyncPokerGames(
    $filter: ModelPokerGameFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPokerGames(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        owner_sub
        max_players
        num_cur_players
        small_blind
        big_blind
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      owner_sub
      address
      max_players
      num_cur_players
      small_blind
      big_blind
      longitude
      latitude
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner_sub
        address
        max_players
        num_cur_players
        small_blind
        big_blind
        longitude
        latitude
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncGames = /* GraphQL */ `
  query SyncGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncGames(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        owner_sub
        address
        max_players
        num_cur_players
        small_blind
        big_blind
        longitude
        latitude
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
