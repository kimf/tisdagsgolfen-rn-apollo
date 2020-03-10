/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allSeasonsQuery
// ====================================================

export interface allSeasonsQuery_seasons {
  __typename: "Season";
  id: string | null;
  name: string | null;
  status: SeasonStatusType | null;
}

export interface allSeasonsQuery {
  /**
   *  Search for all Season items which match the where clause. 
   */
  seasons: (allSeasonsQuery_seasons | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seasonQuery
// ====================================================

export interface seasonQuery_season {
  __typename: "Season";
  id: string | null;
  name: string | null;
  status: SeasonStatusType | null;
}

export interface seasonQuery {
  /**
   *  Search for the Season item with the matching ID. 
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

export enum SeasonStatusType {
  FINALS = "FINALS",
  FINISHED = "FINISHED",
  REGULAR = "REGULAR",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
