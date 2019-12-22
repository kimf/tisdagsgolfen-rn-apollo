/* tslint:disable */
/* eslint-disable */
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
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum season_status_enum {
  CLOSED = "CLOSED",
  FINALS = "FINALS",
  PENDING = "PENDING",
  REGULAR = "REGULAR",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
