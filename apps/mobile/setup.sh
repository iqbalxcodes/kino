#!/bin/sh
# Jalankan dari apps/mobile setelah zip di-extract
set -e
rm -f App.tsx index.ts
node -e 'const f="package.json",p=require("./"+f);p.main="expo-router/entry";require("fs").writeFileSync(f,JSON.stringify(p,null,2)+"\n")'
npx expo install expo-router expo-linking expo-constants expo-secure-store react-native-screens react-native-safe-area-context react-native-webview
[ -f .env ] || cp env.example .env
echo "Edit .env (IP LAN laptop), lalu: npx expo start -c"
