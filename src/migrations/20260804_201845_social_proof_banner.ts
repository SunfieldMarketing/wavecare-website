import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_social_proof_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`background\` text DEFAULT '#062A24',
  	\`border_color\` text DEFAULT 'rgba(255,255,255,0.05)',
  	\`text_color\` text DEFAULT 'var(--teal-bright)',
  	\`uppercase\` integer DEFAULT true,
  	\`font_size\` text DEFAULT '12px',
  	\`font_weight\` text DEFAULT '600',
  	\`letter_spacing\` text DEFAULT '0.15em',
  	\`max_width\` text,
  	\`padding\` text DEFAULT '24px 0',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_social_proof_banner_order_idx\` ON \`pages_blocks_social_proof_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_social_proof_banner_parent_id_idx\` ON \`pages_blocks_social_proof_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_social_proof_banner_path_idx\` ON \`pages_blocks_social_proof_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_social_proof_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`background\` text DEFAULT '#062A24',
  	\`border_color\` text DEFAULT 'rgba(255,255,255,0.05)',
  	\`text_color\` text DEFAULT 'var(--teal-bright)',
  	\`uppercase\` integer DEFAULT true,
  	\`font_size\` text DEFAULT '12px',
  	\`font_weight\` text DEFAULT '600',
  	\`letter_spacing\` text DEFAULT '0.15em',
  	\`max_width\` text,
  	\`padding\` text DEFAULT '24px 0',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_social_proof_banner_order_idx\` ON \`_pages_v_blocks_social_proof_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_social_proof_banner_parent_id_idx\` ON \`_pages_v_blocks_social_proof_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_social_proof_banner_path_idx\` ON \`_pages_v_blocks_social_proof_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_blocks_social_proof_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`background\` text DEFAULT '#062A24',
  	\`border_color\` text DEFAULT 'rgba(255,255,255,0.05)',
  	\`text_color\` text DEFAULT 'var(--teal-bright)',
  	\`uppercase\` integer DEFAULT true,
  	\`font_size\` text DEFAULT '12px',
  	\`font_weight\` text DEFAULT '600',
  	\`letter_spacing\` text DEFAULT '0.15em',
  	\`max_width\` text,
  	\`padding\` text DEFAULT '24px 0',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_social_proof_banner_order_idx\` ON \`case_studies_blocks_social_proof_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_social_proof_banner_parent_id_idx\` ON \`case_studies_blocks_social_proof_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_blocks_social_proof_banner_path_idx\` ON \`case_studies_blocks_social_proof_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_blocks_social_proof_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`background\` text DEFAULT '#062A24',
  	\`border_color\` text DEFAULT 'rgba(255,255,255,0.05)',
  	\`text_color\` text DEFAULT 'var(--teal-bright)',
  	\`uppercase\` integer DEFAULT true,
  	\`font_size\` text DEFAULT '12px',
  	\`font_weight\` text DEFAULT '600',
  	\`letter_spacing\` text DEFAULT '0.15em',
  	\`max_width\` text,
  	\`padding\` text DEFAULT '24px 0',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_social_proof_banner_order_idx\` ON \`_case_studies_v_blocks_social_proof_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_social_proof_banner_parent_id_idx\` ON \`_case_studies_v_blocks_social_proof_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_blocks_social_proof_banner_path_idx\` ON \`_case_studies_v_blocks_social_proof_banner\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_social_proof_banner\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_social_proof_banner\`;`)
  await db.run(sql`DROP TABLE \`case_studies_blocks_social_proof_banner\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_blocks_social_proof_banner\`;`)
}
