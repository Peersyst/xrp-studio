const fs = require("fs");

// Images folder
const imgFolder = process.argv[2];
// Array containing all requires
const imgRequires = [];

/**
 * Generates image's name
 * @param filename Image filename
 * @returns {string} Image name
 */
function generateName(filename) {
    const paths = filename.split("/");
    return paths[paths.length - 1].split(".")[0].toLowerCase().replace(/ /g, "_");
}

/**
 * Generates image's require inside index
 * @param filename Image filename
 * @param path Image path
 * @returns {string} Require code
 */
function generateExport(filename, path) {
    return `export { default as ${generateName(filename)} } from "./${path}"`;
}

function addImages(folder) {
    const filenames = fs.readdirSync(folder);
    for (const filename of filenames) {
        const stat = fs.lstatSync(folder + filename);
        if (stat.isDirectory()) addImages(folder + (filename.endsWith("/") ? filename : filename + "/"));
        else if (filename === ".DS_Store" || filename === "index.ts") fs.unlinkSync(folder + filename);
        else
            imgRequires.push(
                generateExport(filename, folder.replace(imgFolder, "") + (filename.endsWith("/") ? filename.slice(-1) : filename)),
            );
    }
}

addImages(imgFolder);

// Create an index
fs.writeFileSync(imgFolder + "index.ts", imgRequires.map((ex) => "\t" + ex).join(";\n") + "\n");
console.log("images index.ts created");
