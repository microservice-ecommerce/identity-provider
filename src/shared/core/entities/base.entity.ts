
import { IModelBase } from "@high3ar/common-api";
import { BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { DatabaseColumn } from "../constants/database.constant";

export abstract class ModelBaseEntity implements IModelBase {
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
    this.modifiedDate = new Date();
  }

}
