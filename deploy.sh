#!/bin/bash

# --- CONFIG ---
USER_OVH="safevaz-tom"
HOST_OVH="ssh.cluster100.hosting.ovh.net"
WWW_DIR="www"
ZIP_NAME="site.zip"

echo "🗜️ Compression of dist/ content..."
cd dist || { echo "❌ Directory dist/ not found. Run 'npm run build' first."; exit 1; }
zip -r "../$ZIP_NAME" ./* > /dev/null
cd ..

echo "📤 Uploading to OVH..."
scp "$ZIP_NAME" "$USER_OVH@$HOST_OVH:~/" || { echo "❌ Upload failed"; rm "$ZIP_NAME"; exit 1; }

echo "📂 Unpacking on OVH..."
ssh "$USER_OVH@$HOST_OVH" << EOF
    cd $WWW_DIR || exit 1
    rm -f index.html
    unzip -o ~/$ZIP_NAME > /dev/null
    rm ~/$ZIP_NAME
EOF

echo "🧹 Local cleanup..."
rm "$ZIP_NAME"

echo "✅ Deployment complete! System updated."
