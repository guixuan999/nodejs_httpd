import base64
import hmac
import time
from urllib.parse import quote

def token(id,access_key):
    version = '2018-10-31'

    # res = 'mqs/%s' % id  # 通过MQ_ID访问MQ
    res = 'products/%s' % id  # 通过产品ID访问产品API

    # 用户自定义token过期时间
    et = str(int(time.time()) + 3600)
    
    et = "1680582491"

    # 签名方法，支持md5、sha1、sha256
    method = 'md5'

    # 对access_key进行decode
    key = base64.b64decode(access_key)

    # 计算sign
    org = et + '\n' + method + '\n' + res + '\n' + version
    sign_b = hmac.new(key=key, msg=org.encode(), digestmod=method)

    sign = base64.b64encode(sign_b.digest()).decode()

    # value 部分进行url编码，method/res/version值较为简单无需编码
    sign = quote(sign, safe='')
    res = quote(res, safe='')

    # token参数拼接
    token = 'version=%s&res=%s&et=%s&method=%s&sign=%s' % (version, res, et, method, sign)

    return token


if __name__ == '__main__':
    id = '556381'
    access_key = 'LTcFERO6j+yhvcNnmg0jUUrRIuhtdi8XKTerm2wy7Ww='

    print(token(id,access_key))