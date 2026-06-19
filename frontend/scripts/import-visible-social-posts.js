require('dotenv').config({ path: require('path').resolve(__dirname, '..', '..', '.env'), quiet: true });

const path = require('path');
const mongoose = require('mongoose');
const { normalizeSocialPostToBlog } = require('../lib/blog/normalizeSocialPost');
const { facebookVisiblePosts } = require('../lib/social/facebookVisiblePosts');

async function main() {
  const connect = (await import(`file:///${path.resolve(__dirname, '..', 'lib', 'mongodb.js').replace(/\\/g, '/')}`)).default;
  const SocialBlog = (await import(`file:///${path.resolve(__dirname, '..', 'models', 'SocialBlog.js').replace(/\\/g, '/')}`)).default;

  await connect();

  console.log("Clearing old Facebook posts...");
  const deleteResult = await SocialBlog.deleteMany({ platform: 'facebook' });
  console.log(`Deleted ${deleteResult.deletedCount} old Facebook posts.`);

  let upserted = 0;

  for (const item of facebookVisiblePosts) {
    const normalized = normalizeSocialPostToBlog(item);
    await SocialBlog.findOneAndUpdate(
      {
        platform: normalized.platform,
        socialPostId: normalized.socialPostId,
      },
      normalized,
      {
        upsert: true,
        returnDocument: 'after',
        setDefaultsOnInsert: true,
      }
    );
    upserted += 1;
  }

  console.log(JSON.stringify({ upserted }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect().catch(() => {});
  });
