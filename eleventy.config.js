// Site build settings. You normally never need to edit this file.
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import sharp from "sharp";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

const IMAGE_DIR = "images";
const CACHE_DIR = ".cache/img";
const RASTER = /\.(jpe?g|png|webp|tiff?|avif|gif)$/i;

// Find an image inside images/ even if the letter case or the extension is slightly off.
function findImage(name) {
  const rel = String(name).trim().replace(/^\/?images\//, "");
  const direct = path.join(IMAGE_DIR, rel);
  if (fs.existsSync(direct)) return direct;
  const dir = path.dirname(direct);
  if (!fs.existsSync(dir)) return null;
  const want = path.basename(rel).toLowerCase();
  const wantStem = want.replace(/\.[^.]+$/, "");
  const files = fs.readdirSync(dir);
  const hit =
    files.find((f) => f.toLowerCase() === want) ||
    files.find((f) => RASTER.test(f) && f.toLowerCase().replace(/\.[^.]+$/, "") === wantStem);
  return hit ? path.join(dir, hit) : null;
}

export default function (cfg) {
  cfg.addPlugin(EleventyHtmlBasePlugin);
  cfg.addDataExtension("yaml,yml", (text) => yaml.load(text));
  cfg.addPassthroughCopy("assets");
  cfg.addPassthroughCopy({ "images/logo": "images/logo", "images/favicon-navy.png": "images/favicon-navy.png" });
  cfg.addWatchTarget("images");

  // Every photo used on the site is resized and compressed at build time,
  // so original camera files can be uploaded as they are.
  const wanted = new Map();
  cfg.addFilter("img", (name, width = 1200) => {
    if (!name) return "";
    const src = findImage(name);
    if (!src) {
      console.warn(`[images] Not found: images/${name}`);
      return "";
    }
    if (!RASTER.test(src)) return "/" + src.split(path.sep).join("/");
    const stem = path
      .relative(IMAGE_DIR, src)
      .replace(/\.[^.]+$/, "")
      .replace(/[^A-Za-z0-9_-]+/g, "-");
    const out = `${stem}-${width}.jpg`;
    wanted.set(out, { src, width });
    return `/img/${out}`;
  });

  cfg.on("eleventy.after", async ({ dir }) => {
    const outDir = path.join(dir.output, "img");
    fs.mkdirSync(outDir, { recursive: true });
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const jobs = [...wanted.entries()];
    let made = 0;
    const work = async ([out, { src, width }]) => {
      const st = fs.statSync(src);
      const cached = path.join(CACHE_DIR, `${st.size}-${Math.round(st.mtimeMs)}-${out}`);
      if (!fs.existsSync(cached)) {
        await sharp(src)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .flatten({ background: "#ffffff" })
          .jpeg({ quality: 78, mozjpeg: true })
          .toFile(cached);
        made++;
      }
      fs.copyFileSync(cached, path.join(outDir, out));
    };
    for (let i = 0; i < jobs.length; i += 6) await Promise.all(jobs.slice(i, i + 6).map(work));
    console.log(`[images] ${jobs.length} images ready (${made} newly resized)`);
  });

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const toDate = (d) => (d instanceof Date ? d : new Date(d));
  cfg.addFilter("isoDate", (d) => toDate(d).toISOString().slice(0, 10));
  cfg.addFilter("longDate", (d) => {
    const x = toDate(d);
    return `${MONTHS[x.getUTCMonth()]} ${x.getUTCDate()}, ${x.getUTCFullYear()}`;
  });
  cfg.addFilter("year", (d) => (d instanceof Date ? String(d.getUTCFullYear()) : String(d || "").slice(0, 4)));
  cfg.addFilter("byDateDesc", (list) => [...(list || [])].sort((a, b) => String(b.date || "").localeCompare(String(a.date || ""))));
  cfg.addFilter("groupByYear", (list) => {
    const groups = [];
    for (const item of list || []) {
      const y = item.date instanceof Date ? String(item.date.getUTCFullYear()) : String(item.date || "").slice(0, 4);
      const last = groups[groups.length - 1];
      if (last && last.year === y) last.items.push(item);
      else groups.push({ year: y, items: [item] });
    }
    return groups;
  });
  cfg.addFilter("clean", (s) => String(s || "").replace(/\s+/g, " ").trim());
  cfg.addFilter("limit", (list, n) => (list || []).slice(0, n));

  cfg.addCollection("news", (api) => api.getFilteredByGlob("news/*.md").sort((a, b) => b.date - a.date));

  return {
    dir: { input: ".", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
