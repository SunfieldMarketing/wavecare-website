import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_web_design_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_web_design_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_web_design_hero_buttons_order_idx\` ON \`pages_blocks_web_design_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_web_design_hero_buttons_parent_id_idx\` ON \`pages_blocks_web_design_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_web_design_hero_buttons_link_link_page_idx\` ON \`pages_blocks_web_design_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_web_design_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`resp_tag\` text DEFAULT 'Responsive',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_web_design_hero_order_idx\` ON \`pages_blocks_web_design_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_web_design_hero_parent_id_idx\` ON \`pages_blocks_web_design_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_web_design_hero_path_idx\` ON \`pages_blocks_web_design_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_reveal_before_after\` (
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_reveal_before_after_order_idx\` ON \`pages_blocks_reveal_before_after\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_reveal_before_after_parent_id_idx\` ON \`pages_blocks_reveal_before_after\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_reveal_before_after_path_idx\` ON \`pages_blocks_reveal_before_after\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_reveal_before_after_before_image_idx\` ON \`pages_blocks_reveal_before_after\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_reveal_before_after_after_image_idx\` ON \`pages_blocks_reveal_before_after\` (\`after_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_reveal_before_after_appearance_appearance_b_idx\` ON \`pages_blocks_reveal_before_after\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_capabilities_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visual\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_capabilities_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_capabilities_grid_cards_order_idx\` ON \`pages_blocks_capabilities_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_capabilities_grid_cards_parent_id_idx\` ON \`pages_blocks_capabilities_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_capabilities_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_capabilities_grid_order_idx\` ON \`pages_blocks_capabilities_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_capabilities_grid_parent_id_idx\` ON \`pages_blocks_capabilities_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_capabilities_grid_path_idx\` ON \`pages_blocks_capabilities_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_capabilities_grid_appearance_appearance_bac_idx\` ON \`pages_blocks_capabilities_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_simple_icon_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_simple_icon_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_icon_grid_cards_order_idx\` ON \`pages_blocks_simple_icon_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_icon_grid_cards_parent_id_idx\` ON \`pages_blocks_simple_icon_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_simple_icon_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_icon_grid_order_idx\` ON \`pages_blocks_simple_icon_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_icon_grid_parent_id_idx\` ON \`pages_blocks_simple_icon_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_icon_grid_path_idx\` ON \`pages_blocks_simple_icon_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_simple_icon_grid_appearance_appearance_back_idx\` ON \`pages_blocks_simple_icon_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_web_design_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_web_design_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_web_design_hero_buttons_order_idx\` ON \`_pages_v_blocks_web_design_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_web_design_hero_buttons_parent_id_idx\` ON \`_pages_v_blocks_web_design_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_web_design_hero_buttons_link_link_page_idx\` ON \`_pages_v_blocks_web_design_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_web_design_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`resp_tag\` text DEFAULT 'Responsive',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_web_design_hero_order_idx\` ON \`_pages_v_blocks_web_design_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_web_design_hero_parent_id_idx\` ON \`_pages_v_blocks_web_design_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_web_design_hero_path_idx\` ON \`_pages_v_blocks_web_design_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_reveal_before_after\` (
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reveal_before_after_order_idx\` ON \`_pages_v_blocks_reveal_before_after\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reveal_before_after_parent_id_idx\` ON \`_pages_v_blocks_reveal_before_after\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reveal_before_after_path_idx\` ON \`_pages_v_blocks_reveal_before_after\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reveal_before_after_before_image_idx\` ON \`_pages_v_blocks_reveal_before_after\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reveal_before_after_after_image_idx\` ON \`_pages_v_blocks_reveal_before_after\` (\`after_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reveal_before_after_appearance_appearanc_idx\` ON \`_pages_v_blocks_reveal_before_after\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_capabilities_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visual\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_capabilities_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_capabilities_grid_cards_order_idx\` ON \`_pages_v_blocks_capabilities_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_capabilities_grid_cards_parent_id_idx\` ON \`_pages_v_blocks_capabilities_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_capabilities_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_capabilities_grid_order_idx\` ON \`_pages_v_blocks_capabilities_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_capabilities_grid_parent_id_idx\` ON \`_pages_v_blocks_capabilities_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_capabilities_grid_path_idx\` ON \`_pages_v_blocks_capabilities_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_capabilities_grid_appearance_appearance__idx\` ON \`_pages_v_blocks_capabilities_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_simple_icon_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_simple_icon_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_icon_grid_cards_order_idx\` ON \`_pages_v_blocks_simple_icon_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_icon_grid_cards_parent_id_idx\` ON \`_pages_v_blocks_simple_icon_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_simple_icon_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_icon_grid_order_idx\` ON \`_pages_v_blocks_simple_icon_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_icon_grid_parent_id_idx\` ON \`_pages_v_blocks_simple_icon_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_icon_grid_path_idx\` ON \`_pages_v_blocks_simple_icon_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_simple_icon_grid_appearance_appearance_b_idx\` ON \`_pages_v_blocks_simple_icon_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_web_design_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_web_design_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_web_design_hero_buttons_order_idx\` ON \`case_studies_blocks_web_design_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_web_design_hero_buttons_parent_id_idx\` ON \`case_studies_blocks_web_design_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_web_design_hero_buttons_link_link_pa_idx\` ON \`case_studies_blocks_web_design_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_web_design_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`resp_tag\` text DEFAULT 'Responsive',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_web_design_hero_order_idx\` ON \`case_studies_blocks_web_design_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_web_design_hero_parent_id_idx\` ON \`case_studies_blocks_web_design_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_web_design_hero_path_idx\` ON \`case_studies_blocks_web_design_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_reveal_before_after\` (
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_reveal_before_after_order_idx\` ON \`case_studies_blocks_reveal_before_after\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_reveal_before_after_parent_id_idx\` ON \`case_studies_blocks_reveal_before_after\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_reveal_before_after_path_idx\` ON \`case_studies_blocks_reveal_before_after\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_reveal_before_after_before_image_idx\` ON \`case_studies_blocks_reveal_before_after\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_reveal_before_after_after_image_idx\` ON \`case_studies_blocks_reveal_before_after\` (\`after_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_reveal_before_after_appearance_appea_idx\` ON \`case_studies_blocks_reveal_before_after\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_capabilities_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`visual\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_capabilities_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_capabilities_grid_cards_order_idx\` ON \`case_studies_blocks_capabilities_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_capabilities_grid_cards_parent_id_idx\` ON \`case_studies_blocks_capabilities_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_capabilities_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_capabilities_grid_order_idx\` ON \`case_studies_blocks_capabilities_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_capabilities_grid_parent_id_idx\` ON \`case_studies_blocks_capabilities_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_capabilities_grid_path_idx\` ON \`case_studies_blocks_capabilities_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_capabilities_grid_appearance_appeara_idx\` ON \`case_studies_blocks_capabilities_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_simple_icon_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_simple_icon_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_icon_grid_cards_order_idx\` ON \`case_studies_blocks_simple_icon_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_icon_grid_cards_parent_id_idx\` ON \`case_studies_blocks_simple_icon_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_simple_icon_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_icon_grid_order_idx\` ON \`case_studies_blocks_simple_icon_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_icon_grid_parent_id_idx\` ON \`case_studies_blocks_simple_icon_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_icon_grid_path_idx\` ON \`case_studies_blocks_simple_icon_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_simple_icon_grid_appearance_appearan_idx\` ON \`case_studies_blocks_simple_icon_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_web_design_hero_buttons\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_web_design_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_web_design_hero_buttons_order_idx\` ON \`_case_studies_v_blocks_web_design_hero_buttons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_web_design_hero_buttons_parent_id_idx\` ON \`_case_studies_v_blocks_web_design_hero_buttons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_web_design_hero_buttons_link_link_idx\` ON \`_case_studies_v_blocks_web_design_hero_buttons\` (\`link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_web_design_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`resp_tag\` text DEFAULT 'Responsive',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_web_design_hero_order_idx\` ON \`_case_studies_v_blocks_web_design_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_web_design_hero_parent_id_idx\` ON \`_case_studies_v_blocks_web_design_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_web_design_hero_path_idx\` ON \`_case_studies_v_blocks_web_design_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_reveal_before_after\` (
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_reveal_before_after_order_idx\` ON \`_case_studies_v_blocks_reveal_before_after\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_reveal_before_after_parent_id_idx\` ON \`_case_studies_v_blocks_reveal_before_after\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_reveal_before_after_path_idx\` ON \`_case_studies_v_blocks_reveal_before_after\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_reveal_before_after_before_image_idx\` ON \`_case_studies_v_blocks_reveal_before_after\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_reveal_before_after_after_image_idx\` ON \`_case_studies_v_blocks_reveal_before_after\` (\`after_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_reveal_before_after_appearance_ap_idx\` ON \`_case_studies_v_blocks_reveal_before_after\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_capabilities_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visual\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_capabilities_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_capabilities_grid_cards_order_idx\` ON \`_case_studies_v_blocks_capabilities_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_capabilities_grid_cards_parent_id_idx\` ON \`_case_studies_v_blocks_capabilities_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_capabilities_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_capabilities_grid_order_idx\` ON \`_case_studies_v_blocks_capabilities_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_capabilities_grid_parent_id_idx\` ON \`_case_studies_v_blocks_capabilities_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_capabilities_grid_path_idx\` ON \`_case_studies_v_blocks_capabilities_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_capabilities_grid_appearance_appe_idx\` ON \`_case_studies_v_blocks_capabilities_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_simple_icon_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_simple_icon_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_icon_grid_cards_order_idx\` ON \`_case_studies_v_blocks_simple_icon_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_icon_grid_cards_parent_id_idx\` ON \`_case_studies_v_blocks_simple_icon_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_simple_icon_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_icon_grid_order_idx\` ON \`_case_studies_v_blocks_simple_icon_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_icon_grid_parent_id_idx\` ON \`_case_studies_v_blocks_simple_icon_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_icon_grid_path_idx\` ON \`_case_studies_v_blocks_simple_icon_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_simple_icon_grid_appearance_appea_idx\` ON \`_case_studies_v_blocks_simple_icon_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats_stats\` ADD \`prefix\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`compact\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` ADD \`browser_url\` text DEFAULT 'yourfacility.org';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats_stats\` ADD \`prefix\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`compact\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` ADD \`browser_url\` text DEFAULT 'yourfacility.org';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats_stats\` ADD \`prefix\` text;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` ADD \`compact\` integer;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` ADD \`browser_url\` text DEFAULT 'yourfacility.org';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats_stats\` ADD \`prefix\` text;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` ADD \`compact\` integer;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` ADD \`browser_url\` text DEFAULT 'yourfacility.org';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_web_design_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_web_design_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_reveal_before_after\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_capabilities_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_capabilities_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_simple_icon_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_simple_icon_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_web_design_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_web_design_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_reveal_before_after\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_capabilities_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_capabilities_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_simple_icon_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_simple_icon_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_web_design_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_web_design_hero\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_reveal_before_after\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_capabilities_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_capabilities_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_simple_icon_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_simple_icon_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_web_design_hero_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_web_design_hero\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_reveal_before_after\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_capabilities_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_capabilities_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_simple_icon_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_simple_icon_grid\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats_stats\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`compact\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_process\` DROP COLUMN \`browser_url\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats_stats\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`compact\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_process\` DROP COLUMN \`browser_url\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats_stats\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_stats\` DROP COLUMN \`compact\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_process\` DROP COLUMN \`browser_url\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats_stats\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_stats\` DROP COLUMN \`compact\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_process\` DROP COLUMN \`browser_url\`;`)
}
