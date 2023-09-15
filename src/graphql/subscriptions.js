/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePokerGame = /* GraphQL */ `
  subscription OnCreatePokerGame(
    $filter: ModelSubscriptionPokerGameFilterInput
  ) {
    onCreatePokerGame(filter: $filter) {
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
export const onUpdatePokerGame = /* GraphQL */ `
  subscription OnUpdatePokerGame(
    $filter: ModelSubscriptionPokerGameFilterInput
  ) {
    onUpdatePokerGame(filter: $filter) {
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
export const onDeletePokerGame = /* GraphQL */ `
  subscription OnDeletePokerGame(
    $filter: ModelSubscriptionPokerGameFilterInput
  ) {
    onDeletePokerGame(filter: $filter) {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
    onCreateGame(filter: $filter) {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
    onUpdateGame(filter: $filter) {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
    onDeleteGame(filter: $filter) {
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
export const onCreateGameRequest = /* GraphQL */ `
  subscription OnCreateGameRequest(
    $filter: ModelSubscriptionGameRequestFilterInput
  ) {
    onCreateGameRequest(filter: $filter) {
      id
      gameID
      requester_sub
      status
      game {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateGameRequest = /* GraphQL */ `
  subscription OnUpdateGameRequest(
    $filter: ModelSubscriptionGameRequestFilterInput
  ) {
    onUpdateGameRequest(filter: $filter) {
      id
      gameID
      requester_sub
      status
      game {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteGameRequest = /* GraphQL */ `
  subscription OnDeleteGameRequest(
    $filter: ModelSubscriptionGameRequestFilterInput
  ) {
    onDeleteGameRequest(filter: $filter) {
      id
      gameID
      requester_sub
      status
      game {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateUserInfo = /* GraphQL */ `
  subscription OnCreateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onCreateUserInfo(filter: $filter) {
      id
      user_sub
      first_name
      family_name
      email
      birthdate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateUserInfo = /* GraphQL */ `
  subscription OnUpdateUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onUpdateUserInfo(filter: $filter) {
      id
      user_sub
      first_name
      family_name
      email
      birthdate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteUserInfo = /* GraphQL */ `
  subscription OnDeleteUserInfo($filter: ModelSubscriptionUserInfoFilterInput) {
    onDeleteUserInfo(filter: $filter) {
      id
      user_sub
      first_name
      family_name
      email
      birthdate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
