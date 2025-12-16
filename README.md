# debatehub

## Python dependencies

Install base deps:

```bash
pip install -r requirements.txt
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

```
## Running Backend on server:
```bash
cd /home/ubuntu/debatehub/frontend
npm run build
sudo rsync -av --delete dist/ /var/www/html/
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/

cd /home/ubuntu/debatehub/backend
source ../.venv/bin/activate
sudo systemctl restart debatehub

```