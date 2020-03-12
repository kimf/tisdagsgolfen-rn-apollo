import { types } from 'mobx-state-tree';

const ScoringSession = types.model({
  courseId: '',
  special: false,
  type: 'INDIVIDUAL',
  scoring: 'POINTS',
});

const PlayStore = types.model({
  session: ScoringSession,
});

const store = PlayStore.create({
  session: {},
});

export default store;
