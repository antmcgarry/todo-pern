#!/bin/bash

# Define key parameters
KEY_NAME="jwtRS256"
PRIVATE_KEY="${KEY_NAME}_key.pem"
PUBLIC_KEY="${KEY_NAME}_key.pub"

# Generate the RSA private key
openssl genpkey -algorithm RSA -out $PRIVATE_KEY -pkeyopt rsa_keygen_bits:2048

# Extract the public key from the private key
openssl rsa -pubout -in $PRIVATE_KEY -out $PUBLIC_KEY

# Set correct permissions
chmod 600 $PRIVATE_KEY
chmod 600 $PUBLIC_KEY

# Output the result
echo "Private key stored in: $PRIVATE_KEY"
echo "Public key stored in: $PUBLIC_KEY"
