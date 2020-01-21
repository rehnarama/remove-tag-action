const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const tagToDelete = core.getInput("tag");
    const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");

    const octokit = new github.GitHub(GITHUB_TOKEN);
    const context = github.context;

    await octokit.git.deleteRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `tags/${tagToDelete}`
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
