/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createEventMutation
// ====================================================

export interface createEventMutation_createEvent {
  __typename: "Event";
  id: string | null;
}

export interface createEventMutation {
  /**
   *  Create a single Event item. 
   */
  createEvent: createEventMutation_createEvent | null;
}

export interface createEventMutationVariables {
  courseId: string;
  seasonId: string;
  special: boolean;
  type: EventTypeType;
  scoring: EventScoringType;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: activeEventsQuery
// ====================================================

export interface activeEventsQuery_events {
  __typename: "Event";
  id: string | null;
  status: EventStatusType | null;
}

export interface activeEventsQuery {
  /**
   *  Search for all Event items which match the where clause. 
   */
  events: (activeEventsQuery_events | null)[] | null;
}

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
// GraphQL query operation: playSetupQuery
// ====================================================

export interface playSetupQuery_activeEvents {
  __typename: "Event";
  id: string | null;
  status: EventStatusType | null;
}

export interface playSetupQuery_courses__holesMeta {
  __typename: "_QueryMeta";
  count: number | null;
}

export interface playSetupQuery_courses {
  __typename: "Course";
  id: string | null;
  club: string | null;
  name: string | null;
  par: number | null;
  _holesMeta: playSetupQuery_courses__holesMeta | null;
}

export interface playSetupQuery {
  /**
   *  Search for all Event items which match the where clause. 
   */
  activeEvents: (playSetupQuery_activeEvents | null)[] | null;
  /**
   *  Search for all Course items which match the where clause. 
   */
  courses: (playSetupQuery_courses | null)[] | null;
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
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EventScoringType {
  POINTS = "POINTS",
  STROKES = "STROKES",
}

export enum EventStatusType {
  FINISHED = "FINISHED",
  STARTED = "STARTED",
}

export enum EventTypeType {
  INDIVIDUAL = "INDIVIDUAL",
  TEAM = "TEAM",
}

export enum SeasonStatusType {
  FINALS = "FINALS",
  FINISHED = "FINISHED",
  REGULAR = "REGULAR",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
