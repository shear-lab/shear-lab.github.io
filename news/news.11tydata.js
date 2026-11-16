// Settings shared by every news post in this folder.
export default {
  layout: "post.njk",
  tags: "news",
  eleventyComputed: {
    permalink: (data) => `/news/${data.page.date.toISOString().slice(0, 10)}-${data.page.fileSlug}/`,
  },
};
