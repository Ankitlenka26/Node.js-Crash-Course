// const person = require("./person");

// // import person from './person'   => only ES6 feature which is not implemented by node till now
// console.log(person);

// const Logger = require("./logger");

// const logger = new Logger();

// logger.on("message", (data) => {
//   console.log("Called Listener:", data);
// });

// logger.log("Hello world");

// ************************************************************************** //

const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url);
  // THIS IMPLEMENTATION IS FINE FOR VERY SMALL APPLICATIONS BUT FOR LARGE APPLICATIONS WE HAVE TO MAKE THE PAGES DYNAMIC
  //   if (req.url === "/") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "index.html"),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-type": "text/html" });
  //         res.end(content);
  //       }
  //     );
  //   }

  //   if (req.url === "/about") {
  //     fs.readFile(
  //       path.join(__dirname, "public", "about.html"),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { "Content-type": "text/html" });
  //         res.end(content);
  //       }
  //     );
  //   }

  //   if (req.url === "/api/users") {
  //     const users = [
  //       { name: "Ankit Lenka", age: "20" },
  //       { name: "Komal Sharma", age: "20" },
  //       { name: "Roshni Ojha", age: "20" },
  //       { name: "Shivam Panwar", age: "19" },
  //     ];

  //     res.writeHead(200, { "Content-type": "application/json" });
  //     res.end(JSON.stringify(users));
  //   }

  //  BUILD FILE PATH :
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  //   console.log(filePath);
  //   res.end();

  //   Extenstion of the file
  let extname = path.extname(filePath);
  // Initial content type
  let contentType = "text/html";
  // check the ext and set the extension type

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  //   Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //   Some server error
        res.writeHead(500);
        res.end(`SERVER ERROR : ${err.code}`);
      }
    } else {
      // Sucess
      res.writeHead(200, { "Content-type": contentType });
      res.end(content, "utf8");
    }
  });
});
// when we will deploy this there might be cases when port 5000 is not free
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on post ${PORT}`));
