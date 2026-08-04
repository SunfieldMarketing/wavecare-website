import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_print_hero\` ADD \`subtitle_style\` text DEFAULT 'sub';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_print_hero\` ADD \`subtitle_style\` text DEFAULT 'sub';`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_print_hero\` ADD \`subtitle_style\` text DEFAULT 'sub';`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_print_hero\` ADD \`subtitle_style\` text DEFAULT 'sub';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_print_hero\` DROP COLUMN \`subtitle_style\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_print_hero\` DROP COLUMN \`subtitle_style\`;`)
  await db.run(sql`ALTER TABLE \`case_studies_blocks_print_hero\` DROP COLUMN \`subtitle_style\`;`)
  await db.run(sql`ALTER TABLE \`_case_studies_v_blocks_print_hero\` DROP COLUMN \`subtitle_style\`;`)
}
