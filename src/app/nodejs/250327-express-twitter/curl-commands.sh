# Source - see file for curl call examples: /Users/mohammedkhan/Documents/NityxPlay/Bash_Learn/store-bash.sh

# Experiment: cURL - GET requests to fake API
curl https://jsonplaceholder.typicode.com/posts/2

curl -H 'Content-Type: application/json' \
      https://jsonplaceholder.typicode.com/posts/2


curl -X GET \
      -H 'Content-Type: application/json' \
      https://jsonplaceholder.typicode.com/posts/2

# Experiment: cURL - POST requests to fake API. Source: https://www.warp.dev/terminus/curl-post-request
curl -X POST \
      -H 'Content-Type: application/json' \
      -d '{ "title": "Oddish", "body": "Hello from Oddish", "id": 24}' \
      https://jsonplaceholder.typicode.com/posts

curl -X POST \
      -H 'Content-Type: application/json' \
      -d '{ "title": "Growlithe", "body": "Growlithe go woof", "id": 14}' \
      -v \
      https://jsonplaceholder.typicode.com/users

# Experiment: cURL - PUT requests to fake API
curl -X PUT \
      -H 'Content-Type: application/json' \
      -d '{ "title": "Drowzee", "body": "Drowzee hypnotizing", "id": 33 }' \
      -v \
      https://jsonplaceholder.typicode.com/comments/3


# Experiment: cURL - test API call GET to api/auth/test
curl http://localhost:8000/api/auth/test

curl -X GET \
      -H 'Content-Type: application/json' \
      -v \
      http://localhost:8000/api/auth/test


# Experiment - Fullstack Twitter App: cURL - create new user thorugh api/auth/signup
curl -X POST \
      -H 'Content-Type: application/json' \
      -d '{ "email": "onix@pokemon.com", "fullName": "Onix Rattlerock", "password": "abc123", "username": "Onix" }' \
      -v \
      http://localhost:8000/api/auth/signup

curl -X POST \
      -H 'Content-Type: application/json' \
      -d '{ "email": "pidgey@pokemon.com", "fullName": "Pidgey Birdball", "password": "abc123", "username": "Pidgey" }' \
      -v \
      http://localhost:8000/api/auth/signup


# Experiment - Fullstack Twitter App: cURL - login using api/auth/login
# NOTE: this is correct login credentials
curl -X POST \
      -H 'Content-Type: application/json' \
      -d '{ "password": "abc123", "username": "Onix" }' \
      -v \
      http://localhost:8000/api/auth/login

# NOTE: this is incorrect login credentials
curl -X POST \
      -H 'Content-Type: application/json' \
      -d '{ "password": "abc123-wrong-password", "username": "Onix" }' \
      -v \
      http://localhost:8000/api/auth/login


# Experiment - Fullstack Twitter App: cURL - login using api/auth/login
# NOTE: this is correct login credentials
curl -X POST \
      -H 'Content-Type: application/json' \
      -v \
      http://localhost:8000/api/auth/logout

# Experiment - Fullstack Twitter App: cURL - login using api/auth/me
curl http://localhost:8000/api/auth/me

# Experiment: cURL - test API call GET to api/user/test
curl http://localhost:8000/api/user/test

# Experiment: api/user/profile/:username
curl http://localhost:8000/api/user/profile/Onix