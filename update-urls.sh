#!/bin/bash

# Script zum Aktualisieren der URLs nach GitLab Upload
# Verwendung: ./update-urls.sh YOUR_GITLAB_USERNAME

if [ -z "$1" ]; then
    echo "Verwendung: $0 YOUR_GITLAB_USERNAME"
    echo "Beispiel: $0 maximilian"
    exit 1
fi

GITLAB_USERNAME=$1
echo "Aktualisiere URLs für GitLab Username: $GITLAB_USERNAME"

# README.md aktualisieren
echo "Aktualisiere README.md..."
sed -i "s/your-username/$GITLAB_USERNAME/g" README.md
sed -i "s/gitlab.com\/your-username\/spotmybackup-2/gitlab.com\/$GITLAB_USERNAME\/spotmybackup-2/g" README.md

# App.vue aktualisieren
echo "Aktualisiere src/App.vue..."
sed -i "s/your-username/$GITLAB_USERNAME/g" src/App.vue

# Package.json aktualisieren
echo "Aktualisiere package.json..."
# Füge Repository-Informationen hinzu, falls nicht vorhanden
if ! grep -q '"repository"' package.json; then
    # Füge Repository-Informationen vor dem letzten } hinzu
    sed -i '$s/}/,\n  "repository": {\n    "type": "git",\n    "url": "https:\/\/gitlab.com\/'$GITLAB_USERNAME'\/spotmybackup-2.git"\n  },\n  "homepage": "https:\/\/gitlab.com\/'$GITLAB_USERNAME'\/spotmybackup-2"\n}/' package.json
fi

echo "URLs erfolgreich aktualisiert!"
echo ""
echo "Nächste Schritte:"
echo "1. git add ."
echo "2. git commit -m 'Update URLs for GitLab repository'"
echo "3. git push"
echo ""
echo "Dein Repository ist jetzt unter https://gitlab.com/$GITLAB_USERNAME/spotmybackup-2 verfügbar"
