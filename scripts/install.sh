#!/bin/bash
# This script will install all required dependencies for the application
# After cloning the repo, make this script executable by running 'chmod +x ./install.sh' from the repo directory
# Run the script with './install.sh' 

# Ensure that whole script runs or dump script if error
set -eu -o pipefail

# Determine OS name
os=$(uname)

echo "Installing machine dependencies"

# MacOS Install
if [ "$os" = "Darwin" ]; then
  echo "This is an Apple Mac Machine"
  brew update
  brew install python npm postgresql@14
  sudo npm install -g n
  sudo n stable
  brew services restart postgresql@14

# Linux Install
elif [ "$os" = "Linux" ]; then
  echo "This is a Linux Machine"
  if [[ -f /etc/redhat-release ]]; then
    pkg_manager=yum
  elif [[ -f /etc/debian_version ]]; then
    pkg_manager=apt
  fi

  if [ $pkg_manager = "yum" ]; then
    sudo yum install -y python3 python3-pip python3-setuptools python3.10-venv npm postgresql@14 postgresql-contrib
    sudo npm install -g n
    sudo n stable
    sudo service postgresql@14 restart
  elif [ $pkg_manager = "apt" ]; then
    sudo apt-get install -y python3 python3-pip python3-setuptools python3.10-venv npm postgresql@14 postgresql-contrib
    sudo npm install -g n
    sudo n stable
    sudo service postgresql@14 restart
  fi

else
  echo "Unsupported OS"
  exit 1

fi

echo "Installed machine dependencies"

# Install all Project Dependencies

echo "Installing project dependencies"

cd ../front-end
npm install
cd ../back-end
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt

echo "Installed project dependencies"

echo "Setting up database and migrations"

dropdb weather_db && createdb weather_db
python3 manage.py makemigrations
python3 manage.py migrate

echo "Set up database and migrated"
