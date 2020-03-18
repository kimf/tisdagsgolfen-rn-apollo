

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createEvent
// ====================================================

export interface createEvent_createOneEvent_course {
  id: number;
}

export interface createEvent_createOneEvent {
  id: number;
  status: EventStatus;
  course: createEvent_createOneEvent_course;
}

export interface createEvent {
  createOneEvent: createEvent_createOneEvent;
}

export interface createEventVariables {
  courseId: number;
  seasonId: number;
  special: boolean;
  type: EventType;
  scoring: EventScoring;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: scoringSession
// ====================================================

export interface scoringSession_createOneScoringSession {
  id: number;
}

export interface scoringSession {
  createOneScoringSession: scoringSession_createOneScoringSession;
}

export interface scoringSessionVariables {
  eventId: number;
  players?: PlayerCreateManyWithoutScoringSessionInput | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: teamScoringSession
// ====================================================

export interface teamScoringSession_createOneScoringSession {
  id: number;
}

export interface teamScoringSession {
  createOneScoringSession: teamScoringSession_createOneScoringSession;
}

export interface teamScoringSessionVariables {
  eventId: number;
  teams?: TeamCreateManyWithoutScoringSessionInput | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: playersQuery
// ====================================================

export interface playersQuery_players {
  id: number;
  photo: string | null;
  firstName: string;
  lastName: string;
}

export interface playersQuery {
  players: playersQuery_players[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seasonsQuery
// ====================================================

export interface seasonsQuery_seasons_finalInfo {
  photo: string;
}

export interface seasonsQuery_seasons {
  id: number;
  name: string;
  status: SeasonStatus;
  finalInfo: seasonsQuery_seasons_finalInfo | null;
}

export interface seasonsQuery {
  seasons: seasonsQuery_seasons[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: coursesQuery
// ====================================================

export interface coursesQuery_courses_holes {
  id: number;
}

export interface coursesQuery_courses {
  id: number;
  club: string;
  name: string;
  par: number;
  holes: coursesQuery_courses_holes[];
}

export interface coursesQuery {
  courses: coursesQuery_courses[];
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

// null
export interface PlayerCreateManyWithoutScoringSessionInput {
  create?: PlayerCreateWithoutScoringSessionInput[] | null;
  connect?: PlayerWhereUniqueInput[] | null;
}

// null
export interface PlayerCreateWithoutScoringSessionInput {
  firstName: string;
  lastName: string;
  photo?: string | null;
  scores?: ScoreCreateManyWithoutPlayerInput | null;
  finalInfoes?: FinalInfoCreateManyWithoutWinnerInput | null;
  team?: TeamCreateOneWithoutPlayersInput | null;
}

// null
export interface ScoreCreateManyWithoutPlayerInput {
  create?: ScoreCreateWithoutPlayerInput[] | null;
  connect?: ScoreWhereUniqueInput[] | null;
}

// null
export interface ScoreCreateWithoutPlayerInput {
  resultValue: number;
  eventPoints: number;
  beers?: number | null;
  kr?: number | null;
  event: EventCreateOneWithoutScoresInput;
}

// null
export interface EventCreateOneWithoutScoresInput {
  create?: EventCreateWithoutScoresInput | null;
  connect?: EventWhereUniqueInput | null;
}

// null
export interface EventCreateWithoutScoresInput {
  special?: boolean | null;
  scoring?: EventScoring | null;
  status?: EventStatus | null;
  type?: EventType | null;
  course: CourseCreateOneWithoutEventsInput;
  season: SeasonCreateOneWithoutEventsInput;
  scoringSessions?: ScoringSessionCreateManyWithoutEventInput | null;
}

// null
export interface CourseCreateOneWithoutEventsInput {
  create?: CourseCreateWithoutEventsInput | null;
  connect?: CourseWhereUniqueInput | null;
}

// null
export interface CourseCreateWithoutEventsInput {
  club: string;
  name: string;
  par?: number | null;
  holes?: HoleCreateManyWithoutCourseInput | null;
}

// null
export interface HoleCreateManyWithoutCourseInput {
  create?: HoleCreateWithoutCourseInput[] | null;
  connect?: HoleWhereUniqueInput[] | null;
}

// null
export interface HoleCreateWithoutCourseInput {
  index: number;
  number: number;
  par: number;
}

// null
export interface HoleWhereUniqueInput {
  id?: number | null;
}

// null
export interface CourseWhereUniqueInput {
  id?: number | null;
}

// null
export interface SeasonCreateOneWithoutEventsInput {
  create?: SeasonCreateWithoutEventsInput | null;
  connect?: SeasonWhereUniqueInput | null;
}

// null
export interface SeasonCreateWithoutEventsInput {
  name: string;
  status: SeasonStatus;
  finalInfo?: FinalInfoCreateOneWithoutSeasonsInput | null;
}

// null
export interface FinalInfoCreateOneWithoutSeasonsInput {
  create?: FinalInfoCreateWithoutSeasonsInput | null;
  connect?: FinalInfoWhereUniqueInput | null;
}

// null
export interface FinalInfoCreateWithoutSeasonsInput {
  photo: string;
  story: string;
  winner: PlayerCreateOneWithoutFinalInfoesInput;
}

// null
export interface PlayerCreateOneWithoutFinalInfoesInput {
  create?: PlayerCreateWithoutFinalInfoesInput | null;
  connect?: PlayerWhereUniqueInput | null;
}

// null
export interface PlayerCreateWithoutFinalInfoesInput {
  firstName: string;
  lastName: string;
  photo?: string | null;
  scores?: ScoreCreateManyWithoutPlayerInput | null;
  team?: TeamCreateOneWithoutPlayersInput | null;
  scoringSession?: ScoringSessionCreateOneWithoutPlayersInput | null;
}

// null
export interface TeamCreateOneWithoutPlayersInput {
  create?: TeamCreateWithoutPlayersInput | null;
  connect?: TeamWhereUniqueInput | null;
}

// null
export interface TeamCreateWithoutPlayersInput {
  scoringSession?: ScoringSessionCreateOneWithoutTeamsInput | null;
}

// null
export interface ScoringSessionCreateOneWithoutTeamsInput {
  create?: ScoringSessionCreateWithoutTeamsInput | null;
  connect?: ScoringSessionWhereUniqueInput | null;
}

// null
export interface ScoringSessionCreateWithoutTeamsInput {
  currentHole?: number | null;
  event: EventCreateOneWithoutScoringSessionsInput;
  players?: PlayerCreateManyWithoutScoringSessionInput | null;
}

// null
export interface EventCreateOneWithoutScoringSessionsInput {
  create?: EventCreateWithoutScoringSessionsInput | null;
  connect?: EventWhereUniqueInput | null;
}

// null
export interface EventCreateWithoutScoringSessionsInput {
  special?: boolean | null;
  scoring?: EventScoring | null;
  status?: EventStatus | null;
  type?: EventType | null;
  course: CourseCreateOneWithoutEventsInput;
  season: SeasonCreateOneWithoutEventsInput;
  scores?: ScoreCreateManyWithoutEventInput | null;
}

// null
export interface ScoreCreateManyWithoutEventInput {
  create?: ScoreCreateWithoutEventInput[] | null;
  connect?: ScoreWhereUniqueInput[] | null;
}

// null
export interface ScoreCreateWithoutEventInput {
  resultValue: number;
  eventPoints: number;
  beers?: number | null;
  kr?: number | null;
  player: PlayerCreateOneWithoutScoresInput;
}

// null
export interface PlayerCreateOneWithoutScoresInput {
  create?: PlayerCreateWithoutScoresInput | null;
  connect?: PlayerWhereUniqueInput | null;
}

// null
export interface PlayerCreateWithoutScoresInput {
  firstName: string;
  lastName: string;
  photo?: string | null;
  finalInfoes?: FinalInfoCreateManyWithoutWinnerInput | null;
  team?: TeamCreateOneWithoutPlayersInput | null;
  scoringSession?: ScoringSessionCreateOneWithoutPlayersInput | null;
}

// null
export interface FinalInfoCreateManyWithoutWinnerInput {
  create?: FinalInfoCreateWithoutWinnerInput[] | null;
  connect?: FinalInfoWhereUniqueInput[] | null;
}

// null
export interface FinalInfoCreateWithoutWinnerInput {
  photo: string;
  story: string;
  seasons?: SeasonCreateManyWithoutFinalInfoInput | null;
}

// null
export interface SeasonCreateManyWithoutFinalInfoInput {
  create?: SeasonCreateWithoutFinalInfoInput[] | null;
  connect?: SeasonWhereUniqueInput[] | null;
}

// null
export interface SeasonCreateWithoutFinalInfoInput {
  name: string;
  status: SeasonStatus;
  events?: EventCreateManyWithoutSeasonInput | null;
}

// null
export interface EventCreateManyWithoutSeasonInput {
  create?: EventCreateWithoutSeasonInput[] | null;
  connect?: EventWhereUniqueInput[] | null;
}

// null
export interface EventCreateWithoutSeasonInput {
  special?: boolean | null;
  scoring?: EventScoring | null;
  status?: EventStatus | null;
  type?: EventType | null;
  course: CourseCreateOneWithoutEventsInput;
  scores?: ScoreCreateManyWithoutEventInput | null;
  scoringSessions?: ScoringSessionCreateManyWithoutEventInput | null;
}

// null
export interface ScoringSessionCreateManyWithoutEventInput {
  create?: ScoringSessionCreateWithoutEventInput[] | null;
  connect?: ScoringSessionWhereUniqueInput[] | null;
}

// null
export interface ScoringSessionCreateWithoutEventInput {
  currentHole?: number | null;
  players?: PlayerCreateManyWithoutScoringSessionInput | null;
  teams?: TeamCreateManyWithoutScoringSessionInput | null;
}

// null
export interface TeamCreateManyWithoutScoringSessionInput {
  create?: TeamCreateWithoutScoringSessionInput[] | null;
  connect?: TeamWhereUniqueInput[] | null;
}

// null
export interface TeamCreateWithoutScoringSessionInput {
  players?: PlayerCreateManyWithoutTeamInput | null;
}

// null
export interface PlayerCreateManyWithoutTeamInput {
  create?: PlayerCreateWithoutTeamInput[] | null;
  connect?: PlayerWhereUniqueInput[] | null;
}

// null
export interface PlayerCreateWithoutTeamInput {
  firstName: string;
  lastName: string;
  photo?: string | null;
  scores?: ScoreCreateManyWithoutPlayerInput | null;
  finalInfoes?: FinalInfoCreateManyWithoutWinnerInput | null;
  scoringSession?: ScoringSessionCreateOneWithoutPlayersInput | null;
}

// null
export interface ScoringSessionCreateOneWithoutPlayersInput {
  create?: ScoringSessionCreateWithoutPlayersInput | null;
  connect?: ScoringSessionWhereUniqueInput | null;
}

// null
export interface ScoringSessionCreateWithoutPlayersInput {
  currentHole?: number | null;
  event: EventCreateOneWithoutScoringSessionsInput;
  teams?: TeamCreateManyWithoutScoringSessionInput | null;
}

// null
export interface ScoringSessionWhereUniqueInput {
  id?: number | null;
}

// null
export interface PlayerWhereUniqueInput {
  id?: number | null;
}

// null
export interface TeamWhereUniqueInput {
  id?: number | null;
}

// null
export interface EventWhereUniqueInput {
  id?: number | null;
}

// null
export interface SeasonWhereUniqueInput {
  id?: number | null;
  name?: string | null;
}

// null
export interface FinalInfoWhereUniqueInput {
  id?: number | null;
}

// null
export interface ScoreWhereUniqueInput {
  id?: number | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================