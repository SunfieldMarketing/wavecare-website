import urllib.request
import re
import json

html = urllib.request.urlopen('https://wavecare.io').read().decode('utf-8')
matches = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
for i, m in enumerate(matches):
    print(f'Script {i}:')
    try:
        parsed = json.loads(m)
        print(json.dumps(parsed, indent=2))
    except Exception as e:
        print("Invalid JSON:", e)
        print("Raw:", m)
