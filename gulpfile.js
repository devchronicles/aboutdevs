const gulp = require('gulp');
const fs = require('fs');

gulp.task('build-docs', function () {
    fs.readFile("src/common/docs/docs.md", "utf8", (error, docsData) => {
        const finalDocsData = docsData.replace(/\`/g, () => '\\`');
        fs.readFile("src/common/docs/docsMarkdownTemplate.ts", "utf8", (error, templateData) => {
            let result = templateData;
            result = result.replace(/\{markdown\}/g, () => finalDocsData);
            fs.writeFile("src/common/docs/docsMarkdown.ts", result, (error) => {

            });
        });
    });
});