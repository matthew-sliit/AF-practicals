cd server
echo SERVER
start npm start
cd ..\
cd client
echo CLIENT
start npm start
start "" "http://localhost:1234"