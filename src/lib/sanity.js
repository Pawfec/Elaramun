// Minimal stub so imports work while you use sample content.
// If you later connect a real Sanity project, replace this with the @sanity/client setup.

const client = {
  // fetch(query) returns null by default; index.js only calls this when SANITY_PROJECT_ID is set.
  fetch: async (query) => {
    return null;
  }
};

const queries = {
  siteSettings: '*[_type == "siteSettings"][0]',
  committees: '*[_type == "committee"]',
  leadership: '*[_type == "leadership"]'
};

export { client, queries };
