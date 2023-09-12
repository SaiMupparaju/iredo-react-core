/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPokerGame = /* GraphQL */ `
  mutation CreatePokerGame(
    $input: CreatePokerGameInput!
    $condition: ModelPokerGameConditionInput
  ) {
    createPokerGame(input: $input, condition: $condition) {
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
export const updatePokerGame = /* GraphQL */ `
  mutation UpdatePokerGame(
    $input: UpdatePokerGameInput!
    $condition: ModelPokerGameConditionInput
  ) {
    updatePokerGame(input: $input, condition: $condition) {
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
export const deletePokerGame = /* GraphQL */ `
  mutation DeletePokerGame(
    $input: DeletePokerGameInput!
    $condition: ModelPokerGameConditionInput
  ) {
    deletePokerGame(input: $input, condition: $condition) {
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
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
