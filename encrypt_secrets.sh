#!/usr/bin/env bash

# Check installation
which ansible;
if [ $? -eq 0 ]; then
    ansible-vault encrypt backend/MemoriaFotografica/secrets.py frontend/.env-cmdrc
else
    echo "Ansible is required for secret decryption"
fi