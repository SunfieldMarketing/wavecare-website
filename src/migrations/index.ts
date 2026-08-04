import * as migration_20260804_141335_initial from './20260804_141335_initial';
import * as migration_20260804_145835_contact_blocks from './20260804_145835_contact_blocks';
import * as migration_20260804_152240_services_blocks from './20260804_152240_services_blocks';
import * as migration_20260804_182933_design_print_blocks from './20260804_182933_design_print_blocks';

export const migrations = [
  {
    up: migration_20260804_141335_initial.up,
    down: migration_20260804_141335_initial.down,
    name: '20260804_141335_initial',
  },
  {
    up: migration_20260804_145835_contact_blocks.up,
    down: migration_20260804_145835_contact_blocks.down,
    name: '20260804_145835_contact_blocks',
  },
  {
    up: migration_20260804_152240_services_blocks.up,
    down: migration_20260804_152240_services_blocks.down,
    name: '20260804_152240_services_blocks',
  },
  {
    up: migration_20260804_182933_design_print_blocks.up,
    down: migration_20260804_182933_design_print_blocks.down,
    name: '20260804_182933_design_print_blocks'
  },
];
