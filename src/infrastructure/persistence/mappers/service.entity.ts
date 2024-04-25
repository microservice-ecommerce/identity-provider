import { IService } from '@service/domain/interfaces';
import { ColumnName } from '@shared/domain/constants/database.constant';
import { TableName } from '@shared/domain/constants/table-name.constant';
import { AuditSoftDeleteBaseEntity } from '@shared/domain/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity(TableName.SERVICE)
export class ServiceEntity extends AuditSoftDeleteBaseEntity implements IService {
  constructor(props: IService) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: ColumnName.ID_SERVICE })
  id: number;

  @Column({ name: ColumnName.SERVICE_NAME })
  serviceName: string;

  @Column({ name: ColumnName.DESCRIPTION, default: null })
  description?: string;
}
