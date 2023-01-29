import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTasksTagsTable1674763766953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tasks_tags',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'tasksId',
                    type: 'uuid',
                },
                {
                    name: 'tagsId',
                    type: 'uuid'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }));

        await queryRunner.createForeignKey('tasks_tags', new TableForeignKey({
            name: 'tasks_tags_tasks',
            columnNames: ['tasksId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tasks'
        }));

        await queryRunner.createForeignKey('tasks_tags', new TableForeignKey({
            name: 'tasks_tags_tags',
            columnNames: ['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tasks_tags', 'tasks_tags_tags');
        await queryRunner.dropForeignKey('tasks_tags', 'tasks_tags_tasks');
        await queryRunner.dropTable('tasks_tags');
    }

}
