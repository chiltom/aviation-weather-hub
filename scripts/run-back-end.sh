#!/bin/bash
# Script that runs the back end server
# Make executable with chmod +x ./run-back-end.sh
# Run with ./run-back-end.sh

cd ../back-end
source .venv/bin/activate
python3 manage.py runserver
