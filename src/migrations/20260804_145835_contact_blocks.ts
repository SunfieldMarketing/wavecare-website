import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_hero_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_trust_items_order_idx\` ON \`pages_blocks_contact_hero_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_trust_items_parent_id_idx\` ON \`pages_blocks_contact_hero_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_hero_direct_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_direct_links_order_idx\` ON \`pages_blocks_contact_hero_direct_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_direct_links_parent_id_idx\` ON \`pages_blocks_contact_hero_direct_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_hero_form_chips\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_form_chips_order_idx\` ON \`pages_blocks_contact_hero_form_chips\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_form_chips_parent_id_idx\` ON \`pages_blocks_contact_hero_form_chips\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_contact_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_image_id\` integer,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`form_heading\` text DEFAULT 'Send us a message',
  	\`form_subheading\` text DEFAULT 'Prefer to talk?',
  	\`form_subheading_link_label\` text DEFAULT 'Book a demo instead →',
  	\`form_subheading_link_href\` text DEFAULT '#calendar',
  	\`form_name_label\` text DEFAULT 'Name',
  	\`form_name_placeholder\` text DEFAULT 'John Doe',
  	\`form_email_label\` text DEFAULT 'Email',
  	\`form_email_placeholder\` text DEFAULT 'john@example.com',
  	\`form_company_label\` text DEFAULT 'Facility / Company',
  	\`form_company_placeholder\` text DEFAULT 'Oakwood Senior Living',
  	\`form_chips_label\` text DEFAULT 'What do you need help with?',
  	\`form_message_label\` text DEFAULT 'Tell us about your facility (Optional)',
  	\`form_message_placeholder\` text DEFAULT 'A sentence or two about what you''re working on...',
  	\`form_submit_label\` text DEFAULT 'Send Message',
  	\`form_retry_label\` text DEFAULT 'Try Again',
  	\`form_note\` text DEFAULT 'Your information is secure and will never be shared.',
  	\`form_success_title\` text DEFAULT 'Message Sent!',
  	\`form_success_body\` text DEFAULT 'Thanks for reaching out. We will get back to you within one business day.',
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_order_idx\` ON \`pages_blocks_contact_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_parent_id_idx\` ON \`pages_blocks_contact_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_path_idx\` ON \`pages_blocks_contact_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_contact_hero_background_image_idx\` ON \`pages_blocks_contact_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_steps_order_idx\` ON \`pages_blocks_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_steps_parent_id_idx\` ON \`pages_blocks_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`heading_icon\` text,
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
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_order_idx\` ON \`pages_blocks_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_parent_id_idx\` ON \`pages_blocks_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_path_idx\` ON \`pages_blocks_steps\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_steps_appearance_appearance_background_imag_idx\` ON \`pages_blocks_steps\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_calendar_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`widget_id\` text,
  	\`min_height\` numeric DEFAULT 600,
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
  await db.run(sql`CREATE INDEX \`pages_blocks_calendar_embed_order_idx\` ON \`pages_blocks_calendar_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_calendar_embed_parent_id_idx\` ON \`pages_blocks_calendar_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_calendar_embed_path_idx\` ON \`pages_blocks_calendar_embed\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_calendar_embed_appearance_appearance_backgr_idx\` ON \`pages_blocks_calendar_embed\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_hero_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_trust_items_order_idx\` ON \`_pages_v_blocks_contact_hero_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_trust_items_parent_id_idx\` ON \`_pages_v_blocks_contact_hero_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_hero_direct_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_direct_links_order_idx\` ON \`_pages_v_blocks_contact_hero_direct_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_direct_links_parent_id_idx\` ON \`_pages_v_blocks_contact_hero_direct_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_hero_form_chips\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_form_chips_order_idx\` ON \`_pages_v_blocks_contact_hero_form_chips\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_form_chips_parent_id_idx\` ON \`_pages_v_blocks_contact_hero_form_chips\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_contact_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background_image_id\` integer,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`form_heading\` text DEFAULT 'Send us a message',
  	\`form_subheading\` text DEFAULT 'Prefer to talk?',
  	\`form_subheading_link_label\` text DEFAULT 'Book a demo instead →',
  	\`form_subheading_link_href\` text DEFAULT '#calendar',
  	\`form_name_label\` text DEFAULT 'Name',
  	\`form_name_placeholder\` text DEFAULT 'John Doe',
  	\`form_email_label\` text DEFAULT 'Email',
  	\`form_email_placeholder\` text DEFAULT 'john@example.com',
  	\`form_company_label\` text DEFAULT 'Facility / Company',
  	\`form_company_placeholder\` text DEFAULT 'Oakwood Senior Living',
  	\`form_chips_label\` text DEFAULT 'What do you need help with?',
  	\`form_message_label\` text DEFAULT 'Tell us about your facility (Optional)',
  	\`form_message_placeholder\` text DEFAULT 'A sentence or two about what you''re working on...',
  	\`form_submit_label\` text DEFAULT 'Send Message',
  	\`form_retry_label\` text DEFAULT 'Try Again',
  	\`form_note\` text DEFAULT 'Your information is secure and will never be shared.',
  	\`form_success_title\` text DEFAULT 'Message Sent!',
  	\`form_success_body\` text DEFAULT 'Thanks for reaching out. We will get back to you within one business day.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_order_idx\` ON \`_pages_v_blocks_contact_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_parent_id_idx\` ON \`_pages_v_blocks_contact_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_path_idx\` ON \`_pages_v_blocks_contact_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_contact_hero_background_image_idx\` ON \`_pages_v_blocks_contact_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_steps_steps_order_idx\` ON \`_pages_v_blocks_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_steps_steps_parent_id_idx\` ON \`_pages_v_blocks_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`heading_icon\` text,
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_steps_order_idx\` ON \`_pages_v_blocks_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_steps_parent_id_idx\` ON \`_pages_v_blocks_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_steps_path_idx\` ON \`_pages_v_blocks_steps\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_steps_appearance_appearance_background_i_idx\` ON \`_pages_v_blocks_steps\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_calendar_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`widget_id\` text,
  	\`min_height\` numeric DEFAULT 600,
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_calendar_embed_order_idx\` ON \`_pages_v_blocks_calendar_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_calendar_embed_parent_id_idx\` ON \`_pages_v_blocks_calendar_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_calendar_embed_path_idx\` ON \`_pages_v_blocks_calendar_embed\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_calendar_embed_appearance_appearance_bac_idx\` ON \`_pages_v_blocks_calendar_embed\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_contact_hero_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_trust_items_order_idx\` ON \`case_studies_blocks_contact_hero_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_trust_items_parent_id_idx\` ON \`case_studies_blocks_contact_hero_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_contact_hero_direct_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_direct_links_order_idx\` ON \`case_studies_blocks_contact_hero_direct_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_direct_links_parent_id_idx\` ON \`case_studies_blocks_contact_hero_direct_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_contact_hero_form_chips\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_form_chips_order_idx\` ON \`case_studies_blocks_contact_hero_form_chips\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_form_chips_parent_id_idx\` ON \`case_studies_blocks_contact_hero_form_chips\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_contact_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_image_id\` integer,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`form_heading\` text DEFAULT 'Send us a message',
  	\`form_subheading\` text DEFAULT 'Prefer to talk?',
  	\`form_subheading_link_label\` text DEFAULT 'Book a demo instead →',
  	\`form_subheading_link_href\` text DEFAULT '#calendar',
  	\`form_name_label\` text DEFAULT 'Name',
  	\`form_name_placeholder\` text DEFAULT 'John Doe',
  	\`form_email_label\` text DEFAULT 'Email',
  	\`form_email_placeholder\` text DEFAULT 'john@example.com',
  	\`form_company_label\` text DEFAULT 'Facility / Company',
  	\`form_company_placeholder\` text DEFAULT 'Oakwood Senior Living',
  	\`form_chips_label\` text DEFAULT 'What do you need help with?',
  	\`form_message_label\` text DEFAULT 'Tell us about your facility (Optional)',
  	\`form_message_placeholder\` text DEFAULT 'A sentence or two about what you''re working on...',
  	\`form_submit_label\` text DEFAULT 'Send Message',
  	\`form_retry_label\` text DEFAULT 'Try Again',
  	\`form_note\` text DEFAULT 'Your information is secure and will never be shared.',
  	\`form_success_title\` text DEFAULT 'Message Sent!',
  	\`form_success_body\` text DEFAULT 'Thanks for reaching out. We will get back to you within one business day.',
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_order_idx\` ON \`case_studies_blocks_contact_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_parent_id_idx\` ON \`case_studies_blocks_contact_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_path_idx\` ON \`case_studies_blocks_contact_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_contact_hero_background_image_idx\` ON \`case_studies_blocks_contact_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_steps_steps_order_idx\` ON \`case_studies_blocks_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_steps_steps_parent_id_idx\` ON \`case_studies_blocks_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`heading_icon\` text,
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_steps_order_idx\` ON \`case_studies_blocks_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_steps_parent_id_idx\` ON \`case_studies_blocks_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_steps_path_idx\` ON \`case_studies_blocks_steps\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_steps_appearance_appearance_backgrou_idx\` ON \`case_studies_blocks_steps\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_calendar_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`widget_id\` text,
  	\`min_height\` numeric DEFAULT 600,
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
  await db.run(sql`CREATE INDEX \`case_studies_blocks_calendar_embed_order_idx\` ON \`case_studies_blocks_calendar_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_calendar_embed_parent_id_idx\` ON \`case_studies_blocks_calendar_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_calendar_embed_path_idx\` ON \`case_studies_blocks_calendar_embed\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_calendar_embed_appearance_appearance_idx\` ON \`case_studies_blocks_calendar_embed\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_contact_hero_trust_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_trust_items_order_idx\` ON \`_case_studies_v_blocks_contact_hero_trust_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_trust_items_parent_id_idx\` ON \`_case_studies_v_blocks_contact_hero_trust_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_contact_hero_direct_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_direct_links_order_idx\` ON \`_case_studies_v_blocks_contact_hero_direct_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_direct_links_parent_id_idx\` ON \`_case_studies_v_blocks_contact_hero_direct_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_contact_hero_form_chips\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_contact_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_form_chips_order_idx\` ON \`_case_studies_v_blocks_contact_hero_form_chips\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_form_chips_parent_id_idx\` ON \`_case_studies_v_blocks_contact_hero_form_chips\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_contact_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background_image_id\` integer,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`form_heading\` text DEFAULT 'Send us a message',
  	\`form_subheading\` text DEFAULT 'Prefer to talk?',
  	\`form_subheading_link_label\` text DEFAULT 'Book a demo instead →',
  	\`form_subheading_link_href\` text DEFAULT '#calendar',
  	\`form_name_label\` text DEFAULT 'Name',
  	\`form_name_placeholder\` text DEFAULT 'John Doe',
  	\`form_email_label\` text DEFAULT 'Email',
  	\`form_email_placeholder\` text DEFAULT 'john@example.com',
  	\`form_company_label\` text DEFAULT 'Facility / Company',
  	\`form_company_placeholder\` text DEFAULT 'Oakwood Senior Living',
  	\`form_chips_label\` text DEFAULT 'What do you need help with?',
  	\`form_message_label\` text DEFAULT 'Tell us about your facility (Optional)',
  	\`form_message_placeholder\` text DEFAULT 'A sentence or two about what you''re working on...',
  	\`form_submit_label\` text DEFAULT 'Send Message',
  	\`form_retry_label\` text DEFAULT 'Try Again',
  	\`form_note\` text DEFAULT 'Your information is secure and will never be shared.',
  	\`form_success_title\` text DEFAULT 'Message Sent!',
  	\`form_success_body\` text DEFAULT 'Thanks for reaching out. We will get back to you within one business day.',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_order_idx\` ON \`_case_studies_v_blocks_contact_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_parent_id_idx\` ON \`_case_studies_v_blocks_contact_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_path_idx\` ON \`_case_studies_v_blocks_contact_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_contact_hero_background_image_idx\` ON \`_case_studies_v_blocks_contact_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`title\` text,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v_blocks_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_steps_steps_order_idx\` ON \`_case_studies_v_blocks_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_steps_steps_parent_id_idx\` ON \`_case_studies_v_blocks_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`heading_icon\` text,
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_steps_order_idx\` ON \`_case_studies_v_blocks_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_steps_parent_id_idx\` ON \`_case_studies_v_blocks_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_steps_path_idx\` ON \`_case_studies_v_blocks_steps\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_steps_appearance_appearance_backg_idx\` ON \`_case_studies_v_blocks_steps\` (\`appearance_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_calendar_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading_eyebrow\` text,
  	\`heading_title\` text,
  	\`heading_subtitle\` text,
  	\`heading_align\` text DEFAULT 'left',
  	\`widget_id\` text,
  	\`min_height\` numeric DEFAULT 600,
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
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_calendar_embed_order_idx\` ON \`_case_studies_v_blocks_calendar_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_calendar_embed_parent_id_idx\` ON \`_case_studies_v_blocks_calendar_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_calendar_embed_path_idx\` ON \`_case_studies_v_blocks_calendar_embed\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_calendar_embed_appearance_appeara_idx\` ON \`_case_studies_v_blocks_calendar_embed\` (\`appearance_background_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_contact_hero_trust_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_hero_direct_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_hero_form_chips\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_contact_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_calendar_embed\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_hero_trust_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_hero_direct_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_hero_form_chips\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_contact_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_calendar_embed\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_contact_hero_trust_items\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_contact_hero_direct_links\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_contact_hero_form_chips\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_contact_hero\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_calendar_embed\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_contact_hero_trust_items\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_contact_hero_direct_links\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_contact_hero_form_chips\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_contact_hero\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_steps\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_calendar_embed\`;`)
}
