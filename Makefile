all: say_hello db

say_hello:
	echo "Hello World"

db:
	sequelize db:migrate:undo:all
	echo "Cleaning database ..."
	sequelize db:migrate
	echo "Creating db ..."
	echo "Init db data..."
	node ./seeders/initialData/loadInitialData.js