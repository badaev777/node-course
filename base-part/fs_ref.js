const fs = require("fs");
const path = require("path");

// Create new dir
// fs.mkdir(path.join(__dirname, "notes"), (err) => {
//   if (err) throw err;
//   console.log("Dir has been created");
// });

//Create new file

// fs.writeFile(
//   path.join(__dirname, "notes", "mynotes.txt"),
//   "Hello NodeJS",
//   (err) => {
//     if (err) throw err;
//     console.log("file has been created");
//
//     fs.appendFile(
//       path.join(__dirname, "notes", "mynotes.txt"),
//       "Append data",
//       (err) => {
//         if (err) throw err;
//         console.log("File has been updated");
//       }
//     );
//   }
// );

// READ file
// fs.readFile(
//     path.join(__dirname, 'notes', 'mynotes.txt'),
//     'utf-8',
//     (err, data) => {
//         if(err) throw err;
//         console.log(data);
// });


fs.rename(
    path.join(__dirname, 'notes', 'mynotes.txt'),
    path.join(__dirname, 'notes', 'notes.txt'),
    (err) => {
        if(err) throw err;

        console.log('File has been rename')
    }
)
