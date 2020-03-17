

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createEventMutation
// ====================================================

export interface createEventMutation_createOneEvent_course {
  id: number;
}

export interface createEventMutation_createOneEvent {
  id: number;
  status: EventStatus;
  course: createEventMutation_createOneEvent_course;
}

export interface createEventMutation {
  createOneEvent: createEventMutation_createOneEvent;
}

export interface createEventMutationVariables {
  courseId: number;
  seasonId: number;
  special: boolean;
  type: EventType;
  scoring: EventScoring;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allPlayersQuery
// ====================================================

export interface allPlayersQuery_players {
  id: number;
  photo: string | null;
  firstName: string;
  lastName: string;
}

export interface allPlayersQuery {
  players: allPlayersQuery_players[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allSeasonsQuery
// ====================================================

export interface allSeasonsQuery_seasons_finalInfo {
  photo: string;
}

export interface allSeasonsQuery_seasons {
  id: number;
  name: string;
  status: SeasonStatus;
  finalInfo: allSeasonsQuery_seasons_finalInfo | null;
}

export interface allSeasonsQuery {
  seasons: allSeasonsQuery_seasons[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: playSetupQuery
// ====================================================

export interface playSetupQuery_courses_holes {
  id: number;
}

export interface playSetupQuery_courses {
  id: number;
  club: string;
  name: string;
  par: number;
  holes: playSetupQuery_courses_holes[];
}

export interface playSetupQuery {
  courses: playSetupQuery_courses[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seasonQuery
// ====================================================

export interface seasonQuery_season_events_course {
  id: number;
  club: string;
  name: string;
}

export interface seasonQuery_season_events {
  id: number;
  status: EventStatus;
  special: boolean;
  type: EventType;
  scoring: EventScoring;
  course: seasonQuery_season_events_course;
}

export interface seasonQuery_season {
  id: number;
  name: string;
  status: SeasonStatus;
  events: seasonQuery_season_events[];
}

export interface seasonQuery {
  season: seasonQuery_season | null;
}

export interface seasonQueryVariables {
  id: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EventType {
  INDIVIDUAL = "INDIVIDUAL",
  TEAM = "TEAM",
}

export enum EventScoring {
  POINTS = "POINTS",
  STROKES = "STROKES",
}

export enum EventStatus {
  FINISHED = "FINISHED",
  STARTED = "STARTED",
}

export enum SeasonStatus {
  FINALS = "FINALS",
  FINISHED = "FINISHED",
  REGULAR = "REGULAR",
}

//==============================================================
// END Enums and Input Objects
//==============================================================