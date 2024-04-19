import { IURL } from "@authorization/domain/interfaces";
import { DatabaseColumn } from "@shared/core/constants/database.constant";
import { AuditBaseEntity } from "@shared/core/entities";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class URLEntity extends AuditBaseEntity implements IURL{
  constructor(props: IURL) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_URL })
  id: number;

  @Column({ name: DatabaseColumn.URL })
  url: string;
}
