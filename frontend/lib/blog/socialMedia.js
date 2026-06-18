function isLowResImportedImage(value) {
  return typeof value === 'string' && value.startsWith('/social-imports/');
}

function getPlayableMediaHref(post = {}) {
  if (post.mediaType === 'video') {
    if (post.videoUrl) {
      return post.videoUrl;
    }

    if (post.platform === 'facebook' && post.socialPostId) {
      return `https://www.facebook.com/reel/${post.socialPostId}`;
    }

    return post.sourceUrl || '';
  }

  return post.sourceUrl || '';
}

function getFacebookEmbedUrl(post = {}) {
  if (post.platform !== 'facebook' || post.mediaType !== 'video' || post.videoUrl) {
    return '';
  }

  const reelUrl = post.sourceUrl && post.sourceUrl.includes('/reel/')
    ? post.sourceUrl
    : post.socialPostId
      ? `https://www.facebook.com/reel/${post.socialPostId}`
      : '';

  if (!reelUrl) {
    return '';
  }

  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(reelUrl)}&show_text=false&width=1280`;
}

function getPreferredSocialImage(post = {}) {
  const imageUrl = post.imageUrl || '';
  const thumbnailUrl = post.thumbnailUrl || '';

  if (imageUrl && !isLowResImportedImage(imageUrl)) {
    return imageUrl;
  }

  if (thumbnailUrl && !isLowResImportedImage(thumbnailUrl)) {
    return thumbnailUrl;
  }

  return '';
}

function shouldUseGeneratedPoster(post = {}) {
  return !getPreferredSocialImage(post) && (Boolean(post.imageUrl) || Boolean(post.thumbnailUrl));
}

function shouldOpenMediaExternally(post = {}) {
  return post.mediaType === 'video' && !post.videoUrl && Boolean(post.sourceUrl);
}

function shouldShowOriginalMediaLink(post = {}) {
  return Boolean(getPlayableMediaHref(post)) && !getFacebookEmbedUrl(post);
}

module.exports = {
  getFacebookEmbedUrl,
  getPreferredSocialImage,
  getPlayableMediaHref,
  isLowResImportedImage,
  shouldOpenMediaExternally,
  shouldShowOriginalMediaLink,
  shouldUseGeneratedPoster,
};
