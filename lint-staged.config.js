module.exports = {
  'src/**/*.{css,scss}': ['stylelint --allow-empty-input --fix', 'prettier --write'],
  'src/**/*.{js,jsx,ts,tsx}': [
    () => 'tsc -p tsconfig.json --noEmit',
    'prettier --write',
    'eslint --no-error-on-unmatched-pattern',
  ],
}
