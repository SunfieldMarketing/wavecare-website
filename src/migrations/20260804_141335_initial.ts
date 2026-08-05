import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_buttons_order_idx\` ON \`pages_blocks_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_buttons_parent_id_idx\` ON \`pages_blocks_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_buttons_link_link_page_idx\` ON \`pages_blocks_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'centered',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`camera_cursor_enabled\` integer DEFAULT false,
  	\`camera_cursor_f_stop\` text DEFAULT 'F/1.8',
  	\`min_height\` text DEFAULT 'full',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_appearance_appearance_background_image_idx\` ON \`pages_blocks_hero\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_notice_bar\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_notice_bar_order_idx\` ON \`pages_blocks_notice_bar\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_notice_bar_parent_id_idx\` ON \`pages_blocks_notice_bar\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_notice_bar_path_idx\` ON \`pages_blocks_notice_bar\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_notice_bar_appearance_appearance_background_idx\` ON \`pages_blocks_notice_bar\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_split_media_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_split_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_bullets_order_idx\` ON \`pages_blocks_split_media_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_bullets_parent_id_idx\` ON \`pages_blocks_split_media_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_split_media_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_split_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_buttons_order_idx\` ON \`pages_blocks_split_media_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_buttons_parent_id_idx\` ON \`pages_blocks_split_media_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_buttons_link_link_page_idx\` ON \`pages_blocks_split_media_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_split_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_side\` text DEFAULT 'right',
  	\`media_type\` text DEFAULT 'image',
  	\`image_id\` integer,
  	\`video_url\` text,
  	\`vimeo_id\` text,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`body\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_order_idx\` ON \`pages_blocks_split_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_parent_id_idx\` ON \`pages_blocks_split_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_path_idx\` ON \`pages_blocks_split_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_image_idx\` ON \`pages_blocks_split_media\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_media_appearance_appearance_backgroun_idx\` ON \`pages_blocks_split_media\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`title\` text,
  	\`body\` text,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_order_idx\` ON \`pages_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_parent_id_idx\` ON \`pages_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_image_idx\` ON \`pages_blocks_card_grid_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_link_link_page_idx\` ON \`pages_blocks_card_grid_cards\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`columns\` text DEFAULT '4',
  	\`style\` text DEFAULT 'bordered',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_order_idx\` ON \`pages_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_parent_id_idx\` ON \`pages_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_path_idx\` ON \`pages_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_appearance_appearance_background__idx\` ON \`pages_blocks_card_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`count_to\` numeric,
  	\`suffix\` text,
  	\`comma\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_stats_order_idx\` ON \`pages_blocks_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_stats_parent_id_idx\` ON \`pages_blocks_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_appearance_appearance_background_imag_idx\` ON \`pages_blocks_stats\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`body\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_order_idx\` ON \`pages_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_parent_id_idx\` ON \`pages_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_steps_image_idx\` ON \`pages_blocks_process_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_buttons_order_idx\` ON \`pages_blocks_process_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_buttons_parent_id_idx\` ON \`pages_blocks_process_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_buttons_link_link_page_idx\` ON \`pages_blocks_process_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`layout\` text DEFAULT 'tabs',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_order_idx\` ON \`pages_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_parent_id_idx\` ON \`pages_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_path_idx\` ON \`pages_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_process_appearance_appearance_background_im_idx\` ON \`pages_blocks_process\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_tabs_showcase_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	\`icon\` text,
  	\`frame\` text DEFAULT 'browser',
  	\`image_id\` integer,
  	\`image2_id\` integer,
  	\`business_name\` text,
  	\`rating\` numeric DEFAULT 5,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_tabs_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_tabs_order_idx\` ON \`pages_blocks_tabs_showcase_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_tabs_parent_id_idx\` ON \`pages_blocks_tabs_showcase_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_tabs_image_idx\` ON \`pages_blocks_tabs_showcase_tabs\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_tabs_image2_idx\` ON \`pages_blocks_tabs_showcase_tabs\` (\`image2_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_tabs_showcase_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_tabs_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_buttons_order_idx\` ON \`pages_blocks_tabs_showcase_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_buttons_parent_id_idx\` ON \`pages_blocks_tabs_showcase_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_buttons_link_link_page_idx\` ON \`pages_blocks_tabs_showcase_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_tabs_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_order_idx\` ON \`pages_blocks_tabs_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_parent_id_idx\` ON \`pages_blocks_tabs_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_path_idx\` ON \`pages_blocks_tabs_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_tabs_showcase_appearance_appearance_backgro_idx\` ON \`pages_blocks_tabs_showcase\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`aspect\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_items_order_idx\` ON \`pages_blocks_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_items_parent_id_idx\` ON \`pages_blocks_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_items_image_idx\` ON \`pages_blocks_gallery_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_buttons_order_idx\` ON \`pages_blocks_gallery_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_buttons_parent_id_idx\` ON \`pages_blocks_gallery_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_buttons_link_link_page_idx\` ON \`pages_blocks_gallery_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`show_filters\` integer DEFAULT false,
  	\`layout\` text DEFAULT 'masonry',
  	\`lightbox\` integer DEFAULT true,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_order_idx\` ON \`pages_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_parent_id_idx\` ON \`pages_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_path_idx\` ON \`pages_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_appearance_appearance_background_im_idx\` ON \`pages_blocks_gallery\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_before_after\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`caption\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_before_after_order_idx\` ON \`pages_blocks_before_after\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_before_after_parent_id_idx\` ON \`pages_blocks_before_after\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_before_after_path_idx\` ON \`pages_blocks_before_after\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_before_after_before_image_idx\` ON \`pages_blocks_before_after\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_before_after_after_image_idx\` ON \`pages_blocks_before_after\` (\`after_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_before_after_appearance_appearance_backgrou_idx\` ON \`pages_blocks_before_after\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`source\` text DEFAULT 'vimeo',
  	\`vimeo_id\` text,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`aspect\` text DEFAULT '16/9',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_embed_order_idx\` ON \`pages_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_embed_parent_id_idx\` ON \`pages_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_embed_path_idx\` ON \`pages_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_embed_poster_idx\` ON \`pages_blocks_video_embed\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_embed_appearance_appearance_backgroun_idx\` ON \`pages_blocks_video_embed\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_grid_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`vimeo_id\` text,
  	\`poster_id\` integer,
  	\`category\` text,
  	\`featured\` integer,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_video_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_videos_order_idx\` ON \`pages_blocks_video_grid_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_videos_parent_id_idx\` ON \`pages_blocks_video_grid_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_videos_poster_idx\` ON \`pages_blocks_video_grid_videos\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`enable_filters\` integer DEFAULT false,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_order_idx\` ON \`pages_blocks_video_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_parent_id_idx\` ON \`pages_blocks_video_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_path_idx\` ON \`pages_blocks_video_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_appearance_appearance_background_idx\` ON \`pages_blocks_video_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logo_marquee_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_logo_marquee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_logos_order_idx\` ON \`pages_blocks_logo_marquee_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_logos_parent_id_idx\` ON \`pages_blocks_logo_marquee_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_logos_image_idx\` ON \`pages_blocks_logo_marquee_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logo_marquee_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_logo_marquee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_items_order_idx\` ON \`pages_blocks_logo_marquee_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_items_parent_id_idx\` ON \`pages_blocks_logo_marquee_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logo_marquee\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'logos',
  	\`speed\` numeric DEFAULT 0.6,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_order_idx\` ON \`pages_blocks_logo_marquee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_parent_id_idx\` ON \`pages_blocks_logo_marquee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_path_idx\` ON \`pages_blocks_logo_marquee\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_appearance_appearance_backgrou_idx\` ON \`pages_blocks_logo_marquee\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_case_study_cards_cards_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_case_study_cards_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_cards_tags_order_idx\` ON \`pages_blocks_case_study_cards_cards_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_cards_tags_parent_id_idx\` ON \`pages_blocks_case_study_cards_cards_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_case_study_cards_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`client\` text,
  	\`title\` text,
  	\`description\` text,
  	\`result_value\` text,
  	\`result_label\` text,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_case_study_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_cards_order_idx\` ON \`pages_blocks_case_study_cards_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_cards_parent_id_idx\` ON \`pages_blocks_case_study_cards_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_cards_image_idx\` ON \`pages_blocks_case_study_cards_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_cards_link_link_page_idx\` ON \`pages_blocks_case_study_cards_cards\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_case_study_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_order_idx\` ON \`pages_blocks_case_study_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_parent_id_idx\` ON \`pages_blocks_case_study_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_path_idx\` ON \`pages_blocks_case_study_cards\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_cards_appearance_appearance_back_idx\` ON \`pages_blocks_case_study_cards\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_case_study_grid_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_case_study_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_grid_buttons_order_idx\` ON \`pages_blocks_case_study_grid_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_grid_buttons_parent_id_idx\` ON \`pages_blocks_case_study_grid_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_grid_buttons_link_link_page_idx\` ON \`pages_blocks_case_study_grid_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_case_study_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`mode\` text DEFAULT 'auto',
  	\`limit\` numeric DEFAULT 4,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_grid_order_idx\` ON \`pages_blocks_case_study_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_grid_parent_id_idx\` ON \`pages_blocks_case_study_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_grid_path_idx\` ON \`pages_blocks_case_study_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_case_study_grid_appearance_appearance_backg_idx\` ON \`pages_blocks_case_study_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonial_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`mode\` text DEFAULT 'auto',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_grid_order_idx\` ON \`pages_blocks_testimonial_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_grid_parent_id_idx\` ON \`pages_blocks_testimonial_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_grid_path_idx\` ON \`pages_blocks_testimonial_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_grid_appearance_appearance_back_idx\` ON \`pages_blocks_testimonial_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_items_order_idx\` ON \`pages_blocks_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_items_parent_id_idx\` ON \`pages_blocks_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`is_faq\` integer DEFAULT false,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_order_idx\` ON \`pages_blocks_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_parent_id_idx\` ON \`pages_blocks_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_path_idx\` ON \`pages_blocks_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_appearance_appearance_background__idx\` ON \`pages_blocks_accordion\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`content\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_order_idx\` ON \`pages_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_parent_id_idx\` ON \`pages_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_path_idx\` ON \`pages_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_appearance_appearance_background__idx\` ON \`pages_blocks_rich_text\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_legal_document_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_legal_document\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_legal_document_sections_order_idx\` ON \`pages_blocks_legal_document_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_legal_document_sections_parent_id_idx\` ON \`pages_blocks_legal_document_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_legal_document\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`effective_date\` text,
  	\`back_link_enabled\` integer DEFAULT true,
  	\`back_link_label\` text DEFAULT '← Back to Home',
  	\`back_link_url\` text DEFAULT '/',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_legal_document_order_idx\` ON \`pages_blocks_legal_document\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_legal_document_parent_id_idx\` ON \`pages_blocks_legal_document\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_legal_document_path_idx\` ON \`pages_blocks_legal_document\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_legal_document_appearance_appearance_backgr_idx\` ON \`pages_blocks_legal_document\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_form_sidebar_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_sidebar_details_order_idx\` ON \`pages_blocks_contact_form_sidebar_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_sidebar_details_parent_id_idx\` ON \`pages_blocks_contact_form_sidebar_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`form_id\` integer,
  	\`sidebar_enabled\` integer DEFAULT true,
  	\`sidebar_title\` text,
  	\`sidebar_body\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_order_idx\` ON \`pages_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_parent_id_idx\` ON \`pages_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_path_idx\` ON \`pages_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_form_idx\` ON \`pages_blocks_contact_form\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_form_appearance_appearance_backgrou_idx\` ON \`pages_blocks_contact_form\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_final_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_final_cta_buttons_order_idx\` ON \`pages_blocks_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_final_cta_buttons_parent_id_idx\` ON \`pages_blocks_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_final_cta_buttons_link_link_page_idx\` ON \`pages_blocks_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_final_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`wave_animation\` integer DEFAULT true,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_final_cta_order_idx\` ON \`pages_blocks_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_final_cta_parent_id_idx\` ON \`pages_blocks_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_final_cta_path_idx\` ON \`pages_blocks_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_final_cta_appearance_appearance_background__idx\` ON \`pages_blocks_final_cta\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_landing_hero_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_landing_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_landing_hero_trust_items_order_idx\` ON \`pages_blocks_landing_hero_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_landing_hero_trust_items_parent_id_idx\` ON \`pages_blocks_landing_hero_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_landing_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_landing_hero_order_idx\` ON \`pages_blocks_landing_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_landing_hero_parent_id_idx\` ON \`pages_blocks_landing_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_landing_hero_path_idx\` ON \`pages_blocks_landing_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_feature\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`context_line\` text,
  	\`vimeo_id\` text,
  	\`video_title\` text,
  	\`subhead\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`cta_note\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_feature_order_idx\` ON \`pages_blocks_video_feature\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_feature_parent_id_idx\` ON \`pages_blocks_video_feature\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_feature_path_idx\` ON \`pages_blocks_video_feature\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_feature_cta_cta_page_idx\` ON \`pages_blocks_video_feature\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_bar_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`count_to\` text,
  	\`suffix\` text,
  	\`decimals\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats_bar\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_bar_stats_order_idx\` ON \`pages_blocks_stats_bar_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_bar_stats_parent_id_idx\` ON \`pages_blocks_stats_bar_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_bar\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`show_transition\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_bar_order_idx\` ON \`pages_blocks_stats_bar\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_bar_parent_id_idx\` ON \`pages_blocks_stats_bar\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_bar_path_idx\` ON \`pages_blocks_stats_bar\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pill_band_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_pill_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_pill_band_pills_order_idx\` ON \`pages_blocks_pill_band_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pill_band_pills_parent_id_idx\` ON \`pages_blocks_pill_band_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pill_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`show_transition\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_pill_band_order_idx\` ON \`pages_blocks_pill_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pill_band_parent_id_idx\` ON \`pages_blocks_pill_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pill_band_path_idx\` ON \`pages_blocks_pill_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_audit_cta_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_audit_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_audit_cta_items_order_idx\` ON \`pages_blocks_audit_cta_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audit_cta_items_parent_id_idx\` ON \`pages_blocks_audit_cta_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_audit_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`tag\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`cta_note\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_audit_cta_order_idx\` ON \`pages_blocks_audit_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audit_cta_parent_id_idx\` ON \`pages_blocks_audit_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audit_cta_path_idx\` ON \`pages_blocks_audit_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_audit_cta_cta_cta_page_idx\` ON \`pages_blocks_audit_cta\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_testimonials_order_idx\` ON \`pages_blocks_video_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_testimonials_parent_id_idx\` ON \`pages_blocks_video_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_testimonials_path_idx\` ON \`pages_blocks_video_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonial_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_cards_order_idx\` ON \`pages_blocks_testimonial_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_cards_parent_id_idx\` ON \`pages_blocks_testimonial_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_cards_path_idx\` ON \`pages_blocks_testimonial_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_divider_label\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_divider_label_order_idx\` ON \`pages_blocks_divider_label\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_divider_label_parent_id_idx\` ON \`pages_blocks_divider_label\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_divider_label_path_idx\` ON \`pages_blocks_divider_label\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_inline_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`lead\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_inline_cta_order_idx\` ON \`pages_blocks_inline_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_inline_cta_parent_id_idx\` ON \`pages_blocks_inline_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_inline_cta_path_idx\` ON \`pages_blocks_inline_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_inline_cta_cta_cta_page_idx\` ON \`pages_blocks_inline_cta\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`hide_from_sitemap\` integer DEFAULT false,
  	\`change_frequency\` text DEFAULT 'monthly',
  	\`priority\` numeric DEFAULT 0.7,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_texts_order_parent\` ON \`pages_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`case_studies_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_media_id_idx\` ON \`pages_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_case_studies_id_idx\` ON \`pages_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_testimonials_id_idx\` ON \`pages_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_buttons_order_idx\` ON \`_pages_v_blocks_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_buttons_parent_id_idx\` ON \`_pages_v_blocks_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_buttons_link_link_page_idx\` ON \`_pages_v_blocks_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'centered',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`camera_cursor_enabled\` integer DEFAULT false,
  	\`camera_cursor_f_stop\` text DEFAULT 'F/1.8',
  	\`min_height\` text DEFAULT 'full',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_appearance_appearance_background_im_idx\` ON \`_pages_v_blocks_hero\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_notice_bar\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_notice_bar_order_idx\` ON \`_pages_v_blocks_notice_bar\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_notice_bar_parent_id_idx\` ON \`_pages_v_blocks_notice_bar\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_notice_bar_path_idx\` ON \`_pages_v_blocks_notice_bar\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_notice_bar_appearance_appearance_backgro_idx\` ON \`_pages_v_blocks_notice_bar\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_split_media_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_split_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_bullets_order_idx\` ON \`_pages_v_blocks_split_media_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_bullets_parent_id_idx\` ON \`_pages_v_blocks_split_media_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_split_media_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_split_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_buttons_order_idx\` ON \`_pages_v_blocks_split_media_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_buttons_parent_id_idx\` ON \`_pages_v_blocks_split_media_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_buttons_link_link_page_idx\` ON \`_pages_v_blocks_split_media_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_split_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_side\` text DEFAULT 'right',
  	\`media_type\` text DEFAULT 'image',
  	\`image_id\` integer,
  	\`video_url\` text,
  	\`vimeo_id\` text,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`body\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_order_idx\` ON \`_pages_v_blocks_split_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_parent_id_idx\` ON \`_pages_v_blocks_split_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_path_idx\` ON \`_pages_v_blocks_split_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_image_idx\` ON \`_pages_v_blocks_split_media\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_media_appearance_appearance_backgr_idx\` ON \`_pages_v_blocks_split_media\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`title\` text,
  	\`body\` text,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_order_idx\` ON \`_pages_v_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_parent_id_idx\` ON \`_pages_v_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_image_idx\` ON \`_pages_v_blocks_card_grid_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_link_link_page_idx\` ON \`_pages_v_blocks_card_grid_cards\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`columns\` text DEFAULT '4',
  	\`style\` text DEFAULT 'bordered',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_order_idx\` ON \`_pages_v_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_parent_id_idx\` ON \`_pages_v_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_path_idx\` ON \`_pages_v_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_appearance_appearance_backgrou_idx\` ON \`_pages_v_blocks_card_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`count_to\` numeric,
  	\`suffix\` text,
  	\`comma\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_stats_order_idx\` ON \`_pages_v_blocks_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_stats_parent_id_idx\` ON \`_pages_v_blocks_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_order_idx\` ON \`_pages_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_parent_id_idx\` ON \`_pages_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_path_idx\` ON \`_pages_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_appearance_appearance_background_i_idx\` ON \`_pages_v_blocks_stats\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`body\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_order_idx\` ON \`_pages_v_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_parent_id_idx\` ON \`_pages_v_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_steps_image_idx\` ON \`_pages_v_blocks_process_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_process_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_buttons_order_idx\` ON \`_pages_v_blocks_process_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_buttons_parent_id_idx\` ON \`_pages_v_blocks_process_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_buttons_link_link_page_idx\` ON \`_pages_v_blocks_process_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`layout\` text DEFAULT 'tabs',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_order_idx\` ON \`_pages_v_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_parent_id_idx\` ON \`_pages_v_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_path_idx\` ON \`_pages_v_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_process_appearance_appearance_background_idx\` ON \`_pages_v_blocks_process\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_tabs_showcase_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	\`icon\` text,
  	\`frame\` text DEFAULT 'browser',
  	\`image_id\` integer,
  	\`image2_id\` integer,
  	\`business_name\` text,
  	\`rating\` numeric DEFAULT 5,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_tabs_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_tabs_order_idx\` ON \`_pages_v_blocks_tabs_showcase_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_tabs_parent_id_idx\` ON \`_pages_v_blocks_tabs_showcase_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_tabs_image_idx\` ON \`_pages_v_blocks_tabs_showcase_tabs\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_tabs_image2_idx\` ON \`_pages_v_blocks_tabs_showcase_tabs\` (\`image2_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_tabs_showcase_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_tabs_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_buttons_order_idx\` ON \`_pages_v_blocks_tabs_showcase_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_buttons_parent_id_idx\` ON \`_pages_v_blocks_tabs_showcase_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_buttons_link_link_page_idx\` ON \`_pages_v_blocks_tabs_showcase_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_tabs_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_order_idx\` ON \`_pages_v_blocks_tabs_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_parent_id_idx\` ON \`_pages_v_blocks_tabs_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_path_idx\` ON \`_pages_v_blocks_tabs_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_tabs_showcase_appearance_appearance_back_idx\` ON \`_pages_v_blocks_tabs_showcase\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`aspect\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_items_order_idx\` ON \`_pages_v_blocks_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_items_parent_id_idx\` ON \`_pages_v_blocks_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_items_image_idx\` ON \`_pages_v_blocks_gallery_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_buttons_order_idx\` ON \`_pages_v_blocks_gallery_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_buttons_parent_id_idx\` ON \`_pages_v_blocks_gallery_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_buttons_link_link_page_idx\` ON \`_pages_v_blocks_gallery_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`show_filters\` integer DEFAULT false,
  	\`layout\` text DEFAULT 'masonry',
  	\`lightbox\` integer DEFAULT true,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_order_idx\` ON \`_pages_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_parent_id_idx\` ON \`_pages_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_path_idx\` ON \`_pages_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_appearance_appearance_background_idx\` ON \`_pages_v_blocks_gallery\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_before_after\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`caption\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_before_after_order_idx\` ON \`_pages_v_blocks_before_after\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_before_after_parent_id_idx\` ON \`_pages_v_blocks_before_after\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_before_after_path_idx\` ON \`_pages_v_blocks_before_after\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_before_after_before_image_idx\` ON \`_pages_v_blocks_before_after\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_before_after_after_image_idx\` ON \`_pages_v_blocks_before_after\` (\`after_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_before_after_appearance_appearance_backg_idx\` ON \`_pages_v_blocks_before_after\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`source\` text DEFAULT 'vimeo',
  	\`vimeo_id\` text,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`aspect\` text DEFAULT '16/9',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_embed_order_idx\` ON \`_pages_v_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_embed_parent_id_idx\` ON \`_pages_v_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_embed_path_idx\` ON \`_pages_v_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_embed_poster_idx\` ON \`_pages_v_blocks_video_embed\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_embed_appearance_appearance_backgr_idx\` ON \`_pages_v_blocks_video_embed\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_grid_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`vimeo_id\` text,
  	\`poster_id\` integer,
  	\`category\` text,
  	\`featured\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_video_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_videos_order_idx\` ON \`_pages_v_blocks_video_grid_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_videos_parent_id_idx\` ON \`_pages_v_blocks_video_grid_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_videos_poster_idx\` ON \`_pages_v_blocks_video_grid_videos\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`enable_filters\` integer DEFAULT false,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_order_idx\` ON \`_pages_v_blocks_video_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_parent_id_idx\` ON \`_pages_v_blocks_video_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_path_idx\` ON \`_pages_v_blocks_video_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_appearance_appearance_backgro_idx\` ON \`_pages_v_blocks_video_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_logo_marquee_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_logo_marquee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_logos_order_idx\` ON \`_pages_v_blocks_logo_marquee_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_logos_parent_id_idx\` ON \`_pages_v_blocks_logo_marquee_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_logos_image_idx\` ON \`_pages_v_blocks_logo_marquee_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_logo_marquee_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_logo_marquee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_items_order_idx\` ON \`_pages_v_blocks_logo_marquee_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_items_parent_id_idx\` ON \`_pages_v_blocks_logo_marquee_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_logo_marquee\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'logos',
  	\`speed\` numeric DEFAULT 0.6,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_order_idx\` ON \`_pages_v_blocks_logo_marquee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_parent_id_idx\` ON \`_pages_v_blocks_logo_marquee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_path_idx\` ON \`_pages_v_blocks_logo_marquee\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_appearance_appearance_backg_idx\` ON \`_pages_v_blocks_logo_marquee\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_case_study_cards_cards_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_case_study_cards_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_cards_tags_order_idx\` ON \`_pages_v_blocks_case_study_cards_cards_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_cards_tags_parent_id_idx\` ON \`_pages_v_blocks_case_study_cards_cards_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_case_study_cards_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`client\` text,
  	\`title\` text,
  	\`description\` text,
  	\`result_value\` text,
  	\`result_label\` text,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_case_study_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_cards_order_idx\` ON \`_pages_v_blocks_case_study_cards_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_cards_parent_id_idx\` ON \`_pages_v_blocks_case_study_cards_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_cards_image_idx\` ON \`_pages_v_blocks_case_study_cards_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_cards_link_link_page_idx\` ON \`_pages_v_blocks_case_study_cards_cards\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_case_study_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_order_idx\` ON \`_pages_v_blocks_case_study_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_parent_id_idx\` ON \`_pages_v_blocks_case_study_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_path_idx\` ON \`_pages_v_blocks_case_study_cards\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_cards_appearance_appearance_b_idx\` ON \`_pages_v_blocks_case_study_cards\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_case_study_grid_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_case_study_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_grid_buttons_order_idx\` ON \`_pages_v_blocks_case_study_grid_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_grid_buttons_parent_id_idx\` ON \`_pages_v_blocks_case_study_grid_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_grid_buttons_link_link_page_idx\` ON \`_pages_v_blocks_case_study_grid_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_case_study_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`mode\` text DEFAULT 'auto',
  	\`limit\` numeric DEFAULT 4,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_grid_order_idx\` ON \`_pages_v_blocks_case_study_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_grid_parent_id_idx\` ON \`_pages_v_blocks_case_study_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_grid_path_idx\` ON \`_pages_v_blocks_case_study_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_case_study_grid_appearance_appearance_ba_idx\` ON \`_pages_v_blocks_case_study_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonial_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`mode\` text DEFAULT 'auto',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_grid_order_idx\` ON \`_pages_v_blocks_testimonial_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_grid_parent_id_idx\` ON \`_pages_v_blocks_testimonial_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_grid_path_idx\` ON \`_pages_v_blocks_testimonial_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_grid_appearance_appearance_b_idx\` ON \`_pages_v_blocks_testimonial_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_items_order_idx\` ON \`_pages_v_blocks_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_items_parent_id_idx\` ON \`_pages_v_blocks_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`is_faq\` integer DEFAULT false,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_order_idx\` ON \`_pages_v_blocks_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_parent_id_idx\` ON \`_pages_v_blocks_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_path_idx\` ON \`_pages_v_blocks_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_appearance_appearance_backgrou_idx\` ON \`_pages_v_blocks_accordion\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`content\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_order_idx\` ON \`_pages_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_parent_id_idx\` ON \`_pages_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_path_idx\` ON \`_pages_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_appearance_appearance_backgrou_idx\` ON \`_pages_v_blocks_rich_text\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_legal_document_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`content\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_legal_document\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_legal_document_sections_order_idx\` ON \`_pages_v_blocks_legal_document_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_legal_document_sections_parent_id_idx\` ON \`_pages_v_blocks_legal_document_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_legal_document\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`effective_date\` text,
  	\`back_link_enabled\` integer DEFAULT true,
  	\`back_link_label\` text DEFAULT '← Back to Home',
  	\`back_link_url\` text DEFAULT '/',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_legal_document_order_idx\` ON \`_pages_v_blocks_legal_document\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_legal_document_parent_id_idx\` ON \`_pages_v_blocks_legal_document\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_legal_document_path_idx\` ON \`_pages_v_blocks_legal_document\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_legal_document_appearance_appearance_bac_idx\` ON \`_pages_v_blocks_legal_document\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_form_sidebar_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_sidebar_details_order_idx\` ON \`_pages_v_blocks_contact_form_sidebar_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_sidebar_details_parent_id_idx\` ON \`_pages_v_blocks_contact_form_sidebar_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`form_id\` integer,
  	\`sidebar_enabled\` integer DEFAULT true,
  	\`sidebar_title\` text,
  	\`sidebar_body\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_order_idx\` ON \`_pages_v_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_parent_id_idx\` ON \`_pages_v_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_path_idx\` ON \`_pages_v_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_form_idx\` ON \`_pages_v_blocks_contact_form\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_form_appearance_appearance_backg_idx\` ON \`_pages_v_blocks_contact_form\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_final_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_final_cta_buttons_order_idx\` ON \`_pages_v_blocks_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_final_cta_buttons_parent_id_idx\` ON \`_pages_v_blocks_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_final_cta_buttons_link_link_page_idx\` ON \`_pages_v_blocks_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_final_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`wave_animation\` integer DEFAULT true,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_final_cta_order_idx\` ON \`_pages_v_blocks_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_final_cta_parent_id_idx\` ON \`_pages_v_blocks_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_final_cta_path_idx\` ON \`_pages_v_blocks_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_final_cta_appearance_appearance_backgrou_idx\` ON \`_pages_v_blocks_final_cta\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_landing_hero_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_landing_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_landing_hero_trust_items_order_idx\` ON \`_pages_v_blocks_landing_hero_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_landing_hero_trust_items_parent_id_idx\` ON \`_pages_v_blocks_landing_hero_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_landing_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_landing_hero_order_idx\` ON \`_pages_v_blocks_landing_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_landing_hero_parent_id_idx\` ON \`_pages_v_blocks_landing_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_landing_hero_path_idx\` ON \`_pages_v_blocks_landing_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_feature\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`context_line\` text,
  	\`vimeo_id\` text,
  	\`video_title\` text,
  	\`subhead\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`cta_note\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_feature_order_idx\` ON \`_pages_v_blocks_video_feature\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_feature_parent_id_idx\` ON \`_pages_v_blocks_video_feature\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_feature_path_idx\` ON \`_pages_v_blocks_video_feature\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_feature_cta_cta_page_idx\` ON \`_pages_v_blocks_video_feature\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_bar_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`count_to\` text,
  	\`suffix\` text,
  	\`decimals\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats_bar\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_bar_stats_order_idx\` ON \`_pages_v_blocks_stats_bar_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_bar_stats_parent_id_idx\` ON \`_pages_v_blocks_stats_bar_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_bar\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`show_transition\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_bar_order_idx\` ON \`_pages_v_blocks_stats_bar\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_bar_parent_id_idx\` ON \`_pages_v_blocks_stats_bar\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_bar_path_idx\` ON \`_pages_v_blocks_stats_bar\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_pill_band_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_pill_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pill_band_pills_order_idx\` ON \`_pages_v_blocks_pill_band_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pill_band_pills_parent_id_idx\` ON \`_pages_v_blocks_pill_band_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_pill_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`show_transition\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pill_band_order_idx\` ON \`_pages_v_blocks_pill_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pill_band_parent_id_idx\` ON \`_pages_v_blocks_pill_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pill_band_path_idx\` ON \`_pages_v_blocks_pill_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_audit_cta_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_audit_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audit_cta_items_order_idx\` ON \`_pages_v_blocks_audit_cta_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audit_cta_items_parent_id_idx\` ON \`_pages_v_blocks_audit_cta_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_audit_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`tag\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`cta_note\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audit_cta_order_idx\` ON \`_pages_v_blocks_audit_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audit_cta_parent_id_idx\` ON \`_pages_v_blocks_audit_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audit_cta_path_idx\` ON \`_pages_v_blocks_audit_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_audit_cta_cta_cta_page_idx\` ON \`_pages_v_blocks_audit_cta\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_testimonials_order_idx\` ON \`_pages_v_blocks_video_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_testimonials_parent_id_idx\` ON \`_pages_v_blocks_video_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_testimonials_path_idx\` ON \`_pages_v_blocks_video_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonial_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_cards_order_idx\` ON \`_pages_v_blocks_testimonial_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_cards_parent_id_idx\` ON \`_pages_v_blocks_testimonial_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_cards_path_idx\` ON \`_pages_v_blocks_testimonial_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_divider_label\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_divider_label_order_idx\` ON \`_pages_v_blocks_divider_label\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_divider_label_parent_id_idx\` ON \`_pages_v_blocks_divider_label\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_divider_label_path_idx\` ON \`_pages_v_blocks_divider_label\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_inline_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`lead\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_inline_cta_order_idx\` ON \`_pages_v_blocks_inline_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_inline_cta_parent_id_idx\` ON \`_pages_v_blocks_inline_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_inline_cta_path_idx\` ON \`_pages_v_blocks_inline_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_inline_cta_cta_cta_page_idx\` ON \`_pages_v_blocks_inline_cta\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_hide_from_sitemap\` integer DEFAULT false,
  	\`version_change_frequency\` text DEFAULT 'monthly',
  	\`version_priority\` numeric DEFAULT 0.7,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_texts_order_parent\` ON \`_pages_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`case_studies_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_media_id_idx\` ON \`_pages_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_case_studies_id_idx\` ON \`_pages_v_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_testimonials_id_idx\` ON \`_pages_v_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_services_order_idx\` ON \`case_studies_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_services_parent_id_idx\` ON \`case_studies_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_hero_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_hero_buttons_order_idx\` ON \`case_studies_blocks_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_hero_buttons_parent_id_idx\` ON \`case_studies_blocks_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_hero_buttons_link_link_page_idx\` ON \`case_studies_blocks_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'centered',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`camera_cursor_enabled\` integer DEFAULT false,
  	\`camera_cursor_f_stop\` text DEFAULT 'F/1.8',
  	\`min_height\` text DEFAULT 'full',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_hero_order_idx\` ON \`case_studies_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_hero_parent_id_idx\` ON \`case_studies_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_hero_path_idx\` ON \`case_studies_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_hero_appearance_appearance_backgroun_idx\` ON \`case_studies_blocks_hero\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_notice_bar\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_notice_bar_order_idx\` ON \`case_studies_blocks_notice_bar\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_notice_bar_parent_id_idx\` ON \`case_studies_blocks_notice_bar\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_notice_bar_path_idx\` ON \`case_studies_blocks_notice_bar\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_notice_bar_appearance_appearance_bac_idx\` ON \`case_studies_blocks_notice_bar\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_split_media_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_split_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_bullets_order_idx\` ON \`case_studies_blocks_split_media_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_bullets_parent_id_idx\` ON \`case_studies_blocks_split_media_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_split_media_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_split_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_buttons_order_idx\` ON \`case_studies_blocks_split_media_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_buttons_parent_id_idx\` ON \`case_studies_blocks_split_media_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_buttons_link_link_page_idx\` ON \`case_studies_blocks_split_media_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_split_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_side\` text DEFAULT 'right',
  	\`media_type\` text DEFAULT 'image',
  	\`image_id\` integer,
  	\`video_url\` text,
  	\`vimeo_id\` text,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`body\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_order_idx\` ON \`case_studies_blocks_split_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_parent_id_idx\` ON \`case_studies_blocks_split_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_path_idx\` ON \`case_studies_blocks_split_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_image_idx\` ON \`case_studies_blocks_split_media\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_media_appearance_appearance_ba_idx\` ON \`case_studies_blocks_split_media\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`title\` text,
  	\`body\` text,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_grid_cards_order_idx\` ON \`case_studies_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_grid_cards_parent_id_idx\` ON \`case_studies_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_grid_cards_image_idx\` ON \`case_studies_blocks_card_grid_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_grid_cards_link_link_page_idx\` ON \`case_studies_blocks_card_grid_cards\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`columns\` text DEFAULT '4',
  	\`style\` text DEFAULT 'bordered',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_grid_order_idx\` ON \`case_studies_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_grid_parent_id_idx\` ON \`case_studies_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_grid_path_idx\` ON \`case_studies_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_card_grid_appearance_appearance_back_idx\` ON \`case_studies_blocks_card_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`count_to\` numeric,
  	\`suffix\` text,
  	\`comma\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_stats_order_idx\` ON \`case_studies_blocks_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_stats_parent_id_idx\` ON \`case_studies_blocks_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_order_idx\` ON \`case_studies_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_parent_id_idx\` ON \`case_studies_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_path_idx\` ON \`case_studies_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_appearance_appearance_backgrou_idx\` ON \`case_studies_blocks_stats\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`body\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_order_idx\` ON \`case_studies_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_parent_id_idx\` ON \`case_studies_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_steps_image_idx\` ON \`case_studies_blocks_process_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_process_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_buttons_order_idx\` ON \`case_studies_blocks_process_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_buttons_parent_id_idx\` ON \`case_studies_blocks_process_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_buttons_link_link_page_idx\` ON \`case_studies_blocks_process_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`layout\` text DEFAULT 'tabs',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_order_idx\` ON \`case_studies_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_parent_id_idx\` ON \`case_studies_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_path_idx\` ON \`case_studies_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_process_appearance_appearance_backgr_idx\` ON \`case_studies_blocks_process\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_tabs_showcase_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	\`icon\` text,
  	\`frame\` text DEFAULT 'browser',
  	\`image_id\` integer,
  	\`image2_id\` integer,
  	\`business_name\` text,
  	\`rating\` numeric DEFAULT 5,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_tabs_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_tabs_order_idx\` ON \`case_studies_blocks_tabs_showcase_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_tabs_parent_id_idx\` ON \`case_studies_blocks_tabs_showcase_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_tabs_image_idx\` ON \`case_studies_blocks_tabs_showcase_tabs\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_tabs_image2_idx\` ON \`case_studies_blocks_tabs_showcase_tabs\` (\`image2_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_tabs_showcase_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_tabs_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_buttons_order_idx\` ON \`case_studies_blocks_tabs_showcase_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_buttons_parent_id_idx\` ON \`case_studies_blocks_tabs_showcase_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_buttons_link_link_page_idx\` ON \`case_studies_blocks_tabs_showcase_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_tabs_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_order_idx\` ON \`case_studies_blocks_tabs_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_parent_id_idx\` ON \`case_studies_blocks_tabs_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_path_idx\` ON \`case_studies_blocks_tabs_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_tabs_showcase_appearance_appearance__idx\` ON \`case_studies_blocks_tabs_showcase\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`aspect\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_items_order_idx\` ON \`case_studies_blocks_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_items_parent_id_idx\` ON \`case_studies_blocks_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_items_image_idx\` ON \`case_studies_blocks_gallery_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_gallery_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_buttons_order_idx\` ON \`case_studies_blocks_gallery_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_buttons_parent_id_idx\` ON \`case_studies_blocks_gallery_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_buttons_link_link_page_idx\` ON \`case_studies_blocks_gallery_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`show_filters\` integer DEFAULT false,
  	\`layout\` text DEFAULT 'masonry',
  	\`lightbox\` integer DEFAULT true,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_order_idx\` ON \`case_studies_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_parent_id_idx\` ON \`case_studies_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_path_idx\` ON \`case_studies_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_gallery_appearance_appearance_backgr_idx\` ON \`case_studies_blocks_gallery\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_before_after\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`caption\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_before_after_order_idx\` ON \`case_studies_blocks_before_after\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_before_after_parent_id_idx\` ON \`case_studies_blocks_before_after\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_before_after_path_idx\` ON \`case_studies_blocks_before_after\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_before_after_before_image_idx\` ON \`case_studies_blocks_before_after\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_before_after_after_image_idx\` ON \`case_studies_blocks_before_after\` (\`after_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_before_after_appearance_appearance_b_idx\` ON \`case_studies_blocks_before_after\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`source\` text DEFAULT 'vimeo',
  	\`vimeo_id\` text,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`aspect\` text DEFAULT '16/9',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_embed_order_idx\` ON \`case_studies_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_embed_parent_id_idx\` ON \`case_studies_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_embed_path_idx\` ON \`case_studies_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_embed_poster_idx\` ON \`case_studies_blocks_video_embed\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_embed_appearance_appearance_ba_idx\` ON \`case_studies_blocks_video_embed\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_video_grid_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`vimeo_id\` text,
  	\`poster_id\` integer,
  	\`category\` text,
  	\`featured\` integer,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_video_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_videos_order_idx\` ON \`case_studies_blocks_video_grid_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_videos_parent_id_idx\` ON \`case_studies_blocks_video_grid_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_videos_poster_idx\` ON \`case_studies_blocks_video_grid_videos\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_video_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`enable_filters\` integer DEFAULT false,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_order_idx\` ON \`case_studies_blocks_video_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_parent_id_idx\` ON \`case_studies_blocks_video_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_path_idx\` ON \`case_studies_blocks_video_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_appearance_appearance_bac_idx\` ON \`case_studies_blocks_video_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_logo_marquee_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_logo_marquee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_logos_order_idx\` ON \`case_studies_blocks_logo_marquee_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_logos_parent_id_idx\` ON \`case_studies_blocks_logo_marquee_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_logos_image_idx\` ON \`case_studies_blocks_logo_marquee_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_logo_marquee_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_logo_marquee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_items_order_idx\` ON \`case_studies_blocks_logo_marquee_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_items_parent_id_idx\` ON \`case_studies_blocks_logo_marquee_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_logo_marquee\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'logos',
  	\`speed\` numeric DEFAULT 0.6,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_order_idx\` ON \`case_studies_blocks_logo_marquee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_parent_id_idx\` ON \`case_studies_blocks_logo_marquee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_path_idx\` ON \`case_studies_blocks_logo_marquee\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_appearance_appearance_b_idx\` ON \`case_studies_blocks_logo_marquee\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_case_study_cards_cards_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_case_study_cards_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_cards_tags_order_idx\` ON \`case_studies_blocks_case_study_cards_cards_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_cards_tags_parent_id_idx\` ON \`case_studies_blocks_case_study_cards_cards_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_case_study_cards_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`client\` text,
  	\`title\` text,
  	\`description\` text,
  	\`result_value\` text,
  	\`result_label\` text,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_case_study_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_cards_order_idx\` ON \`case_studies_blocks_case_study_cards_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_cards_parent_id_idx\` ON \`case_studies_blocks_case_study_cards_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_cards_image_idx\` ON \`case_studies_blocks_case_study_cards_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_cards_link_link_pag_idx\` ON \`case_studies_blocks_case_study_cards_cards\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_case_study_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_order_idx\` ON \`case_studies_blocks_case_study_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_parent_id_idx\` ON \`case_studies_blocks_case_study_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_path_idx\` ON \`case_studies_blocks_case_study_cards\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_cards_appearance_appearan_idx\` ON \`case_studies_blocks_case_study_cards\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_case_study_grid_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_case_study_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_grid_buttons_order_idx\` ON \`case_studies_blocks_case_study_grid_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_grid_buttons_parent_id_idx\` ON \`case_studies_blocks_case_study_grid_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_grid_buttons_link_link_pa_idx\` ON \`case_studies_blocks_case_study_grid_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_case_study_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`mode\` text DEFAULT 'auto',
  	\`limit\` numeric DEFAULT 4,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_grid_order_idx\` ON \`case_studies_blocks_case_study_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_grid_parent_id_idx\` ON \`case_studies_blocks_case_study_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_grid_path_idx\` ON \`case_studies_blocks_case_study_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_case_study_grid_appearance_appearanc_idx\` ON \`case_studies_blocks_case_study_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_testimonial_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`mode\` text DEFAULT 'auto',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_grid_order_idx\` ON \`case_studies_blocks_testimonial_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_grid_parent_id_idx\` ON \`case_studies_blocks_testimonial_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_grid_path_idx\` ON \`case_studies_blocks_testimonial_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_grid_appearance_appearan_idx\` ON \`case_studies_blocks_testimonial_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_items_order_idx\` ON \`case_studies_blocks_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_items_parent_id_idx\` ON \`case_studies_blocks_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`is_faq\` integer DEFAULT false,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_order_idx\` ON \`case_studies_blocks_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_parent_id_idx\` ON \`case_studies_blocks_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_path_idx\` ON \`case_studies_blocks_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_appearance_appearance_back_idx\` ON \`case_studies_blocks_accordion\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`content\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_rich_text_order_idx\` ON \`case_studies_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_rich_text_parent_id_idx\` ON \`case_studies_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_rich_text_path_idx\` ON \`case_studies_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_rich_text_appearance_appearance_back_idx\` ON \`case_studies_blocks_rich_text\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_legal_document_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_legal_document\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_legal_document_sections_order_idx\` ON \`case_studies_blocks_legal_document_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_legal_document_sections_parent_id_idx\` ON \`case_studies_blocks_legal_document_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_legal_document\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`effective_date\` text,
  	\`back_link_enabled\` integer DEFAULT true,
  	\`back_link_label\` text DEFAULT '← Back to Home',
  	\`back_link_url\` text DEFAULT '/',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_legal_document_order_idx\` ON \`case_studies_blocks_legal_document\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_legal_document_parent_id_idx\` ON \`case_studies_blocks_legal_document\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_legal_document_path_idx\` ON \`case_studies_blocks_legal_document\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_legal_document_appearance_appearance_idx\` ON \`case_studies_blocks_legal_document\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_contact_form_sidebar_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_contact_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_form_sidebar_details_order_idx\` ON \`case_studies_blocks_contact_form_sidebar_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_form_sidebar_details_parent_id_idx\` ON \`case_studies_blocks_contact_form_sidebar_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`form_id\` integer,
  	\`sidebar_enabled\` integer DEFAULT true,
  	\`sidebar_title\` text,
  	\`sidebar_body\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_form_order_idx\` ON \`case_studies_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_form_parent_id_idx\` ON \`case_studies_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_form_path_idx\` ON \`case_studies_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_form_form_idx\` ON \`case_studies_blocks_contact_form\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_form_appearance_appearance_b_idx\` ON \`case_studies_blocks_contact_form\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_final_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_final_cta_buttons_order_idx\` ON \`case_studies_blocks_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_final_cta_buttons_parent_id_idx\` ON \`case_studies_blocks_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_final_cta_buttons_link_link_page_idx\` ON \`case_studies_blocks_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_final_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`wave_animation\` integer DEFAULT true,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_final_cta_order_idx\` ON \`case_studies_blocks_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_final_cta_parent_id_idx\` ON \`case_studies_blocks_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_final_cta_path_idx\` ON \`case_studies_blocks_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_final_cta_appearance_appearance_back_idx\` ON \`case_studies_blocks_final_cta\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_landing_hero_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_landing_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_landing_hero_trust_items_order_idx\` ON \`case_studies_blocks_landing_hero_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_landing_hero_trust_items_parent_id_idx\` ON \`case_studies_blocks_landing_hero_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_landing_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_landing_hero_order_idx\` ON \`case_studies_blocks_landing_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_landing_hero_parent_id_idx\` ON \`case_studies_blocks_landing_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_landing_hero_path_idx\` ON \`case_studies_blocks_landing_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_video_feature\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`context_line\` text,
  	\`vimeo_id\` text,
  	\`video_title\` text,
  	\`subhead\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`cta_note\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_feature_order_idx\` ON \`case_studies_blocks_video_feature\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_feature_parent_id_idx\` ON \`case_studies_blocks_video_feature\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_feature_path_idx\` ON \`case_studies_blocks_video_feature\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_feature_cta_cta_page_idx\` ON \`case_studies_blocks_video_feature\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats_bar_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`count_to\` text,
  	\`suffix\` text,
  	\`decimals\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_stats_bar\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_bar_stats_order_idx\` ON \`case_studies_blocks_stats_bar_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_bar_stats_parent_id_idx\` ON \`case_studies_blocks_stats_bar_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats_bar\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`show_transition\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_bar_order_idx\` ON \`case_studies_blocks_stats_bar\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_bar_parent_id_idx\` ON \`case_studies_blocks_stats_bar\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_bar_path_idx\` ON \`case_studies_blocks_stats_bar\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_pill_band_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_pill_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_pill_band_pills_order_idx\` ON \`case_studies_blocks_pill_band_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_pill_band_pills_parent_id_idx\` ON \`case_studies_blocks_pill_band_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_pill_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`show_transition\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_pill_band_order_idx\` ON \`case_studies_blocks_pill_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_pill_band_parent_id_idx\` ON \`case_studies_blocks_pill_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_pill_band_path_idx\` ON \`case_studies_blocks_pill_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_audit_cta_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_audit_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_audit_cta_items_order_idx\` ON \`case_studies_blocks_audit_cta_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_audit_cta_items_parent_id_idx\` ON \`case_studies_blocks_audit_cta_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_audit_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`tag\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`cta_note\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_audit_cta_order_idx\` ON \`case_studies_blocks_audit_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_audit_cta_parent_id_idx\` ON \`case_studies_blocks_audit_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_audit_cta_path_idx\` ON \`case_studies_blocks_audit_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_audit_cta_cta_cta_page_idx\` ON \`case_studies_blocks_audit_cta\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_video_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_testimonials_order_idx\` ON \`case_studies_blocks_video_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_testimonials_parent_id_idx\` ON \`case_studies_blocks_video_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_testimonials_path_idx\` ON \`case_studies_blocks_video_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_testimonial_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_cards_order_idx\` ON \`case_studies_blocks_testimonial_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_cards_parent_id_idx\` ON \`case_studies_blocks_testimonial_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_cards_path_idx\` ON \`case_studies_blocks_testimonial_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_divider_label\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_divider_label_order_idx\` ON \`case_studies_blocks_divider_label\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_divider_label_parent_id_idx\` ON \`case_studies_blocks_divider_label\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_divider_label_path_idx\` ON \`case_studies_blocks_divider_label\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_inline_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`lead\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_inline_cta_order_idx\` ON \`case_studies_blocks_inline_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_inline_cta_parent_id_idx\` ON \`case_studies_blocks_inline_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_inline_cta_path_idx\` ON \`case_studies_blocks_inline_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_inline_cta_cta_cta_page_idx\` ON \`case_studies_blocks_inline_cta\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`client\` text,
  	\`title\` text,
  	\`slug\` text,
  	\`featured_image_id\` integer,
  	\`result\` text,
  	\`result_label\` text,
  	\`body\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_featured_image_idx\` ON \`case_studies\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_meta_meta_image_idx\` ON \`case_studies\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies__status_idx\` ON \`case_studies\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_texts_order_parent\` ON \`case_studies_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`case_studies_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_media_id_idx\` ON \`case_studies_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_case_studies_id_idx\` ON \`case_studies_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_testimonials_id_idx\` ON \`case_studies_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_version_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_services_order_idx\` ON \`_case_studies_v_version_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_services_parent_id_idx\` ON \`_case_studies_v_version_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_hero_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_hero_buttons_order_idx\` ON \`_case_studies_v_blocks_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_hero_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_hero_buttons_link_link_page_idx\` ON \`_case_studies_v_blocks_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'centered',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`camera_cursor_enabled\` integer DEFAULT false,
  	\`camera_cursor_f_stop\` text DEFAULT 'F/1.8',
  	\`min_height\` text DEFAULT 'full',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_hero_order_idx\` ON \`_case_studies_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_hero_parent_id_idx\` ON \`_case_studies_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_hero_path_idx\` ON \`_case_studies_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_hero_appearance_appearance_backgr_idx\` ON \`_case_studies_v_blocks_hero\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_notice_bar\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_notice_bar_order_idx\` ON \`_case_studies_v_blocks_notice_bar\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_notice_bar_parent_id_idx\` ON \`_case_studies_v_blocks_notice_bar\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_notice_bar_path_idx\` ON \`_case_studies_v_blocks_notice_bar\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_notice_bar_appearance_appearance__idx\` ON \`_case_studies_v_blocks_notice_bar\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_split_media_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_split_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_bullets_order_idx\` ON \`_case_studies_v_blocks_split_media_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_bullets_parent_id_idx\` ON \`_case_studies_v_blocks_split_media_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_split_media_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_split_media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_buttons_order_idx\` ON \`_case_studies_v_blocks_split_media_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_split_media_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_buttons_link_link_pag_idx\` ON \`_case_studies_v_blocks_split_media_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_split_media\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_side\` text DEFAULT 'right',
  	\`media_type\` text DEFAULT 'image',
  	\`image_id\` integer,
  	\`video_url\` text,
  	\`vimeo_id\` text,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`body\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_order_idx\` ON \`_case_studies_v_blocks_split_media\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_parent_id_idx\` ON \`_case_studies_v_blocks_split_media\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_path_idx\` ON \`_case_studies_v_blocks_split_media\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_image_idx\` ON \`_case_studies_v_blocks_split_media\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_media_appearance_appearance_idx\` ON \`_case_studies_v_blocks_split_media\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`title\` text,
  	\`body\` text,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_card_grid_cards_order_idx\` ON \`_case_studies_v_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_card_grid_cards_parent_id_idx\` ON \`_case_studies_v_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_card_grid_cards_image_idx\` ON \`_case_studies_v_blocks_card_grid_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_card_grid_cards_link_link_page_idx\` ON \`_case_studies_v_blocks_card_grid_cards\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`columns\` text DEFAULT '4',
  	\`style\` text DEFAULT 'bordered',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_card_grid_order_idx\` ON \`_case_studies_v_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_card_grid_parent_id_idx\` ON \`_case_studies_v_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_card_grid_path_idx\` ON \`_case_studies_v_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_card_grid_appearance_appearance_b_idx\` ON \`_case_studies_v_blocks_card_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_stats_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`count_to\` numeric,
  	\`suffix\` text,
  	\`comma\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_stats_order_idx\` ON \`_case_studies_v_blocks_stats_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_stats_parent_id_idx\` ON \`_case_studies_v_blocks_stats_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_order_idx\` ON \`_case_studies_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_parent_id_idx\` ON \`_case_studies_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_path_idx\` ON \`_case_studies_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_appearance_appearance_backg_idx\` ON \`_case_studies_v_blocks_stats\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_process_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`body\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_steps_order_idx\` ON \`_case_studies_v_blocks_process_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_steps_parent_id_idx\` ON \`_case_studies_v_blocks_process_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_steps_image_idx\` ON \`_case_studies_v_blocks_process_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_process_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_buttons_order_idx\` ON \`_case_studies_v_blocks_process_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_process_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_buttons_link_link_page_idx\` ON \`_case_studies_v_blocks_process_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_process\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`layout\` text DEFAULT 'tabs',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_order_idx\` ON \`_case_studies_v_blocks_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_parent_id_idx\` ON \`_case_studies_v_blocks_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_path_idx\` ON \`_case_studies_v_blocks_process\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_process_appearance_appearance_bac_idx\` ON \`_case_studies_v_blocks_process\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_tabs_showcase_tabs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	\`icon\` text,
  	\`frame\` text DEFAULT 'browser',
  	\`image_id\` integer,
  	\`image2_id\` integer,
  	\`business_name\` text,
  	\`rating\` numeric DEFAULT 5,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image2_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_tabs_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_tabs_order_idx\` ON \`_case_studies_v_blocks_tabs_showcase_tabs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_tabs_parent_id_idx\` ON \`_case_studies_v_blocks_tabs_showcase_tabs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_tabs_image_idx\` ON \`_case_studies_v_blocks_tabs_showcase_tabs\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_tabs_image2_idx\` ON \`_case_studies_v_blocks_tabs_showcase_tabs\` (\`image2_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_tabs_showcase_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_tabs_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_buttons_order_idx\` ON \`_case_studies_v_blocks_tabs_showcase_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_tabs_showcase_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_buttons_link_link_p_idx\` ON \`_case_studies_v_blocks_tabs_showcase_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_tabs_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_order_idx\` ON \`_case_studies_v_blocks_tabs_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_parent_id_idx\` ON \`_case_studies_v_blocks_tabs_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_path_idx\` ON \`_case_studies_v_blocks_tabs_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_tabs_showcase_appearance_appearan_idx\` ON \`_case_studies_v_blocks_tabs_showcase\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`aspect\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_items_order_idx\` ON \`_case_studies_v_blocks_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_items_parent_id_idx\` ON \`_case_studies_v_blocks_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_items_image_idx\` ON \`_case_studies_v_blocks_gallery_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_gallery_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_buttons_order_idx\` ON \`_case_studies_v_blocks_gallery_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_gallery_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_buttons_link_link_page_idx\` ON \`_case_studies_v_blocks_gallery_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`show_filters\` integer DEFAULT false,
  	\`layout\` text DEFAULT 'masonry',
  	\`lightbox\` integer DEFAULT true,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_order_idx\` ON \`_case_studies_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_parent_id_idx\` ON \`_case_studies_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_path_idx\` ON \`_case_studies_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_gallery_appearance_appearance_bac_idx\` ON \`_case_studies_v_blocks_gallery\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_before_after\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`caption\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_before_after_order_idx\` ON \`_case_studies_v_blocks_before_after\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_before_after_parent_id_idx\` ON \`_case_studies_v_blocks_before_after\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_before_after_path_idx\` ON \`_case_studies_v_blocks_before_after\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_before_after_before_image_idx\` ON \`_case_studies_v_blocks_before_after\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_before_after_after_image_idx\` ON \`_case_studies_v_blocks_before_after\` (\`after_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_before_after_appearance_appearanc_idx\` ON \`_case_studies_v_blocks_before_after\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_video_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`source\` text DEFAULT 'vimeo',
  	\`vimeo_id\` text,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`aspect\` text DEFAULT '16/9',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_embed_order_idx\` ON \`_case_studies_v_blocks_video_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_embed_parent_id_idx\` ON \`_case_studies_v_blocks_video_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_embed_path_idx\` ON \`_case_studies_v_blocks_video_embed\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_embed_poster_idx\` ON \`_case_studies_v_blocks_video_embed\` (\`poster_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_embed_appearance_appearance_idx\` ON \`_case_studies_v_blocks_video_embed\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_video_grid_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`vimeo_id\` text,
  	\`poster_id\` integer,
  	\`category\` text,
  	\`featured\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_video_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_videos_order_idx\` ON \`_case_studies_v_blocks_video_grid_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_videos_parent_id_idx\` ON \`_case_studies_v_blocks_video_grid_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_videos_poster_idx\` ON \`_case_studies_v_blocks_video_grid_videos\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_video_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`enable_filters\` integer DEFAULT false,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_order_idx\` ON \`_case_studies_v_blocks_video_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_parent_id_idx\` ON \`_case_studies_v_blocks_video_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_path_idx\` ON \`_case_studies_v_blocks_video_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_appearance_appearance__idx\` ON \`_case_studies_v_blocks_video_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_logo_marquee_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_logo_marquee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_logos_order_idx\` ON \`_case_studies_v_blocks_logo_marquee_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_logos_parent_id_idx\` ON \`_case_studies_v_blocks_logo_marquee_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_logos_image_idx\` ON \`_case_studies_v_blocks_logo_marquee_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_logo_marquee_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_logo_marquee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_items_order_idx\` ON \`_case_studies_v_blocks_logo_marquee_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_items_parent_id_idx\` ON \`_case_studies_v_blocks_logo_marquee_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_logo_marquee\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`mode\` text DEFAULT 'logos',
  	\`speed\` numeric DEFAULT 0.6,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_order_idx\` ON \`_case_studies_v_blocks_logo_marquee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_parent_id_idx\` ON \`_case_studies_v_blocks_logo_marquee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_path_idx\` ON \`_case_studies_v_blocks_logo_marquee\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_appearance_appearanc_idx\` ON \`_case_studies_v_blocks_logo_marquee\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_case_study_cards_cards_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_case_study_cards_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_cards_tags_order_idx\` ON \`_case_studies_v_blocks_case_study_cards_cards_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_cards_tags_parent_id_idx\` ON \`_case_studies_v_blocks_case_study_cards_cards_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_case_study_cards_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`client\` text,
  	\`title\` text,
  	\`description\` text,
  	\`result_value\` text,
  	\`result_label\` text,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_case_study_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_cards_order_idx\` ON \`_case_studies_v_blocks_case_study_cards_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_cards_parent_id_idx\` ON \`_case_studies_v_blocks_case_study_cards_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_cards_image_idx\` ON \`_case_studies_v_blocks_case_study_cards_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_cards_link_link__idx\` ON \`_case_studies_v_blocks_case_study_cards_cards\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_case_study_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_order_idx\` ON \`_case_studies_v_blocks_case_study_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_parent_id_idx\` ON \`_case_studies_v_blocks_case_study_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_path_idx\` ON \`_case_studies_v_blocks_case_study_cards\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_cards_appearance_appea_idx\` ON \`_case_studies_v_blocks_case_study_cards\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_case_study_grid_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_case_study_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_grid_buttons_order_idx\` ON \`_case_studies_v_blocks_case_study_grid_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_grid_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_case_study_grid_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_grid_buttons_link_link_idx\` ON \`_case_studies_v_blocks_case_study_grid_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_case_study_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`mode\` text DEFAULT 'auto',
  	\`limit\` numeric DEFAULT 4,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_grid_order_idx\` ON \`_case_studies_v_blocks_case_study_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_grid_parent_id_idx\` ON \`_case_studies_v_blocks_case_study_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_grid_path_idx\` ON \`_case_studies_v_blocks_case_study_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_case_study_grid_appearance_appear_idx\` ON \`_case_studies_v_blocks_case_study_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_testimonial_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`mode\` text DEFAULT 'auto',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_grid_order_idx\` ON \`_case_studies_v_blocks_testimonial_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_grid_parent_id_idx\` ON \`_case_studies_v_blocks_testimonial_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_grid_path_idx\` ON \`_case_studies_v_blocks_testimonial_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_grid_appearance_appea_idx\` ON \`_case_studies_v_blocks_testimonial_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_items_order_idx\` ON \`_case_studies_v_blocks_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_items_parent_id_idx\` ON \`_case_studies_v_blocks_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`is_faq\` integer DEFAULT false,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_order_idx\` ON \`_case_studies_v_blocks_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_parent_id_idx\` ON \`_case_studies_v_blocks_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_path_idx\` ON \`_case_studies_v_blocks_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_appearance_appearance_b_idx\` ON \`_case_studies_v_blocks_accordion\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`content\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_rich_text_order_idx\` ON \`_case_studies_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_rich_text_parent_id_idx\` ON \`_case_studies_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_rich_text_path_idx\` ON \`_case_studies_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_rich_text_appearance_appearance_b_idx\` ON \`_case_studies_v_blocks_rich_text\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_legal_document_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`content\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_legal_document\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_legal_document_sections_order_idx\` ON \`_case_studies_v_blocks_legal_document_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_legal_document_sections_parent_id_idx\` ON \`_case_studies_v_blocks_legal_document_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_legal_document\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`effective_date\` text,
  	\`back_link_enabled\` integer DEFAULT true,
  	\`back_link_label\` text DEFAULT '← Back to Home',
  	\`back_link_url\` text DEFAULT '/',
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_legal_document_order_idx\` ON \`_case_studies_v_blocks_legal_document\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_legal_document_parent_id_idx\` ON \`_case_studies_v_blocks_legal_document\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_legal_document_path_idx\` ON \`_case_studies_v_blocks_legal_document\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_legal_document_appearance_appeara_idx\` ON \`_case_studies_v_blocks_legal_document\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_contact_form_sidebar_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_contact_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_form_sidebar_details_order_idx\` ON \`_case_studies_v_blocks_contact_form_sidebar_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_form_sidebar_details_parent_id_idx\` ON \`_case_studies_v_blocks_contact_form_sidebar_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_contact_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`form_id\` integer,
  	\`sidebar_enabled\` integer DEFAULT true,
  	\`sidebar_title\` text,
  	\`sidebar_body\` text,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_form_order_idx\` ON \`_case_studies_v_blocks_contact_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_form_parent_id_idx\` ON \`_case_studies_v_blocks_contact_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_form_path_idx\` ON \`_case_studies_v_blocks_contact_form\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_form_form_idx\` ON \`_case_studies_v_blocks_contact_form\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_form_appearance_appearanc_idx\` ON \`_case_studies_v_blocks_contact_form\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_final_cta_buttons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_final_cta_buttons_order_idx\` ON \`_case_studies_v_blocks_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_final_cta_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_final_cta_buttons_link_link_page_idx\` ON \`_case_studies_v_blocks_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_final_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`wave_animation\` integer DEFAULT true,
  	\`appearance_background\` text DEFAULT 'deep',
  	\`appearance_text_color\` text DEFAULT 'auto',
  	\`appearance_custom_background\` text,
  	\`appearance_custom_text_color\` text,
  	\`appearance_background_image_id\` integer,
  	\`appearance_background_video_source\` text DEFAULT 'vimeo',
  	\`appearance_background_video_vimeo_id\` text,
  	\`appearance_background_video_url\` text,
  	\`appearance_overlay_enabled\` integer DEFAULT true,
  	\`appearance_overlay_opacity\` numeric DEFAULT 60,
  	\`appearance_padding_top\` text DEFAULT 'default',
  	\`appearance_padding_bottom\` text DEFAULT 'default',
  	\`appearance_width\` text DEFAULT 'default',
  	\`appearance_anchor_id\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_final_cta_order_idx\` ON \`_case_studies_v_blocks_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_final_cta_parent_id_idx\` ON \`_case_studies_v_blocks_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_final_cta_path_idx\` ON \`_case_studies_v_blocks_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_final_cta_appearance_appearance_b_idx\` ON \`_case_studies_v_blocks_final_cta\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_landing_hero_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_landing_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_landing_hero_trust_items_order_idx\` ON \`_case_studies_v_blocks_landing_hero_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_landing_hero_trust_items_parent_id_idx\` ON \`_case_studies_v_blocks_landing_hero_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_landing_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_landing_hero_order_idx\` ON \`_case_studies_v_blocks_landing_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_landing_hero_parent_id_idx\` ON \`_case_studies_v_blocks_landing_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_landing_hero_path_idx\` ON \`_case_studies_v_blocks_landing_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_video_feature\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`context_line\` text,
  	\`vimeo_id\` text,
  	\`video_title\` text,
  	\`subhead\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`cta_note\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_feature_order_idx\` ON \`_case_studies_v_blocks_video_feature\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_feature_parent_id_idx\` ON \`_case_studies_v_blocks_video_feature\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_feature_path_idx\` ON \`_case_studies_v_blocks_video_feature\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_feature_cta_cta_page_idx\` ON \`_case_studies_v_blocks_video_feature\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_stats_bar_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`count_to\` text,
  	\`suffix\` text,
  	\`decimals\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_stats_bar\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_bar_stats_order_idx\` ON \`_case_studies_v_blocks_stats_bar_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_bar_stats_parent_id_idx\` ON \`_case_studies_v_blocks_stats_bar_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_stats_bar\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`show_transition\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_bar_order_idx\` ON \`_case_studies_v_blocks_stats_bar\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_bar_parent_id_idx\` ON \`_case_studies_v_blocks_stats_bar\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_bar_path_idx\` ON \`_case_studies_v_blocks_stats_bar\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_pill_band_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_pill_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_pill_band_pills_order_idx\` ON \`_case_studies_v_blocks_pill_band_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_pill_band_pills_parent_id_idx\` ON \`_case_studies_v_blocks_pill_band_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_pill_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`show_transition\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_pill_band_order_idx\` ON \`_case_studies_v_blocks_pill_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_pill_band_parent_id_idx\` ON \`_case_studies_v_blocks_pill_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_pill_band_path_idx\` ON \`_case_studies_v_blocks_pill_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_audit_cta_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_audit_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_audit_cta_items_order_idx\` ON \`_case_studies_v_blocks_audit_cta_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_audit_cta_items_parent_id_idx\` ON \`_case_studies_v_blocks_audit_cta_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_audit_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'wc',
  	\`tag\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`cta_note\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_audit_cta_order_idx\` ON \`_case_studies_v_blocks_audit_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_audit_cta_parent_id_idx\` ON \`_case_studies_v_blocks_audit_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_audit_cta_path_idx\` ON \`_case_studies_v_blocks_audit_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_audit_cta_cta_cta_page_idx\` ON \`_case_studies_v_blocks_audit_cta\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_video_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_testimonials_order_idx\` ON \`_case_studies_v_blocks_video_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_testimonials_parent_id_idx\` ON \`_case_studies_v_blocks_video_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_testimonials_path_idx\` ON \`_case_studies_v_blocks_video_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_testimonial_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_cards_order_idx\` ON \`_case_studies_v_blocks_testimonial_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_cards_parent_id_idx\` ON \`_case_studies_v_blocks_testimonial_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_cards_path_idx\` ON \`_case_studies_v_blocks_testimonial_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_divider_label\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_divider_label_order_idx\` ON \`_case_studies_v_blocks_divider_label\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_divider_label_parent_id_idx\` ON \`_case_studies_v_blocks_divider_label\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_divider_label_path_idx\` ON \`_case_studies_v_blocks_divider_label\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_inline_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`lead\` text,
  	\`text\` text,
  	\`cta_label\` text,
  	\`cta_type\` text DEFAULT 'internal',
  	\`cta_page_id\` integer,
  	\`cta_url\` text,
  	\`cta_anchor\` text,
  	\`cta_style\` text DEFAULT 'primary',
  	\`cta_new_tab\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cta_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_inline_cta_order_idx\` ON \`_case_studies_v_blocks_inline_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_inline_cta_parent_id_idx\` ON \`_case_studies_v_blocks_inline_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_inline_cta_path_idx\` ON \`_case_studies_v_blocks_inline_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_inline_cta_cta_cta_page_idx\` ON \`_case_studies_v_blocks_inline_cta\` (\`cta_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_client\` text,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_featured_image_id\` integer,
  	\`version_result\` text,
  	\`version_result_label\` text,
  	\`version_body\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_parent_idx\` ON \`_case_studies_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_slug_idx\` ON \`_case_studies_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_featured_image_idx\` ON \`_case_studies_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_meta_version_meta_image_idx\` ON \`_case_studies_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_updated_at_idx\` ON \`_case_studies_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_created_at_idx\` ON \`_case_studies_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version__status_idx\` ON \`_case_studies_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_created_at_idx\` ON \`_case_studies_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_updated_at_idx\` ON \`_case_studies_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_latest_idx\` ON \`_case_studies_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_autosave_idx\` ON \`_case_studies_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_texts_order_parent\` ON \`_case_studies_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`case_studies_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_order_idx\` ON \`_case_studies_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_parent_idx\` ON \`_case_studies_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_path_idx\` ON \`_case_studies_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_media_id_idx\` ON \`_case_studies_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_case_studies_id_idx\` ON \`_case_studies_v_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_testimonials_id_idx\` ON \`_case_studies_v_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type\` text DEFAULT 'quote',
  	\`quote\` text,
  	\`vimeo_id\` text,
  	\`author\` text,
  	\`role\` text,
  	\`organisation\` text,
  	\`outcome\` text,
  	\`initials\` text,
  	\`avatar_id\` integer,
  	\`rating\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_avatar_idx\` ON \`testimonials\` (\`avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials__status_idx\` ON \`testimonials\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_testimonials_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_type\` text DEFAULT 'quote',
  	\`version_quote\` text,
  	\`version_vimeo_id\` text,
  	\`version_author\` text,
  	\`version_role\` text,
  	\`version_organisation\` text,
  	\`version_outcome\` text,
  	\`version_initials\` text,
  	\`version_avatar_id\` integer,
  	\`version_rating\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_testimonials_v_parent_idx\` ON \`_testimonials_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_avatar_idx\` ON \`_testimonials_v\` (\`version_avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_updated_at_idx\` ON \`_testimonials_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_created_at_idx\` ON \`_testimonials_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version__status_idx\` ON \`_testimonials_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_created_at_idx\` ON \`_testimonials_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_updated_at_idx\` ON \`_testimonials_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_latest_idx\` ON \`_testimonials_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	\`credit\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_wide_url\` text,
  	\`sizes_wide_width\` numeric,
  	\`sizes_wide_height\` numeric,
  	\`sizes_wide_mime_type\` text,
  	\`sizes_wide_filesize\` numeric,
  	\`sizes_wide_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_wide_sizes_wide_filename_idx\` ON \`media\` (\`sizes_wide_filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text,
  	\`username\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_username_idx\` ON \`users\` (\`username\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`case_studies_id\` integer,
  	\`testimonials_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`redirects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`navigation_items_children\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_items_children_order_idx\` ON \`navigation_items_children\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_children_parent_id_idx\` ON \`navigation_items_children\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_children_link_link_page_idx\` ON \`navigation_items_children\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_items_order_idx\` ON \`navigation_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_parent_id_idx\` ON \`navigation_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_items_link_link_page_idx\` ON \`navigation_items\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`logo_height\` numeric DEFAULT 110,
  	\`cta_enabled\` integer DEFAULT true,
  	\`cta_link_label\` text,
  	\`cta_link_type\` text DEFAULT 'internal',
  	\`cta_link_page_id\` integer,
  	\`cta_link_url\` text,
  	\`cta_link_anchor\` text,
  	\`cta_link_style\` text DEFAULT 'primary',
  	\`cta_link_new_tab\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cta_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_logo_idx\` ON \`navigation\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_cta_link_cta_link_page_idx\` ON \`navigation\` (\`cta_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v_version_items_children\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navigation_v_version_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_items_children_order_idx\` ON \`_navigation_v_version_items_children\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_items_children_parent_id_idx\` ON \`_navigation_v_version_items_children\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_items_children_link_link_page_idx\` ON \`_navigation_v_version_items_children\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navigation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_items_order_idx\` ON \`_navigation_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_items_parent_id_idx\` ON \`_navigation_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_items_link_link_page_idx\` ON \`_navigation_v_version_items\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_logo_id\` integer,
  	\`version_logo_height\` numeric DEFAULT 110,
  	\`version_cta_enabled\` integer DEFAULT true,
  	\`version_cta_link_label\` text,
  	\`version_cta_link_type\` text DEFAULT 'internal',
  	\`version_cta_link_page_id\` integer,
  	\`version_cta_link_url\` text,
  	\`version_cta_link_anchor\` text,
  	\`version_cta_link_style\` text DEFAULT 'primary',
  	\`version_cta_link_new_tab\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cta_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_version_logo_idx\` ON \`_navigation_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_cta_link_version_cta_link_page_idx\` ON \`_navigation_v\` (\`version_cta_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_created_at_idx\` ON \`_navigation_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_updated_at_idx\` ON \`_navigation_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`highlight\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_link_link_page_idx\` ON \`footer_columns_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_social_order_idx\` ON \`footer_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_social_parent_id_idx\` ON \`footer_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_link_link_page_idx\` ON \`footer_legal_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`blurb\` text,
  	\`copyright\` text DEFAULT '© {year} Wavecare Marketing · Miami, FL',
  	\`bottom_note\` text,
  	\`logo_height\` numeric DEFAULT 140,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_logo_idx\` ON \`footer\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`highlight\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v_version_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_links_order_idx\` ON \`_footer_v_version_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_links_parent_id_idx\` ON \`_footer_v_version_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_links_link_link_page_idx\` ON \`_footer_v_version_columns_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_order_idx\` ON \`_footer_v_version_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_parent_id_idx\` ON \`_footer_v_version_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_social_order_idx\` ON \`_footer_v_version_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_social_parent_id_idx\` ON \`_footer_v_version_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_label\` text,
  	\`link_type\` text DEFAULT 'internal',
  	\`link_page_id\` integer,
  	\`link_url\` text,
  	\`link_anchor\` text,
  	\`link_style\` text DEFAULT 'primary',
  	\`link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_legal_links_order_idx\` ON \`_footer_v_version_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_legal_links_parent_id_idx\` ON \`_footer_v_version_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_legal_links_link_link_page_idx\` ON \`_footer_v_version_legal_links\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_logo_id\` integer,
  	\`version_blurb\` text,
  	\`version_copyright\` text DEFAULT '© {year} Wavecare Marketing · Miami, FL',
  	\`version_bottom_note\` text,
  	\`version_logo_height\` numeric DEFAULT 140,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_version_logo_idx\` ON \`_footer_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_created_at_idx\` ON \`_footer_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_updated_at_idx\` ON \`_footer_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`theme\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`teal_deep\` text DEFAULT '#0A4339',
  	\`teal_primary\` text DEFAULT '#0E5A50',
  	\`teal_secondary\` text DEFAULT '#1B7A6E',
  	\`teal_accent\` text DEFAULT '#2A9D8F',
  	\`teal_bright\` text DEFAULT '#5FD0BF',
  	\`teal_light\` text DEFAULT '#E8F5F3',
  	\`ink\` text DEFAULT '#062A24',
  	\`navy\` text DEFAULT '#1A2332',
  	\`white\` text DEFAULT '#FFFFFF',
  	\`on_dark\` text DEFAULT 'rgba(255,255,255,0.82)',
  	\`muted\` text DEFAULT 'rgba(255,255,255,0.5)',
  	\`label_color\` text DEFAULT 'rgba(255,255,255,0.62)',
  	\`soft\` text DEFAULT 'rgba(255,255,255,0.10)',
  	\`border_teal\` text DEFAULT 'rgba(42,157,143,0.4)',
  	\`font_display\` text DEFAULT '''DM Serif Display'',Georgia,serif',
  	\`font_body\` text DEFAULT '''DM Sans'',system-ui,sans-serif',
  	\`google_fonts_href\` text DEFAULT 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap',
  	\`section_padding\` text DEFAULT 'clamp(80px,9vw,140px)',
  	\`container_width\` text DEFAULT '1320px',
  	\`enable_animations\` integer DEFAULT true,
  	\`enable_smooth_scroll\` integer DEFAULT true,
  	\`enable_custom_cursor\` integer DEFAULT true,
  	\`enable_grain\` integer DEFAULT true,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_theme_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_teal_deep\` text DEFAULT '#0A4339',
  	\`version_teal_primary\` text DEFAULT '#0E5A50',
  	\`version_teal_secondary\` text DEFAULT '#1B7A6E',
  	\`version_teal_accent\` text DEFAULT '#2A9D8F',
  	\`version_teal_bright\` text DEFAULT '#5FD0BF',
  	\`version_teal_light\` text DEFAULT '#E8F5F3',
  	\`version_ink\` text DEFAULT '#062A24',
  	\`version_navy\` text DEFAULT '#1A2332',
  	\`version_white\` text DEFAULT '#FFFFFF',
  	\`version_on_dark\` text DEFAULT 'rgba(255,255,255,0.82)',
  	\`version_muted\` text DEFAULT 'rgba(255,255,255,0.5)',
  	\`version_label_color\` text DEFAULT 'rgba(255,255,255,0.62)',
  	\`version_soft\` text DEFAULT 'rgba(255,255,255,0.10)',
  	\`version_border_teal\` text DEFAULT 'rgba(42,157,143,0.4)',
  	\`version_font_display\` text DEFAULT '''DM Serif Display'',Georgia,serif',
  	\`version_font_body\` text DEFAULT '''DM Sans'',system-ui,sans-serif',
  	\`version_google_fonts_href\` text DEFAULT 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap',
  	\`version_section_padding\` text DEFAULT 'clamp(80px,9vw,140px)',
  	\`version_container_width\` text DEFAULT '1320px',
  	\`version_enable_animations\` integer DEFAULT true,
  	\`version_enable_smooth_scroll\` integer DEFAULT true,
  	\`version_enable_custom_cursor\` integer DEFAULT true,
  	\`version_enable_grain\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_theme_v_created_at_idx\` ON \`_theme_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_updated_at_idx\` ON \`_theme_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_knows_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`term\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_knows_about_order_idx\` ON \`site_settings_knows_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_knows_about_parent_id_idx\` ON \`site_settings_knows_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text DEFAULT 'Wavecare Marketing' NOT NULL,
  	\`tagline\` text DEFAULT 'Built for healthcare. Built for trust.',
  	\`description\` text DEFAULT 'Wavecare Marketing is a healthcare-focused marketing agency specializing in branding, photography, video production, design, print, and conversion-first web design for senior care facilities and medical practices.',
  	\`email\` text DEFAULT 'info@wavecare.io',
  	\`phone\` text,
  	\`address_street\` text,
  	\`address_city\` text,
  	\`address_state\` text,
  	\`address_zip\` text,
  	\`default_title\` text DEFAULT 'Marketing for Senior Living & Skilled Nursing | Wavecare',
  	\`title_template\` text DEFAULT '%s | Wavecare',
  	\`default_description\` text DEFAULT 'Websites, photography, video tours, and branding for senior living, assisted living, and skilled nursing providers nationwide. Book a free audit.',
  	\`default_og_image_id\` integer,
  	\`site_url\` text DEFAULT 'https://wavecare.io',
  	\`tracking_ga4_id\` text,
  	\`tracking_google_ads_id\` text,
  	\`tracking_meta_pixel_id\` text,
  	\`tracking_posthog_key\` text,
  	\`cookie_banner_enabled\` integer DEFAULT true,
  	\`cookie_banner_text\` text,
  	\`cookie_banner_accept_label\` text DEFAULT 'Accept',
  	\`cookie_banner_decline_label\` text DEFAULT 'Decline',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_default_og_image_idx\` ON \`site_settings\` (\`default_og_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_knows_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`term\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_knows_about_order_idx\` ON \`_site_settings_v_version_knows_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_knows_about_parent_id_idx\` ON \`_site_settings_v_version_knows_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_site_name\` text DEFAULT 'Wavecare Marketing' NOT NULL,
  	\`version_tagline\` text DEFAULT 'Built for healthcare. Built for trust.',
  	\`version_description\` text DEFAULT 'Wavecare Marketing is a healthcare-focused marketing agency specializing in branding, photography, video production, design, print, and conversion-first web design for senior care facilities and medical practices.',
  	\`version_email\` text DEFAULT 'info@wavecare.io',
  	\`version_phone\` text,
  	\`version_address_street\` text,
  	\`version_address_city\` text,
  	\`version_address_state\` text,
  	\`version_address_zip\` text,
  	\`version_default_title\` text DEFAULT 'Marketing for Senior Living & Skilled Nursing | Wavecare',
  	\`version_title_template\` text DEFAULT '%s | Wavecare',
  	\`version_default_description\` text DEFAULT 'Websites, photography, video tours, and branding for senior living, assisted living, and skilled nursing providers nationwide. Book a free audit.',
  	\`version_default_og_image_id\` integer,
  	\`version_site_url\` text DEFAULT 'https://wavecare.io',
  	\`version_tracking_ga4_id\` text,
  	\`version_tracking_google_ads_id\` text,
  	\`version_tracking_meta_pixel_id\` text,
  	\`version_tracking_posthog_key\` text,
  	\`version_cookie_banner_enabled\` integer DEFAULT true,
  	\`version_cookie_banner_text\` text,
  	\`version_cookie_banner_accept_label\` text DEFAULT 'Accept',
  	\`version_cookie_banner_decline_label\` text DEFAULT 'Decline',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_default_og_image_idx\` ON \`_site_settings_v\` (\`version_default_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_notice_bar\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_media_bullets\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_media_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_media\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_tabs_showcase_tabs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_tabs_showcase_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_tabs_showcase\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_before_after\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_grid_videos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_marquee_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_marquee_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_marquee\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_case_study_cards_cards_tags\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_case_study_cards_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_case_study_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_case_study_grid_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_case_study_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonial_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_legal_document_sections\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_legal_document\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_form_sidebar_details\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_final_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_landing_hero_trust_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_landing_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_feature\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_bar_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_bar\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pill_band_pills\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pill_band\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_audit_cta_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_audit_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonial_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_divider_label\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_inline_cta\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_texts\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_notice_bar\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_media_bullets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_media_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_media\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_process_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_tabs_showcase_tabs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_tabs_showcase_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_tabs_showcase\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_before_after\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_grid_videos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_marquee_logos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_marquee_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_marquee\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_case_study_cards_cards_tags\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_case_study_cards_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_case_study_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_case_study_grid_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_case_study_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonial_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_accordion\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_legal_document_sections\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_legal_document\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_form_sidebar_details\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_final_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_landing_hero_trust_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_landing_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_feature\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_bar_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_bar\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_pill_band_pills\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_pill_band\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_audit_cta_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_audit_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonial_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_divider_label\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_inline_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_services\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_notice_bar\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_media_bullets\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_media_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_media\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_process_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_tabs_showcase_tabs\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_tabs_showcase_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_tabs_showcase\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_gallery_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_before_after\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_grid_videos\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_logo_marquee_logos\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_logo_marquee_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_logo_marquee\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_study_cards_cards_tags\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_study_cards_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_study_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_study_grid_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_study_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_testimonial_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_accordion\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_legal_document_sections\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_legal_document\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_contact_form_sidebar_details\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_final_cta\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_landing_hero_trust_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_landing_hero\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_feature\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats_bar_stats\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats_bar\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_pill_band_pills\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_pill_band\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_audit_cta_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_audit_cta\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_testimonials\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_testimonial_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_divider_label\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_inline_cta\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`case_studies_texts\`;`)
  await db.run(sql`DROP TABLE \`case_studies_rels\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_version_services\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_notice_bar\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_media_bullets\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_media_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_media\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_stats_stats\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_process_steps\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_process_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_process\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_tabs_showcase_tabs\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_tabs_showcase_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_tabs_showcase\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_gallery_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_before_after\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_grid_videos\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_logo_marquee_logos\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_logo_marquee_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_logo_marquee\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_case_study_cards_cards_tags\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_case_study_cards_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_case_study_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_case_study_grid_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_case_study_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_testimonial_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_accordion\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_legal_document_sections\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_legal_document\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_contact_form_sidebar_details\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_final_cta\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_landing_hero_trust_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_landing_hero\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_feature\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_stats_bar_stats\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_stats_bar\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_pill_band_pills\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_pill_band\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_audit_cta_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_audit_cta\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_testimonial_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_divider_label\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_inline_cta\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_rels\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`_testimonials_v\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`navigation_items_children\`;`)
  await db.run(sql`DROP TABLE \`navigation_items\`;`)
  await db.run(sql`DROP TABLE \`navigation\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_version_items_children\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_social\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_social\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_legal_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v\`;`)
  await db.run(sql`DROP TABLE \`theme\`;`)
  await db.run(sql`DROP TABLE \`_theme_v\`;`)
  await db.run(sql`DROP TABLE \`site_settings_knows_about\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_knows_about\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
}
