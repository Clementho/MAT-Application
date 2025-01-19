#!/bin/bash

## Start backend node server as pm2 process
cd /var/www/Backend

# Check if PM2 is running
if ! pm2 info node-backend &>/dev/null; then
  # If PM2 is not running, start it with your Node.js application
  pm2 start server.js -n node-backend
else
  # If PM2 is running, restart it to apply any changes
  pm2 restart node-backend
fi

# Run pm2 startup to configure PM2 to start on boot
pm2 startup

# Save the current PM2 process list and configuration
pm2 save
