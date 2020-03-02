fs = require('fs')

// Receiving input file, output file, regexp and replacement string
let args = process.argv.slice(2);

// Reading input file content
let contents =  fs.readFileSync(args[0], 'utf8')

// Transforming input file content based on regexp and replacement string
let transformedContent = contents.replace(new RegExp(args[2], "g"), args[3])

// Writing transformed content of input file to output file
fs.writeFileSync(args[1], transformedContent, 'utf8')
