const fs = require("fs");

function main() {
    console.log("READING PROJECT'S INTEGRITY");

    const hash = fs.readFileSync("./integrity/integrity-hash.txt", "utf8").split(" ")[0];

    console.log(`The integrity hash of XRP Studio is: ${hash}`);
}

main();
