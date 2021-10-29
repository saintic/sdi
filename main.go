package main

import (
	"embed"
	"html/template"
	"net/http"
)

//go:embed _/bjfu
var bjfu embed.FS

//go:embed index.html
var indexTmpl []byte

func main() {
	http.Handle("/_/", http.FileServer(http.FS(bjfu)))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl, _ := template.New("index").Parse(string(indexTmpl))
		tmpl.Execute(w, nil)
	})
	http.ListenAndServe(":12345", nil)
}
