import { ApiConfig, createApi, EndpointConfig } from "../api";
import { Publisher } from "../publisher/types";
import { GetProjectResponse, Project } from "./types";


const projectApiConfig: ApiConfig<{
    createProject: EndpointConfig<{ name: string, description: string }, Project>;
    getProjects: EndpointConfig<void, Project[]>;
    getProject: EndpointConfig<{ projectID: string }, GetProjectResponse>;
    getEnabledSocialPlatforms: EndpointConfig<{ projectID: string }, Publisher[]>;
}> = {
    basePath: '/projects',
    endpoints: {
        createProject: {
            method: 'POST',
            path: '',
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

    },
}

export const projectApi = createApi(projectApiConfig);