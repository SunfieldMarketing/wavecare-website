import * as migration_20260804_141335_initial from './20260804_141335_initial';

export const migrations = [
  {
    up: migration_20260804_141335_initial.up,
    down: migration_20260804_141335_initial.down,
    name: '20260804_141335_initial'
  },
];
