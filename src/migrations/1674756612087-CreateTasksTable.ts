import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTasksTable1674756612087 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'userId',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    default: "CURRENT_TIMESTAMP"
                }
            ]
        }));

        await queryRunner.createForeignKey('tasks', new TableForeignKey({
            name: 'tasks_user',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tasks', 'tasks_user');
        await queryRunner.dropTable('tasks');
    }

}
