package main

import (
	//"encoding/json"
	"crypto/hmac"
	"crypto/md5"
	"encoding/base64"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("GET %v\n", r.RequestURI)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		if req, err := http.NewRequest("GET", fmt.Sprintf("http://api.heclouds.com%v", r.RequestURI), nil); err == nil {
			req.Header.Add("Authorization", onenet_token("556381", "LTcFERO6j+yhvcNnmg0jUUrRIuhtdi8XKTerm2wy7Ww="))
			client := http.Client{}
			if resp, err := client.Do(req); err == nil {
				defer resp.Body.Close()
				body, _ := io.ReadAll(resp.Body)
				fmt.Fprint(w, string(body))
			}
		}
	})

	server := &http.Server{
		Addr:    strings.Join([]string{"0.0.0.0", strconv.Itoa(int(9009))}, ":"),
		Handler: mux,
	}

	if err := server.ListenAndServe(); err != nil {
		fmt.Printf("%v", err)
	}
}

func onenet_token(id, access_key string) string {
	version := "2018-10-31"
	res := fmt.Sprintf("products/%v", id)
	et := fmt.Sprintf("%v", time.Now().Unix()+3600)
	method := "md5"
	key, _ := base64.StdEncoding.DecodeString(access_key)
	org := et + "\n" + method + "\n" + res + "\n" + version
	mac := hmac.New(md5.New, key)
	mac.Write([]byte(org))
	sign_b := mac.Sum(nil)
	sign := base64.StdEncoding.EncodeToString(sign_b[:])
	sign = url.QueryEscape(sign)
	res = url.QueryEscape(res)
	token := fmt.Sprintf("version=%s&res=%s&et=%s&method=%s&sign=%s", version, res, et, method, sign)
	return token
}
