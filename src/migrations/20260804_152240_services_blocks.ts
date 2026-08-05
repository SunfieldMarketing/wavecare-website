import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_services_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_cards_order_idx\` ON \`pages_blocks_services_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_cards_parent_id_idx\` ON \`pages_blocks_services_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`anchor_id\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_order_idx\` ON \`pages_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_parent_id_idx\` ON \`pages_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_services_grid_path_idx\` ON \`pages_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_split_row_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_split_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_bullets_order_idx\` ON \`pages_blocks_split_row_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_bullets_parent_id_idx\` ON \`pages_blocks_split_row_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_split_row_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_split_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_buttons_order_idx\` ON \`pages_blocks_split_row_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_buttons_parent_id_idx\` ON \`pages_blocks_split_row_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_buttons_link_link_page_idx\` ON \`pages_blocks_split_row_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_split_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`wrap_section\` integer DEFAULT false,
  	\`flipped\` integer,
  	\`text_tone\` text DEFAULT 'on-dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`media_type\` text DEFAULT 'video',
  	\`video_url\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_order_idx\` ON \`pages_blocks_split_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_parent_id_idx\` ON \`pages_blocks_split_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_path_idx\` ON \`pages_blocks_split_row\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_image_idx\` ON \`pages_blocks_split_row\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_row_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_row_cards_order_idx\` ON \`pages_blocks_feature_row_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_row_cards_parent_id_idx\` ON \`pages_blocks_feature_row_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_row\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_row_order_idx\` ON \`pages_blocks_feature_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_row_parent_id_idx\` ON \`pages_blocks_feature_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_row_path_idx\` ON \`pages_blocks_feature_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_row_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_row_stats_order_idx\` ON \`pages_blocks_stats_row_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_row_stats_parent_id_idx\` ON \`pages_blocks_stats_row_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_row_order_idx\` ON \`pages_blocks_stats_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_row_parent_id_idx\` ON \`pages_blocks_stats_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_row_path_idx\` ON \`pages_blocks_stats_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_logos_order_idx\` ON \`pages_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_logos_parent_id_idx\` ON \`pages_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_logos_image_idx\` ON \`pages_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logo_strip\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_order_idx\` ON \`pages_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_parent_id_idx\` ON \`pages_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_path_idx\` ON \`pages_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_testimonials_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_service_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_testimonials_quotes_order_idx\` ON \`pages_blocks_service_testimonials_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_testimonials_quotes_parent_id_idx\` ON \`pages_blocks_service_testimonials_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_testimonials\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_service_testimonials_order_idx\` ON \`pages_blocks_service_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_testimonials_parent_id_idx\` ON \`pages_blocks_service_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_testimonials_path_idx\` ON \`pages_blocks_service_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_final_cta_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_service_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_final_cta_buttons_order_idx\` ON \`pages_blocks_service_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_final_cta_buttons_parent_id_idx\` ON \`pages_blocks_service_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_final_cta_buttons_link_link_page_idx\` ON \`pages_blocks_service_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_final_cta\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_service_final_cta_order_idx\` ON \`pages_blocks_service_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_final_cta_parent_id_idx\` ON \`pages_blocks_service_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_final_cta_path_idx\` ON \`pages_blocks_service_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_services_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_cards_order_idx\` ON \`_pages_v_blocks_services_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_cards_parent_id_idx\` ON \`_pages_v_blocks_services_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`anchor_id\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_order_idx\` ON \`_pages_v_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_parent_id_idx\` ON \`_pages_v_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_services_grid_path_idx\` ON \`_pages_v_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_split_row_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_split_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_bullets_order_idx\` ON \`_pages_v_blocks_split_row_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_bullets_parent_id_idx\` ON \`_pages_v_blocks_split_row_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_split_row_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_split_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_buttons_order_idx\` ON \`_pages_v_blocks_split_row_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_buttons_parent_id_idx\` ON \`_pages_v_blocks_split_row_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_buttons_link_link_page_idx\` ON \`_pages_v_blocks_split_row_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_split_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`wrap_section\` integer DEFAULT false,
  	\`flipped\` integer,
  	\`text_tone\` text DEFAULT 'on-dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`media_type\` text DEFAULT 'video',
  	\`video_url\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_order_idx\` ON \`_pages_v_blocks_split_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_parent_id_idx\` ON \`_pages_v_blocks_split_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_path_idx\` ON \`_pages_v_blocks_split_row\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_image_idx\` ON \`_pages_v_blocks_split_row\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_row_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_feature_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_row_cards_order_idx\` ON \`_pages_v_blocks_feature_row_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_row_cards_parent_id_idx\` ON \`_pages_v_blocks_feature_row_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_row\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_row_order_idx\` ON \`_pages_v_blocks_feature_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_row_parent_id_idx\` ON \`_pages_v_blocks_feature_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_row_path_idx\` ON \`_pages_v_blocks_feature_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_row_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_row_stats_order_idx\` ON \`_pages_v_blocks_stats_row_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_row_stats_parent_id_idx\` ON \`_pages_v_blocks_stats_row_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_row_order_idx\` ON \`_pages_v_blocks_stats_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_row_parent_id_idx\` ON \`_pages_v_blocks_stats_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_row_path_idx\` ON \`_pages_v_blocks_stats_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_logos_order_idx\` ON \`_pages_v_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_logos_parent_id_idx\` ON \`_pages_v_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_logos_image_idx\` ON \`_pages_v_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_logo_strip\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_order_idx\` ON \`_pages_v_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_parent_id_idx\` ON \`_pages_v_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_path_idx\` ON \`_pages_v_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_testimonials_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_service_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_testimonials_quotes_order_idx\` ON \`_pages_v_blocks_service_testimonials_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_testimonials_quotes_parent_id_idx\` ON \`_pages_v_blocks_service_testimonials_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_testimonials\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_testimonials_order_idx\` ON \`_pages_v_blocks_service_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_testimonials_parent_id_idx\` ON \`_pages_v_blocks_service_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_testimonials_path_idx\` ON \`_pages_v_blocks_service_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_final_cta_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_service_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_final_cta_buttons_order_idx\` ON \`_pages_v_blocks_service_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_final_cta_buttons_parent_id_idx\` ON \`_pages_v_blocks_service_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_final_cta_buttons_link_link_page_idx\` ON \`_pages_v_blocks_service_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_final_cta\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_final_cta_order_idx\` ON \`_pages_v_blocks_service_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_final_cta_parent_id_idx\` ON \`_pages_v_blocks_service_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_final_cta_path_idx\` ON \`_pages_v_blocks_service_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_services_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_services_grid_cards_order_idx\` ON \`case_studies_blocks_services_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_services_grid_cards_parent_id_idx\` ON \`case_studies_blocks_services_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`anchor_id\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_services_grid_order_idx\` ON \`case_studies_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_services_grid_parent_id_idx\` ON \`case_studies_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_services_grid_path_idx\` ON \`case_studies_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_split_row_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_split_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_bullets_order_idx\` ON \`case_studies_blocks_split_row_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_bullets_parent_id_idx\` ON \`case_studies_blocks_split_row_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_split_row_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_split_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_buttons_order_idx\` ON \`case_studies_blocks_split_row_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_buttons_parent_id_idx\` ON \`case_studies_blocks_split_row_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_buttons_link_link_page_idx\` ON \`case_studies_blocks_split_row_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_split_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`wrap_section\` integer DEFAULT false,
  	\`flipped\` integer,
  	\`text_tone\` text DEFAULT 'on-dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`media_type\` text DEFAULT 'video',
  	\`video_url\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_order_idx\` ON \`case_studies_blocks_split_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_parent_id_idx\` ON \`case_studies_blocks_split_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_path_idx\` ON \`case_studies_blocks_split_row\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_image_idx\` ON \`case_studies_blocks_split_row\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_feature_row_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_feature_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_feature_row_cards_order_idx\` ON \`case_studies_blocks_feature_row_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_feature_row_cards_parent_id_idx\` ON \`case_studies_blocks_feature_row_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_feature_row\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_feature_row_order_idx\` ON \`case_studies_blocks_feature_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_feature_row_parent_id_idx\` ON \`case_studies_blocks_feature_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_feature_row_path_idx\` ON \`case_studies_blocks_feature_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats_row_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_stats_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_row_stats_order_idx\` ON \`case_studies_blocks_stats_row_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_row_stats_parent_id_idx\` ON \`case_studies_blocks_stats_row_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_stats_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_row_order_idx\` ON \`case_studies_blocks_stats_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_row_parent_id_idx\` ON \`case_studies_blocks_stats_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_stats_row_path_idx\` ON \`case_studies_blocks_stats_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_strip_logos_order_idx\` ON \`case_studies_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_strip_logos_parent_id_idx\` ON \`case_studies_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_strip_logos_image_idx\` ON \`case_studies_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_logo_strip\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_strip_order_idx\` ON \`case_studies_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_strip_parent_id_idx\` ON \`case_studies_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_strip_path_idx\` ON \`case_studies_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_service_testimonials_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_service_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_testimonials_quotes_order_idx\` ON \`case_studies_blocks_service_testimonials_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_testimonials_quotes_parent_id_idx\` ON \`case_studies_blocks_service_testimonials_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_service_testimonials\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_testimonials_order_idx\` ON \`case_studies_blocks_service_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_testimonials_parent_id_idx\` ON \`case_studies_blocks_service_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_testimonials_path_idx\` ON \`case_studies_blocks_service_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_service_final_cta_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_service_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_final_cta_buttons_order_idx\` ON \`case_studies_blocks_service_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_final_cta_buttons_parent_id_idx\` ON \`case_studies_blocks_service_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_final_cta_buttons_link_link__idx\` ON \`case_studies_blocks_service_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_service_final_cta\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_final_cta_order_idx\` ON \`case_studies_blocks_service_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_final_cta_parent_id_idx\` ON \`case_studies_blocks_service_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_final_cta_path_idx\` ON \`case_studies_blocks_service_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_services_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_services_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_services_grid_cards_order_idx\` ON \`_case_studies_v_blocks_services_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_services_grid_cards_parent_id_idx\` ON \`_case_studies_v_blocks_services_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_services_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`anchor_id\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_services_grid_order_idx\` ON \`_case_studies_v_blocks_services_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_services_grid_parent_id_idx\` ON \`_case_studies_v_blocks_services_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_services_grid_path_idx\` ON \`_case_studies_v_blocks_services_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_split_row_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_split_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_bullets_order_idx\` ON \`_case_studies_v_blocks_split_row_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_bullets_parent_id_idx\` ON \`_case_studies_v_blocks_split_row_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_split_row_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_split_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_buttons_order_idx\` ON \`_case_studies_v_blocks_split_row_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_split_row_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_buttons_link_link_page_idx\` ON \`_case_studies_v_blocks_split_row_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_split_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`wrap_section\` integer DEFAULT false,
  	\`flipped\` integer,
  	\`text_tone\` text DEFAULT 'on-dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`media_type\` text DEFAULT 'video',
  	\`video_url\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_order_idx\` ON \`_case_studies_v_blocks_split_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_parent_id_idx\` ON \`_case_studies_v_blocks_split_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_path_idx\` ON \`_case_studies_v_blocks_split_row\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_image_idx\` ON \`_case_studies_v_blocks_split_row\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_feature_row_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_feature_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_feature_row_cards_order_idx\` ON \`_case_studies_v_blocks_feature_row_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_feature_row_cards_parent_id_idx\` ON \`_case_studies_v_blocks_feature_row_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_feature_row\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_feature_row_order_idx\` ON \`_case_studies_v_blocks_feature_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_feature_row_parent_id_idx\` ON \`_case_studies_v_blocks_feature_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_feature_row_path_idx\` ON \`_case_studies_v_blocks_feature_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_stats_row_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_stats_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_row_stats_order_idx\` ON \`_case_studies_v_blocks_stats_row_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_row_stats_parent_id_idx\` ON \`_case_studies_v_blocks_stats_row_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_stats_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_row_order_idx\` ON \`_case_studies_v_blocks_stats_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_row_parent_id_idx\` ON \`_case_studies_v_blocks_stats_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_stats_row_path_idx\` ON \`_case_studies_v_blocks_stats_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_strip_logos_order_idx\` ON \`_case_studies_v_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_strip_logos_parent_id_idx\` ON \`_case_studies_v_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_strip_logos_image_idx\` ON \`_case_studies_v_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_logo_strip\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_strip_order_idx\` ON \`_case_studies_v_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_strip_parent_id_idx\` ON \`_case_studies_v_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_strip_path_idx\` ON \`_case_studies_v_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_service_testimonials_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author\` text,
  	\`role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_service_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_testimonials_quotes_order_idx\` ON \`_case_studies_v_blocks_service_testimonials_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_testimonials_quotes_parent_id_idx\` ON \`_case_studies_v_blocks_service_testimonials_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_service_testimonials\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_testimonials_order_idx\` ON \`_case_studies_v_blocks_service_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_testimonials_parent_id_idx\` ON \`_case_studies_v_blocks_service_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_testimonials_path_idx\` ON \`_case_studies_v_blocks_service_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_service_final_cta_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_service_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_final_cta_buttons_order_idx\` ON \`_case_studies_v_blocks_service_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_final_cta_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_service_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_final_cta_buttons_link_li_idx\` ON \`_case_studies_v_blocks_service_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_service_final_cta\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_final_cta_order_idx\` ON \`_case_studies_v_blocks_service_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_final_cta_parent_id_idx\` ON \`_case_studies_v_blocks_service_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_final_cta_path_idx\` ON \`_case_studies_v_blocks_service_final_cta\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_services_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_row_bullets\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_row_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_row\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_row_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_row\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_row_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_row\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_testimonials_quotes\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_final_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_services_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_row_bullets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_row_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_row\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_row_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_row\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_row_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_row\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_testimonials_quotes\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_final_cta\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_services_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_row_bullets\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_row_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_row\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_feature_row_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_feature_row\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats_row_stats\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_stats_row\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_service_testimonials_quotes\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_service_testimonials\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_service_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_service_final_cta\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_services_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_services_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_row_bullets\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_row_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_row\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_feature_row_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_feature_row\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_stats_row_stats\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_stats_row\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_service_testimonials_quotes\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_service_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_service_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_service_final_cta\`;`)
}
