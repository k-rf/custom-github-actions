/** @type { import("lint-staged").Config } */
const config = {
  "*.{tsx,ts,js}": ["bash -c 'yarn check:type'", "prettier --write", "eslint --cache --fix"],
  "*.json": ["prettier --write"],
  "*.md": ["prettier --write", "textlint"],
};

module.exports = config;
