docker compose -f docker/compose.yml -f docker/compose.local.yml down -v --remove-orphans
docker compose -f docker/compose.yml -f docker/compose.local.yml up --build