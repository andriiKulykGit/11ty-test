import { optimize } from "svgo";
import { readdir, readFile, writeFile, ensureDir } from "fs-extra";
import path from "path";

const srcDir = "src/icons";
const destDir = "_site/icons";

async function optimizeSVGs() {
	await ensureDir(destDir);
	const files = await readdir(srcDir);

	for (const file of files) {
		if (path.extname(file) === ".svg") {
			const filePath = path.join(srcDir, file);
			const destPath = path.join(destDir, file);

			const data = await readFile(filePath, "utf8");
			const result = optimize(data, { path: filePath });

			await writeFile(destPath, result.data);
		}
	}
}

optimizeSVGs().catch(console.error);
