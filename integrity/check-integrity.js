const fs = require("fs");
const { execSync } = require("child_process");

function main() {
    console.log("CHECKING PROJECT'S INTEGRITY");

    execSync("yarn generate:files:integrity ./integrity/tmp-files-integrity.txt");
    execSync("yarn generate:project:integrity ./integrity/tmp-files-integrity.txt ./integrity/tmp-integrity-hash.txt");

    const oldHash = fs.readFileSync("./integrity/integrity-hash.txt", "utf8").split(" ")[0];
    const newHash = fs.readFileSync("./integrity/tmp-integrity-hash.txt", "utf8").split(" ")[0];

    fs.unlinkSync("./integrity/tmp-files-integrity.txt");
    fs.unlinkSync("./integrity/tmp-integrity-hash.txt");

    if (oldHash === newHash) {
        console.log("SUCCESS: Project has been unchanged");
        console.log(`The integrity hash of XRP Studio is: ${oldHash}`);
    } else {
        console.log("ERROR: Project has been changed");
        console.log(`The previous integrity hash of XRP Studio was: ${oldHash}`);
        console.log(`The new integrity hash of XRP Studio is: ${newHash}`);
    }
}

main();
