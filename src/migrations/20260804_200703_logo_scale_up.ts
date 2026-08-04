import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip_logos\` ADD \`scale_up\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip_logos\` ADD \`scale_up\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_strip_logos\` ADD \`scale_up\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_strip_logos\` ADD \`scale_up\` integer DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip_logos\` DROP COLUMN \`scale_up\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip_logos\` DROP COLUMN \`scale_up\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_logo_strip_logos\` DROP COLUMN \`scale_up\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_logo_strip_logos\` DROP COLUMN \`scale_up\`;`)
}
