
import { BaseEntity, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { DatabaseColumn } from "../constants/database.constant";

export abstract class ModelBaseEntity extends BaseEntity {
  @CreateDateColumn({
    type: "timestamp",
    name: DatabaseColumn.CREATED_DATE,
  })
  createdDate: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: DatabaseColumn.MODIFIED_DATE,
  })
  modifiedDate: Date;


  @BeforeInsert()
  insertCreated() {
    this.createdDate = new Date();
    this.modifiedDate = new Date();
  }

  @BeforeUpdate()
  insertUpdated() {
    this.createdDate = new Date();
    this.modifiedDate = new Date();
  }

}
