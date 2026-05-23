#!/bin/bash
# Start the JAK Wiki Bot (local mode — no API key required).

set -u
cd "$(dirname "$0")"

PORT=8501

# Find streamlit
STREAMLIT=$(command -v streamlit 2>/dev/null || echo "/Users/utopianjak/Library/Python/3.9/bin/streamlit")

if [ ! -x "$STREAMLIT" ]; then
    echo "Streamlit not found. Installing dependencies…"
    pip3 install -r requirements.txt
    STREAMLIT=$(command -v streamlit 2>/dev/null || echo "/Users/utopianjak/Library/Python/3.9/bin/streamlit")
fi

if [ ! -x "$STREAMLIT" ]; then
    echo "Streamlit still not found after install. Aborting."
    exit 1
fi

# Free port 8501 if something is holding it
EXISTING_PIDS=$(lsof -ti tcp:$PORT 2>/dev/null | tr '\n' ' ')
if [ -n "$EXISTING_PIDS" ]; then
    echo "Port $PORT in use (pids: $EXISTING_PIDS). Stopping previous instances…"
    # shellcheck disable=SC2086
    kill $EXISTING_PIDS 2>/dev/null || true
    sleep 1
    # Force-kill stragglers
    STRAGGLERS=$(lsof -ti tcp:$PORT 2>/dev/null | tr '\n' ' ')
    if [ -n "$STRAGGLERS" ]; then
        # shellcheck disable=SC2086
        kill -9 $STRAGGLERS 2>/dev/null || true
        sleep 1
    fi
fi

echo "Starting JAK Wiki Bot…"
echo "   Local: http://localhost:$PORT"
echo "   Mode:  Local search (no API key required)"
echo ""

exec "$STREAMLIT" run app.py \
    --server.headless true \
    --server.port "$PORT" \
    --browser.gatherUsageStats false
