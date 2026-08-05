import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`variant\` text DEFAULT 'services';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`variant\` text DEFAULT 'services';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_strip\` ADD \`variant\` text DEFAULT 'services';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_strip\` ADD \`variant\` text DEFAULT 'services';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`variant\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`variant\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_strip\` DROP COLUMN \`variant\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_strip\` DROP COLUMN \`variant\`;`)
}
