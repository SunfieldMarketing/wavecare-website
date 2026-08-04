import * as migration_20260804_141335_initial from './20260804_141335_initial';
import * as migration_20260804_145835_contact_blocks from './20260804_145835_contact_blocks';
import * as migration_20260804_152240_services_blocks from './20260804_152240_services_blocks';
import * as migration_20260804_182933_design_print_blocks from './20260804_182933_design_print_blocks';
import * as migration_20260804_185013_videoservices_blocks from './20260804_185013_videoservices_blocks';
import * as migration_20260804_185530_print_hero_subtitle_style from './20260804_185530_print_hero_subtitle_style';
import * as migration_20260804_190802_about_blocks from './20260804_190802_about_blocks';
import * as migration_20260804_191741_about_blocks_appearance from './20260804_191741_about_blocks_appearance';
import * as migration_20260804_193258_webdesign_blocks from './20260804_193258_webdesign_blocks';

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
    name: '20260804_185530_print_hero_subtitle_style',
  },
  {
    up: migration_20260804_190802_about_blocks.up,
    down: migration_20260804_190802_about_blocks.down,
    name: '20260804_190802_about_blocks',
  },
  {
    up: migration_20260804_191741_about_blocks_appearance.up,
    down: migration_20260804_191741_about_blocks_appearance.down,
    name: '20260804_191741_about_blocks_appearance',
  },
  {
    up: migration_20260804_193258_webdesign_blocks.up,
    down: migration_20260804_193258_webdesign_blocks.down,
    name: '20260804_193258_webdesign_blocks'
  },
];
