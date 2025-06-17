import { GITHUB_API_CONFIG, EXCLUDED_USERS, POINTS_CONFIG } from './config';

export const fetchGitHubData = async (endpoint) => {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { 'Authorization': `Bearer ${GITHUB_TOKEN}` })
  };
  
  const response = await fetch(`${GITHUB_API_CONFIG.BASE_URL}${endpoint}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
};

export const fetchParticipantIssues = async (username) => {
  try {
    const issues = await fetchGitHubData(
      `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/issues?state=closed&assignee=${username}&per_page=100`
    );

    let beginnerIssues = 0;
    let intermediateIssues = 0;
    let advancedIssues = 0;
    let totalPoints = 0;

    issues.forEach(issue => {
      if (!issue.pull_request) {
        const labels = issue.labels.map(label => label.name);
        
        if (labels.includes('SSOC S4')) {
          if (labels.includes('Beginner')) {
            beginnerIssues++;
            totalPoints += POINTS_CONFIG.Beginner;
          } else if (labels.includes('Intermediate')) {
            intermediateIssues++;
            totalPoints += POINTS_CONFIG.Intermediate;
          } else if (labels.includes('Advanced') || labels.includes('Advance')) {
            advancedIssues++;
            totalPoints += POINTS_CONFIG.Advanced;
          }
        }
      }
    });

    return {
      beginnerIssues,
      intermediateIssues,
      advancedIssues,
      totalPoints,
      totalIssues: beginnerIssues + intermediateIssues + advancedIssues
    };
  } catch (error) {
    console.error(`Error fetching issues for ${username}:`, error);
    return {
      beginnerIssues: 0,
      intermediateIssues: 0,
      advancedIssues: 0,
      totalPoints: 0,
      totalIssues: 0
    };
  }
};

export const fetchLeaderboardData = async () => {
  try {
    const contributors = await fetchGitHubData(
      `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/contributors?per_page=100`
    );

    const participantPromises = contributors
      .filter(contributor => !EXCLUDED_USERS.includes(contributor.login.toLowerCase()))
      .map(async (contributor) => {
        const [profile, issueStats] = await Promise.all([
          fetchGitHubData(`/users/${contributor.login}`),
          fetchParticipantIssues(contributor.login)
        ]);

        return {
          contributorName: profile.name || contributor.login,
          githubId: contributor.login,
          discordId: 'N/A',
          avatarUrl: contributor.avatar_url,
          ...issueStats
        };
      });

    const participantData = await Promise.all(participantPromises);
    return participantData.sort((a, b) => b.totalPoints - a.totalPoints);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return [];
  }
}; 