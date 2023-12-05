
import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { DatabaseColumn } from "../constants/database.constant";

export abstract class ModelBaseEntity extends BaseEntity{
  @CreateDateColumn({
    type: "datetime",
    name: DatabaseColumn.CREATED_DATE,
    })
  createdDate: Date;

  @UpdateDateColumn({
   type: "datetime",
   name: DatabaseColumn.MODIFIED_DATE,
  })
  modifiedDate: Date;

}
