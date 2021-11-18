/*
   Copyright 2021 Hiroshi.tao

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

package main

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed _/bjfu
var bjfu embed.FS

//go:embed dist
var dist embed.FS
var html, _ = fs.Sub(dist, "dist")

func main() {
	http.Handle("/_/", http.FileServer(http.FS(bjfu)))
	http.Handle("/", http.FileServer(http.FS(html)))
	http.ListenAndServe(":12345", nil)
}
