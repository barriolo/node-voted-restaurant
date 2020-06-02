import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderID1590981217768
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('votes', 'provider');
    await queryRunner.addColumn(
      'votes',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'votes',
      new TableForeignKey({
        name: 'VoteProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('votes', 'VoteProvider');
    await queryRunner.dropColumn('votes', 'provider_id');
    await queryRunner.addColumn(
      'votes',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
