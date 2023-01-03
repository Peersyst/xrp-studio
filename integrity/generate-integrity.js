const fs = require("fs");
const { execSync } = require("child_process");

function main() {
    console.log("GENERATING PROJECT'S INTEGRITY");

    console.log("STEP 1: Generating an integrity hash for every file...");
    execSync("yarn generate:files:integrity ./integrity/files-integrity.txt");

    console.log("STEP 2: Generating an integrity hash for the whole project...");
    execSync("yarn generate:project:integrity ./integrity/files-integrity.txt ./integrity/integrity-hash.txt");

    const data = fs.readFileSync("./integrity/integrity-hash.txt", "utf8");
    console.log(`SUCCESS: The integrity hash of XRP Studio is: ${data.split(" ")[0]}`);
}

main();
