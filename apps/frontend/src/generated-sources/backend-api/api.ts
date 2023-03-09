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

import type { Configuration } from './configuration';
import type { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  assertParamExists,
  createRequestFunction,
  DUMMY_BASE_URL,
  serializeDataIfNeeded,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  toPathString,
} from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequiredError } from './base';

/**
 *
 * @export
 * @interface Container
 */
export interface Container {
  /**
   *
   * @type {number}
   * @memberof Container
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof Container
   */
  image?: string;
  /**
   *
   * @type {string}
   * @memberof Container
   */
  dockerId?: string;
  /**
   *
   * @type {string}
   * @memberof Container
   */
  dockerName: string;
  /**
   *
   * @type {string}
   * @memberof Container
   */
  dockerState?: string;
  /**
   *
   * @type {string}
   * @memberof Container
   */
  createdAt?: string;
  /**
   *
   * @type {string}
   * @memberof Container
   */
  updatedAt?: string;
  /**
   *
   * @type {string}
   * @memberof Container
   */
  buildStatus?: string;
}
/**
 *
 * @export
 * @interface ContainerAllResponse
 */
export interface ContainerAllResponse extends Array<Container> {}
/**
 *
 * @export
 * @interface DbContainerId
 */
export interface DbContainerId {
  /**
   *
   * @type {number}
   * @memberof DbContainerId
   */
  dbContainerId: number;
}
/**
 *
 * @export
 * @interface Log
 */
export interface Log {
  /**
   *
   * @type {string}
   * @memberof Log
   */
  text: string;
}
/**
 *
 * @export
 * @interface Message
 */
export interface Message {
  /**
   *
   * @type {string}
   * @memberof Message
   */
  message: string;
}
/**
 *
 * @export
 * @interface User
 */
export interface User {
  /**
   *
   * @type {number}
   * @memberof User
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof User
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof User
   */
  createdAt?: string;
  /**
   *
   * @type {string}
   * @memberof User
   */
  updatedAt?: string;
}
/**
 *
 * @export
 * @interface V1ContainerAllGet401Response
 */
export interface V1ContainerAllGet401Response {
  /**
   *
   * @type {string}
   * @memberof V1ContainerAllGet401Response
   */
  error?: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerAllGet401Response
   */
  description?: string;
}
/**
 *
 * @export
 * @interface V1ContainerCreatePost200Response
 */
export interface V1ContainerCreatePost200Response {
  /**
   *
   * @type {Container}
   * @memberof V1ContainerCreatePost200Response
   */
  container?: Container;
  /**
   *
   * @type {string}
   * @memberof V1ContainerCreatePost200Response
   */
  message?: string;
}
/**
 *
 * @export
 * @interface V1ContainerCreatePostRequest
 */
export interface V1ContainerCreatePostRequest {
  /**
   *
   * @type {string}
   * @memberof V1ContainerCreatePostRequest
   */
  containerName: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerCreatePostRequest
   */
  githubURL: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerCreatePostRequest
   */
  dockerfileName?: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerCreatePostRequest
   */
  hostPort?: string;
  /**
   *
   * @type {string}
   * @memberof V1ContainerCreatePostRequest
   */
  containerPort?: string;
}
/**
 *
 * @export
 * @interface V1LoginPostRequest
 */
export interface V1LoginPostRequest {
  /**
   *
   * @type {string}
   * @memberof V1LoginPostRequest
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof V1LoginPostRequest
   */
  password: string;
}
/**
 *
 * @export
 * @interface V1UserNewPostRequest
 */
