import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_story_block\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_appearance_appearance_backgroun_idx\` ON \`pages_blocks_story_block\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_insight_quote\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_insight_quote_appearance_appearance_backgro_idx\` ON \`pages_blocks_insight_quote\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_values_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_appearance_appearance_backgroun_idx\` ON \`pages_blocks_values_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion_showcase\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_appearance_appearance_ba_idx\` ON \`pages_blocks_accordion_showcase\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_reel\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_reel_appearance_appearance_background_idx\` ON \`pages_blocks_video_reel\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_simple_quote_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_appearance_appearance_bac_idx\` ON \`pages_blocks_simple_quote_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_story_block\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_appearance_appearance_backgr_idx\` ON \`_pages_v_blocks_story_block\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_insight_quote\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insight_quote_appearance_appearance_back_idx\` ON \`_pages_v_blocks_insight_quote\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_values_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_appearance_appearance_backgr_idx\` ON \`_pages_v_blocks_values_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion_showcase\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_appearance_appearance_idx\` ON \`_pages_v_blocks_accordion_showcase\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_reel\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_reel_appearance_appearance_backgro_idx\` ON \`_pages_v_blocks_video_reel\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_simple_quote_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_appearance_appearance__idx\` ON \`_pages_v_blocks_simple_quote_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_story_block\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_appearance_appearance_ba_idx\` ON \`case_studies_blocks_story_block\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_insight_quote\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_insight_quote_appearance_appearance__idx\` ON \`case_studies_blocks_insight_quote\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_values_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_appearance_appearance_ba_idx\` ON \`case_studies_blocks_values_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion_showcase\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_appearance_appear_idx\` ON \`case_studies_blocks_accordion_showcase\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_reel\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_reel_appearance_appearance_bac_idx\` ON \`case_studies_blocks_video_reel\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_simple_quote_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_appearance_appeara_idx\` ON \`case_studies_blocks_simple_quote_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_story_block\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_appearance_appearance_idx\` ON \`_case_studies_v_blocks_story_block\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_insight_quote\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_insight_quote_appearance_appearan_idx\` ON \`_case_studies_v_blocks_insight_quote\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_values_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_appearance_appearance_idx\` ON \`_case_studies_v_blocks_values_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion_showcase\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_appearance_app_idx\` ON \`_case_studies_v_blocks_accordion_showcase\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_reel\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_reel_appearance_appearance__idx\` ON \`_case_studies_v_blocks_video_reel\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_background\` text DEFAULT 'deep';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_text_color\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_custom_background\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_custom_text_color\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_background_video_source\` text DEFAULT 'vimeo';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_background_video_vimeo_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_background_video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_overlay_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_overlay_opacity\` numeric DEFAULT 60;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_padding_top\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_padding_bottom\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_width\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_anchor_id\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_simple_quote_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_appearance_appe_idx\` ON \`_case_studies_v_blocks_simple_quote_grid\` (\`appearance_background_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_story_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`button_link_label\` text,
  	\`button_link_type\` text DEFAULT 'internal',
  	\`button_link_page_id\` integer,
  	\`button_link_url\` text,
  	\`button_link_anchor\` text,
  	\`button_link_style\` text DEFAULT 'primary',
  	\`button_link_new_tab\` integer,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_story_block\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "image_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "image_id", "block_name" FROM \`pages_blocks_story_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_story_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_story_block\` RENAME TO \`pages_blocks_story_block\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_order_idx\` ON \`pages_blocks_story_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_parent_id_idx\` ON \`pages_blocks_story_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_path_idx\` ON \`pages_blocks_story_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_button_link_button_link_page_idx\` ON \`pages_blocks_story_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_image_idx\` ON \`pages_blocks_story_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_insight_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`statement\` text,
  	\`footer\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_insight_quote\`("_order", "_parent_id", "_path", "id", "eyebrow", "statement", "footer", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "statement", "footer", "block_name" FROM \`pages_blocks_insight_quote\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_insight_quote\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_insight_quote\` RENAME TO \`pages_blocks_insight_quote\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_insight_quote_order_idx\` ON \`pages_blocks_insight_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_insight_quote_parent_id_idx\` ON \`pages_blocks_insight_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_insight_quote_path_idx\` ON \`pages_blocks_insight_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_values_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_values_grid\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "block_name" FROM \`pages_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_values_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_values_grid\` RENAME TO \`pages_blocks_values_grid\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_order_idx\` ON \`pages_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_parent_id_idx\` ON \`pages_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_path_idx\` ON \`pages_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_accordion_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`hint\` text DEFAULT 'Hover or tap a panel to explore',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_accordion_showcase\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "hint", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "hint", "block_name" FROM \`pages_blocks_accordion_showcase\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion_showcase\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_accordion_showcase\` RENAME TO \`pages_blocks_accordion_showcase\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_order_idx\` ON \`pages_blocks_accordion_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_parent_id_idx\` ON \`pages_blocks_accordion_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_path_idx\` ON \`pages_blocks_accordion_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_video_reel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`vimeo_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_video_reel\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "vimeo_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "vimeo_id", "block_name" FROM \`pages_blocks_video_reel\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_reel\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_video_reel\` RENAME TO \`pages_blocks_video_reel\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_reel_order_idx\` ON \`pages_blocks_video_reel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_reel_parent_id_idx\` ON \`pages_blocks_video_reel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_reel_path_idx\` ON \`pages_blocks_video_reel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_simple_quote_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_simple_quote_grid\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "lead", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "lead", "block_name" FROM \`pages_blocks_simple_quote_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_simple_quote_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_simple_quote_grid\` RENAME TO \`pages_blocks_simple_quote_grid\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_order_idx\` ON \`pages_blocks_simple_quote_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_parent_id_idx\` ON \`pages_blocks_simple_quote_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_path_idx\` ON \`pages_blocks_simple_quote_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_story_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`button_link_label\` text,
  	\`button_link_type\` text DEFAULT 'internal',
  	\`button_link_page_id\` integer,
  	\`button_link_url\` text,
  	\`button_link_anchor\` text,
  	\`button_link_style\` text DEFAULT 'primary',
  	\`button_link_new_tab\` integer,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_story_block\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "image_id", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "image_id", "_uuid", "block_name" FROM \`_pages_v_blocks_story_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_story_block\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_story_block\` RENAME TO \`_pages_v_blocks_story_block\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_order_idx\` ON \`_pages_v_blocks_story_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_parent_id_idx\` ON \`_pages_v_blocks_story_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_path_idx\` ON \`_pages_v_blocks_story_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_button_link_button_link_page_idx\` ON \`_pages_v_blocks_story_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_image_idx\` ON \`_pages_v_blocks_story_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_insight_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`statement\` text,
  	\`footer\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_insight_quote\`("_order", "_parent_id", "_path", "id", "eyebrow", "statement", "footer", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "statement", "footer", "_uuid", "block_name" FROM \`_pages_v_blocks_insight_quote\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_insight_quote\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_insight_quote\` RENAME TO \`_pages_v_blocks_insight_quote\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insight_quote_order_idx\` ON \`_pages_v_blocks_insight_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insight_quote_parent_id_idx\` ON \`_pages_v_blocks_insight_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insight_quote_path_idx\` ON \`_pages_v_blocks_insight_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_values_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_values_grid\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "_uuid", "block_name" FROM \`_pages_v_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_values_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_values_grid\` RENAME TO \`_pages_v_blocks_values_grid\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_order_idx\` ON \`_pages_v_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_parent_id_idx\` ON \`_pages_v_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_path_idx\` ON \`_pages_v_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_accordion_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`hint\` text DEFAULT 'Hover or tap a panel to explore',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_accordion_showcase\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "hint", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "hint", "_uuid", "block_name" FROM \`_pages_v_blocks_accordion_showcase\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_accordion_showcase\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_accordion_showcase\` RENAME TO \`_pages_v_blocks_accordion_showcase\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_order_idx\` ON \`_pages_v_blocks_accordion_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_parent_id_idx\` ON \`_pages_v_blocks_accordion_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_path_idx\` ON \`_pages_v_blocks_accordion_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_video_reel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`vimeo_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_video_reel\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "vimeo_id", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "vimeo_id", "_uuid", "block_name" FROM \`_pages_v_blocks_video_reel\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_reel\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_video_reel\` RENAME TO \`_pages_v_blocks_video_reel\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_reel_order_idx\` ON \`_pages_v_blocks_video_reel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_reel_parent_id_idx\` ON \`_pages_v_blocks_video_reel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_reel_path_idx\` ON \`_pages_v_blocks_video_reel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_simple_quote_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_simple_quote_grid\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "lead", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "lead", "_uuid", "block_name" FROM \`_pages_v_blocks_simple_quote_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_simple_quote_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_simple_quote_grid\` RENAME TO \`_pages_v_blocks_simple_quote_grid\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_order_idx\` ON \`_pages_v_blocks_simple_quote_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_parent_id_idx\` ON \`_pages_v_blocks_simple_quote_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_path_idx\` ON \`_pages_v_blocks_simple_quote_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_story_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`button_link_label\` text,
  	\`button_link_type\` text DEFAULT 'internal',
  	\`button_link_page_id\` integer,
  	\`button_link_url\` text,
  	\`button_link_anchor\` text,
  	\`button_link_style\` text DEFAULT 'primary',
  	\`button_link_new_tab\` integer,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_story_block\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "image_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "image_id", "block_name" FROM \`case_studies_blocks_story_block\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_story_block\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_story_block\` RENAME TO \`case_studies_blocks_story_block\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_order_idx\` ON \`case_studies_blocks_story_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_parent_id_idx\` ON \`case_studies_blocks_story_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_path_idx\` ON \`case_studies_blocks_story_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_button_link_button_link__idx\` ON \`case_studies_blocks_story_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_image_idx\` ON \`case_studies_blocks_story_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_insight_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`statement\` text,
  	\`footer\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_insight_quote\`("_order", "_parent_id", "_path", "id", "eyebrow", "statement", "footer", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "statement", "footer", "block_name" FROM \`case_studies_blocks_insight_quote\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_insight_quote\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_insight_quote\` RENAME TO \`case_studies_blocks_insight_quote\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_insight_quote_order_idx\` ON \`case_studies_blocks_insight_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_insight_quote_parent_id_idx\` ON \`case_studies_blocks_insight_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_insight_quote_path_idx\` ON \`case_studies_blocks_insight_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_values_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_values_grid\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "block_name" FROM \`case_studies_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_values_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_values_grid\` RENAME TO \`case_studies_blocks_values_grid\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_order_idx\` ON \`case_studies_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_parent_id_idx\` ON \`case_studies_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_path_idx\` ON \`case_studies_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_accordion_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`hint\` text DEFAULT 'Hover or tap a panel to explore',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_accordion_showcase\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "hint", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "hint", "block_name" FROM \`case_studies_blocks_accordion_showcase\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_accordion_showcase\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_accordion_showcase\` RENAME TO \`case_studies_blocks_accordion_showcase\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_order_idx\` ON \`case_studies_blocks_accordion_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_parent_id_idx\` ON \`case_studies_blocks_accordion_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_path_idx\` ON \`case_studies_blocks_accordion_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_video_reel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`vimeo_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_video_reel\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "vimeo_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "vimeo_id", "block_name" FROM \`case_studies_blocks_video_reel\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_reel\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_video_reel\` RENAME TO \`case_studies_blocks_video_reel\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_reel_order_idx\` ON \`case_studies_blocks_video_reel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_reel_parent_id_idx\` ON \`case_studies_blocks_video_reel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_reel_path_idx\` ON \`case_studies_blocks_video_reel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_simple_quote_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_simple_quote_grid\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "lead", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "lead", "block_name" FROM \`case_studies_blocks_simple_quote_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_simple_quote_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_simple_quote_grid\` RENAME TO \`case_studies_blocks_simple_quote_grid\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_order_idx\` ON \`case_studies_blocks_simple_quote_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_parent_id_idx\` ON \`case_studies_blocks_simple_quote_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_path_idx\` ON \`case_studies_blocks_simple_quote_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_blocks_story_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`button_link_label\` text,
  	\`button_link_type\` text DEFAULT 'internal',
  	\`button_link_page_id\` integer,
  	\`button_link_url\` text,
  	\`button_link_anchor\` text,
  	\`button_link_style\` text DEFAULT 'primary',
  	\`button_link_new_tab\` integer,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__case_studies_v_blocks_story_block\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "image_id", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "image_id", "_uuid", "block_name" FROM \`_case_studies_v_blocks_story_block\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_story_block\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_blocks_story_block\` RENAME TO \`_case_studies_v_blocks_story_block\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_order_idx\` ON \`_case_studies_v_blocks_story_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_parent_id_idx\` ON \`_case_studies_v_blocks_story_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_path_idx\` ON \`_case_studies_v_blocks_story_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_button_link_button_li_idx\` ON \`_case_studies_v_blocks_story_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_image_idx\` ON \`_case_studies_v_blocks_story_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_blocks_insight_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`statement\` text,
  	\`footer\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__case_studies_v_blocks_insight_quote\`("_order", "_parent_id", "_path", "id", "eyebrow", "statement", "footer", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "statement", "footer", "_uuid", "block_name" FROM \`_case_studies_v_blocks_insight_quote\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_insight_quote\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_blocks_insight_quote\` RENAME TO \`_case_studies_v_blocks_insight_quote\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_insight_quote_order_idx\` ON \`_case_studies_v_blocks_insight_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_insight_quote_parent_id_idx\` ON \`_case_studies_v_blocks_insight_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_insight_quote_path_idx\` ON \`_case_studies_v_blocks_insight_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_blocks_values_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__case_studies_v_blocks_values_grid\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "_uuid", "block_name" FROM \`_case_studies_v_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_values_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_blocks_values_grid\` RENAME TO \`_case_studies_v_blocks_values_grid\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_order_idx\` ON \`_case_studies_v_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_parent_id_idx\` ON \`_case_studies_v_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_path_idx\` ON \`_case_studies_v_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_blocks_accordion_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`hint\` text DEFAULT 'Hover or tap a panel to explore',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__case_studies_v_blocks_accordion_showcase\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "hint", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "hint", "_uuid", "block_name" FROM \`_case_studies_v_blocks_accordion_showcase\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_accordion_showcase\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_blocks_accordion_showcase\` RENAME TO \`_case_studies_v_blocks_accordion_showcase\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_order_idx\` ON \`_case_studies_v_blocks_accordion_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_parent_id_idx\` ON \`_case_studies_v_blocks_accordion_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_path_idx\` ON \`_case_studies_v_blocks_accordion_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_blocks_video_reel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`vimeo_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__case_studies_v_blocks_video_reel\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "vimeo_id", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "vimeo_id", "_uuid", "block_name" FROM \`_case_studies_v_blocks_video_reel\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_reel\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_blocks_video_reel\` RENAME TO \`_case_studies_v_blocks_video_reel\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_reel_order_idx\` ON \`_case_studies_v_blocks_video_reel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_reel_parent_id_idx\` ON \`_case_studies_v_blocks_video_reel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_reel_path_idx\` ON \`_case_studies_v_blocks_video_reel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_blocks_simple_quote_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__case_studies_v_blocks_simple_quote_grid\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "lead", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "lead", "_uuid", "block_name" FROM \`_case_studies_v_blocks_simple_quote_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_simple_quote_grid\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_blocks_simple_quote_grid\` RENAME TO \`_case_studies_v_blocks_simple_quote_grid\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_order_idx\` ON \`_case_studies_v_blocks_simple_quote_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_parent_id_idx\` ON \`_case_studies_v_blocks_simple_quote_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_path_idx\` ON \`_case_studies_v_blocks_simple_quote_grid\` (\`_path\`);`)
}
