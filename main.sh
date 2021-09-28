PACKAGE_VERSION=$(node -p -e "try { require('./nitro-sniper/package.json').version } catch { '0.0.0' }")
LATEST_VERSION=$(curl --silent "https://raw.githubusercontent.com/slow/nitro-sniper/main/package.json" | grep '"version":' | sed -E 's/.*"([^"]+)".*/\1/')

function compareVersions {
   echo "$@" | awk -F. '{ printf("%d%03d%03d%03d\n", $1,$2,$3,$4); }'; 
}

function installAll() {
  echo "$(tput setaf 6)Installing packages, please wait..."
  install-pkg "http://archive.ubuntu.com/ubuntu/pool/main/g/glib2.0/libglib2.0-0_2.56.4-0ubuntu0.18.04.8_amd64.deb" &> /dev/null
  echo "$(tput setaf 2)Installed dependencies."
  echo "$(tput setaf 6)Cloning the latest sniper code..."
  rm -rf nitro-sniper &> /dev/null
  git clone https://github.com/slow/nitro-sniper nitro-sniper &> /dev/null
  cd nitro-sniper
  echo "$(tput setaf 2)Cloned latest version of the sniper."
  echo "$(tput setaf 6)Installing sniper dependencies..."
  npm install &> /dev/null
  echo "$(tput setaf 2)Installed sniper dependencies."
  echo "$(tput setaf 2)Running sniper..."
  npx node ./src/index.js
}

if [ $(compareVersions $PACKAGE_VERSION) -lt $(compareVersions $LATEST_VERSION) ]; then 
  installAll
else
  cd nitro-sniper
  npx node ./src/index.js
fi