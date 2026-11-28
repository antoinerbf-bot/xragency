#!/usr/bin/env bash
# ==============================================================================
# XR Agency - Déploiement automatique de maquettes illimitées sur o2switch
# Supporte : Projets Vite/React locaux, exports Lovable (.zip), code ChatGPT, HTML statique
# ==============================================================================

set -e

SLUG="$1"
SOURCE_INPUT="$2"

if [ -z "$SLUG" ]; then
  echo "Usage: $0 <nom-de-la-maquette> [dossier_ou_fichier.zip]"
  echo "Exemples :"
  echo "  $0 solveg-v1                     (compile et déploie le projet courant)"
  echo "  $0 pocketball ~/Downloads/projet.zip (déploie un zip téléchargé depuis Lovable ou ChatGPT)"
  echo "  $0 client-dupont ./jg-carglow/dist  (déploie un sous-dossier compilé)"
  exit 1
fi

# Nettoyer le slug (minuscules, tirets uniquement)
SLUG=$(echo "$SLUG" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/^-//;s/-$//')

echo "🚀 Début du déploiement de la maquette : $SLUG"

TEMP_DIR=""
CLEANUP_TEMP=false

# Déterminer la source des fichiers
if [ -n "$SOURCE_INPUT" ]; then
  if [ -f "$SOURCE_INPUT" ] && [[ "$SOURCE_INPUT" == *.zip ]]; then
    echo "📦 Extraction du fichier zip : $SOURCE_INPUT"
    TEMP_DIR=$(mktemp -d /tmp/preview_deploy_XXXXXX)
    CLEANUP_TEMP=true
    unzip -q "$SOURCE_INPUT" -d "$TEMP_DIR"
    
    # Trouver le dossier contenant index.html
    INDEX_FILE=$(find "$TEMP_DIR" -name "index.html" | head -n 1)
    if [ -n "$INDEX_FILE" ]; then
      BUILD_DIR=$(dirname "$INDEX_FILE")
    else
      BUILD_DIR="$TEMP_DIR"
    fi
  elif [ -d "$SOURCE_INPUT" ]; then
    BUILD_DIR="$SOURCE_INPUT"
  else
    echo "❌ Erreur : Source '$SOURCE_INPUT' introuvable."
    exit 1
  fi
else
  # Pas de source spécifiée, on regarde le projet courant
  if [ -d "dist" ]; then
    BUILD_DIR="dist"
  elif [ -d ".output/public" ]; then
    BUILD_DIR=".output/public"
  elif [ -f "package.json" ]; then
    echo "⚙️ Compilation du projet avec npm run build..."
    npm run build
    if [ -d "dist" ]; then
      BUILD_DIR="dist"
    elif [ -d ".output/public" ]; then
      BUILD_DIR=".output/public"
    else
      echo "❌ Erreur : Dossier de build introuvable après la compilation."
      exit 1
    fi
  else
    echo "❌ Erreur : Aucun build détecté dans le répertoire courant."
    exit 1
  fi
fi

echo "📂 Source identifiée : $BUILD_DIR"

# Création du .htaccess pour le routage SPA (React / Vue)
cat << 'HTACCESS' > "$BUILD_DIR/.htaccess"
RewriteEngine On
RewriteBase /previews/__SLUG__/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /previews/__SLUG__/index.html [L]
HTACCESS

# Remplacement du tag __SLUG__ par le vrai slug
sed -i '' "s|__SLUG__|$SLUG|g" "$BUILD_DIR/.htaccess" 2>/dev/null || sed -i "s|__SLUG__|$SLUG|g" "$BUILD_DIR/.htaccess"

# Déploiement sur o2switch via SSH / rsync
REMOTE_HOST="glycine.o2switch.net"
REMOTE_PORT="2022"
REMOTE_USER="puzo3938"
REMOTE_PATH="~/public_html/previews/$SLUG"

echo "🌐 Synchronisation vers o2switch ($REMOTE_PATH)..."
ssh -p "$REMOTE_PORT" "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $REMOTE_PATH"

rsync -avz -e "ssh -p $REMOTE_PORT" --delete "$BUILD_DIR/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

# Nettoyage si dossier temporaire
if [ "$CLEANUP_TEMP" = true ] && [ -n "$TEMP_DIR" ]; then
  rm -rf "$TEMP_DIR"
fi

echo ""
echo "=================================================================="
echo "✅ MAQUETTE PUBLIÉE AVEC SUCCÈS !"
echo "🔗 URL accessible : https://xragencyai.com/previews/$SLUG/"
echo "=================================================================="
