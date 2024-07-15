
var querystring = require("querystring");
var fs = require("fs");
var path = require("path");
const { spawn } = require("child_process");


function check_method(request, response) {
    if(request.method != "GET") {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write("method " + request.method + " is not supported! Please Use GET.");
        response.end();
        return false;
    }

    return true;
}

function welcome(query, request, response) {
    if(!check_method(request, response))
        return;

    const clientIp = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const pythonProcess = spawn('python', ['ip2geo.py', clientIp]);
    pythonProcess.stdout.on('data', (data) => {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write("<pre>Welcome to world of Nodejs!<br></pre>");
        response.write("<pre>You are from: <br>");
        response.write(clientIp);
	response.write("<br>");
	response.write(data);
        response.write("</pre");
        response.end();
    });
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Standard Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        // console.log(`Child process exited with code ${code}`);
        // 在这里可以执行子进程退出后的操作
    });
}

function sayhi(query, request, response) {
    if(!check_method(request, response))
        return;

    var queryObj = querystring.parse(query);
    var first_name = "firstname" in queryObj ? queryObj["firstname"] : "Firstname";
    var last_name = "lastname" in queryObj ? queryObj["lastname"] : "Lastname";
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hi," + " " + first_name + " " + last_name);
    response.end();
}

function getclassmates(query, request, response) {
    if(!check_method(request, response))
        return;

    var queryObj = querystring.parse(query);
    var gender = "gender" in queryObj ? queryObj["gender"] : null;
    fs.readFile(__dirname + "/data/classmates.json", "utf-8", function(error, file) {
        if(error) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(error + "\n");
          response.end();
        } else {
          var classmates = JSON.parse(file);
          var results = [];
          if(gender == null) {
            results = classmates;
          } else {
            for(let classmate of classmates) {
              if(classmate["gender"] == gender) {
                results.push(classmate);
              }
            }
          }
          response.writeHead(200, {"Content-Type": "application/json"});
          response.write(JSON.stringify(results), "binary");
          response.end();  
        }
    });


}

function handle_static(pathname, request, response) {
    if(!check_method(request, response))
        return;

    if(request.method == "GET") {
        fs.readFile(__dirname + "/static" + pathname, "binary", function(error, file) {
            if(error) {
              response.writeHead(500, {"Content-Type": "text/plain"});
              response.write(error + "\n");
              response.end();
            } else {
              var ext = path.extname(pathname);
              switch(ext) {
              case ".html":
              case ".htm":
                response.writeHead(200, {"Content-Type": "text/html"});
                break;
              case ".js":
                response.writeHead(200, {"Content-Type": "application/x-javascript"});
                break;
              case ".css":
                response.writeHead(200, {"Content-Type": "text/css"});
                break;
              case ".jpg":
              case ".jpeg":
	      case ".png":
                response.writeHead(200, {"Content-Type": "image/jpg"});
                break;
              default:
                response.writeHead(200, {"Content-Type": "application/octet-stream", "Content-Length": file.length});
              }
              response.write(file, "binary");
              response.end();
            }
        });
    } 
}


exports.welcome = welcome;
exports.sayhi = sayhi;
exports.getclassmates = getclassmates;
exports.handle_static = handle_static;
