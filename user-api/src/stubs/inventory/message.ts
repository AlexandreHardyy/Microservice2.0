/* eslint-disable */

export const protobufPackage = "inventory";

export interface Inventory {
  name?: string | undefined;
  items?: string | undefined;
  dueDate?: string | undefined;
}

export interface StreamInventorysRequest {
}

export interface StreamInventorysResponse {
  inventory?: Inventory | undefined;
  eventType?: string | undefined;
}

export interface ListInventorysRequest {
  /** The parent resource name, for example, "shelves/shelf1" */
  parent?:
    | string
    | undefined;
  /** The maximum number of items to return. */
  pageSize?:
    | number
    | undefined;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string | undefined;
}

export interface ListInventorysResponse {
  /**
   * The item name should match the noun "Inventory" in the method name.
   * There will be a maximum number of items returned based on the page_size item in the request.
   */
  inventorys?:
    | Inventory[]
    | undefined;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string | undefined;
}

export interface GetInventoryRequest {
  /** The item will contain name of the resource requested. */
  name?: string | undefined;
}

export interface CreateInventoryRequest {
  /** The parent resource name where the Inventory is to be created. */
  parent?:
    | string
    | undefined;
  /** The Inventory id to use for this Inventory. */
  inventoryId?:
    | string
    | undefined;
  /**
   * The Inventory resource to create.
   * The item name should match the Noun in the method name.
   */
  inventory?: Inventory | undefined;
}

export interface UpdateInventoryRequest {
  /** The Inventory resource which replaces the resource on the server. */
  inventory?: Inventory | undefined;
}

export interface DeleteInventoryRequest {
  /** The resource name of the Inventory to be deleted. */
  name?: string | undefined;
}

export const INVENTORY_PACKAGE_NAME = "inventory";
