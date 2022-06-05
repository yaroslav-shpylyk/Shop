## Steps
1. Install Docker
3. Run Docker
4. Open terminal where docker-compose.yml is located

## Commands
- starts all containers under localhost:80
    ```
    docker compose up 
    ```
- stops all containers and removes associated containers, images, volumes
    ```
    docker compose down --rmi all -v
    ```