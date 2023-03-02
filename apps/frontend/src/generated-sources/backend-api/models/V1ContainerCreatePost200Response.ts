/* tslint:disable */
/* eslint-disable */
/**
 * Dockops-board API specification
 * Dockops-board is an open source manager for docker containers with web UI
 *
 * The version of the OpenAPI document: 0.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface V1ContainerCreatePost200Response
 */
export interface V1ContainerCreatePost200Response {
  /**
   *
   * @type {string}
   * @memberof V1ContainerCreatePost200Response
   */
  message: string;
}

/**
 * Check if a given object implements the V1ContainerCreatePost200Response interface.
 */
export function instanceOfV1ContainerCreatePost200Response(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'message' in value;

  return isInstance;
}

export function V1ContainerCreatePost200ResponseFromJSON(json: any): V1ContainerCreatePost200Response {
  return V1ContainerCreatePost200ResponseFromJSONTyped(json, false);
}

export function V1ContainerCreatePost200ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): V1ContainerCreatePost200Response {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    message: json['message'],
  };
}

export function V1ContainerCreatePost200ResponseToJSON(value?: V1ContainerCreatePost200Response | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    message: value.message,
  };
}
