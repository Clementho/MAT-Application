#!/bin/bash
# Update package lists
yum update -y

# Install NGINX
yum install -y nodejs npm

npm install

npm install pm2 -g

# Install Chrome browser for puppeteer
export BROWSERS_SRC_DIR="/usr/src/browsers" && mkdir -p $BROWSERS_SRC_DIR

curl https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
    --output $BROWSERS_SRC_DIR/google-chrome-stable_current_x86_64.rpm
    
yum install -y -q $BROWSERS_SRC_DIR/google-chrome-stable_current_x86_64.rpm