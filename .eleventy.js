import { minify } from 'html-minifier';

export default function (eleventyConfig) {
	eleventyConfig.addTransform("minifyHTML", function (content, outputPath) {
		if (outputPath && outputPath.endsWith(".html")) {
			let minified = minify(content, {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				minifyCSS: true,
				minifyJS: true,
			});
			return minified;
		}
		return content;
	});
	return {
		dir: { input: 'src' },
	};
};
