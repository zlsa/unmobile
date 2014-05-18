#!/bin/sh

# Replace the following with the name of the Chrome executable
CHROME=google-chrome-unstable
#CHROME=google-chrome-stable

ROOT=`readlink -f ./`
# PEM key is in ../unmobile.pem
PEM_FILE=`readlink -f ../unmobile.pem`


echo "Removing old .crx files..."

rm unmobile.crx
rm ../unmobile.crx

echo "Root folder: " $ROOT
echo "PEM filename:" $PEM_FILE

$CHROME --pack-extension=$ROOT --pack-extension-key=$PEM_FILE
cp ../unmobile.crx ./

echo "Pack finished"
