import { ApiConfig, createApi, EndpointConfig } from '../api';
import { Publisher } from '../publisher/types';
import { DefaultUserPlatformInfo, GetProjectResponse, Project } from './types';

const projectApiConfig: ApiConfig<{
  createProject: EndpointConfig<{ name: string; description: string }, Project>;
  updateProject: EndpointConfig<{ projectID: string; name: string; description: string }, Project>;
  getProjects: EndpointConfig<void, Project[]>;
  getProject: EndpointConfig<{ projectID: string }, GetProjectResponse>;
  getEnabledSocialPlatforms: EndpointConfig<{ projectID: string }, Publisher[]>;
  enableSocialPlatform: EndpointConfig<{ projectID: string; platformID: string }, void>;
  getDefaultUserInfo: EndpointConfig<
    { projectID: string; platformID: string },
    DefaultUserPlatformInfo
  >;
  addUserToProject: EndpointConfig<{ projectID: string; email: string }, void>;
}> = {
  basePath: '/projects',
  endpoints: {
    createProject: {
      method: 'POST',
      path: '',
    },
    updateProject: {
      method: 'PATCH',
      path: '/{projectID}',
      pathValues: ['projectID'],
    },
    getProjects: {
      method: 'GET',
      path: '',
    },
    getProject: {
      method: 'GET',
      path: '/{projectID}',
      pathValues: ['projectID'],
    },
    getEnabledSocialPlatforms: {
      method: 'GET',
      path: '/{projectID}/social-platforms',
      pathValues: ['projectID'],
    },
    enableSocialPlatform: {
      method: 'POST',
      path: '/{projectID}/enable-social-platform/{platformID}',
      pathValues: ['projectID', 'platformID'],
    },
    getDefaultUserInfo: {
      method: 'GET',
      path: '/{projectID}/default-user-platform-info/{platformID}',
      pathValues: ['projectID', 'platformID'],
    },
    addUserToProject: {
      method: 'POST',
      path: '/{projectID}/add-user',
      pathValues: ['projectID'],
    },
  },
};

export const projectApi = createApi(projectApiConfig);
