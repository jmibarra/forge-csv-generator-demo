import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {
    const issueKey = req.context.extension.issue.key;

  return issueKey;
});

export const handler = resolver.getDefinitions();
