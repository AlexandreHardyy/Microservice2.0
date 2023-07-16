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

export interface FindRequest {
  id?: number | undefined;
  name?: string | undefined;
}

export interface FindResponse {
  item?: Item[] | undefined;
}

export interface UpdateRequest {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  price?: string | undefined;
  quantity?: string | undefined;
}

export interface UpdateResponse {
  item?: Item | undefined;
}

export interface DeleteRequest {
  id?: string | undefined;
}

export interface DeleteResponse {
  item?: Item | undefined;
}

export interface BuyRequest {
  id?: string | undefined;
  ccNumber?: string | undefined;
  ccName?: string | undefined;
}

export interface BuyResponse {
  item?: Item | undefined;
  message?: string | undefined;
}

export const ITEM_PACKAGE_NAME = "item";
