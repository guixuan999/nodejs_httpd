
var server = require("./server");
var router = require("./router");
var requestHandlers =require("./requestHandlers");

var api_handle = {}  // api routes only
api_handle["/"] = requestHandlers.welcome;
api_handle["/api/hi"] = requestHandlers.sayhi;
api_handle["/api/classmates/all"] = requestHandlers.getclassmates;

server.start(router.route, api_handle);