/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: activeEventsQuery
// ====================================================

export interface activeEventsQuery_events {
  __typename: "events";
  id: number;
  status: event_status_enum;
}

export interface activeEventsQuery {
  /**
   * fetch data from the table: "events"
   */
  events: activeEventsQuery_events[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allSeasonsQuery
// ====================================================

export interface allSeasonsQuery_seasons {
  __typename: "seasons";
  id: number;
  name: string;
  status: season_status_enum;
}

export interface allSeasonsQuery {
  /**
   * fetch data from the table: "seasons"
   */
  seasons: allSeasonsQuery_seasons[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seasonQuery
// ====================================================

export interface seasonQuery_season {
  __typename: "seasons";
  id: number;
  name: string;
  status: season_status_enum;
}

export interface seasonQuery {
  /**
   * fetch data from the table: "seasons" using primary key columns
   */
  season: seasonQuery_season | null;
}

export interface seasonQueryVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum event_status_enum {
  FINISHED = "FINISHED",
  PENDING = "PENDING",
}

export enum season_status_enum {
  CLOSED = "CLOSED",
  FINALS = "FINALS",
  PENDING = "PENDING",
  REGULAR = "REGULAR",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