export interface V1UserNewPostRequest {
  /**
   *
   * @type {string}
   * @memberof V1UserNewPostRequest
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof V1UserNewPostRequest
   */
  password: string;
  /**
   *
   * @type {string}
   * @memberof V1UserNewPostRequest
   */
  githubToken?: string;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerAllGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/v1/container/all`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {V1ContainerCreatePostRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerCreatePost: async (
      body?: V1ContainerCreatePostRequest,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/v1/container/create`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdAttachPost: async (
      dbContainerId: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'dbContainerId' is not null or undefined
      assertParamExists('v1ContainerDbContainerIdAttachPost', 'dbContainerId', dbContainerId);
      const localVarPath = `/v1/container/{dbContainerId}/attach`.replace(
        `{${'dbContainerId'}}`,
        encodeURIComponent(String(dbContainerId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdGet: async (
      dbContainerId: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'dbContainerId' is not null or undefined
      assertParamExists('v1ContainerDbContainerIdGet', 'dbContainerId', dbContainerId);
      const localVarPath = `/v1/container/{dbContainerId}`.replace(
        `{${'dbContainerId'}}`,
        encodeURIComponent(String(dbContainerId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {number} [tail]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdLogsGet: async (
      dbContainerId: number,
      tail?: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'dbContainerId' is not null or undefined
      assertParamExists('v1ContainerDbContainerIdLogsGet', 'dbContainerId', dbContainerId);
      const localVarPath = `/v1/container/{dbContainerId}/logs`.replace(
        `{${'dbContainerId'}}`,
        encodeURIComponent(String(dbContainerId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (tail !== undefined) {
        localVarQueryParameter['tail'] = tail;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdStartPost: async (
      dbContainerId: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'dbContainerId' is not null or undefined
      assertParamExists('v1ContainerDbContainerIdStartPost', 'dbContainerId', dbContainerId);
      const localVarPath = `/v1/container/{dbContainerId}/start`.replace(
        `{${'dbContainerId'}}`,
        encodeURIComponent(String(dbContainerId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdStopPost: async (
      dbContainerId: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'dbContainerId' is not null or undefined
      assertParamExists('v1ContainerDbContainerIdStopPost', 'dbContainerId', dbContainerId);
      const localVarPath = `/v1/container/{dbContainerId}/stop`.replace(
        `{${'dbContainerId'}}`,
        encodeURIComponent(String(dbContainerId))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {V1LoginPostRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1LoginPost: async (body?: V1LoginPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/v1/login/`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {V1UserNewPostRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1UserNewPost: async (body?: V1UserNewPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/v1/user/new`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1ContainerAllGet(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Container>>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1ContainerAllGet(options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {V1ContainerCreatePostRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1ContainerCreatePost(
      body?: V1ContainerCreatePostRequest,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<V1ContainerCreatePost200Response>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1ContainerCreatePost(body, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1ContainerDbContainerIdAttachPost(
      dbContainerId: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Message>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1ContainerDbContainerIdAttachPost(
        dbContainerId,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1ContainerDbContainerIdGet(
      dbContainerId: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Container>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1ContainerDbContainerIdGet(dbContainerId, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {number} [tail]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1ContainerDbContainerIdLogsGet(
      dbContainerId: number,
      tail?: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Message>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1ContainerDbContainerIdLogsGet(
        dbContainerId,
        tail,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1ContainerDbContainerIdStartPost(
      dbContainerId: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Message>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1ContainerDbContainerIdStartPost(
        dbContainerId,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {number} dbContainerId
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1ContainerDbContainerIdStopPost(
      dbContainerId: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Message>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1ContainerDbContainerIdStopPost(
        dbContainerId,
        options
      );
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {V1LoginPostRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1LoginPost(
      body?: V1LoginPostRequest,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1LoginPost(body, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
    /**
     *
     * @param {V1UserNewPostRequest} [body]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async v1UserNewPost(
      body?: V1UserNewPostRequest,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.v1UserNewPost(body, options);
      return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
    },
  };
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = DefaultApiFp(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerAllGet(options?: AxiosRequestConfig): AxiosPromise<Array<Container>> {
      return localVarFp.v1ContainerAllGet(options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DefaultApiV1ContainerCreatePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerCreatePost(
      requestParameters: DefaultApiV1ContainerCreatePostRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<V1ContainerCreatePost200Response> {
      return localVarFp
        .v1ContainerCreatePost(requestParameters.body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DefaultApiV1ContainerDbContainerIdAttachPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdAttachPost(
      requestParameters: DefaultApiV1ContainerDbContainerIdAttachPostRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Message> {
      return localVarFp
        .v1ContainerDbContainerIdAttachPost(requestParameters.dbContainerId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DefaultApiV1ContainerDbContainerIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdGet(
      requestParameters: DefaultApiV1ContainerDbContainerIdGetRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Container> {
      return localVarFp
        .v1ContainerDbContainerIdGet(requestParameters.dbContainerId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DefaultApiV1ContainerDbContainerIdLogsGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdLogsGet(
      requestParameters: DefaultApiV1ContainerDbContainerIdLogsGetRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Message> {
      return localVarFp
        .v1ContainerDbContainerIdLogsGet(requestParameters.dbContainerId, requestParameters.tail, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DefaultApiV1ContainerDbContainerIdStartPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdStartPost(
      requestParameters: DefaultApiV1ContainerDbContainerIdStartPostRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Message> {
      return localVarFp
        .v1ContainerDbContainerIdStartPost(requestParameters.dbContainerId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DefaultApiV1ContainerDbContainerIdStopPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1ContainerDbContainerIdStopPost(
      requestParameters: DefaultApiV1ContainerDbContainerIdStopPostRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Message> {
      return localVarFp
        .v1ContainerDbContainerIdStopPost(requestParameters.dbContainerId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DefaultApiV1LoginPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1LoginPost(
      requestParameters: DefaultApiV1LoginPostRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<string> {
      return localVarFp.v1LoginPost(requestParameters.body, options).then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DefaultApiV1UserNewPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    v1UserNewPost(
      requestParameters: DefaultApiV1UserNewPostRequest = {},
      options?: AxiosRequestConfig
    ): AxiosPromise<User> {
      return localVarFp.v1UserNewPost(requestParameters.body, options).then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for v1ContainerCreatePost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1ContainerCreatePostRequest
 */
export interface DefaultApiV1ContainerCreatePostRequest {
  /**
   *
   * @type {V1ContainerCreatePostRequest}
   * @memberof DefaultApiV1ContainerCreatePost
   */
  readonly body?: V1ContainerCreatePostRequest;
}

/**
 * Request parameters for v1ContainerDbContainerIdAttachPost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1ContainerDbContainerIdAttachPostRequest
 */
export interface DefaultApiV1ContainerDbContainerIdAttachPostRequest {
  /**
   *
   * @type {number}
   * @memberof DefaultApiV1ContainerDbContainerIdAttachPost
   */
  readonly dbContainerId: number;
}

/**
 * Request parameters for v1ContainerDbContainerIdGet operation in DefaultApi.
 * @export
 * @interface DefaultApiV1ContainerDbContainerIdGetRequest
 */
export interface DefaultApiV1ContainerDbContainerIdGetRequest {
  /**
   *
   * @type {number}
   * @memberof DefaultApiV1ContainerDbContainerIdGet
   */
  readonly dbContainerId: number;
}

/**
 * Request parameters for v1ContainerDbContainerIdLogsGet operation in DefaultApi.
 * @export
 * @interface DefaultApiV1ContainerDbContainerIdLogsGetRequest
 */
export interface DefaultApiV1ContainerDbContainerIdLogsGetRequest {
  /**
   *
   * @type {number}
   * @memberof DefaultApiV1ContainerDbContainerIdLogsGet
   */
  readonly dbContainerId: number;

  /**
   *
   * @type {number}
   * @memberof DefaultApiV1ContainerDbContainerIdLogsGet
   */
  readonly tail?: number;
}

/**
 * Request parameters for v1ContainerDbContainerIdStartPost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1ContainerDbContainerIdStartPostRequest
 */
export interface DefaultApiV1ContainerDbContainerIdStartPostRequest {
  /**
   *
   * @type {number}
   * @memberof DefaultApiV1ContainerDbContainerIdStartPost
   */
  readonly dbContainerId: number;
}

/**
 * Request parameters for v1ContainerDbContainerIdStopPost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1ContainerDbContainerIdStopPostRequest
 */
export interface DefaultApiV1ContainerDbContainerIdStopPostRequest {
  /**
   *
   * @type {number}
   * @memberof DefaultApiV1ContainerDbContainerIdStopPost
   */
  readonly dbContainerId: number;
}

/**
 * Request parameters for v1LoginPost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1LoginPostRequest
 */
export interface DefaultApiV1LoginPostRequest {
  /**
   *
   * @type {V1LoginPostRequest}
   * @memberof DefaultApiV1LoginPost
   */
  readonly body?: V1LoginPostRequest;
}

/**
 * Request parameters for v1UserNewPost operation in DefaultApi.
 * @export
 * @interface DefaultApiV1UserNewPostRequest
 */
export interface DefaultApiV1UserNewPostRequest {
  /**
   *
   * @type {V1UserNewPostRequest}
   * @memberof DefaultApiV1UserNewPost
   */
  readonly body?: V1UserNewPostRequest;
}

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1ContainerAllGet(options?: AxiosRequestConfig) {
    return DefaultApiFp(this.configuration)
      .v1ContainerAllGet(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {DefaultApiV1ContainerCreatePostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1ContainerCreatePost(
    requestParameters: DefaultApiV1ContainerCreatePostRequest = {},
    options?: AxiosRequestConfig
  ) {
    return DefaultApiFp(this.configuration)
      .v1ContainerCreatePost(requestParameters.body, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {DefaultApiV1ContainerDbContainerIdAttachPostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1ContainerDbContainerIdAttachPost(
    requestParameters: DefaultApiV1ContainerDbContainerIdAttachPostRequest,
    options?: AxiosRequestConfig
  ) {
    return DefaultApiFp(this.configuration)
      .v1ContainerDbContainerIdAttachPost(requestParameters.dbContainerId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {DefaultApiV1ContainerDbContainerIdGetRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1ContainerDbContainerIdGet(
    requestParameters: DefaultApiV1ContainerDbContainerIdGetRequest,
    options?: AxiosRequestConfig
  ) {
    return DefaultApiFp(this.configuration)
      .v1ContainerDbContainerIdGet(requestParameters.dbContainerId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {DefaultApiV1ContainerDbContainerIdLogsGetRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1ContainerDbContainerIdLogsGet(
    requestParameters: DefaultApiV1ContainerDbContainerIdLogsGetRequest,
    options?: AxiosRequestConfig
  ) {
    return DefaultApiFp(this.configuration)
      .v1ContainerDbContainerIdLogsGet(requestParameters.dbContainerId, requestParameters.tail, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {DefaultApiV1ContainerDbContainerIdStartPostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1ContainerDbContainerIdStartPost(
    requestParameters: DefaultApiV1ContainerDbContainerIdStartPostRequest,
    options?: AxiosRequestConfig
  ) {
    return DefaultApiFp(this.configuration)
      .v1ContainerDbContainerIdStartPost(requestParameters.dbContainerId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {DefaultApiV1ContainerDbContainerIdStopPostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1ContainerDbContainerIdStopPost(
    requestParameters: DefaultApiV1ContainerDbContainerIdStopPostRequest,
    options?: AxiosRequestConfig
  ) {
    return DefaultApiFp(this.configuration)
      .v1ContainerDbContainerIdStopPost(requestParameters.dbContainerId, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {DefaultApiV1LoginPostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1LoginPost(requestParameters: DefaultApiV1LoginPostRequest = {}, options?: AxiosRequestConfig) {
    return DefaultApiFp(this.configuration)
      .v1LoginPost(requestParameters.body, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {DefaultApiV1UserNewPostRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DefaultApi
   */
  public v1UserNewPost(requestParameters: DefaultApiV1UserNewPostRequest = {}, options?: AxiosRequestConfig) {
    return DefaultApiFp(this.configuration)
      .v1UserNewPost(requestParameters.body, options)
      .then((request) => request(this.axios, this.basePath));
  }
}