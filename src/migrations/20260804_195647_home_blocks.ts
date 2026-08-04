import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_showreel_block_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_showreel_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_showreel_block_paragraphs_order_idx\` ON \`pages_blocks_showreel_block_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_showreel_block_paragraphs_parent_id_idx\` ON \`pages_blocks_showreel_block_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_showreel_block\` (
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
  	\`vimeo_id\` text,
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
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_showreel_block_order_idx\` ON \`pages_blocks_showreel_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_showreel_block_parent_id_idx\` ON \`pages_blocks_showreel_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_showreel_block_path_idx\` ON \`pages_blocks_showreel_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_showreel_block_button_link_button_link_page_idx\` ON \`pages_blocks_showreel_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_showreel_block_appearance_appearance_backgr_idx\` ON \`pages_blocks_showreel_block\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_carousel_cards_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_service_carousel_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_cards_detail_order_idx\` ON \`pages_blocks_service_carousel_cards_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_cards_detail_parent_id_idx\` ON \`pages_blocks_service_carousel_cards_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_carousel_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`image_id\` integer,
  	\`image_fit\` text DEFAULT 'cover',
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_service_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_cards_order_idx\` ON \`pages_blocks_service_carousel_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_cards_parent_id_idx\` ON \`pages_blocks_service_carousel_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_cards_image_idx\` ON \`pages_blocks_service_carousel_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_cards_link_link_link_link__idx\` ON \`pages_blocks_service_carousel_cards\` (\`link_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_service_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`hint\` text DEFAULT 'Drag, scroll, or use the arrows, tap a card for details',
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
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_order_idx\` ON \`pages_blocks_service_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_parent_id_idx\` ON \`pages_blocks_service_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_path_idx\` ON \`pages_blocks_service_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_service_carousel_appearance_appearance_back_idx\` ON \`pages_blocks_service_carousel\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_numbered_feature_grid_leads\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_numbered_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_feature_grid_leads_order_idx\` ON \`pages_blocks_numbered_feature_grid_leads\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_feature_grid_leads_parent_id_idx\` ON \`pages_blocks_numbered_feature_grid_leads\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_numbered_feature_grid_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_numbered_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_feature_grid_features_order_idx\` ON \`pages_blocks_numbered_feature_grid_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_feature_grid_features_parent_id_idx\` ON \`pages_blocks_numbered_feature_grid_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_numbered_feature_grid\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_feature_grid_order_idx\` ON \`pages_blocks_numbered_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_feature_grid_parent_id_idx\` ON \`pages_blocks_numbered_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_feature_grid_path_idx\` ON \`pages_blocks_numbered_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_feature_grid_appearance_appearance_idx\` ON \`pages_blocks_numbered_feature_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_showreel_block_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_showreel_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_showreel_block_paragraphs_order_idx\` ON \`_pages_v_blocks_showreel_block_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_showreel_block_paragraphs_parent_id_idx\` ON \`_pages_v_blocks_showreel_block_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_showreel_block\` (
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
  	\`vimeo_id\` text,
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
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_showreel_block_order_idx\` ON \`_pages_v_blocks_showreel_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_showreel_block_parent_id_idx\` ON \`_pages_v_blocks_showreel_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_showreel_block_path_idx\` ON \`_pages_v_blocks_showreel_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_showreel_block_button_link_button_link_p_idx\` ON \`_pages_v_blocks_showreel_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_showreel_block_appearance_appearance_bac_idx\` ON \`_pages_v_blocks_showreel_block\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_carousel_cards_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_service_carousel_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_cards_detail_order_idx\` ON \`_pages_v_blocks_service_carousel_cards_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_cards_detail_parent_id_idx\` ON \`_pages_v_blocks_service_carousel_cards_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_carousel_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`image_id\` integer,
  	\`image_fit\` text DEFAULT 'cover',
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_service_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_cards_order_idx\` ON \`_pages_v_blocks_service_carousel_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_cards_parent_id_idx\` ON \`_pages_v_blocks_service_carousel_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_cards_image_idx\` ON \`_pages_v_blocks_service_carousel_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_cards_link_link_link_li_idx\` ON \`_pages_v_blocks_service_carousel_cards\` (\`link_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_service_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`hint\` text DEFAULT 'Drag, scroll, or use the arrows, tap a card for details',
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_order_idx\` ON \`_pages_v_blocks_service_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_parent_id_idx\` ON \`_pages_v_blocks_service_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_path_idx\` ON \`_pages_v_blocks_service_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_service_carousel_appearance_appearance_b_idx\` ON \`_pages_v_blocks_service_carousel\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_numbered_feature_grid_leads\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_numbered_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_feature_grid_leads_order_idx\` ON \`_pages_v_blocks_numbered_feature_grid_leads\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_feature_grid_leads_parent_id_idx\` ON \`_pages_v_blocks_numbered_feature_grid_leads\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_numbered_feature_grid_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_numbered_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_feature_grid_features_order_idx\` ON \`_pages_v_blocks_numbered_feature_grid_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_feature_grid_features_parent_id_idx\` ON \`_pages_v_blocks_numbered_feature_grid_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_numbered_feature_grid\` (
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_feature_grid_order_idx\` ON \`_pages_v_blocks_numbered_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_feature_grid_parent_id_idx\` ON \`_pages_v_blocks_numbered_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_feature_grid_path_idx\` ON \`_pages_v_blocks_numbered_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_feature_grid_appearance_appeara_idx\` ON \`_pages_v_blocks_numbered_feature_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_showreel_block_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_showreel_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_showreel_block_paragraphs_order_idx\` ON \`case_studies_blocks_showreel_block_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_showreel_block_paragraphs_parent_id_idx\` ON \`case_studies_blocks_showreel_block_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_showreel_block\` (
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
  	\`vimeo_id\` text,
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
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_showreel_block_order_idx\` ON \`case_studies_blocks_showreel_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_showreel_block_parent_id_idx\` ON \`case_studies_blocks_showreel_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_showreel_block_path_idx\` ON \`case_studies_blocks_showreel_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_showreel_block_button_link_button_li_idx\` ON \`case_studies_blocks_showreel_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_showreel_block_appearance_appearance_idx\` ON \`case_studies_blocks_showreel_block\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_service_carousel_cards_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_service_carousel_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_cards_detail_order_idx\` ON \`case_studies_blocks_service_carousel_cards_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_cards_detail_parent_id_idx\` ON \`case_studies_blocks_service_carousel_cards_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_service_carousel_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`image_id\` integer,
  	\`image_fit\` text DEFAULT 'cover',
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_service_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_cards_order_idx\` ON \`case_studies_blocks_service_carousel_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_cards_parent_id_idx\` ON \`case_studies_blocks_service_carousel_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_cards_image_idx\` ON \`case_studies_blocks_service_carousel_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_cards_link_link_lin_idx\` ON \`case_studies_blocks_service_carousel_cards\` (\`link_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_service_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`hint\` text DEFAULT 'Drag, scroll, or use the arrows, tap a card for details',
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_order_idx\` ON \`case_studies_blocks_service_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_parent_id_idx\` ON \`case_studies_blocks_service_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_path_idx\` ON \`case_studies_blocks_service_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_service_carousel_appearance_appearan_idx\` ON \`case_studies_blocks_service_carousel\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_numbered_feature_grid_leads\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_numbered_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_numbered_feature_grid_leads_order_idx\` ON \`case_studies_blocks_numbered_feature_grid_leads\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_numbered_feature_grid_leads_parent_id_idx\` ON \`case_studies_blocks_numbered_feature_grid_leads\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_numbered_feature_grid_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_numbered_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_numbered_feature_grid_features_order_idx\` ON \`case_studies_blocks_numbered_feature_grid_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_numbered_feature_grid_features_parent_id_idx\` ON \`case_studies_blocks_numbered_feature_grid_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_numbered_feature_grid\` (
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_numbered_feature_grid_order_idx\` ON \`case_studies_blocks_numbered_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_numbered_feature_grid_parent_id_idx\` ON \`case_studies_blocks_numbered_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_numbered_feature_grid_path_idx\` ON \`case_studies_blocks_numbered_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_numbered_feature_grid_appearance_app_idx\` ON \`case_studies_blocks_numbered_feature_grid\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_showreel_block_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_showreel_block\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_showreel_block_paragraphs_order_idx\` ON \`_case_studies_v_blocks_showreel_block_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_showreel_block_paragraphs_parent_id_idx\` ON \`_case_studies_v_blocks_showreel_block_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_showreel_block\` (
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
  	\`vimeo_id\` text,
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
  	FOREIGN KEY (\`button_link_page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`appearance_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_showreel_block_order_idx\` ON \`_case_studies_v_blocks_showreel_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_showreel_block_parent_id_idx\` ON \`_case_studies_v_blocks_showreel_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_showreel_block_path_idx\` ON \`_case_studies_v_blocks_showreel_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_showreel_block_button_link_button_idx\` ON \`_case_studies_v_blocks_showreel_block\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_showreel_block_appearance_appeara_idx\` ON \`_case_studies_v_blocks_showreel_block\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_service_carousel_cards_detail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_service_carousel_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_cards_detail_order_idx\` ON \`_case_studies_v_blocks_service_carousel_cards_detail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_cards_detail_parent_id_idx\` ON \`_case_studies_v_blocks_service_carousel_cards_detail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_service_carousel_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`image_id\` integer,
  	\`image_fit\` text DEFAULT 'cover',
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_service_carousel\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_cards_order_idx\` ON \`_case_studies_v_blocks_service_carousel_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_cards_parent_id_idx\` ON \`_case_studies_v_blocks_service_carousel_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_cards_image_idx\` ON \`_case_studies_v_blocks_service_carousel_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_cards_link_link__idx\` ON \`_case_studies_v_blocks_service_carousel_cards\` (\`link_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_service_carousel\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`hint\` text DEFAULT 'Drag, scroll, or use the arrows, tap a card for details',
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_order_idx\` ON \`_case_studies_v_blocks_service_carousel\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_parent_id_idx\` ON \`_case_studies_v_blocks_service_carousel\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_path_idx\` ON \`_case_studies_v_blocks_service_carousel\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_service_carousel_appearance_appea_idx\` ON \`_case_studies_v_blocks_service_carousel\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_numbered_feature_grid_leads\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_numbered_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_numbered_feature_grid_leads_order_idx\` ON \`_case_studies_v_blocks_numbered_feature_grid_leads\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_numbered_feature_grid_leads_parent_id_idx\` ON \`_case_studies_v_blocks_numbered_feature_grid_leads\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_numbered_feature_grid_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_numbered_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_numbered_feature_grid_features_order_idx\` ON \`_case_studies_v_blocks_numbered_feature_grid_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_numbered_feature_grid_features_parent_id_idx\` ON \`_case_studies_v_blocks_numbered_feature_grid_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_numbered_feature_grid\` (
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_numbered_feature_grid_order_idx\` ON \`_case_studies_v_blocks_numbered_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_numbered_feature_grid_parent_id_idx\` ON \`_case_studies_v_blocks_numbered_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_numbered_feature_grid_path_idx\` ON \`_case_studies_v_blocks_numbered_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_numbered_feature_grid_appearance__idx\` ON \`_case_studies_v_blocks_numbered_feature_grid\` (\`appearance_background_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_showreel_block_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_showreel_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_carousel_cards_detail\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_carousel_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_service_carousel\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_numbered_feature_grid_leads\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_numbered_feature_grid_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_numbered_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_showreel_block_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_showreel_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_carousel_cards_detail\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_carousel_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_service_carousel\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_numbered_feature_grid_leads\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_numbered_feature_grid_features\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_numbered_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_showreel_block_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_showreel_block\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_service_carousel_cards_detail\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_service_carousel_cards\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_service_carousel\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_numbered_feature_grid_leads\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_numbered_feature_grid_features\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_numbered_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_showreel_block_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_showreel_block\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_service_carousel_cards_detail\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_service_carousel_cards\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_service_carousel\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_numbered_feature_grid_leads\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_numbered_feature_grid_features\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_numbered_feature_grid\`;`)
}
