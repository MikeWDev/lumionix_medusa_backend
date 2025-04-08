import { Migration } from '@mikro-orm/migrations';

export class Migration20250408143524 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "event" ("id" text not null, "ref" text not null, "date" timestamptz not null, "event" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "event_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_event_deleted_at" ON "event" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "event" cascade;`);
  }

}
