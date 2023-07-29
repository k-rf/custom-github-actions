/** @type { import("lint-staged").Config } */
const config = {
  "*.json": ["prettier --write"],
  "*.md": ["prettier --write", "textlint"],
};

module.exports = config;
