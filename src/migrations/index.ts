import * as migration_20260804_141335_initial from './20260804_141335_initial';
import * as migration_20260804_145835_contact_blocks from './20260804_145835_contact_blocks';
import * as migration_20260804_152240_services_blocks from './20260804_152240_services_blocks';
import * as migration_20260804_182933_design_print_blocks from './20260804_182933_design_print_blocks';
import * as migration_20260804_185013_videoservices_blocks from './20260804_185013_videoservices_blocks';
import * as migration_20260804_185530_print_hero_subtitle_style from './20260804_185530_print_hero_subtitle_style';

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
    name: '20260804_182933_design_print_blocks',
  },
  {
    up: migration_20260804_185013_videoservices_blocks.up,
    down: migration_20260804_185013_videoservices_blocks.down,
    name: '20260804_185013_videoservices_blocks',
  },
  {
    up: migration_20260804_185530_print_hero_subtitle_style.up,
    down: migration_20260804_185530_print_hero_subtitle_style.down,
    name: '20260804_185530_print_hero_subtitle_style'
  },
];
