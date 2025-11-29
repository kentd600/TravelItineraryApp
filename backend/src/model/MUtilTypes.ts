import type { Document } from "mongoose";

export type MongooseSchemaProp<T> = {
  type: any;
  of?: any;
  required?: boolean;
  unique?: boolean;
  default?: T | (() => T)
  ref?: string
}

export type MongooseSchemaDef<T> = {
  [K in keyof T]-?: MongooseSchemaProp<T[K]>;
}

export type MongooseDocument<T> = T & Document;