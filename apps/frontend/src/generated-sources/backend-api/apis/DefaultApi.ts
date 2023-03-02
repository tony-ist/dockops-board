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

import * as runtime from '../runtime';
import type {
  V1ContainerAllGet200ResponseInner,
  V1ContainerCreatePost200Response,
  V1ContainerCreatePostRequest,
  V1UserNewPost200Response,
  V1UserNewPostRequest,
} from '../models';
import {
  V1ContainerAllGet200ResponseInnerFromJSON,
  V1ContainerAllGet200ResponseInnerToJSON,
  V1ContainerCreatePost200ResponseFromJSON,
  V1ContainerCreatePost200ResponseToJSON,
  V1ContainerCreatePostRequestFromJSON,
  V1ContainerCreatePostRequestToJSON,
  V1UserNewPost200ResponseFromJSON,
  V1UserNewPost200ResponseToJSON,
  V1UserNewPostRequestFromJSON,
  V1UserNewPostRequestToJSON,
} from '../models';

export interface V1ContainerContainerIdAttachPostRequest {
  containerId: number;
}

export interface V1ContainerContainerIdLogsGetRequest {
  containerId: number;
  tail?: number;
}

export interface V1ContainerContainerIdStartPostRequest {
  containerId: number;
}

export interface V1ContainerCreatePostOperationRequest {
  body?: V1ContainerCreatePostRequest;
}

export interface V1UserNewPostOperationRequest {
  body?: V1UserNewPostRequest;
}

/**
 *
 */
export class DefaultApi extends runtime.BaseAPI {
  /**
   */
  async v1ContainerAllGetRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<V1ContainerAllGet200ResponseInner>>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/v1/container/all`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(V1ContainerAllGet200ResponseInnerFromJSON)
    );
  }

  /**
   */
  async v1ContainerAllGet(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<V1ContainerAllGet200ResponseInner>> {
    const response = await this.v1ContainerAllGetRaw(initOverrides);
    return await response.value();
  }

  /**
   */
  async v1ContainerContainerIdAttachPostRaw(
    requestParameters: V1ContainerContainerIdAttachPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<V1ContainerCreatePost200Response>> {
    if (requestParameters.containerId === null || requestParameters.containerId === undefined) {
      throw new runtime.RequiredError(
        'containerId',
        'Required parameter requestParameters.containerId was null or undefined when calling v1ContainerContainerIdAttachPost.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/v1/container/{containerId}/attach`.replace(
          `{${'containerId'}}`,
          encodeURIComponent(String(requestParameters.containerId))
        ),
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => V1ContainerCreatePost200ResponseFromJSON(jsonValue));
  }

  /**
   */
  async v1ContainerContainerIdAttachPost(
    requestParameters: V1ContainerContainerIdAttachPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<V1ContainerCreatePost200Response> {
    const response = await this.v1ContainerContainerIdAttachPostRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async v1ContainerContainerIdLogsGetRaw(
    requestParameters: V1ContainerContainerIdLogsGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<V1ContainerCreatePost200Response>> {
    if (requestParameters.containerId === null || requestParameters.containerId === undefined) {
      throw new runtime.RequiredError(
        'containerId',
        'Required parameter requestParameters.containerId was null or undefined when calling v1ContainerContainerIdLogsGet.'
      );
    }

    const queryParameters: any = {};

    if (requestParameters.tail !== undefined) {
      queryParameters['tail'] = requestParameters.tail;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/v1/container/{containerId}/logs`.replace(
          `{${'containerId'}}`,
          encodeURIComponent(String(requestParameters.containerId))
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => V1ContainerCreatePost200ResponseFromJSON(jsonValue));
  }

  /**
   */
  async v1ContainerContainerIdLogsGet(
    requestParameters: V1ContainerContainerIdLogsGetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<V1ContainerCreatePost200Response> {
    const response = await this.v1ContainerContainerIdLogsGetRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async v1ContainerContainerIdStartPostRaw(
    requestParameters: V1ContainerContainerIdStartPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<V1ContainerCreatePost200Response>> {
    if (requestParameters.containerId === null || requestParameters.containerId === undefined) {
      throw new runtime.RequiredError(
        'containerId',
        'Required parameter requestParameters.containerId was null or undefined when calling v1ContainerContainerIdStartPost.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/v1/container/{containerId}/start`.replace(
          `{${'containerId'}}`,
          encodeURIComponent(String(requestParameters.containerId))
        ),
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => V1ContainerCreatePost200ResponseFromJSON(jsonValue));
  }

  /**
   */
  async v1ContainerContainerIdStartPost(
    requestParameters: V1ContainerContainerIdStartPostRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<V1ContainerCreatePost200Response> {
    const response = await this.v1ContainerContainerIdStartPostRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async v1ContainerCreatePostRaw(
    requestParameters: V1ContainerCreatePostOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<V1ContainerCreatePost200Response>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/v1/container/create`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: V1ContainerCreatePostRequestToJSON(requestParameters.body),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => V1ContainerCreatePost200ResponseFromJSON(jsonValue));
  }

  /**
   */
  async v1ContainerCreatePost(
    requestParameters: V1ContainerCreatePostOperationRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<V1ContainerCreatePost200Response> {
    const response = await this.v1ContainerCreatePostRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   */
  async v1UserNewPostRaw(
    requestParameters: V1UserNewPostOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<V1UserNewPost200Response>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/v1/user/new`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: V1UserNewPostRequestToJSON(requestParameters.body),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => V1UserNewPost200ResponseFromJSON(jsonValue));
  }

  /**
   */
  async v1UserNewPost(
    requestParameters: V1UserNewPostOperationRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<V1UserNewPost200Response> {
    const response = await this.v1UserNewPostRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
