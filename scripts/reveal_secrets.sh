#!/usr/bin/env bash

# Check installation
which ansible;
if [ $? -eq 0 ]; then
    ansible-vault decrypt backend/MemoriaFotografica/secrets.py frontend/.env-cmdrc
else
    echo "Ansible is required for secret decryption"
fi