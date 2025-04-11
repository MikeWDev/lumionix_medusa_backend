import { Migration } from '@mikro-orm/migrations';

export class Migration20250409091939 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "event" drop column if exists "ref";`);

    this.addSql(`alter table if exists "event" add column if not exists "utm_source" text null, add column if not exists "utm_medium" text null, add column if not exists "utm_campaign" text null, add column if not exists "utm_term" text null, add column if not exists "utm_content" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "event" drop column if exists "utm_source", drop column if exists "utm_medium", drop column if exists "utm_campaign", drop column if exists "utm_term", drop column if exists "utm_content";`);

    this.addSql(`alter table if exists "event" add column if not exists "ref" text not null;`);
  }

}
