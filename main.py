from bottle import route, get, run, template, response, request

import requests
from onenet_token import token

@route('/hello/<name>')
def index(name):
    return template('<b>Hello {{name}}</b>!', name=name)
    
@get('/devices/<device_id>/datapoints')
def index(device_id):
    headers = {'Authorization': token('556381', 'LTcFERO6j+yhvcNnmg0jUUrRIuhtdi8XKTerm2wy7Ww=')}
    print(request.path)
    print(request.query_string)
    url = "http://api.heclouds.com%s?%s" % (request.path, request.query_string)
    print(url)
    ret = requests.get(url=url,
            headers=headers)
    response.set_header("Access-Control-Allow-Origin", "*")
    return ret.text

run(host='0.0.0.0', port=9009)
