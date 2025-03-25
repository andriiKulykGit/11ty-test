import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { minify } from 'html-minifier';

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("static");
	eleventyConfig.addPassthroughCopy(".htaccess");

	eleventyConfig.on("eleventy.before", async () => {
		const { exec } = await import("child_process");
		exec("bun run optimize-icons.js");
	});


	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		alt: '',
		input: "src/img",
		outputDir: "_site/img",
		urlPath: "./img/",
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
		},
	});

	eleventyConfig.addTransform("minifyHTML", function (content, outputPath) {
		if (outputPath && outputPath.endsWith(".html")) {
			return minify(content, {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				minifyCSS: true,
				minifyJS: true,
			});
		}
		return content;
	});

	return {
		dir: {
			input: 'src',
			output: "_site"
		},
		pathPrefix: "/"
	};
};
