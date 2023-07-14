/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  CreateItemRequest,
  DeleteRequest,
  DeleteResponse,
  FindRequest,
  FindResponse,
  Item,
  UpdateRequest,
  UpdateResponse,
} from "./message";

export const protobufPackage = "item";

export const ITEM_PACKAGE_NAME = "item";

export interface ItemServiceClient {
  createItem(request: CreateItemRequest, metadata?: Metadata): Observable<Item>;

  find(request: FindRequest, metadata?: Metadata): Observable<FindResponse>;

  udpateItem(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  deleteItem(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface ItemServiceController {
  createItem(request: CreateItemRequest, metadata?: Metadata): Promise<Item> | Observable<Item> | Item;

  find(request: FindRequest, metadata?: Metadata): Promise<FindResponse> | Observable<FindResponse> | FindResponse;

  udpateItem(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  deleteItem(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function ItemServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createItem", "find", "udpateItem", "deleteItem"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ItemService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ItemService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEM_SERVICE_NAME = "ItemService";
