#!/bin/bash
# Setup script for JAK Wiki Bot
set -e

echo "🧠 JAK Wiki Bot Setup"
echo "====================="

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.9+."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pip3 install -r requirements.txt --quiet

# Check for .env file
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  No .env file found."
    echo ""
    echo "To use AI-powered responses, you need a Kimi API key:"
    echo "   1. Go to https://platform.moonshot.cn"
    echo "   2. Sign up and create an API key"
    echo "   3. Create .env file with:"
    echo ""
    echo "      KIMI_API_KEY=***"
    echo ""
    read -p "Paste your Kimi API key (or press Enter to skip): " api_key
    
    if [ -n "$api_key" ]; then
        echo "KIMI_API_KEY=$api_key" > .env
        echo "✅ API key saved to .env"
    else
        echo "⚠️  Running in search-only mode. Create .env later to enable AI."
    fi
else
    echo "✅ .env file found"
fi

# Install LaunchAgent
echo ""
echo "🔧 Installing LaunchAgent for auto-start..."
mkdir -p ~/Library/LaunchAgents
cp com.jak.wiki-bot.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.jak.wiki-bot.plist 2>/dev/null || true

echo ""
echo "✅ Setup complete!"
echo ""
echo "Start the bot:"
echo "   cd ~/jak-vault/bot && ./start.sh"
echo ""
echo "Or let the LaunchAgent auto-start it:"
echo "   launchctl start com.jak.wiki-bot"
echo ""
echo "Access at: http://localhost:8501"
