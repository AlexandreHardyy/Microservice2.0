/* eslint-disable */

export const protobufPackage = "psp";

export interface PspValidatioRequest {
  ccNumber?: string | undefined;
  ccName?: string | undefined;
  price?: number | undefined;
}

export interface PspValidatioResponse {
  transactionStatus?: string | undefined;
}

export const PSP_PACKAGE_NAME = "psp";
