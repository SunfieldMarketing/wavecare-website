import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Enables drafts + Live Preview on Navigation, Footer, Theme, and Site
 * Settings - matching Slate Cinema's model, where every global (not just
 * Pages/CaseStudies) has a draft/publish distinction. See
 * CMS-PARITY-HANDOFF.md 7.3, which flagged the gap explicitly as "a
 * decision for whoever owns this content, not something to assume" -
 * decided 2026-08-27.
 *
 * Hand-written, replacing an auto-generated migration
 * (20260827_070206_enable_drafts_shared_globals, deleted) that failed
 * partway through and has been removed rather than left broken in the
 * migrations folder. Two real bugs in Payload/drizzle's own generated SQL,
 * confirmed by reading the failure and then re-checking the rest of that
 * file for the same pattern rather than assuming it was a one-off:
 *
 * 1. Its INSERT...SELECT for rebuilding `site_settings` (to relax the
 *    NOT NULL on `site_name`, a required:true field, alongside adding the
 *    new `_status` column) tried to SELECT "_status" FROM the OLD
 *    `site_settings` table - which doesn't have that column yet, since
 *    it's the exact thing being added by this same statement. Failed with
 *    "no such column: _status" partway through the batch.
 * 2. The identical mistake was present in the `_site_settings_v` rebuild
 *    a few statements later (SELECT "version__status" FROM the OLD
 *    `_site_settings_v`) - never reached in the failed run since it
 *    aborted first, but would have failed the same way.
 *
 * Confirmed via direct inspection of the live database after the failure
 * (not assumed) that every OTHER statement in that file - the
 * navigation/footer sub-table rebuilds (items, columns, social links,
 * legal links, and their _v_version_* counterparts), which needed the
 * same NOT NULL relaxation on their own required:true fields - had
 * already executed successfully and are NOT repeated here. This migration
 * picks up exactly where that one stopped: finishing `site_settings`
 * (fixed) and its version tables, then adding `_status` to the four
 * top-level global tables and `version__status`/`latest` to their version
 * tables the same simple way (plain ALTER ADD, no rebuild needed since
 * none of navigation/footer/theme's own top-level fields are
 * required:true).
 *
 * The part an auto-generated migration has no way to get right on its
 * own: a schema DEFAULT of 'draft' on a brand-new `_status` column
 * applies to EXISTING rows too, not just future ones. These four globals
 * have been live, publicly-visible content the whole time - defaulting
 * their one real row each to 'draft' would make Navigation/Footer/Theme/
 * Site Settings invisible to every anonymous visitor the moment this
 * migration finished, until someone happened to open and re-save each
 * one in admin. The explicit UPDATE statements at the end mark existing
 * content 'published' immediately, so nothing changes for a live visitor
 * - the new draft/publish distinction only affects the NEXT edit onward.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Orphaned by the aborted first attempt: its CREATE succeeded, the
  // broken INSERT right after it did not, so it was never dropped/renamed
  // and never got any rows.
  await db.run(sql`DROP TABLE IF EXISTS \`__new_site_settings\`;`)

  await db.run(sql`PRAGMA foreign_keys=OFF;`)

  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text DEFAULT 'Wavecare Marketing',
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
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  // FIXED: "_status" removed from the source SELECT list - it doesn't
  // exist in the old `site_settings` table. Omitting it from the INSERT
  // column list entirely lets SQLite fill the new column's own DEFAULT
  // ('draft') for the copied row, corrected to 'published' below.
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "site_name", "tagline", "description", "email", "phone", "address_street", "address_city", "address_state", "address_zip", "default_title", "title_template", "default_description", "default_og_image_id", "site_url", "tracking_ga4_id", "tracking_google_ads_id", "tracking_meta_pixel_id", "tracking_posthog_key", "cookie_banner_enabled", "cookie_banner_text", "cookie_banner_accept_label", "cookie_banner_decline_label", "updated_at", "created_at") SELECT "id", "site_name", "tagline", "description", "email", "phone", "address_street", "address_city", "address_state", "address_zip", "default_title", "title_template", "default_description", "default_og_image_id", "site_url", "tracking_ga4_id", "tracking_google_ads_id", "tracking_meta_pixel_id", "tracking_posthog_key", "cookie_banner_enabled", "cookie_banner_text", "cookie_banner_accept_label", "cookie_banner_decline_label", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_default_og_image_idx\` ON \`site_settings\` (\`default_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings__status_idx\` ON \`site_settings\` (\`_status\`);`)

  await db.run(sql`CREATE TABLE \`__new__site_settings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_site_name\` text DEFAULT 'Wavecare Marketing',
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
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  // Same fix as above: "version__status" dropped from the source list.
  await db.run(sql`INSERT INTO \`__new__site_settings_v\`("id", "version_site_name", "version_tagline", "version_description", "version_email", "version_phone", "version_address_street", "version_address_city", "version_address_state", "version_address_zip", "version_default_title", "version_title_template", "version_default_description", "version_default_og_image_id", "version_site_url", "version_tracking_ga4_id", "version_tracking_google_ads_id", "version_tracking_meta_pixel_id", "version_tracking_posthog_key", "version_cookie_banner_enabled", "version_cookie_banner_text", "version_cookie_banner_accept_label", "version_cookie_banner_decline_label", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "version_site_name", "version_tagline", "version_description", "version_email", "version_phone", "version_address_street", "version_address_city", "version_address_state", "version_address_zip", "version_default_title", "version_title_template", "version_default_description", "version_default_og_image_id", "version_site_url", "version_tracking_ga4_id", "version_tracking_google_ads_id", "version_tracking_meta_pixel_id", "version_tracking_posthog_key", "version_cookie_banner_enabled", "version_cookie_banner_text", "version_cookie_banner_accept_label", "version_cookie_banner_decline_label", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v\` RENAME TO \`_site_settings_v\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_default_og_image_idx\` ON \`_site_settings_v\` (\`version_default_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version__status_idx\` ON \`_site_settings_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_latest_idx\` ON \`_site_settings_v\` (\`latest\`);`)

  // Same required:true -> nullable relaxation the sibling sub-tables
  // (navigation_items, footer_columns, etc.) already got in the first,
  // partially-successful run - kept here for full consistency, this one
  // table's rebuild just never got reached.
  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_knows_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`term\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_knows_about\`("_order", "_parent_id", "id", "term", "_uuid") SELECT "_order", "_parent_id", "id", "term", "_uuid" FROM \`_site_settings_v_version_knows_about\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_knows_about\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_knows_about\` RENAME TO \`_site_settings_v_version_knows_about\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_knows_about_order_idx\` ON \`_site_settings_v_version_knows_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_knows_about_parent_id_idx\` ON \`_site_settings_v_version_knows_about\` (\`_parent_id\`);`)

  // navigation/footer/theme's own top-level fields have no required:true
  // simple fields, so (unlike site_settings) a plain ALTER ADD is enough -
  // no rebuild needed. These three statements are unchanged from the
  // aborted first migration; they were never reached, not broken.
  await db.run(sql`ALTER TABLE \`navigation\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`navigation__status_idx\` ON \`navigation\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_navigation_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_navigation_v\` ADD \`latest\` integer;`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_version__status_idx\` ON \`_navigation_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_latest_idx\` ON \`_navigation_v\` (\`latest\`);`)

  await db.run(sql`ALTER TABLE \`footer\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`footer__status_idx\` ON \`footer\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_footer_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_footer_v\` ADD \`latest\` integer;`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_version__status_idx\` ON \`_footer_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_latest_idx\` ON \`_footer_v\` (\`latest\`);`)

  await db.run(sql`ALTER TABLE \`theme\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`theme__status_idx\` ON \`theme\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_theme_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_theme_v\` ADD \`latest\` integer;`)
  await db.run(sql`CREATE INDEX \`_theme_v_version_version__status_idx\` ON \`_theme_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_latest_idx\` ON \`_theme_v\` (\`latest\`);`)

  // Not part of what payload migrate:create generates on its own, and the
  // whole reason this migration was hand-reviewed instead of run as-is:
  // every one of these four globals already had real, live, public
  // content before this migration - none of it was ever a "draft" in any
  // meaningful sense. Without this, the schema DEFAULT of 'draft' above
  // would apply to the existing row too, and publishedOrAuthenticated's
  // `_status: 'published'` check (added in the same code change as this
  // migration) would make Navigation/Footer/Theme/Site Settings return
  // nothing to an anonymous visitor until someone opened and re-saved
  // each one in admin.
  await db.run(sql`UPDATE \`navigation\` SET \`_status\` = 'published' WHERE \`_status\` IS NULL OR \`_status\` = 'draft';`)
  await db.run(sql`UPDATE \`footer\` SET \`_status\` = 'published' WHERE \`_status\` IS NULL OR \`_status\` = 'draft';`)
  await db.run(sql`UPDATE \`theme\` SET \`_status\` = 'published' WHERE \`_status\` IS NULL OR \`_status\` = 'draft';`)
  await db.run(sql`UPDATE \`site_settings\` SET \`_status\` = 'published' WHERE \`_status\` IS NULL OR \`_status\` = 'draft';`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`navigation__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`navigation\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_navigation_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_navigation_v_latest_idx\`;`)
  await db.run(sql`ALTER TABLE \`_navigation_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_navigation_v\` DROP COLUMN \`latest\`;`)

  await db.run(sql`DROP INDEX \`footer__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_footer_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_footer_v_latest_idx\`;`)
  await db.run(sql`ALTER TABLE \`_footer_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_footer_v\` DROP COLUMN \`latest\`;`)

  await db.run(sql`DROP INDEX \`theme__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`theme\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_theme_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_theme_v_latest_idx\`;`)
  await db.run(sql`ALTER TABLE \`_theme_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_theme_v\` DROP COLUMN \`latest\`;`)

  await db.run(sql`PRAGMA foreign_keys=OFF;`)

  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
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
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "site_name", "tagline", "description", "email", "phone", "address_street", "address_city", "address_state", "address_zip", "default_title", "title_template", "default_description", "default_og_image_id", "site_url", "tracking_ga4_id", "tracking_google_ads_id", "tracking_meta_pixel_id", "tracking_posthog_key", "cookie_banner_enabled", "cookie_banner_text", "cookie_banner_accept_label", "cookie_banner_decline_label", "updated_at", "created_at") SELECT "id", "site_name", "tagline", "description", "email", "phone", "address_street", "address_city", "address_state", "address_zip", "default_title", "title_template", "default_description", "default_og_image_id", "site_url", "tracking_ga4_id", "tracking_google_ads_id", "tracking_meta_pixel_id", "tracking_posthog_key", "cookie_banner_enabled", "cookie_banner_text", "cookie_banner_accept_label", "cookie_banner_decline_label", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_default_og_image_idx\` ON \`site_settings\` (\`default_og_image_id\`);`)

  await db.run(sql`CREATE TABLE \`__new__site_settings_v\` (
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
  await db.run(sql`INSERT INTO \`__new__site_settings_v\`("id", "version_site_name", "version_tagline", "version_description", "version_email", "version_phone", "version_address_street", "version_address_city", "version_address_state", "version_address_zip", "version_default_title", "version_title_template", "version_default_description", "version_default_og_image_id", "version_site_url", "version_tracking_ga4_id", "version_tracking_google_ads_id", "version_tracking_meta_pixel_id", "version_tracking_posthog_key", "version_cookie_banner_enabled", "version_cookie_banner_text", "version_cookie_banner_accept_label", "version_cookie_banner_decline_label", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "version_site_name", "version_tagline", "version_description", "version_email", "version_phone", "version_address_street", "version_address_city", "version_address_state", "version_address_zip", "version_default_title", "version_title_template", "version_default_description", "version_default_og_image_id", "version_site_url", "version_tracking_ga4_id", "version_tracking_google_ads_id", "version_tracking_meta_pixel_id", "version_tracking_posthog_key", "version_cookie_banner_enabled", "version_cookie_banner_text", "version_cookie_banner_accept_label", "version_cookie_banner_decline_label", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v\` RENAME TO \`_site_settings_v\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_default_og_image_idx\` ON \`_site_settings_v\` (\`version_default_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)

  await db.run(sql`CREATE TABLE \`__new__site_settings_v_version_knows_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`term\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__site_settings_v_version_knows_about\`("_order", "_parent_id", "id", "term", "_uuid") SELECT "_order", "_parent_id", "id", "term", "_uuid" FROM \`_site_settings_v_version_knows_about\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_knows_about\`;`)
  await db.run(sql`ALTER TABLE \`__new__site_settings_v_version_knows_about\` RENAME TO \`_site_settings_v_version_knows_about\`;`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_knows_about_order_idx\` ON \`_site_settings_v_version_knows_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_knows_about_parent_id_idx\` ON \`_site_settings_v_version_knows_about\` (\`_parent_id\`);`)

  // Note: this down does not re-tighten the NOT NULL constraints on
  // navigation_items/footer_columns/etc.'s required:true fields (label,
  // heading, platform, url, term) - those were relaxed by the FIRST
  // migration attempt, which succeeded for those specific tables before
  // failing elsewhere and being deleted. Reversing them would mean
  // reproducing that migration's own rebuild statements here for no
  // functional benefit (a wider-than-strictly-needed column is harmless),
  // so this down only reverses what THIS migration itself added.
}
