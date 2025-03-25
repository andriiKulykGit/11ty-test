import { remove } from "fs-extra";

async function clean() {
	console.log("🗑  Удаляю _site перед сборкой...");
	await remove("_site");
	console.log("✅ Папка _site удалена");
}

clean().catch(console.error);
