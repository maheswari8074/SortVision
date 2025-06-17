export const POINTS_CONFIG = {
  Beginner: 20,
  Intermediate: 30,
  Advanced: 40
};

export const EXCLUDED_USERS = ['alienx5499', 'dependabot[bot]', 'dependabot-preview[bot]'];

export const FILTER_OPTIONS = {
  ALL: 'all',
  TOP_10: 'top10',
  ADVANCED: 'advanced',
  INTERMEDIATE: 'intermediate',
  BEGINNER: 'beginner'
};

export const GITHUB_API_CONFIG = {
  BASE_URL: 'https://api.github.com',
  REPO_OWNER: import.meta.env.VITE_GITHUB_REPO_OWNER,
  REPO_NAME: import.meta.env.VITE_GITHUB_REPO_NAME
}; 