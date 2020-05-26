import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComments1590440954531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'comments',
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
                    name: 'post_id',
                    type: 'uuid',
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
                  name: 'FkPostId',
                  columnNames: ['post_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'posts',
                  onUpdate: 'CASCADE',
                  onDelete: 'CASCADE',
                },
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
        await queryRunner.dropForeignKey('comments', 'FkUserId');
        await queryRunner.dropForeignKey('comments', 'FkPostId');
        await queryRunner.dropTable('comments');
    }

}
