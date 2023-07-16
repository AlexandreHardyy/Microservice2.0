/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { PspValidatioRequest, PspValidatioResponse } from "./message";

export const protobufPackage = "psp";

export const PSP_PACKAGE_NAME = "psp";

export interface PspServiceClient {
  pspValidation(request: PspValidatioRequest, metadata?: Metadata): Observable<PspValidatioResponse>;
}

export interface PspServiceController {
  pspValidation(
    request: PspValidatioRequest,
    metadata?: Metadata,
  ): Promise<PspValidatioResponse> | Observable<PspValidatioResponse> | PspValidatioResponse;
}

export function PspServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["pspValidation"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PspService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PspService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PSP_SERVICE_NAME = "PspService";
