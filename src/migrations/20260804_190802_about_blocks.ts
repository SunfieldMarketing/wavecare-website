import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_story_block_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_story_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_paragraphs_order_idx\` ON \`pages_blocks_story_block_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_paragraphs_parent_id_idx\` ON \`pages_blocks_story_block_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_story_block\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_order_idx\` ON \`pages_blocks_story_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_parent_id_idx\` ON \`pages_blocks_story_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_path_idx\` ON \`pages_blocks_story_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_button_link_button_link_page_idx\` ON \`pages_blocks_story_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_story_block_image_idx\` ON \`pages_blocks_story_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_insight_quote\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_insight_quote_order_idx\` ON \`pages_blocks_insight_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_insight_quote_parent_id_idx\` ON \`pages_blocks_insight_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_insight_quote_path_idx\` ON \`pages_blocks_insight_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_values_grid_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_values_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_values_order_idx\` ON \`pages_blocks_values_grid_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_values_parent_id_idx\` ON \`pages_blocks_values_grid_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_values_grid\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_order_idx\` ON \`pages_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_parent_id_idx\` ON \`pages_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_path_idx\` ON \`pages_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_accordion_showcase_panels_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_accordion_showcase_panels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_panels_detail_order_idx\` ON \`pages_blocks_accordion_showcase_panels_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_panels_detail_parent_id_idx\` ON \`pages_blocks_accordion_showcase_panels_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_accordion_showcase_panels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`tag\` text,
  	\`link_link_label\` text,
  	\`link_link_type\` text DEFAULT 'internal',
  	\`link_link_page_id\` integer,
  	\`link_link_url\` text,
  	\`link_link_anchor\` text,
  	\`link_link_style\` text DEFAULT 'primary',
  	\`link_link_new_tab\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_accordion_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_panels_order_idx\` ON \`pages_blocks_accordion_showcase_panels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_panels_parent_id_idx\` ON \`pages_blocks_accordion_showcase_panels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_panels_image_idx\` ON \`pages_blocks_accordion_showcase_panels\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_panels_link_link_link_li_idx\` ON \`pages_blocks_accordion_showcase_panels\` (\`link_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_accordion_showcase\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_order_idx\` ON \`pages_blocks_accordion_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_parent_id_idx\` ON \`pages_blocks_accordion_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_accordion_showcase_path_idx\` ON \`pages_blocks_accordion_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_reel\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_video_reel_order_idx\` ON \`pages_blocks_video_reel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_reel_parent_id_idx\` ON \`pages_blocks_video_reel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_reel_path_idx\` ON \`pages_blocks_video_reel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_simple_quote_grid_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`role\` text,
  	\`organisation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_simple_quote_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_quotes_order_idx\` ON \`pages_blocks_simple_quote_grid_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_quotes_parent_id_idx\` ON \`pages_blocks_simple_quote_grid_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_simple_quote_grid\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_order_idx\` ON \`pages_blocks_simple_quote_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_parent_id_idx\` ON \`pages_blocks_simple_quote_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_quote_grid_path_idx\` ON \`pages_blocks_simple_quote_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_story_block_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_story_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_paragraphs_order_idx\` ON \`_pages_v_blocks_story_block_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_paragraphs_parent_id_idx\` ON \`_pages_v_blocks_story_block_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_story_block\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_order_idx\` ON \`_pages_v_blocks_story_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_parent_id_idx\` ON \`_pages_v_blocks_story_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_path_idx\` ON \`_pages_v_blocks_story_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_button_link_button_link_page_idx\` ON \`_pages_v_blocks_story_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_story_block_image_idx\` ON \`_pages_v_blocks_story_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_insight_quote\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insight_quote_order_idx\` ON \`_pages_v_blocks_insight_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insight_quote_parent_id_idx\` ON \`_pages_v_blocks_insight_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_insight_quote_path_idx\` ON \`_pages_v_blocks_insight_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_values_grid_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_values_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_values_order_idx\` ON \`_pages_v_blocks_values_grid_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_values_parent_id_idx\` ON \`_pages_v_blocks_values_grid_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_values_grid\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_order_idx\` ON \`_pages_v_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_parent_id_idx\` ON \`_pages_v_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_path_idx\` ON \`_pages_v_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_accordion_showcase_panels_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_accordion_showcase_panels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_panels_detail_order_idx\` ON \`_pages_v_blocks_accordion_showcase_panels_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_panels_detail_parent_id_idx\` ON \`_pages_v_blocks_accordion_showcase_panels_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_accordion_showcase_panels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`tag\` text,
  	\`link_link_label\` text,
  	\`link_link_type\` text DEFAULT 'internal',
  	\`link_link_page_id\` integer,
  	\`link_link_url\` text,
  	\`link_link_anchor\` text,
  	\`link_link_style\` text DEFAULT 'primary',
  	\`link_link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_accordion_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_panels_order_idx\` ON \`_pages_v_blocks_accordion_showcase_panels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_panels_parent_id_idx\` ON \`_pages_v_blocks_accordion_showcase_panels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_panels_image_idx\` ON \`_pages_v_blocks_accordion_showcase_panels\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_panels_link_link_link_idx\` ON \`_pages_v_blocks_accordion_showcase_panels\` (\`link_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_accordion_showcase\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_order_idx\` ON \`_pages_v_blocks_accordion_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_parent_id_idx\` ON \`_pages_v_blocks_accordion_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_accordion_showcase_path_idx\` ON \`_pages_v_blocks_accordion_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_reel\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_reel_order_idx\` ON \`_pages_v_blocks_video_reel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_reel_parent_id_idx\` ON \`_pages_v_blocks_video_reel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_reel_path_idx\` ON \`_pages_v_blocks_video_reel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_simple_quote_grid_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`role\` text,
  	\`organisation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_simple_quote_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_quotes_order_idx\` ON \`_pages_v_blocks_simple_quote_grid_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_quotes_parent_id_idx\` ON \`_pages_v_blocks_simple_quote_grid_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_simple_quote_grid\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_order_idx\` ON \`_pages_v_blocks_simple_quote_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_parent_id_idx\` ON \`_pages_v_blocks_simple_quote_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_quote_grid_path_idx\` ON \`_pages_v_blocks_simple_quote_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_story_block_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_story_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_paragraphs_order_idx\` ON \`case_studies_blocks_story_block_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_paragraphs_parent_id_idx\` ON \`case_studies_blocks_story_block_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_story_block\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_order_idx\` ON \`case_studies_blocks_story_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_parent_id_idx\` ON \`case_studies_blocks_story_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_path_idx\` ON \`case_studies_blocks_story_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_button_link_button_link__idx\` ON \`case_studies_blocks_story_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_story_block_image_idx\` ON \`case_studies_blocks_story_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_insight_quote\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_insight_quote_order_idx\` ON \`case_studies_blocks_insight_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_insight_quote_parent_id_idx\` ON \`case_studies_blocks_insight_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_insight_quote_path_idx\` ON \`case_studies_blocks_insight_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_values_grid_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_values_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_values_order_idx\` ON \`case_studies_blocks_values_grid_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_values_parent_id_idx\` ON \`case_studies_blocks_values_grid_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_values_grid\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_order_idx\` ON \`case_studies_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_parent_id_idx\` ON \`case_studies_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_values_grid_path_idx\` ON \`case_studies_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_accordion_showcase_panels_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_accordion_showcase_panels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_panels_detail_order_idx\` ON \`case_studies_blocks_accordion_showcase_panels_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_panels_detail_parent_id_idx\` ON \`case_studies_blocks_accordion_showcase_panels_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_accordion_showcase_panels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`tag\` text,
  	\`link_link_label\` text,
  	\`link_link_type\` text DEFAULT 'internal',
  	\`link_link_page_id\` integer,
  	\`link_link_url\` text,
  	\`link_link_anchor\` text,
  	\`link_link_style\` text DEFAULT 'primary',
  	\`link_link_new_tab\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_accordion_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_panels_order_idx\` ON \`case_studies_blocks_accordion_showcase_panels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_panels_parent_id_idx\` ON \`case_studies_blocks_accordion_showcase_panels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_panels_image_idx\` ON \`case_studies_blocks_accordion_showcase_panels\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_panels_link_link__idx\` ON \`case_studies_blocks_accordion_showcase_panels\` (\`link_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_accordion_showcase\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_order_idx\` ON \`case_studies_blocks_accordion_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_parent_id_idx\` ON \`case_studies_blocks_accordion_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_accordion_showcase_path_idx\` ON \`case_studies_blocks_accordion_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_video_reel\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_reel_order_idx\` ON \`case_studies_blocks_video_reel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_reel_parent_id_idx\` ON \`case_studies_blocks_video_reel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_video_reel_path_idx\` ON \`case_studies_blocks_video_reel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_simple_quote_grid_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`role\` text,
  	\`organisation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_simple_quote_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_quotes_order_idx\` ON \`case_studies_blocks_simple_quote_grid_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_quotes_parent_id_idx\` ON \`case_studies_blocks_simple_quote_grid_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_simple_quote_grid\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_order_idx\` ON \`case_studies_blocks_simple_quote_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_parent_id_idx\` ON \`case_studies_blocks_simple_quote_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_quote_grid_path_idx\` ON \`case_studies_blocks_simple_quote_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_story_block_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_story_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_paragraphs_order_idx\` ON \`_case_studies_v_blocks_story_block_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_paragraphs_parent_id_idx\` ON \`_case_studies_v_blocks_story_block_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_story_block\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_order_idx\` ON \`_case_studies_v_blocks_story_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_parent_id_idx\` ON \`_case_studies_v_blocks_story_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_path_idx\` ON \`_case_studies_v_blocks_story_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_button_link_button_li_idx\` ON \`_case_studies_v_blocks_story_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_story_block_image_idx\` ON \`_case_studies_v_blocks_story_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_insight_quote\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_insight_quote_order_idx\` ON \`_case_studies_v_blocks_insight_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_insight_quote_parent_id_idx\` ON \`_case_studies_v_blocks_insight_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_insight_quote_path_idx\` ON \`_case_studies_v_blocks_insight_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_values_grid_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_values_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_values_order_idx\` ON \`_case_studies_v_blocks_values_grid_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_values_parent_id_idx\` ON \`_case_studies_v_blocks_values_grid_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_values_grid\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_order_idx\` ON \`_case_studies_v_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_parent_id_idx\` ON \`_case_studies_v_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_values_grid_path_idx\` ON \`_case_studies_v_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_accordion_showcase_panels_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_accordion_showcase_panels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_panels_detail_order_idx\` ON \`_case_studies_v_blocks_accordion_showcase_panels_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_panels_detail_parent_id_idx\` ON \`_case_studies_v_blocks_accordion_showcase_panels_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_accordion_showcase_panels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`title\` text,
  	\`tag\` text,
  	\`link_link_label\` text,
  	\`link_link_type\` text DEFAULT 'internal',
  	\`link_link_page_id\` integer,
  	\`link_link_url\` text,
  	\`link_link_anchor\` text,
  	\`link_link_style\` text DEFAULT 'primary',
  	\`link_link_new_tab\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`link_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_accordion_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_panels_order_idx\` ON \`_case_studies_v_blocks_accordion_showcase_panels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_panels_parent_id_idx\` ON \`_case_studies_v_blocks_accordion_showcase_panels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_panels_image_idx\` ON \`_case_studies_v_blocks_accordion_showcase_panels\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_panels_link_li_idx\` ON \`_case_studies_v_blocks_accordion_showcase_panels\` (\`link_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_accordion_showcase\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_order_idx\` ON \`_case_studies_v_blocks_accordion_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_parent_id_idx\` ON \`_case_studies_v_blocks_accordion_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_accordion_showcase_path_idx\` ON \`_case_studies_v_blocks_accordion_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_video_reel\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_reel_order_idx\` ON \`_case_studies_v_blocks_video_reel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_reel_parent_id_idx\` ON \`_case_studies_v_blocks_video_reel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_video_reel_path_idx\` ON \`_case_studies_v_blocks_video_reel\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_simple_quote_grid_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`role\` text,
  	\`organisation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_simple_quote_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_quotes_order_idx\` ON \`_case_studies_v_blocks_simple_quote_grid_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_quotes_parent_id_idx\` ON \`_case_studies_v_blocks_simple_quote_grid_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_simple_quote_grid\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_order_idx\` ON \`_case_studies_v_blocks_simple_quote_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_parent_id_idx\` ON \`_case_studies_v_blocks_simple_quote_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_quote_grid_path_idx\` ON \`_case_studies_v_blocks_simple_quote_grid\` (\`_path\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`scroll_cue\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`scroll_cue\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` ADD \`scroll_cue\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` ADD \`scroll_cue\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` ADD \`appearance_glow_enabled\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` ADD \`appearance_glow_color\` text DEFAULT 'primary';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` ADD \`appearance_glow_size\` numeric DEFAULT 520;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` ADD \`appearance_glow_opacity\` numeric DEFAULT 100;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` ADD \`appearance_glow_position\` text DEFAULT 'top-left';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_story_block_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_story_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_insight_quote\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_values_grid_values\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion_showcase_panels_detail\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion_showcase_panels\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_accordion_showcase\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_reel\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_simple_quote_grid_quotes\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_simple_quote_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_story_block_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_story_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_insight_quote\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_values_grid_values\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_accordion_showcase_panels_detail\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_accordion_showcase_panels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_accordion_showcase\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_reel\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_simple_quote_grid_quotes\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_simple_quote_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_story_block_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_story_block\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_insight_quote\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_values_grid_values\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_accordion_showcase_panels_detail\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_accordion_showcase_panels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_accordion_showcase\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_reel\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_simple_quote_grid_quotes\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_simple_quote_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_story_block_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_story_block\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_insight_quote\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_values_grid_values\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_accordion_showcase_panels_detail\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_accordion_showcase_panels\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_accordion_showcase\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_reel\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_simple_quote_grid_quotes\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_simple_quote_grid\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`scroll_cue\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_notice_bar\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_media\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_card_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_before_after\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_embed\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_accordion\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_legal_document\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_contact_form\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_final_cta\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_steps\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`scroll_cue\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_media\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_before_after\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_accordion\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_steps\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` DROP COLUMN \`scroll_cue\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_hero\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_notice_bar\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_media\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_card_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_before_after\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_embed\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_video_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_accordion\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_rich_text\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_legal_document\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_contact_form\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_final_cta\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_steps\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` DROP COLUMN \`scroll_cue\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_hero\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_notice_bar\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_media\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_card_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_tabs_showcase\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_before_after\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_embed\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_video_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_featured_video_work\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_marquee\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_cards\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_case_study_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_testimonial_grid\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_accordion\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_rich_text\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_legal_document\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_contact_form\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_final_cta\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_steps\` DROP COLUMN \`appearance_glow_position\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_color\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_size\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_opacity\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_calendar_embed\` DROP COLUMN \`appearance_glow_position\`;`)
}
