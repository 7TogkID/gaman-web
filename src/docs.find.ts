import fs from "fs/promises";
import fg from "fast-glob";

export async function scanDocs() {
  const files = await fg("src/docs/**/*.md");
  const linksMap: Record<
    string,
    { name: string; description: string; href: string }[]
  > = {};

  for (const file of files) {
    const raw = await fs.readFile(file, "utf-8");
    const lines = raw.split("\n");
    const title =
      lines
        .find((l) => l.startsWith("# "))
        ?.replace("# ", "")
        .trim() || "Untitled";
    const description =
      lines
        .find((l) => l.startsWith("<!-- desc:"))
        ?.replace("<!-- desc:", "")
        .replace("-->", "")
        .trim() ??
      (lines
        .find((l) => l.trim() && !l.startsWith("#") && !l.startsWith("<!--"))
        ?.trim() ||
        "");

    const relPath = file.replace("src/docs/", "").replace(/\.md$/, "");
    const parts = relPath.split("/");

    const category = parts[0];
    const href = relPath;

    if (!linksMap[category]) linksMap[category] = [];
    linksMap[category].push({ name: title, description, href });
  }

  return Object.entries(linksMap).map(([name, items]) => ({
    name: name[0].toUpperCase() + name.slice(1), // capitalize
    items,
  }));
}
