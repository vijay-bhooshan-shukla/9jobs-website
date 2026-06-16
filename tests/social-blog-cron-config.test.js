const vercelConfig = require('../vercel.json');

describe('social blog cron config', () => {
  test('runs the social post importer daily at 2am UTC', () => {
    expect(vercelConfig.crons).toEqual(
      expect.arrayContaining([
        {
          path: '/api/cron/import-social-posts',
          schedule: '0 2 * * *',
        },
      ])
    );
  });

  test('does not rewrite the social import cron route to the legacy Express API', () => {
    const legacyApiRewrite = vercelConfig.rewrites.find((rewrite) => rewrite.destination === '/api/index.js');

    expect(legacyApiRewrite.source).toContain('cron/import-social-posts');
    expect(legacyApiRewrite.source).toContain('?!');
  });
});
