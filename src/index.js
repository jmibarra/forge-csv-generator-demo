import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {
    const projectKey = req.context.extension.project.key;
    return projectKey;
});

export const handler = resolver.getDefinitions();
