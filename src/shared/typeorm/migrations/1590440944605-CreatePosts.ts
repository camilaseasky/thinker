import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePosts1590440944605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'posts',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'content',
                  type: 'varchar',
                },
                {
                  name: 'date',
                  type: 'timestamp with time zone',
                },

                {
                    name: 'user_id',
                    type: 'uuid',
                },
               
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
              foreignKeys: [
                {
                  name: 'FkUserId',
                  columnNames: ['user_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'users',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('posts', 'FkUserId');
        await queryRunner.dropTable('posts');
    }

}
