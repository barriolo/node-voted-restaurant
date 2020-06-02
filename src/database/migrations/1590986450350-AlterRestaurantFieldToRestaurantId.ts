import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterRestaurantFieldToRestaurantId1590986450350
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('votes', 'restaurant_id');
    await queryRunner.addColumn(
      'votes',
      new TableColumn({
        name: 'restaurant_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'votes',
      new TableForeignKey({
        name: 'VoteRestaurant',
        columnNames: ['restaurant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'restaurants',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('votes', 'VoteRestaurant');
    await queryRunner.dropColumn('votes', 'restaurant_id');
    await queryRunner.addColumn(
      'votes',
      new TableColumn({
        name: 'restaurant_id',
        type: 'varchar',
      }),
    );
  }
}
