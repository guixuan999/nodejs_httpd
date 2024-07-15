import sys
import geoip2.database

if __name__ == "__main__":
    reader = geoip2.database.Reader("GeoLite2-City.mmdb")
    try:
        response = reader.city(sys.argv[1]) # ip
        # city
        if "en" in response.city.names:
            print(response.city.names["en"], end=" ")
            if "zh-CN" in response.city.names:
                print(response.city.names["zh-CN"])
            else:
                print("\b")
        
        # state
        if len(response.subdivisions) > 0:
            if "en" in response.subdivisions[0].names:
                print(response.subdivisions[0].names["en"], end=" ")
                if "zh-CN" in response.subdivisions[0].names:
                    print(response.subdivisions[0].names["zh-CN"])
                else:
                    print("\b")
        # contry
        if "en" in response.country.names:
            print(response.country.names["en"], end=" ")
            if "zh-CN" in response.country.names:
                print(response.country.names["zh-CN"])
            else:
                print("\b")
    except Exception as e:
        print(e)