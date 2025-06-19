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
    // Fetch issues assigned to the user (solved bugs)
    const assignedIssues = await fetchGitHubData(
      `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/issues?state=closed&assignee=${username}&per_page=100`
    );

    // Fetch issues created by the user (reported bugs)
    const createdIssues = await fetchGitHubData(
      `/repos/${GITHUB_API_CONFIG.REPO_OWNER}/${GITHUB_API_CONFIG.REPO_NAME}/issues?state=all&creator=${username}&per_page=100`
    );

    let beginnerIssues = 0;
    let intermediateIssues = 0;
    let advancedIssues = 0;
    let totalPoints = 0;
    let uniqueLabels = new Set();
    let issueTypes = new Set();
    let firstIssueDate = null;
    let lastIssueDate = null;
    let bugsSolved = 0;
    let bugsReported = 0;
    let hasCompletedIn24Hours = false;

    // Process assigned issues (solved)
    assignedIssues.forEach(issue => {
      if (!issue.pull_request) {
        const labels = issue.labels.map(label => label.name);
        labels.forEach(label => uniqueLabels.add(label));
        
        // Track issue types
        const type = labels.find(l => ['bug', 'feature', 'enhancement', 'documentation'].includes(l.toLowerCase()));
        if (type) {
          issueTypes.add(type.toLowerCase());
          if (type.toLowerCase() === 'bug') {
            bugsSolved++;
          }
        }

        // Check if issue was completed within 24 hours
        if (issue.closed_at && issue.created_at) {
          const createdAt = new Date(issue.created_at);
          const closedAt = new Date(issue.closed_at);
          const timeDifferenceHours = (closedAt - createdAt) / (1000 * 60 * 60); // Convert to hours
          
          if (timeDifferenceHours <= 24) {
            hasCompletedIn24Hours = true;
          }
        }

        // Track first and last issue dates
        if (!firstIssueDate || new Date(issue.created_at) < new Date(firstIssueDate)) {
          firstIssueDate = issue.created_at;
        }
        if (!lastIssueDate || new Date(issue.closed_at) > new Date(lastIssueDate)) {
          lastIssueDate = issue.closed_at;
        }
        
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

    // Process created issues (reported)
    createdIssues.forEach(issue => {
      if (!issue.pull_request) {
        const labels = issue.labels.map(label => label.name);
        if (labels.some(label => label.toLowerCase() === 'bug')) {
          bugsReported++;
        }
      }
    });

    return {
      beginnerIssues,
      intermediateIssues,
      advancedIssues,
      totalPoints,
      totalIssues: beginnerIssues + intermediateIssues + advancedIssues,
      uniqueLabels: Array.from(uniqueLabels),
      issueTypes: Array.from(issueTypes),
      firstIssueDate,
      lastIssueDate,
      bugsSolved,
      bugsReported,
      hasCompletedIn24Hours
    };
  } catch (error) {
    console.error(`Error fetching issues for ${username}:`, error);
    return {
      beginnerIssues: 0,
      intermediateIssues: 0,
      advancedIssues: 0,
      totalPoints: 0,
      totalIssues: 0,
      uniqueLabels: [],
      issueTypes: [],
      firstIssueDate: null,
      lastIssueDate: null,
      bugsSolved: 0,
      bugsReported: 0,
      hasCompletedIn24Hours: false
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

        // Calculate achievements based on the fetched data
        const achievements = {
          // Existing achievements
          completedIn24Hours: issueStats.hasCompletedIn24Hours,
          solvedBugs: issueStats.bugsSolved > 0,
          reportedBugs: issueStats.bugsReported > 0,
          helpedOthers: false,
          hasStreakOfFiveDays: false,
          hasReviewedPRs: false,
          improvedDocs: issueStats.issueTypes.includes('documentation'),
          
          // Progress-based achievements (based on total issues solved)
          hasFirstStep: issueStats.totalIssues === 1,
          isNewcomer: issueStats.totalIssues >= 2,
          isRisingStar: issueStats.totalIssues >= 5,
          isCommittedContributor: issueStats.totalIssues >= 10,
          isSeasonedDeveloper: issueStats.totalIssues >= 15,
          isVeteranContributor: issueStats.totalIssues >= 20,
          
          // Other achievements
          isDiverseContributor: issueStats.issueTypes.length >= 3
        };

        return {
          contributorName: profile.name || contributor.login,
          githubId: contributor.login,
          discordId: 'N/A',
          avatarUrl: contributor.avatar_url,
          achievements,
          bugsSolved: issueStats.bugsSolved,
          bugsReported: issueStats.bugsReported,
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