import keupoz from '@keupoz/eslint-config';

export default keupoz({
  typescript: true,
  react: true,
  importsInternalPattern: ['@/**'],
}).append({
  ignores: ['**/generated/**'],
});
