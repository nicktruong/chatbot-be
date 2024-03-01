import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FlowTypeEnum } from '@/api/flow-type/enums';
import { NodeTypeEnum } from '@/api/node-type/enums';

@Injectable()
export class FlowTypeNodeTypeSeedService {
  constructor(private configService: ConfigService) {}

  async run() {
    const dataSource = new DataSource(this.configService.get('db'));
    await dataSource.initialize();

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    const recordsCount = await queryRunner.query(
      `SELECT COUNT(*) FROM flow_types_node_types_node_types`,
    );

    // Create mainFlow default nodes
    if (+recordsCount[0].count === 0) {
      const mainFlow = await queryRunner.query(
        `SELECT * FROM flow_types WHERE type = $1 LIMIT 1`,
        [FlowTypeEnum.MAIN],
      );
      const mainFlowId = mainFlow[0].id;

      const nodeStart = await queryRunner.query(
        `SELECT * FROM node_types WHERE type = $1 LIMIT 1`,
        [NodeTypeEnum.START],
      );
      const nodeStartId = nodeStart[0].id;

      const nodeEnd = await queryRunner.query(
        `SELECT * FROM node_types WHERE type = $1 LIMIT 1`,
        [NodeTypeEnum.END],
      );
      const nodeEndId = nodeEnd[0].id;

      await queryRunner.query(
        `INSERT INTO flow_types_node_types_node_types (flow_types_id, node_types_id) VALUES ($1, $2)`,
        [mainFlowId, nodeStartId],
      );
      await queryRunner.query(
        `INSERT INTO flow_types_node_types_node_types (flow_types_id, node_types_id) VALUES ($1, $2)`,
        [mainFlowId, nodeEndId],
      );
    }

    await queryRunner.release();
    await dataSource.destroy();
  }
}
