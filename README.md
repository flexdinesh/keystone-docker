Dockerised Keystone app

`docker-compose up` should start the app and you should be able to access the app at http://localhost:8080.

There's a issue where the db connection gets reset in first time docker run and keystone optimistally tries to connect to the db and terminates the server on error. But we will still be able to connect to the database using a db viewer tool even after keystone server hangs up. Need to figure out.