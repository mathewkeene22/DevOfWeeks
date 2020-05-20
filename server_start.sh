echo "Good luck comrade.";
docker-compose up -d && sleep 5 && docker attach $(docker-compose ps -q dow_app)

echo "Goodbye comrade.";
