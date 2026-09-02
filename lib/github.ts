type GitHubFile = { sha: string; content: string; encoding: string };
const api = "https://api.github.com";

export async function commitJson(path: string, value: unknown, message: string) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) throw new Error("GitHub publishing is not configured. Add GITHUB_TOKEN and GITHUB_REPO.");
  const branch = process.env.GITHUB_BRANCH || "main";
  const headers = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  const url = `${api}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
  const current = await fetch(url, { headers, cache: "no-store" });
  if (!current.ok) throw new Error(`Could not read ${path} from GitHub.`);
  const file = await current.json() as GitHubFile;
  const content = Buffer.from(JSON.stringify(value, null, 2) + "\n").toString("base64");
  const response = await fetch(`${api}/repos/${repo}/contents/${path}`, {
    method: "PUT", headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ message, content, sha: file.sha, branch })
  });
  if (!response.ok) throw new Error("GitHub did not accept the update.");
  return response.json();
}
