#!/bin/bash

# Create and prepare directory
mkdir devops-extracted
chmod +w devops-extracted

# Download and extract files
echo "Downloading from https://github.com/MikronMIK32/devops/archive/refs/heads/$DEVOPS_BRANCH.tar.gz"

curl -fSL --header "Authorization: Bearer $PAT_TOKEN" "https://github.com/MikronMIK32/devops/archive/refs/heads/$DEVOPS_BRANCH.tar.gz" -o "devops-extracted/archive.tar.gz" || exit 1
echo "Extracting devops files, prepare .env..."
tar -xzf ./devops-extracted/archive.tar.gz -C devops-extracted/ --strip-components=1
rm ./devops-extracted/archive.tar.gz

# Display contents
echo "Contents of devops:"
ls ./devops-extracted
echo "Overall content:"
ls -l

# Copy necessary files

# Check if directories exist and are not empty
if [ -d "devops-extracted/common" ] && [ "$(ls -A devops-extracted/common)" ]; then
    cp -r devops-extracted/common/* ./
else
    echo "Warning: 'devops-extracted/common' is empty or does not exist"
fi

if [ -d "devops-extracted/dev/$APP_NAME" ] && [ "$(ls -A devops-extracted/dev/$APP_NAME)" ]; then
    cp -r devops-extracted/dev/$APP_NAME/* ./
else
    echo "Warning: 'devops-extracted/dev/$APP_NAME' is empty or does not exist"
fi

# Create and finalize .env file
echo "" > newline.txt
cat devops-extracted/common/.env newline.txt devops-extracted/dev/$APP_NAME/.env newline.txt > .env
echo "COMMIT_ID=$COMMIT_ID" >> .env

# Clean up
rm -rf ./devops-extracted
rm newline.txt
