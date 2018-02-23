const { exec } = require("child_process");
const fs = require("fs");
const JPEG_2000_HEADER = Buffer.from("FF4FFF51","hex");

if (process.argv.length <= 2) {
    console.error("Usage: " + __filename + " filename.inv");
    process.exit(-1);
}
 
var param = process.argv[2];
 
console.log("Extracting: " + param);

let wholeFile = fs.readFileSync(param);
console.log(wholeFile.length);
let index = 0;
let start = wholeFile.indexOf(JPEG_2000_HEADER);
while(start !==-1) {
    end = wholeFile.indexOf(JPEG_2000_HEADER, start + JPEG_2000_HEADER.length);
    writeFile(index, start, end);
    index++;
    start = end;
}
function writeFile(index, start, end) {
    console.log(`Image ${index} located start:${start}, end:${end}`);
    let ws = fs.createWriteStream(`image${index}.j2k`);
    ws.on("close", () => {
        console.log(`Image ${index} converting`);
        exec(`magick.exe image${index}.j2k -alpha extract image${+index}.png`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stdout) {
            console.log(`stdout: ${stdout}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        });
    });
    ws.end(wholeFile.slice(start, end));
}

