# Bootstrap script supportsd MacOS

echo "Check if homebrew is installed"
# Check if homebrew is installed
which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
fi

echo "Check if docker is installed"
# Check if docker is installed
docker -v
if [[ $? != 0 ]] ; then
    brew install --cask docker
fi

echo "Starting docker if docker is not running"

if ! docker info >/dev/null 2>&1; then
    open -g -a Docker.app || exit
    echo "Please make sure Docker has started before running the bootstrap script again"
    exit 1
fi

# Build docker compose images
docker-compose -p whiletrue build --no-cache


