import type { Document } from "mongoose";

export type MongooseSchemaProp<T> = {
  type: any;
  required?: boolean;
  unique?: boolean;
  default?: T | (() => T)
}

export type MongooseSchemaDef<T> = {
  [K in keyof T]-?: MongooseSchemaProp<T[K]>;
}

export type MongooseDocument<T> = T & Document;