#!/bin/bash
# Sync the bot's in-repo wiki snapshot to mirror the live Obsidian vault.
# Run this whenever you've edited atoms in Obsidian and want to ship them.
#
# Locally the bot reads from BOTH ~/jak-vault/wiki and
# ~/jak-vault/01_Corporate/03_Knowledge_Library (via _resolve_extra_atom_roots).
# Streamlit Cloud doesn't have OneDrive, so it falls back to the in-repo
# snapshot at bot/wiki/. This script keeps that snapshot fresh.

set -euo pipefail
cd "$(dirname "$0")"

VAULT_WIKI="$HOME/jak-vault/wiki"
KL_ROOT="$HOME/jak-vault/01_Corporate/03_Knowledge_Library"

if [ ! -d "$VAULT_WIKI" ] || [ ! -d "$KL_ROOT" ]; then
    echo "ERROR: vault source(s) missing — $VAULT_WIKI or $KL_ROOT"
    exit 1
fi

echo "Syncing bot/wiki/ snapshot..."

# 1. Primary wiki tree — preserve folder structure, no deletes for source notes
#    --delete: removes files in dest that aren't in source (true mirror)
#    --exclude .DS_Store etc.
rsync -a --delete \
    --exclude=".DS_Store" \
    --exclude="MOC_*" \
    "$VAULT_WIKI/" "./wiki/" \
    --exclude="frameworks/" \
    --exclude="concepts/" \
    --exclude="tools/"

# 2. Knowledge Library subfolders -> clean category names in bot/wiki/
sync_kl() {
    local src_name="$1"
    local dst_name="$2"
    local src_dir="$KL_ROOT/$src_name"
    local dst_dir="./wiki/$dst_name"

    if [ ! -d "$src_dir" ]; then
        echo "  WARN: $src_dir missing — skipping"
        return
    fi

    mkdir -p "$dst_dir"

    # Use a tmp listing of atom-formatted files only (filters out templates etc.)
    local tmp_list
    tmp_list=$(mktemp)
    grep -l "^type: atom" "$src_dir"/*.md 2>/dev/null > "$tmp_list" || true

    # Delete files in dest that aren't in the atom-only source list
    for existing in "$dst_dir"/*.md; do
        [ -e "$existing" ] || continue
        local name
        name=$(basename "$existing")
        if ! grep -q "/$name\$" "$tmp_list"; then
            rm "$existing"
        fi
    done

    # Copy/update atom files
    while IFS= read -r f; do
        [ -e "$f" ] && cp "$f" "$dst_dir/"
    done < "$tmp_list"

    rm -f "$tmp_list"
}

sync_kl "Frameworks_&_Models" "frameworks"
sync_kl "Reference_Materials" "concepts"
sync_kl "Tools_&_Resources" "tools"

# 3. Strip any zero-byte stub files anywhere in bot/wiki/ — these are
#    leftovers from Obsidian rename operations and just pollute the atom count.
find ./wiki -type f -name "*.md" -size 0 -delete

# 4. Report
echo
echo "Snapshot now contains:"
ATOMS=$(find ./wiki -name "*.md" -not -name "MOC_*" -not -path "./wiki/sources/*" 2>/dev/null | wc -l | tr -d ' ')
echo "  Atoms (total):    $ATOMS"
for d in business-models growth metrics platform-economics pricing strategy concepts frameworks tools; do
    if [ -d "./wiki/$d" ]; then
        c=$(find "./wiki/$d" -name "*.md" -not -name "MOC_*" | wc -l | tr -d ' ')
        printf "  %-22s %d\n" "$d:" "$c"
    fi
done
echo
echo "Next: cd $(pwd) && git add -A && git commit -m 'Sync wiki' && git push"
