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
// GraphQL query operation: lastSeasonQuery
// ====================================================

export interface lastSeasonQuery_seasons {
  __typename: "seasons";
  id: number;
  name: string;
  status: season_status_enum;
}

export interface lastSeasonQuery {
  /**
   * fetch data from the table: "seasons"
   */
  seasons: lastSeasonQuery_seasons[];
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
