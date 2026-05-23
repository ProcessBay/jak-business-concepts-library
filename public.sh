#!/bin/bash
# Expose JAK Wiki Bot publicly via Cloudflare Tunnel (free, stable URL)

# Check for cloudflared
if ! command -v cloudflared &> /dev/null; then
    echo "📥 Installing cloudflared..."
    brew install cloudflared
fi

# Start bot in background if not running
if ! curl -s http://localhost:8501 > /dev/null; then
    echo "🚀 Starting bot locally..."
    ./start.sh &
    sleep 5
fi

echo ""
echo "🌐 Creating public tunnel..."
echo "   (This gives you a stable https:// URL)"
echo ""
cloudflared tunnel --url http://localhost:8501
