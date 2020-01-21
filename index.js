const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const tagToDelete = core.getInput("tag");
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");

  const octokit = new github.GitHub(GITHUB_TOKEN);
  const context = github.context;

  try {
    const release = await octokit.repos.getReleaseByTag({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag: `${tagToDelete}`
    });
    await octokit.repos.deleteRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
      release_id: release.id
    });
  } catch (_) {}

  try {
    await octokit.git.deleteRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `tags/${tagToDelete}`
    });
  } catch (_) {}
}

run();
