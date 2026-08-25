import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_split_media_bullets\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_media_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_media\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_marquee_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_marquee_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_marquee\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_case_study_grid_buttons\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_case_study_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonial_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_form_sidebar_details\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_media_bullets\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_media_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_media\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_marquee_logos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_marquee_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_marquee\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_case_study_grid_buttons\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_case_study_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonial_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_form_sidebar_details\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_media_bullets\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_media_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_media\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_logo_marquee_logos\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_logo_marquee_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_logo_marquee\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_study_grid_buttons\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_case_study_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_testimonial_grid\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_contact_form_sidebar_details\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_contact_form\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_media_bullets\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_media_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_media\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_video_embed\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_logo_marquee_logos\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_logo_marquee_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_logo_marquee\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_case_study_grid_buttons\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_case_study_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_testimonial_grid\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_contact_form_sidebar_details\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_contact_form\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "media_id", "testimonials_id") SELECT "id", "order", "parent_id", "path", "media_id", "testimonials_id" FROM \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_rels\` RENAME TO \`pages_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_media_id_idx\` ON \`pages_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_testimonials_id_idx\` ON \`pages_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "media_id", "testimonials_id") SELECT "id", "order", "parent_id", "path", "media_id", "testimonials_id" FROM \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_rels\` RENAME TO \`_pages_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_media_id_idx\` ON \`_pages_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_testimonials_id_idx\` ON \`_pages_v_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_case_studies_rels\`("id", "order", "parent_id", "path", "media_id", "testimonials_id") SELECT "id", "order", "parent_id", "path", "media_id", "testimonials_id" FROM \`case_studies_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_rels\` RENAME TO \`case_studies_rels\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_media_id_idx\` ON \`case_studies_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_testimonials_id_idx\` ON \`case_studies_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__case_studies_v_rels\`("id", "order", "parent_id", "path", "media_id", "testimonials_id") SELECT "id", "order", "parent_id", "path", "media_id", "testimonials_id" FROM \`_case_studies_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_rels\` RENAME TO \`_case_studies_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_order_idx\` ON \`_case_studies_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_parent_idx\` ON \`_case_studies_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_path_idx\` ON \`_case_studies_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_media_id_idx\` ON \`_case_studies_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_testimonials_id_idx\` ON \`_case_studies_v_rels\` (\`testimonials_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_split_row\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_video_idx\` ON \`pages_blocks_split_row\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_signature_product\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_video_idx\` ON \`pages_blocks_signature_product\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_split_row\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_video_idx\` ON \`_pages_v_blocks_split_row\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_signature_product\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_video_idx\` ON \`_pages_v_blocks_signature_product\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_split_row\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_video_idx\` ON \`case_studies_blocks_split_row\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_signature_product\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_video_idx\` ON \`case_studies_blocks_signature_product\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_split_row\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_video_idx\` ON \`_case_studies_v_blocks_split_row\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_signature_product\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_video_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`video_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_order_idx\` ON \`pages_blocks_logo_marquee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_parent_id_idx\` ON \`pages_blocks_logo_marquee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_path_idx\` ON \`pages_blocks_logo_marquee\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_marquee_appearance_appearance_backgrou_idx\` ON \`pages_blocks_logo_marquee\` (\`appearance_background_image_id\`);`)
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
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_grid_order_idx\` ON \`pages_blocks_testimonial_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_grid_parent_id_idx\` ON \`pages_blocks_testimonial_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_grid_path_idx\` ON \`pages_blocks_testimonial_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_grid_appearance_appearance_back_idx\` ON \`pages_blocks_testimonial_grid\` (\`appearance_background_image_id\`);`)
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_order_idx\` ON \`_pages_v_blocks_logo_marquee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_parent_id_idx\` ON \`_pages_v_blocks_logo_marquee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_path_idx\` ON \`_pages_v_blocks_logo_marquee\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_marquee_appearance_appearance_backg_idx\` ON \`_pages_v_blocks_logo_marquee\` (\`appearance_background_image_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_grid_order_idx\` ON \`_pages_v_blocks_testimonial_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_grid_parent_id_idx\` ON \`_pages_v_blocks_testimonial_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_grid_path_idx\` ON \`_pages_v_blocks_testimonial_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_grid_appearance_appearance_b_idx\` ON \`_pages_v_blocks_testimonial_grid\` (\`appearance_background_image_id\`);`)
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_order_idx\` ON \`case_studies_blocks_logo_marquee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_parent_id_idx\` ON \`case_studies_blocks_logo_marquee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_path_idx\` ON \`case_studies_blocks_logo_marquee\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_logo_marquee_appearance_appearance_b_idx\` ON \`case_studies_blocks_logo_marquee\` (\`appearance_background_image_id\`);`)
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_grid_order_idx\` ON \`case_studies_blocks_testimonial_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_grid_parent_id_idx\` ON \`case_studies_blocks_testimonial_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_grid_path_idx\` ON \`case_studies_blocks_testimonial_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_testimonial_grid_appearance_appearan_idx\` ON \`case_studies_blocks_testimonial_grid\` (\`appearance_background_image_id\`);`)
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_order_idx\` ON \`_case_studies_v_blocks_logo_marquee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_parent_id_idx\` ON \`_case_studies_v_blocks_logo_marquee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_path_idx\` ON \`_case_studies_v_blocks_logo_marquee\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_logo_marquee_appearance_appearanc_idx\` ON \`_case_studies_v_blocks_logo_marquee\` (\`appearance_background_image_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_grid_order_idx\` ON \`_case_studies_v_blocks_testimonial_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_grid_parent_id_idx\` ON \`_case_studies_v_blocks_testimonial_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_grid_path_idx\` ON \`_case_studies_v_blocks_testimonial_grid\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_testimonial_grid_appearance_appea_idx\` ON \`_case_studies_v_blocks_testimonial_grid\` (\`appearance_background_image_id\`);`)
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
  	\`appearance_glow_enabled\` integer,
  	\`appearance_glow_color\` text DEFAULT 'primary',
  	\`appearance_glow_size\` numeric DEFAULT 520,
  	\`appearance_glow_opacity\` numeric DEFAULT 100,
  	\`appearance_glow_position\` text DEFAULT 'top-left',
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
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_split_row\` (
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
  await db.run(sql`INSERT INTO \`__new_pages_blocks_split_row\`("_order", "_parent_id", "_path", "id", "tone", "wrap_section", "flipped", "text_tone", "eyebrow", "title", "body", "media_type", "video_url", "image_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "tone", "wrap_section", "flipped", "text_tone", "eyebrow", "title", "body", "media_type", "video_url", "image_id", "block_name" FROM \`pages_blocks_split_row\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_split_row\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_split_row\` RENAME TO \`pages_blocks_split_row\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_order_idx\` ON \`pages_blocks_split_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_parent_id_idx\` ON \`pages_blocks_split_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_path_idx\` ON \`pages_blocks_split_row\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_split_row_image_idx\` ON \`pages_blocks_split_row\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_signature_product\` (
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
  await db.run(sql`INSERT INTO \`__new_pages_blocks_signature_product\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "body", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "video_url", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "body", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "video_url", "block_name" FROM \`pages_blocks_signature_product\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_signature_product\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_signature_product\` RENAME TO \`pages_blocks_signature_product\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_order_idx\` ON \`pages_blocks_signature_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_parent_id_idx\` ON \`pages_blocks_signature_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_path_idx\` ON \`pages_blocks_signature_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_signature_product_button_link_button_link_p_idx\` ON \`pages_blocks_signature_product\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_split_row\` (
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
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_split_row\`("_order", "_parent_id", "_path", "id", "tone", "wrap_section", "flipped", "text_tone", "eyebrow", "title", "body", "media_type", "video_url", "image_id", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "tone", "wrap_section", "flipped", "text_tone", "eyebrow", "title", "body", "media_type", "video_url", "image_id", "_uuid", "block_name" FROM \`_pages_v_blocks_split_row\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_split_row\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_split_row\` RENAME TO \`_pages_v_blocks_split_row\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_order_idx\` ON \`_pages_v_blocks_split_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_parent_id_idx\` ON \`_pages_v_blocks_split_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_path_idx\` ON \`_pages_v_blocks_split_row\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_split_row_image_idx\` ON \`_pages_v_blocks_split_row\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_signature_product\` (
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
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_signature_product\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "body", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "video_url", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "body", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "video_url", "_uuid", "block_name" FROM \`_pages_v_blocks_signature_product\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_signature_product\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_signature_product\` RENAME TO \`_pages_v_blocks_signature_product\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_order_idx\` ON \`_pages_v_blocks_signature_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_parent_id_idx\` ON \`_pages_v_blocks_signature_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_path_idx\` ON \`_pages_v_blocks_signature_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_signature_product_button_link_button_lin_idx\` ON \`_pages_v_blocks_signature_product\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_split_row\` (
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
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_split_row\`("_order", "_parent_id", "_path", "id", "tone", "wrap_section", "flipped", "text_tone", "eyebrow", "title", "body", "media_type", "video_url", "image_id", "block_name") SELECT "_order", "_parent_id", "_path", "id", "tone", "wrap_section", "flipped", "text_tone", "eyebrow", "title", "body", "media_type", "video_url", "image_id", "block_name" FROM \`case_studies_blocks_split_row\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_split_row\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_split_row\` RENAME TO \`case_studies_blocks_split_row\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_order_idx\` ON \`case_studies_blocks_split_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_parent_id_idx\` ON \`case_studies_blocks_split_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_path_idx\` ON \`case_studies_blocks_split_row\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_split_row_image_idx\` ON \`case_studies_blocks_split_row\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_case_studies_blocks_signature_product\` (
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
  await db.run(sql`INSERT INTO \`__new_case_studies_blocks_signature_product\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "body", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "video_url", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "body", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "video_url", "block_name" FROM \`case_studies_blocks_signature_product\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_signature_product\`;`)
  await db.run(sql`ALTER TABLE \`__new_case_studies_blocks_signature_product\` RENAME TO \`case_studies_blocks_signature_product\`;`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_order_idx\` ON \`case_studies_blocks_signature_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_parent_id_idx\` ON \`case_studies_blocks_signature_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_path_idx\` ON \`case_studies_blocks_signature_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_signature_product_button_link_button_idx\` ON \`case_studies_blocks_signature_product\` (\`button_link_page_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_blocks_split_row\` (
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
  await db.run(sql`INSERT INTO \`__new__case_studies_v_blocks_split_row\`("_order", "_parent_id", "_path", "id", "tone", "wrap_section", "flipped", "text_tone", "eyebrow", "title", "body", "media_type", "video_url", "image_id", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "tone", "wrap_section", "flipped", "text_tone", "eyebrow", "title", "body", "media_type", "video_url", "image_id", "_uuid", "block_name" FROM \`_case_studies_v_blocks_split_row\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_split_row\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_blocks_split_row\` RENAME TO \`_case_studies_v_blocks_split_row\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_order_idx\` ON \`_case_studies_v_blocks_split_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_parent_id_idx\` ON \`_case_studies_v_blocks_split_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_path_idx\` ON \`_case_studies_v_blocks_split_row\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_split_row_image_idx\` ON \`_case_studies_v_blocks_split_row\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__case_studies_v_blocks_signature_product\` (
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
  await db.run(sql`INSERT INTO \`__new__case_studies_v_blocks_signature_product\`("_order", "_parent_id", "_path", "id", "eyebrow", "title", "body", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "video_url", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "eyebrow", "title", "body", "button_link_label", "button_link_type", "button_link_page_id", "button_link_url", "button_link_anchor", "button_link_style", "button_link_new_tab", "video_url", "_uuid", "block_name" FROM \`_case_studies_v_blocks_signature_product\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_signature_product\`;`)
  await db.run(sql`ALTER TABLE \`__new__case_studies_v_blocks_signature_product\` RENAME TO \`_case_studies_v_blocks_signature_product\`;`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_order_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_parent_id_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_path_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_signature_product_button_link_but_idx\` ON \`_case_studies_v_blocks_signature_product\` (\`button_link_page_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`case_studies_id\` integer REFERENCES case_studies(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_case_studies_id_idx\` ON \`pages_rels\` (\`case_studies_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`case_studies_id\` integer REFERENCES case_studies(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_case_studies_id_idx\` ON \`_pages_v_rels\` (\`case_studies_id\`);`)
  await db.run(sql`ALTER TABLE \`case_studies_rels\` ADD \`case_studies_id\` integer REFERENCES case_studies(id);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_case_studies_id_idx\` ON \`case_studies_rels\` (\`case_studies_id\`);`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_rels\` ADD \`case_studies_id\` integer REFERENCES case_studies(id);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_case_studies_id_idx\` ON \`_case_studies_v_rels\` (\`case_studies_id\`);`)
}
