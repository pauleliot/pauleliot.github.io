"""Serveur local du site, sans cache : chaque modification s'affiche au rechargement.
Lancer :  python serve.py   puis ouvrir http://localhost:8080
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = 8080


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()


ThreadingHTTPServer.allow_reuse_address = True
with ThreadingHTTPServer(("", PORT), NoCacheHandler) as httpd:
    print(f"Site disponible sur http://localhost:{PORT}")
    httpd.serve_forever()
