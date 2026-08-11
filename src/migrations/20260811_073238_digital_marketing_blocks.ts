import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dm_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_hero_buttons_order_idx\` ON \`pages_blocks_dm_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_hero_buttons_parent_id_idx\` ON \`pages_blocks_dm_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_hero_buttons_link_link_page_idx\` ON \`pages_blocks_dm_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_hero\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_hero_order_idx\` ON \`pages_blocks_dm_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_hero_parent_id_idx\` ON \`pages_blocks_dm_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_hero_path_idx\` ON \`pages_blocks_dm_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_accordion_items_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dm_accordion_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_accordion_items_pills_order_idx\` ON \`pages_blocks_dm_accordion_items_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_accordion_items_pills_parent_id_idx\` ON \`pages_blocks_dm_accordion_items_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`open_by_default\` integer DEFAULT false,
  	\`cover_type\` text DEFAULT 'shuffle',
  	\`cover_tag\` text,
  	\`heading\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dm_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_accordion_items_order_idx\` ON \`pages_blocks_dm_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_accordion_items_parent_id_idx\` ON \`pages_blocks_dm_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor_id\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_accordion_order_idx\` ON \`pages_blocks_dm_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_accordion_parent_id_idx\` ON \`pages_blocks_dm_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_accordion_path_idx\` ON \`pages_blocks_dm_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_split_mockup_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dm_split_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_split_mockup_bullets_order_idx\` ON \`pages_blocks_dm_split_mockup_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_split_mockup_bullets_parent_id_idx\` ON \`pages_blocks_dm_split_mockup_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_split_mockup_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dm_split_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_split_mockup_buttons_order_idx\` ON \`pages_blocks_dm_split_mockup_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_split_mockup_buttons_parent_id_idx\` ON \`pages_blocks_dm_split_mockup_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_split_mockup_buttons_link_link_page_idx\` ON \`pages_blocks_dm_split_mockup_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_split_mockup\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`wrap_section\` integer DEFAULT true,
  	\`flipped\` integer,
  	\`text_tone\` text DEFAULT 'on-dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`mockup\` text DEFAULT 'adPreview',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_split_mockup_order_idx\` ON \`pages_blocks_dm_split_mockup\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_split_mockup_parent_id_idx\` ON \`pages_blocks_dm_split_mockup\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_split_mockup_path_idx\` ON \`pages_blocks_dm_split_mockup\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_feature_row_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dm_feature_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_feature_row_cards_order_idx\` ON \`pages_blocks_dm_feature_row_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_feature_row_cards_parent_id_idx\` ON \`pages_blocks_dm_feature_row_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_feature_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_feature_row_order_idx\` ON \`pages_blocks_dm_feature_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_feature_row_parent_id_idx\` ON \`pages_blocks_dm_feature_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_feature_row_path_idx\` ON \`pages_blocks_dm_feature_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_stats_row_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dm_stats_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_stats_row_steps_order_idx\` ON \`pages_blocks_dm_stats_row_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_stats_row_steps_parent_id_idx\` ON \`pages_blocks_dm_stats_row_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_stats_row\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_stats_row_order_idx\` ON \`pages_blocks_dm_stats_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_stats_row_parent_id_idx\` ON \`pages_blocks_dm_stats_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_stats_row_path_idx\` ON \`pages_blocks_dm_stats_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_final_cta_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dm_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_final_cta_buttons_order_idx\` ON \`pages_blocks_dm_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_final_cta_buttons_parent_id_idx\` ON \`pages_blocks_dm_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_final_cta_buttons_link_link_page_idx\` ON \`pages_blocks_dm_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dm_final_cta\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_final_cta_order_idx\` ON \`pages_blocks_dm_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_final_cta_parent_id_idx\` ON \`pages_blocks_dm_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dm_final_cta_path_idx\` ON \`pages_blocks_dm_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dm_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_hero_buttons_order_idx\` ON \`_pages_v_blocks_dm_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_hero_buttons_parent_id_idx\` ON \`_pages_v_blocks_dm_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_hero_buttons_link_link_page_idx\` ON \`_pages_v_blocks_dm_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_hero\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_hero_order_idx\` ON \`_pages_v_blocks_dm_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_hero_parent_id_idx\` ON \`_pages_v_blocks_dm_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_hero_path_idx\` ON \`_pages_v_blocks_dm_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_accordion_items_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dm_accordion_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_accordion_items_pills_order_idx\` ON \`_pages_v_blocks_dm_accordion_items_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_accordion_items_pills_parent_id_idx\` ON \`_pages_v_blocks_dm_accordion_items_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`open_by_default\` integer DEFAULT false,
  	\`cover_type\` text DEFAULT 'shuffle',
  	\`cover_tag\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dm_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_accordion_items_order_idx\` ON \`_pages_v_blocks_dm_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_accordion_items_parent_id_idx\` ON \`_pages_v_blocks_dm_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`anchor_id\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_accordion_order_idx\` ON \`_pages_v_blocks_dm_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_accordion_parent_id_idx\` ON \`_pages_v_blocks_dm_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_accordion_path_idx\` ON \`_pages_v_blocks_dm_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_split_mockup_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dm_split_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_split_mockup_bullets_order_idx\` ON \`_pages_v_blocks_dm_split_mockup_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_split_mockup_bullets_parent_id_idx\` ON \`_pages_v_blocks_dm_split_mockup_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_split_mockup_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dm_split_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_split_mockup_buttons_order_idx\` ON \`_pages_v_blocks_dm_split_mockup_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_split_mockup_buttons_parent_id_idx\` ON \`_pages_v_blocks_dm_split_mockup_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_split_mockup_buttons_link_link_page_idx\` ON \`_pages_v_blocks_dm_split_mockup_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_split_mockup\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`wrap_section\` integer DEFAULT true,
  	\`flipped\` integer,
  	\`text_tone\` text DEFAULT 'on-dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`mockup\` text DEFAULT 'adPreview',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_split_mockup_order_idx\` ON \`_pages_v_blocks_dm_split_mockup\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_split_mockup_parent_id_idx\` ON \`_pages_v_blocks_dm_split_mockup\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_split_mockup_path_idx\` ON \`_pages_v_blocks_dm_split_mockup\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_feature_row_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dm_feature_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_feature_row_cards_order_idx\` ON \`_pages_v_blocks_dm_feature_row_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_feature_row_cards_parent_id_idx\` ON \`_pages_v_blocks_dm_feature_row_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_feature_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_feature_row_order_idx\` ON \`_pages_v_blocks_dm_feature_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_feature_row_parent_id_idx\` ON \`_pages_v_blocks_dm_feature_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_feature_row_path_idx\` ON \`_pages_v_blocks_dm_feature_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_stats_row_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dm_stats_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_stats_row_steps_order_idx\` ON \`_pages_v_blocks_dm_stats_row_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_stats_row_steps_parent_id_idx\` ON \`_pages_v_blocks_dm_stats_row_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_stats_row\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_stats_row_order_idx\` ON \`_pages_v_blocks_dm_stats_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_stats_row_parent_id_idx\` ON \`_pages_v_blocks_dm_stats_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_stats_row_path_idx\` ON \`_pages_v_blocks_dm_stats_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_final_cta_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dm_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_final_cta_buttons_order_idx\` ON \`_pages_v_blocks_dm_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_final_cta_buttons_parent_id_idx\` ON \`_pages_v_blocks_dm_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_final_cta_buttons_link_link_page_idx\` ON \`_pages_v_blocks_dm_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dm_final_cta\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_final_cta_order_idx\` ON \`_pages_v_blocks_dm_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_final_cta_parent_id_idx\` ON \`_pages_v_blocks_dm_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dm_final_cta_path_idx\` ON \`_pages_v_blocks_dm_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_dm_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_hero_buttons_order_idx\` ON \`case_studies_blocks_dm_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_hero_buttons_parent_id_idx\` ON \`case_studies_blocks_dm_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_hero_buttons_link_link_page_idx\` ON \`case_studies_blocks_dm_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_hero\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_hero_order_idx\` ON \`case_studies_blocks_dm_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_hero_parent_id_idx\` ON \`case_studies_blocks_dm_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_hero_path_idx\` ON \`case_studies_blocks_dm_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_accordion_items_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_dm_accordion_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_accordion_items_pills_order_idx\` ON \`case_studies_blocks_dm_accordion_items_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_accordion_items_pills_parent_id_idx\` ON \`case_studies_blocks_dm_accordion_items_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`open_by_default\` integer DEFAULT false,
  	\`cover_type\` text DEFAULT 'shuffle',
  	\`cover_tag\` text,
  	\`heading\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_dm_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_accordion_items_order_idx\` ON \`case_studies_blocks_dm_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_accordion_items_parent_id_idx\` ON \`case_studies_blocks_dm_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`anchor_id\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_accordion_order_idx\` ON \`case_studies_blocks_dm_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_accordion_parent_id_idx\` ON \`case_studies_blocks_dm_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_accordion_path_idx\` ON \`case_studies_blocks_dm_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_split_mockup_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_dm_split_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_split_mockup_bullets_order_idx\` ON \`case_studies_blocks_dm_split_mockup_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_split_mockup_bullets_parent_id_idx\` ON \`case_studies_blocks_dm_split_mockup_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_split_mockup_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_dm_split_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_split_mockup_buttons_order_idx\` ON \`case_studies_blocks_dm_split_mockup_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_split_mockup_buttons_parent_id_idx\` ON \`case_studies_blocks_dm_split_mockup_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_split_mockup_buttons_link_link_pa_idx\` ON \`case_studies_blocks_dm_split_mockup_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_split_mockup\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`wrap_section\` integer DEFAULT true,
  	\`flipped\` integer,
  	\`text_tone\` text DEFAULT 'on-dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`mockup\` text DEFAULT 'adPreview',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_split_mockup_order_idx\` ON \`case_studies_blocks_dm_split_mockup\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_split_mockup_parent_id_idx\` ON \`case_studies_blocks_dm_split_mockup\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_split_mockup_path_idx\` ON \`case_studies_blocks_dm_split_mockup\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_feature_row_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_dm_feature_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_feature_row_cards_order_idx\` ON \`case_studies_blocks_dm_feature_row_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_feature_row_cards_parent_id_idx\` ON \`case_studies_blocks_dm_feature_row_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_feature_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_feature_row_order_idx\` ON \`case_studies_blocks_dm_feature_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_feature_row_parent_id_idx\` ON \`case_studies_blocks_dm_feature_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_feature_row_path_idx\` ON \`case_studies_blocks_dm_feature_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_stats_row_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_dm_stats_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_stats_row_steps_order_idx\` ON \`case_studies_blocks_dm_stats_row_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_stats_row_steps_parent_id_idx\` ON \`case_studies_blocks_dm_stats_row_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_stats_row\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_stats_row_order_idx\` ON \`case_studies_blocks_dm_stats_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_stats_row_parent_id_idx\` ON \`case_studies_blocks_dm_stats_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_stats_row_path_idx\` ON \`case_studies_blocks_dm_stats_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_final_cta_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_dm_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_final_cta_buttons_order_idx\` ON \`case_studies_blocks_dm_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_final_cta_buttons_parent_id_idx\` ON \`case_studies_blocks_dm_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_final_cta_buttons_link_link_page_idx\` ON \`case_studies_blocks_dm_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_dm_final_cta\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_final_cta_order_idx\` ON \`case_studies_blocks_dm_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_final_cta_parent_id_idx\` ON \`case_studies_blocks_dm_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_dm_final_cta_path_idx\` ON \`case_studies_blocks_dm_final_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_dm_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_hero_buttons_order_idx\` ON \`_case_studies_v_blocks_dm_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_hero_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_dm_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_hero_buttons_link_link_page_idx\` ON \`_case_studies_v_blocks_dm_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_hero\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_hero_order_idx\` ON \`_case_studies_v_blocks_dm_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_hero_parent_id_idx\` ON \`_case_studies_v_blocks_dm_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_hero_path_idx\` ON \`_case_studies_v_blocks_dm_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_accordion_items_pills\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_dm_accordion_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_accordion_items_pills_order_idx\` ON \`_case_studies_v_blocks_dm_accordion_items_pills\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_accordion_items_pills_parent_id_idx\` ON \`_case_studies_v_blocks_dm_accordion_items_pills\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`open_by_default\` integer DEFAULT false,
  	\`cover_type\` text DEFAULT 'shuffle',
  	\`cover_tag\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_dm_accordion\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_accordion_items_order_idx\` ON \`_case_studies_v_blocks_dm_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_accordion_items_parent_id_idx\` ON \`_case_studies_v_blocks_dm_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`anchor_id\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_accordion_order_idx\` ON \`_case_studies_v_blocks_dm_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_accordion_parent_id_idx\` ON \`_case_studies_v_blocks_dm_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_accordion_path_idx\` ON \`_case_studies_v_blocks_dm_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_split_mockup_bullets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_dm_split_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_split_mockup_bullets_order_idx\` ON \`_case_studies_v_blocks_dm_split_mockup_bullets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_split_mockup_bullets_parent_id_idx\` ON \`_case_studies_v_blocks_dm_split_mockup_bullets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_split_mockup_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_dm_split_mockup\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_split_mockup_buttons_order_idx\` ON \`_case_studies_v_blocks_dm_split_mockup_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_split_mockup_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_dm_split_mockup_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_split_mockup_buttons_link_link_idx\` ON \`_case_studies_v_blocks_dm_split_mockup_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_split_mockup\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`wrap_section\` integer DEFAULT true,
  	\`flipped\` integer,
  	\`text_tone\` text DEFAULT 'on-dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`mockup\` text DEFAULT 'adPreview',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_split_mockup_order_idx\` ON \`_case_studies_v_blocks_dm_split_mockup\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_split_mockup_parent_id_idx\` ON \`_case_studies_v_blocks_dm_split_mockup\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_split_mockup_path_idx\` ON \`_case_studies_v_blocks_dm_split_mockup\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_feature_row_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_dm_feature_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_feature_row_cards_order_idx\` ON \`_case_studies_v_blocks_dm_feature_row_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_feature_row_cards_parent_id_idx\` ON \`_case_studies_v_blocks_dm_feature_row_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_feature_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dark',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_feature_row_order_idx\` ON \`_case_studies_v_blocks_dm_feature_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_feature_row_parent_id_idx\` ON \`_case_studies_v_blocks_dm_feature_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_feature_row_path_idx\` ON \`_case_studies_v_blocks_dm_feature_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_stats_row_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_dm_stats_row\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_stats_row_steps_order_idx\` ON \`_case_studies_v_blocks_dm_stats_row_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_stats_row_steps_parent_id_idx\` ON \`_case_studies_v_blocks_dm_stats_row_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_stats_row\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_stats_row_order_idx\` ON \`_case_studies_v_blocks_dm_stats_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_stats_row_parent_id_idx\` ON \`_case_studies_v_blocks_dm_stats_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_stats_row_path_idx\` ON \`_case_studies_v_blocks_dm_stats_row\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_final_cta_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_dm_final_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_final_cta_buttons_order_idx\` ON \`_case_studies_v_blocks_dm_final_cta_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_final_cta_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_dm_final_cta_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_final_cta_buttons_link_link_pa_idx\` ON \`_case_studies_v_blocks_dm_final_cta_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_dm_final_cta\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_final_cta_order_idx\` ON \`_case_studies_v_blocks_dm_final_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_final_cta_parent_id_idx\` ON \`_case_studies_v_blocks_dm_final_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_dm_final_cta_path_idx\` ON \`_case_studies_v_blocks_dm_final_cta\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_dm_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_accordion_items_pills\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_accordion\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_split_mockup_bullets\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_split_mockup_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_split_mockup\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_feature_row_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_feature_row\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_stats_row_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_stats_row\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dm_final_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_accordion_items_pills\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_accordion\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_split_mockup_bullets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_split_mockup_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_split_mockup\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_feature_row_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_feature_row\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_stats_row_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_stats_row\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dm_final_cta\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_hero\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_accordion_items_pills\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_accordion\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_split_mockup_bullets\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_split_mockup_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_split_mockup\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_feature_row_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_feature_row\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_stats_row_steps\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_stats_row\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_dm_final_cta\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_hero\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_accordion_items_pills\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_accordion\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_split_mockup_bullets\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_split_mockup_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_split_mockup\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_feature_row_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_feature_row\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_stats_row_steps\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_stats_row\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_final_cta_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_dm_final_cta\`;`)
}
