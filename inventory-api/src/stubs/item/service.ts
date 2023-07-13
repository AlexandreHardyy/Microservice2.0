/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { CreateItemRequest, Item } from "./message";

export const protobufPackage = "item";

export const ITEM_PACKAGE_NAME = "item";

export interface ItemServiceClient {
  createItem(request: CreateItemRequest, metadata?: Metadata): Observable<Item>;
}

export interface ItemServiceController {
  createItem(request: CreateItemRequest, metadata?: Metadata): Promise<Item> | Observable<Item> | Item;
}

export function ItemServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createItem"];
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
