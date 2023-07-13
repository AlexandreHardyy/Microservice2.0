/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  CreateInventoryRequest,
  DeleteInventoryRequest,
  GetInventoryRequest,
  Inventory,
  ListInventorysRequest,
  ListInventorysResponse,
  StreamInventorysRequest,
  StreamInventorysResponse,
  UpdateInventoryRequest,
} from "./message";

export const protobufPackage = "inventory";

export const INVENTORY_PACKAGE_NAME = "inventory";

export interface InventoryServiceClient {
  listInventorys(request: ListInventorysRequest, metadata?: Metadata): Observable<ListInventorysResponse>;

  getInventory(request: GetInventoryRequest, metadata?: Metadata): Observable<Inventory>;

  createInventory(request: CreateInventoryRequest, metadata?: Metadata): Observable<Inventory>;

  updateInventory(request: UpdateInventoryRequest, metadata?: Metadata): Observable<Inventory>;

  deleteInventory(request: DeleteInventoryRequest, metadata?: Metadata): Observable<Inventory>;

  streamInventorys(request: StreamInventorysRequest, metadata?: Metadata): Observable<StreamInventorysResponse>;
}

export interface InventoryServiceController {
  listInventorys(
    request: ListInventorysRequest,
    metadata?: Metadata,
  ): Promise<ListInventorysResponse> | Observable<ListInventorysResponse> | ListInventorysResponse;

  getInventory(
    request: GetInventoryRequest,
    metadata?: Metadata,
  ): Promise<Inventory> | Observable<Inventory> | Inventory;

  createInventory(
    request: CreateInventoryRequest,
    metadata?: Metadata,
  ): Promise<Inventory> | Observable<Inventory> | Inventory;

  updateInventory(
    request: UpdateInventoryRequest,
    metadata?: Metadata,
  ): Promise<Inventory> | Observable<Inventory> | Inventory;

  deleteInventory(
    request: DeleteInventoryRequest,
    metadata?: Metadata,
  ): Promise<Inventory> | Observable<Inventory> | Inventory;

  streamInventorys(request: StreamInventorysRequest, metadata?: Metadata): Observable<StreamInventorysResponse>;
}

export function InventoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "listInventorys",
      "getInventory",
      "createInventory",
      "updateInventory",
      "deleteInventory",
      "streamInventorys",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("InventoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("InventoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const INVENTORY_SERVICE_NAME = "InventoryService";
