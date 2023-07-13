/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "item";

export interface Item {
  id?: number | undefined;
  name?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  quantity?: number | undefined;
  createdAt?: Timestamp | undefined;
  updatedAt?: Timestamp | undefined;
}

export interface CreateItemRequest {
  name?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  quantity?: number | undefined;
}

export const ITEM_PACKAGE_NAME = "item";
