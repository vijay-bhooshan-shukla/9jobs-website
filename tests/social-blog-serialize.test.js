const { serializeSocialBlogPost } = require('../frontend/lib/blog/serializeSocialBlogPost');

describe('social blog serialization', () => {
  test('keeps socialPostId for facebook reel embedding', () => {
    const serialized = serializeSocialBlogPost({
      socialPostId: '17863577814634467',
      title: 'Almost giving up on your job search?',
      slug: 'almost-giving-up-on-your-job-search',
      mediaType: 'video',
      sourceUrl: 'https://www.facebook.com/profile.php?id=61589408708559',
      platform: 'facebook',
      publishedAt: '2026-06-16T06:13:00.000Z',
    });

    expect(serialized.socialPostId).toBe('17863577814634467');
  });
});
