import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_print_hero_breadcrumb\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_breadcrumb_order_idx\` ON \`pages_blocks_print_hero_breadcrumb\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_breadcrumb_parent_id_idx\` ON \`pages_blocks_print_hero_breadcrumb\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_print_hero_checklist\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_checklist_order_idx\` ON \`pages_blocks_print_hero_checklist\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_checklist_parent_id_idx\` ON \`pages_blocks_print_hero_checklist\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_print_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_buttons_order_idx\` ON \`pages_blocks_print_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_buttons_parent_id_idx\` ON \`pages_blocks_print_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_buttons_link_link_page_idx\` ON \`pages_blocks_print_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_print_hero_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_images_order_idx\` ON \`pages_blocks_print_hero_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_images_parent_id_idx\` ON \`pages_blocks_print_hero_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_images_image_idx\` ON \`pages_blocks_print_hero_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_print_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_order_idx\` ON \`pages_blocks_print_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_parent_id_idx\` ON \`pages_blocks_print_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_hero_path_idx\` ON \`pages_blocks_print_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_print_intro_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`suffix\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_print_intro\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_intro_stats_order_idx\` ON \`pages_blocks_print_intro_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_intro_stats_parent_id_idx\` ON \`pages_blocks_print_intro_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_print_intro\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_intro_order_idx\` ON \`pages_blocks_print_intro\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_intro_parent_id_idx\` ON \`pages_blocks_print_intro\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_intro_path_idx\` ON \`pages_blocks_print_intro\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_intro_before_image_idx\` ON \`pages_blocks_print_intro\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_intro_after_image_idx\` ON \`pages_blocks_print_intro\` (\`after_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_icon_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_icon_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_card_grid_cards_order_idx\` ON \`pages_blocks_icon_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_card_grid_cards_parent_id_idx\` ON \`pages_blocks_icon_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_icon_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'deep',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_card_grid_order_idx\` ON \`pages_blocks_icon_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_card_grid_parent_id_idx\` ON \`pages_blocks_icon_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icon_card_grid_path_idx\` ON \`pages_blocks_icon_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_print_process_phases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`title\` text,
  	\`description\` text,
  	\`badge\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_print_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_process_phases_order_idx\` ON \`pages_blocks_print_process_phases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_process_phases_parent_id_idx\` ON \`pages_blocks_print_process_phases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_print_process\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_print_process_order_idx\` ON \`pages_blocks_print_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_process_parent_id_idx\` ON \`pages_blocks_print_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_print_process_path_idx\` ON \`pages_blocks_print_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_receive_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_receive_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_receive_grid_items_order_idx\` ON \`pages_blocks_receive_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_receive_grid_items_parent_id_idx\` ON \`pages_blocks_receive_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_receive_grid\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_receive_grid_order_idx\` ON \`pages_blocks_receive_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_receive_grid_parent_id_idx\` ON \`pages_blocks_receive_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_receive_grid_path_idx\` ON \`pages_blocks_receive_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_signature_product\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`button_link_label\` text,
  	\`button_link_type\` text DEFAULT 'internal',
  	\`button_link_page_id\` integer,
  	\`button_link_url\` text,
  	\`button_link_anchor\` text,
  	\`button_link_style\` text DEFAULT 'primary',
  	\`button_link_new_tab\` integer,
  	\`video_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_order_idx\` ON \`pages_blocks_signature_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_parent_id_idx\` ON \`pages_blocks_signature_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_path_idx\` ON \`pages_blocks_signature_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_button_link_button_link_p_idx\` ON \`pages_blocks_signature_product\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_hero_breadcrumb\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_breadcrumb_order_idx\` ON \`_pages_v_blocks_print_hero_breadcrumb\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_breadcrumb_parent_id_idx\` ON \`_pages_v_blocks_print_hero_breadcrumb\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_hero_checklist\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_checklist_order_idx\` ON \`_pages_v_blocks_print_hero_checklist\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_checklist_parent_id_idx\` ON \`_pages_v_blocks_print_hero_checklist\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_buttons_order_idx\` ON \`_pages_v_blocks_print_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_buttons_parent_id_idx\` ON \`_pages_v_blocks_print_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_buttons_link_link_page_idx\` ON \`_pages_v_blocks_print_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_hero_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_images_order_idx\` ON \`_pages_v_blocks_print_hero_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_images_parent_id_idx\` ON \`_pages_v_blocks_print_hero_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_images_image_idx\` ON \`_pages_v_blocks_print_hero_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_order_idx\` ON \`_pages_v_blocks_print_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_parent_id_idx\` ON \`_pages_v_blocks_print_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_hero_path_idx\` ON \`_pages_v_blocks_print_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_intro_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`suffix\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_print_intro\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_intro_stats_order_idx\` ON \`_pages_v_blocks_print_intro_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_intro_stats_parent_id_idx\` ON \`_pages_v_blocks_print_intro_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_intro\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_intro_order_idx\` ON \`_pages_v_blocks_print_intro\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_intro_parent_id_idx\` ON \`_pages_v_blocks_print_intro\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_intro_path_idx\` ON \`_pages_v_blocks_print_intro\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_intro_before_image_idx\` ON \`_pages_v_blocks_print_intro\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_intro_after_image_idx\` ON \`_pages_v_blocks_print_intro\` (\`after_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_icon_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_icon_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_card_grid_cards_order_idx\` ON \`_pages_v_blocks_icon_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_card_grid_cards_parent_id_idx\` ON \`_pages_v_blocks_icon_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_icon_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'deep',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_card_grid_order_idx\` ON \`_pages_v_blocks_icon_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_card_grid_parent_id_idx\` ON \`_pages_v_blocks_icon_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icon_card_grid_path_idx\` ON \`_pages_v_blocks_icon_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_process_phases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`title\` text,
  	\`description\` text,
  	\`badge\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_print_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_process_phases_order_idx\` ON \`_pages_v_blocks_print_process_phases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_process_phases_parent_id_idx\` ON \`_pages_v_blocks_print_process_phases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_print_process\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_process_order_idx\` ON \`_pages_v_blocks_print_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_process_parent_id_idx\` ON \`_pages_v_blocks_print_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_print_process_path_idx\` ON \`_pages_v_blocks_print_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_receive_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_receive_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_receive_grid_items_order_idx\` ON \`_pages_v_blocks_receive_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_receive_grid_items_parent_id_idx\` ON \`_pages_v_blocks_receive_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_receive_grid\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_receive_grid_order_idx\` ON \`_pages_v_blocks_receive_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_receive_grid_parent_id_idx\` ON \`_pages_v_blocks_receive_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_receive_grid_path_idx\` ON \`_pages_v_blocks_receive_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_signature_product\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`button_link_label\` text,
  	\`button_link_type\` text DEFAULT 'internal',
  	\`button_link_page_id\` integer,
  	\`button_link_url\` text,
  	\`button_link_anchor\` text,
  	\`button_link_style\` text DEFAULT 'primary',
  	\`button_link_new_tab\` integer,
  	\`video_url\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_order_idx\` ON \`_pages_v_blocks_signature_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_parent_id_idx\` ON \`_pages_v_blocks_signature_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_path_idx\` ON \`_pages_v_blocks_signature_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_button_link_button_lin_idx\` ON \`_pages_v_blocks_signature_product\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_hero_breadcrumb\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_breadcrumb_order_idx\` ON \`case_studies_blocks_print_hero_breadcrumb\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_breadcrumb_parent_id_idx\` ON \`case_studies_blocks_print_hero_breadcrumb\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_hero_checklist\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_checklist_order_idx\` ON \`case_studies_blocks_print_hero_checklist\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_checklist_parent_id_idx\` ON \`case_studies_blocks_print_hero_checklist\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_buttons_order_idx\` ON \`case_studies_blocks_print_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_buttons_parent_id_idx\` ON \`case_studies_blocks_print_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_buttons_link_link_page_idx\` ON \`case_studies_blocks_print_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_hero_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_images_order_idx\` ON \`case_studies_blocks_print_hero_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_images_parent_id_idx\` ON \`case_studies_blocks_print_hero_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_images_image_idx\` ON \`case_studies_blocks_print_hero_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_order_idx\` ON \`case_studies_blocks_print_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_parent_id_idx\` ON \`case_studies_blocks_print_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_hero_path_idx\` ON \`case_studies_blocks_print_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_intro_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`suffix\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_print_intro\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_intro_stats_order_idx\` ON \`case_studies_blocks_print_intro_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_intro_stats_parent_id_idx\` ON \`case_studies_blocks_print_intro_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_intro\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_intro_order_idx\` ON \`case_studies_blocks_print_intro\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_intro_parent_id_idx\` ON \`case_studies_blocks_print_intro\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_intro_path_idx\` ON \`case_studies_blocks_print_intro\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_intro_before_image_idx\` ON \`case_studies_blocks_print_intro\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_intro_after_image_idx\` ON \`case_studies_blocks_print_intro\` (\`after_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_icon_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_icon_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_card_grid_cards_order_idx\` ON \`case_studies_blocks_icon_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_card_grid_cards_parent_id_idx\` ON \`case_studies_blocks_icon_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_icon_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'deep',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_card_grid_order_idx\` ON \`case_studies_blocks_icon_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_card_grid_parent_id_idx\` ON \`case_studies_blocks_icon_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_icon_card_grid_path_idx\` ON \`case_studies_blocks_icon_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_process_phases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`title\` text,
  	\`description\` text,
  	\`badge\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_print_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_process_phases_order_idx\` ON \`case_studies_blocks_print_process_phases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_process_phases_parent_id_idx\` ON \`case_studies_blocks_print_process_phases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_print_process\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_process_order_idx\` ON \`case_studies_blocks_print_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_process_parent_id_idx\` ON \`case_studies_blocks_print_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_print_process_path_idx\` ON \`case_studies_blocks_print_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_receive_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_receive_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_receive_grid_items_order_idx\` ON \`case_studies_blocks_receive_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_receive_grid_items_parent_id_idx\` ON \`case_studies_blocks_receive_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_receive_grid\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_receive_grid_order_idx\` ON \`case_studies_blocks_receive_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_receive_grid_parent_id_idx\` ON \`case_studies_blocks_receive_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_receive_grid_path_idx\` ON \`case_studies_blocks_receive_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_signature_product\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`button_link_label\` text,
  	\`button_link_type\` text DEFAULT 'internal',
  	\`button_link_page_id\` integer,
  	\`button_link_url\` text,
  	\`button_link_anchor\` text,
  	\`button_link_style\` text DEFAULT 'primary',
  	\`button_link_new_tab\` integer,
  	\`video_url\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_order_idx\` ON \`case_studies_blocks_signature_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_parent_id_idx\` ON \`case_studies_blocks_signature_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_path_idx\` ON \`case_studies_blocks_signature_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_button_link_button_idx\` ON \`case_studies_blocks_signature_product\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_hero_breadcrumb\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_breadcrumb_order_idx\` ON \`_case_studies_v_blocks_print_hero_breadcrumb\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_breadcrumb_parent_id_idx\` ON \`_case_studies_v_blocks_print_hero_breadcrumb\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_hero_checklist\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_checklist_order_idx\` ON \`_case_studies_v_blocks_print_hero_checklist\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_checklist_parent_id_idx\` ON \`_case_studies_v_blocks_print_hero_checklist\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_buttons_order_idx\` ON \`_case_studies_v_blocks_print_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_print_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_buttons_link_link_page_idx\` ON \`_case_studies_v_blocks_print_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_hero_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_print_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_images_order_idx\` ON \`_case_studies_v_blocks_print_hero_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_images_parent_id_idx\` ON \`_case_studies_v_blocks_print_hero_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_images_image_idx\` ON \`_case_studies_v_blocks_print_hero_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_order_idx\` ON \`_case_studies_v_blocks_print_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_parent_id_idx\` ON \`_case_studies_v_blocks_print_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_hero_path_idx\` ON \`_case_studies_v_blocks_print_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_intro_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`suffix\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_print_intro\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_intro_stats_order_idx\` ON \`_case_studies_v_blocks_print_intro_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_intro_stats_parent_id_idx\` ON \`_case_studies_v_blocks_print_intro_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_intro\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`lead\` text,
  	\`before_image_id\` integer,
  	\`after_image_id\` integer,
  	\`caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_intro_order_idx\` ON \`_case_studies_v_blocks_print_intro\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_intro_parent_id_idx\` ON \`_case_studies_v_blocks_print_intro\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_intro_path_idx\` ON \`_case_studies_v_blocks_print_intro\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_intro_before_image_idx\` ON \`_case_studies_v_blocks_print_intro\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_intro_after_image_idx\` ON \`_case_studies_v_blocks_print_intro\` (\`after_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_icon_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_icon_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_card_grid_cards_order_idx\` ON \`_case_studies_v_blocks_icon_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_card_grid_cards_parent_id_idx\` ON \`_case_studies_v_blocks_icon_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_icon_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'deep',
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_card_grid_order_idx\` ON \`_case_studies_v_blocks_icon_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_card_grid_parent_id_idx\` ON \`_case_studies_v_blocks_icon_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_icon_card_grid_path_idx\` ON \`_case_studies_v_blocks_icon_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_process_phases\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`title\` text,
  	\`description\` text,
  	\`badge\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_print_process\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_process_phases_order_idx\` ON \`_case_studies_v_blocks_print_process_phases\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_process_phases_parent_id_idx\` ON \`_case_studies_v_blocks_print_process_phases\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_print_process\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_process_order_idx\` ON \`_case_studies_v_blocks_print_process\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_process_parent_id_idx\` ON \`_case_studies_v_blocks_print_process\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_print_process_path_idx\` ON \`_case_studies_v_blocks_print_process\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_receive_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_receive_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_receive_grid_items_order_idx\` ON \`_case_studies_v_blocks_receive_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_receive_grid_items_parent_id_idx\` ON \`_case_studies_v_blocks_receive_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_receive_grid\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_receive_grid_order_idx\` ON \`_case_studies_v_blocks_receive_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_receive_grid_parent_id_idx\` ON \`_case_studies_v_blocks_receive_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_receive_grid_path_idx\` ON \`_case_studies_v_blocks_receive_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_signature_product\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`button_link_label\` text,
  	\`button_link_type\` text DEFAULT 'internal',
  	\`button_link_page_id\` integer,
  	\`button_link_url\` text,
  	\`button_link_anchor\` text,
  	\`button_link_style\` text DEFAULT 'primary',
  	\`button_link_new_tab\` integer,
  	\`video_url\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_order_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_parent_id_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_path_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_button_link_but_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`button_link_page_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery_items\` ADD \`tag\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery_items\` ADD \`tag\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery_items\` ADD \`tag\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery_items\` ADD \`tag\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_print_hero_breadcrumb\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_print_hero_checklist\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_print_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_print_hero_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_print_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_print_intro_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_print_intro\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_icon_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_icon_card_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_print_process_phases\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_print_process\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_receive_grid_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_receive_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_signature_product\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_hero_breadcrumb\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_hero_checklist\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_hero_images\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_intro_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_intro\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_icon_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_icon_card_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_process_phases\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_print_process\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_receive_grid_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_receive_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_signature_product\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_hero_breadcrumb\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_hero_checklist\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_hero_images\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_hero\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_intro_stats\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_intro\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_icon_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_icon_card_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_process_phases\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_print_process\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_receive_grid_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_receive_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_signature_product\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_hero_breadcrumb\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_hero_checklist\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_hero_images\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_hero\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_intro_stats\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_intro\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_icon_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_icon_card_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_process_phases\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_print_process\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_receive_grid_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_receive_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_signature_product\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery_items\` DROP COLUMN \`tag\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery_items\` DROP COLUMN \`tag\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_gallery_items\` DROP COLUMN \`tag\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_gallery_items\` DROP COLUMN \`tag\`;`)
}
