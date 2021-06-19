var handle_static = require("./requestHandlers").handle_static;

function route(pathname, query, handle, request, response) {
    console.log("route for " + pathname);
    if (! (pathname in handle)) {
        console.log("static");
        handle_static(pathname, request, response);
    } else if (typeof handle[pathname] === 'function') {
        handle[pathname](query, request, response);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 not found");
        response.end();
    }
}

exports.route = route;