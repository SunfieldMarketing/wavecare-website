import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_video_grid_filters\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_video_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_filters_order_idx\` ON \`pages_blocks_video_grid_filters\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_grid_filters_parent_id_idx\` ON \`pages_blocks_video_grid_filters\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_featured_video_work_side\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`vimeo_id\` text,
  	\`poster_url\` text,
  	\`tag\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_featured_video_work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_video_work_side_order_idx\` ON \`pages_blocks_featured_video_work_side\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_video_work_side_parent_id_idx\` ON \`pages_blocks_featured_video_work_side\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_featured_video_work\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`hero_vimeo_id\` text,
  	\`hero_poster_url\` text,
  	\`hero_tag\` text,
  	\`hero_title\` text,
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
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_video_work_order_idx\` ON \`pages_blocks_featured_video_work\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_video_work_parent_id_idx\` ON \`pages_blocks_featured_video_work\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_video_work_path_idx\` ON \`pages_blocks_featured_video_work\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_featured_video_work_appearance_appearance_b_idx\` ON \`pages_blocks_featured_video_work\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_commercial_player\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_commercial_player_order_idx\` ON \`pages_blocks_commercial_player\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_commercial_player_parent_id_idx\` ON \`pages_blocks_commercial_player\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_commercial_player_path_idx\` ON \`pages_blocks_commercial_player\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_two_column_text_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_two_column_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_two_column_text_body_order_idx\` ON \`pages_blocks_two_column_text_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_two_column_text_body_parent_id_idx\` ON \`pages_blocks_two_column_text_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_two_column_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_two_column_text_order_idx\` ON \`pages_blocks_two_column_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_two_column_text_parent_id_idx\` ON \`pages_blocks_two_column_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_two_column_text_path_idx\` ON \`pages_blocks_two_column_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_icon_feature_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_icon_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_feature_grid_cards_order_idx\` ON \`pages_blocks_icon_feature_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_feature_grid_cards_parent_id_idx\` ON \`pages_blocks_icon_feature_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_icon_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_feature_grid_order_idx\` ON \`pages_blocks_icon_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_feature_grid_parent_id_idx\` ON \`pages_blocks_icon_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_feature_grid_path_idx\` ON \`pages_blocks_icon_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_grid_filters\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`key\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_video_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_filters_order_idx\` ON \`_pages_v_blocks_video_grid_filters\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_grid_filters_parent_id_idx\` ON \`_pages_v_blocks_video_grid_filters\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_featured_video_work_side\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`vimeo_id\` text,
  	\`poster_url\` text,
  	\`tag\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_featured_video_work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_video_work_side_order_idx\` ON \`_pages_v_blocks_featured_video_work_side\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_video_work_side_parent_id_idx\` ON \`_pages_v_blocks_featured_video_work_side\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_featured_video_work\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`hero_vimeo_id\` text,
  	\`hero_poster_url\` text,
  	\`hero_tag\` text,
  	\`hero_title\` text,
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_video_work_order_idx\` ON \`_pages_v_blocks_featured_video_work\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_video_work_parent_id_idx\` ON \`_pages_v_blocks_featured_video_work\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_video_work_path_idx\` ON \`_pages_v_blocks_featured_video_work\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_featured_video_work_appearance_appearanc_idx\` ON \`_pages_v_blocks_featured_video_work\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_commercial_player\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_commercial_player_order_idx\` ON \`_pages_v_blocks_commercial_player\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_commercial_player_parent_id_idx\` ON \`_pages_v_blocks_commercial_player\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_commercial_player_path_idx\` ON \`_pages_v_blocks_commercial_player\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_two_column_text_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_two_column_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_two_column_text_body_order_idx\` ON \`_pages_v_blocks_two_column_text_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_two_column_text_body_parent_id_idx\` ON \`_pages_v_blocks_two_column_text_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_two_column_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_two_column_text_order_idx\` ON \`_pages_v_blocks_two_column_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_two_column_text_parent_id_idx\` ON \`_pages_v_blocks_two_column_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_two_column_text_path_idx\` ON \`_pages_v_blocks_two_column_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_icon_feature_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_icon_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_feature_grid_cards_order_idx\` ON \`_pages_v_blocks_icon_feature_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_feature_grid_cards_parent_id_idx\` ON \`_pages_v_blocks_icon_feature_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_icon_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_feature_grid_order_idx\` ON \`_pages_v_blocks_icon_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_feature_grid_parent_id_idx\` ON \`_pages_v_blocks_icon_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_feature_grid_path_idx\` ON \`_pages_v_blocks_icon_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_video_grid_filters\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_video_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_filters_order_idx\` ON \`case_studies_blocks_video_grid_filters\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_grid_filters_parent_id_idx\` ON \`case_studies_blocks_video_grid_filters\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_featured_video_work_side\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`vimeo_id\` text,
  	\`poster_url\` text,
  	\`tag\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_featured_video_work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_featured_video_work_side_order_idx\` ON \`case_studies_blocks_featured_video_work_side\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_featured_video_work_side_parent_id_idx\` ON \`case_studies_blocks_featured_video_work_side\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_featured_video_work\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`hero_vimeo_id\` text,
  	\`hero_poster_url\` text,
  	\`hero_tag\` text,
  	\`hero_title\` text,
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_featured_video_work_order_idx\` ON \`case_studies_blocks_featured_video_work\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_featured_video_work_parent_id_idx\` ON \`case_studies_blocks_featured_video_work\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_featured_video_work_path_idx\` ON \`case_studies_blocks_featured_video_work\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_featured_video_work_appearance_appea_idx\` ON \`case_studies_blocks_featured_video_work\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_commercial_player\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_commercial_player_order_idx\` ON \`case_studies_blocks_commercial_player\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_commercial_player_parent_id_idx\` ON \`case_studies_blocks_commercial_player\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_commercial_player_path_idx\` ON \`case_studies_blocks_commercial_player\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_two_column_text_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_two_column_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_two_column_text_body_order_idx\` ON \`case_studies_blocks_two_column_text_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_two_column_text_body_parent_id_idx\` ON \`case_studies_blocks_two_column_text_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_two_column_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_two_column_text_order_idx\` ON \`case_studies_blocks_two_column_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_two_column_text_parent_id_idx\` ON \`case_studies_blocks_two_column_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_two_column_text_path_idx\` ON \`case_studies_blocks_two_column_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_icon_feature_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_icon_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_feature_grid_cards_order_idx\` ON \`case_studies_blocks_icon_feature_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_feature_grid_cards_parent_id_idx\` ON \`case_studies_blocks_icon_feature_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_icon_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_feature_grid_order_idx\` ON \`case_studies_blocks_icon_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_feature_grid_parent_id_idx\` ON \`case_studies_blocks_icon_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_feature_grid_path_idx\` ON \`case_studies_blocks_icon_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_video_grid_filters\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`key\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_video_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_filters_order_idx\` ON \`_case_studies_v_blocks_video_grid_filters\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_grid_filters_parent_id_idx\` ON \`_case_studies_v_blocks_video_grid_filters\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_featured_video_work_side\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`vimeo_id\` text,
  	\`poster_url\` text,
  	\`tag\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_featured_video_work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_featured_video_work_side_order_idx\` ON \`_case_studies_v_blocks_featured_video_work_side\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_featured_video_work_side_parent_id_idx\` ON \`_case_studies_v_blocks_featured_video_work_side\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_featured_video_work\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`hero_vimeo_id\` text,
  	\`hero_poster_url\` text,
  	\`hero_tag\` text,
  	\`hero_title\` text,
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_featured_video_work_order_idx\` ON \`_case_studies_v_blocks_featured_video_work\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_featured_video_work_parent_id_idx\` ON \`_case_studies_v_blocks_featured_video_work\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_featured_video_work_path_idx\` ON \`_case_studies_v_blocks_featured_video_work\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_featured_video_work_appearance_ap_idx\` ON \`_case_studies_v_blocks_featured_video_work\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_commercial_player\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_commercial_player_order_idx\` ON \`_case_studies_v_blocks_commercial_player\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_commercial_player_parent_id_idx\` ON \`_case_studies_v_blocks_commercial_player\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_commercial_player_path_idx\` ON \`_case_studies_v_blocks_commercial_player\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_two_column_text_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_two_column_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_two_column_text_body_order_idx\` ON \`_case_studies_v_blocks_two_column_text_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_two_column_text_body_parent_id_idx\` ON \`_case_studies_v_blocks_two_column_text_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_two_column_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_two_column_text_order_idx\` ON \`_case_studies_v_blocks_two_column_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_two_column_text_parent_id_idx\` ON \`_case_studies_v_blocks_two_column_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_two_column_text_path_idx\` ON \`_case_studies_v_blocks_two_column_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_icon_feature_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_icon_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_feature_grid_cards_order_idx\` ON \`_case_studies_v_blocks_icon_feature_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_feature_grid_cards_parent_id_idx\` ON \`_case_studies_v_blocks_icon_feature_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_icon_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_feature_grid_order_idx\` ON \`_case_studies_v_blocks_icon_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_feature_grid_parent_id_idx\` ON \`_case_studies_v_blocks_icon_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_feature_grid_path_idx\` ON \`_case_studies_v_blocks_icon_feature_grid\` (\`_path\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid_videos\` ADD \`filter_key\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid_videos\` ADD \`filter_key\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid_videos\` ADD \`filter_key\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid_videos\` ADD \`filter_key\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_video_grid_filters\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_featured_video_work_side\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_featured_video_work\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_commercial_player\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_two_column_text_body\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_two_column_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_icon_feature_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_icon_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_grid_filters\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_featured_video_work_side\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_featured_video_work\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_commercial_player\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_two_column_text_body\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_two_column_text\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_icon_feature_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_icon_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_grid_filters\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_featured_video_work_side\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_featured_video_work\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_commercial_player\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_two_column_text_body\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_two_column_text\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_icon_feature_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_icon_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_grid_filters\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_featured_video_work_side\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_featured_video_work\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_commercial_player\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_two_column_text_body\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_two_column_text\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_icon_feature_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_icon_feature_grid\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid_videos\` DROP COLUMN \`filter_key\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid_videos\` DROP COLUMN \`filter_key\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid_videos\` DROP COLUMN \`filter_key\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid_videos\` DROP COLUMN \`filter_key\`;`)
}
