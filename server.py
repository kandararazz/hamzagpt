#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for local development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = PORT
    for p in range(PORT, PORT + 20):
        try:
            with socketserver.TCPServer(("", p), Handler) as httpd:
                print(f"🚀 HamzaGPT is live at: http://localhost:{p}")
                print("Press Ctrl+C to stop the server.")
                sys.stdout.flush()
                httpd.serve_forever()
        except OSError:
            continue

if __name__ == "__main__":
    run_server()

