export interface Course {
  id: number;
  club: string;
  name: string;
  par: number;
  events: Event[];
  holes: Hole[];
}

export interface Event {
  id: number;
  special: boolean;
  scoring: EventScoring;
  status: EventStatus;
  type: EventType;
  course: Course;
  season: Season;
  scores: Score[];
}

export interface Hole {
  id: number;
  index: number;
  number: number;
  par: number;
  course: Course;
}

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  photo: string | null;
  scores: Score[];
}

export interface Score {
  id: number;
  resultValue: number;
  eventPoints: number;
  event: Event;
  player: Player;
  beers: number;
  kr: number;
}

export interface Season {
  id: number;
  name: string;
  status: SeasonStatus;
  events: Event[];
  finalInfo: FinalInfo | null;
}

export interface FinalInfo {
  id: number;
  photo: string;
  winner: Player;
  story: string;
}

export interface Team {
  id: number;
  players: Player[];
}

export interface ScoringSession {
  id: number;
  event: Event;
  currentHole: number;
  player: Player[];
  teams: Team[];
}

export enum EventStatus {
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export enum EventType {
  INDIVIDUAL = 'INDIVIDUAL',
  TEAM = 'TEAM',
}

export enum EventScoring {
  POINTS = 'POINTS',
  STROKES = 'STROKES',
}

export enum SeasonStatus {
  REGULAR = 'REGULAR',
  FINALS = 'FINALS',
  FINISHED = 'FINISHED',
}
