const gulp = require('gulp');
const { src, dest } = require('gulp');
const fs = require('fs');
const path = require('path');

const pluginFile = path.join(__dirname, 'euphoria.php');
const pluginHeader = fs.readFileSync(pluginFile, 'utf8');

// Slug: from main file name (euphoria.php → euphoria)
const pluginSlug = path.basename(pluginFile, '.php');

// Version: from plugin header
const pluginVersion = pluginHeader
  .match(/^\s*\*\s*Version:\s*(.+)$/m)[1]
  .trim();

const buildFolderName = `${pluginSlug}-${pluginVersion}`;

const files = [
  '**/*',
  '!**/.*/**', // Hidden files/dirs on Mac/Linux
  '!**/__*/**', // Hidden dirs on Mac
  '!tests/**',
  '!phpunit.xml*',
  '!.yarn/**',
  '!.gitignore',
  '!node_modules/**',
  '!gulpfile.js',
  '!test-cleancss.js',
  '!AGENT.md',
  '!*.jpg',
  '!*.json',
  '!*.lock',
  '!*.log',
  '!*.zip',
  '!src/**',
  '!build/**',
  '!package.json',
  '!webpack.config.js',
  '!tailwind.config.js',
  '!postcss.config.js',
  '!package-lock.json',
  '!composer.json',
  '!composer.phar',
  '!composer.lock',
  '!yarn.lock',
];

async function zip() {
  const gulpZip = (await import('gulp-zip')).default;
  const rename = (await import('gulp-rename')).default;
    return src(files, { base: '.' })
        .pipe(rename(function (path) {
            path.dirname = pluginSlug + (path.dirname ? '/' + path.dirname : '');
        }))
        .pipe(gulpZip(`${pluginSlug}-${pluginVersion}.zip`))
        .pipe(dest('./build'));
}
exports.zip = zip;

// Clean the build folder
const cleanBuild = async () => { 
    const { deleteAsync } = await import('del');
    await deleteAsync([`./build/${buildFolderName}`]);
    if (!fs.existsSync(`./build/${buildFolderName}`)) {
        fs.mkdirSync(`./build/${buildFolderName}`, { recursive: true });
    }
}

// Copy files to build folder
const copyFiles = () => {
    return gulp
      .src(
        [
          "**",
          "!node_modules/**",
          "!gulpfile.js",
          "!test-cleancss.js",
          '!tests/**',
          '!phpunit.xml*',
          "!AGENT.md",
          "!*.jpg",
          "!*.json",
          "!*.lock",
          "!*.log",
          "!*.zip",
          "!src/**",
          "!webpack.config.js",
          "!postcss.config.js",
          "!tailwind.config.js",
          "!build/**",
          '!package.json',
          "!package-lock.json",
          "!yarn.lock",
          "!composer.json",
          "!composer.lock",
          "!composer.phar",
        ],
        { encoding: false },
      )
      .pipe(gulp.dest(`./build/${buildFolderName}`));
};

// Create zip from the build folder
const zipFromBuild = async () => {
    const gulpZip = (await import("gulp-zip")).default;
    const rename = (await import("gulp-rename")).default;
    return gulp
      .src(`./build/${buildFolderName}/**/*`, { base: `./build/${buildFolderName}`, encoding: false })
      .pipe(rename(function (p) {
          p.dirname = pluginSlug + (p.dirname ? '/' + p.dirname : '');
      }))
      .pipe(gulpZip(`${pluginSlug}-${pluginVersion}.zip`))
      .pipe(gulp.dest("./"));
};

// Build Folder: clean, copy files, then create zip (CSS minification handled by wp-scripts)
gulp.task("build-folder", gulp.series(cleanBuild, copyFiles, zipFromBuild));