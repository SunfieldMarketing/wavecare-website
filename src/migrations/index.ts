import * as migration_20260804_141335_initial from './20260804_141335_initial';
import * as migration_20260804_145835_contact_blocks from './20260804_145835_contact_blocks';
import * as migration_20260804_152240_services_blocks from './20260804_152240_services_blocks';
import * as migration_20260804_182933_design_print_blocks from './20260804_182933_design_print_blocks';
import * as migration_20260804_185013_videoservices_blocks from './20260804_185013_videoservices_blocks';
import * as migration_20260804_185530_print_hero_subtitle_style from './20260804_185530_print_hero_subtitle_style';
import * as migration_20260804_190802_about_blocks from './20260804_190802_about_blocks';
import * as migration_20260804_191741_about_blocks_appearance from './20260804_191741_about_blocks_appearance';
import * as migration_20260804_193258_webdesign_blocks from './20260804_193258_webdesign_blocks';
import * as migration_20260804_195647_home_blocks from './20260804_195647_home_blocks';
import * as migration_20260804_200703_logo_scale_up from './20260804_200703_logo_scale_up';
import * as migration_20260804_201845_social_proof_banner from './20260804_201845_social_proof_banner';
import * as migration_20260804_230145_logo_dark_tint from './20260804_230145_logo_dark_tint';
import * as migration_20260804_231605_drop_logo_dark_tint from './20260804_231605_drop_logo_dark_tint';
import * as migration_20260805_001901_logo_strip_variant from './20260805_001901_logo_strip_variant';
import * as migration_20260811_073238_digital_marketing_blocks from './20260811_073238_digital_marketing_blocks';
import * as migration_20260820_234243_add_media_prefix_field from './20260820_234243_add_media_prefix_field';

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
    name: '20260804_193258_webdesign_blocks',
  },
  {
    up: migration_20260804_195647_home_blocks.up,
    down: migration_20260804_195647_home_blocks.down,
    name: '20260804_195647_home_blocks',
  },
  {
    up: migration_20260804_200703_logo_scale_up.up,
    down: migration_20260804_200703_logo_scale_up.down,
    name: '20260804_200703_logo_scale_up',
  },
  {
    up: migration_20260804_201845_social_proof_banner.up,
    down: migration_20260804_201845_social_proof_banner.down,
    name: '20260804_201845_social_proof_banner',
  },
  {
    up: migration_20260804_230145_logo_dark_tint.up,
    down: migration_20260804_230145_logo_dark_tint.down,
    name: '20260804_230145_logo_dark_tint',
  },
  {
    up: migration_20260804_231605_drop_logo_dark_tint.up,
    down: migration_20260804_231605_drop_logo_dark_tint.down,
    name: '20260804_231605_drop_logo_dark_tint',
  },
  {
    up: migration_20260805_001901_logo_strip_variant.up,
    down: migration_20260805_001901_logo_strip_variant.down,
    name: '20260805_001901_logo_strip_variant',
  },
  {
    up: migration_20260811_073238_digital_marketing_blocks.up,
    down: migration_20260811_073238_digital_marketing_blocks.down,
    name: '20260811_073238_digital_marketing_blocks',
  },
  {
    up: migration_20260820_234243_add_media_prefix_field.up,
    down: migration_20260820_234243_add_media_prefix_field.down,
    name: '20260820_234243_add_media_prefix_field'
  },
];
