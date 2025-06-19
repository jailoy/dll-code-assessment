import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DLL Code Assessment',
            version: '1.0.0',
            description: 'A sample API for the DLL code test',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local Development Server',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'User ID',
                        },
                        name: {
                            type: 'string',
                            description: 'User Name',
                        },
                    },
                },
                UserResponse: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                        paging: {
                            type: 'object',
                            properties: {
                                page: {
                                    type: 'integer',
                                    description: 'Current page',
                                },
                                size: {
                                    type: 'integer',
                                    description: 'Results per size',
                                },
                                maxPages: {
                                    type: 'integer',
                                    description: 'Total number of pages',
                                },
                                totalResults: {
                                    type: 'integer',
                                    description: 'Total number of possible results',
                                },
                                previous: {
                                    type: 'string',
                                    description: 'URI for previous page',
                                },
                                next: {
                                    type: 'string',
                                    description: 'URI for next page',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Path to your API route files
};

const specs = swaggerJsdoc(options);
export default specs;