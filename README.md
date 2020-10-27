# Lagaan Pool Application

---

## Run locally, development mode, pre-build

0. Clone this project.

```bash
git clone https://github.com/GatiAher/lagaan-football-pool-app.git
```

1. Download all necessary packages. This project uses yarn and package.json files to manage dependencies. Make sure you have yarn and node installed.

```bash
$ yarn
$ cd backend/ && yarn && cd ..
$ cd frontend/ && yarn && cd ..
$ cd admin/ && yarn && cd ..
```

2. Backend uses SQLite database, so you need to provide the database storage file.

```bash
$ touch backend/db/database.sqlite
```

3. Frontend uses backend api and Auth0 so you need to provide the configuration variables to access these. Make file `frontend/.env.development` and add the following key-value pairs. Get the values `REACT_APP_AUTH0_DOMAIN` and `REACT_APP_AUTH0_CLIENT_ID` from Auth0 Dashboard.

```
REACT_APP_API=http://localhost:3001
REACT_APP_AUTH0_DOMAIN=<xxx.us.auth0.com>
REACT_APP_AUTH0_CLIENT_ID=<yyy>
```

4. Admin also needs to access backend's api. Make file `frontend/.env.development` and add the following key-value pairs.

```
REACT_APP_API=http://localhost:3001
```

5. In root directory, run the start script to start application in `NODE_ENV=development` mode.

```bash
yarn start
```

Or you could run each service independently

```
yarn start-server
yarn start-front
yarn start-admin
```

6. Access from browser

- Backend: http://localhost:3001 (see 404 page)
- Frontend: http://localhost:3000 (see Home page)
- Admin: http://localhost:3002 (see Admin Dashboard)

---

## Run on ec2 instance, production mode, serving static files

0. make sure you have yarn, node, pm2 and nginx installed. I used AWS EC2 + elastic load balancer (ELB), Route53, SSL Certificate.

AWS PROCESS: In Route53 configure A-Record as type alias with target as ELB. Configure ELB as fail-over to the EC2. (fail-over mode requires health-check for fail-over configuration).

RATIONAL: Right now, only using one instance, hence the fail-over configuration. Using ELB in order to use AWS's SSL. SSL is needed for OAuth used by frontend.

```bash
# install yarn
curl -o- -L https://yarnpkg.com/install.sh | bash
# install node version manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
# use nvm to install node
nvm install node
# install PM2 (Daemon Process Manager that keeps application online. Use it to run the backend)
yarn global add pm2
# install CentOS 7 EPEL and Nginx
sudo yum install epel-release
sudo yum install nginx
```

1. Git pull a version that works in development mode

2. Set up backend and start api using PM2.

```bash
cd backend && yarn && cd ..
pm2 start
```

This uses the `ecosystem.config.js` file.

3. Create `frontend/.env.production` with these key-value pairs.

```
REACT_APP_API=/api
REACT_APP_AUTH0_DOMAIN=<xxx.us.auth0.com>
REACT_APP_AUTH0_CLIENT_ID=<yyy>
GENERATE_SOURCEMAP=false
```

Make frontend static build files.

```bash
cd frontend && yarn && yarn build && cd ..
```

4. Create `admin/.env.production` with these key-value pairs.

```
REACT_APP_API=/api
GENERATE_SOURCEMAP=false
```

Make admin static build files.

```bash
cd admin && yarn && yarn build && cd ..
```

5. Use nginx to serve the frontend and admin static build files and reverse-proxy the backend api

```bash
cp nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart
```

NOTE: provided `nginx.conf` assumes that the path to lagaan-football-pool-app is `/data/lagaan-football-pool-app`. Change if necessary.
NOTE: you might need to use sudo

6. Access files from browser

- Frontend: https://www.mydomain.com
- Admin: https://www.mydomain.com/admin
- Backend: https://www.mydomain.com/api

7. To Stop

```bash
pm2 delete all
sudo service nginx stop
```

---

# First Time User Steps

### Admin Should Populate Database From Admin Dashboard

1. click on RESET buttons to load default values and erase all season data from table

- good for loading teams with 0-0-0 as W-L-T
- keeps all users but erases picks, score, and rank
- NOTE: loads games in the right format but uses outdated webscrapper so values are incorrect

2. Go into resource tab, export current values into csv, replace csv with actual values, delete all values in table, import csv

- NOTE: this step may require one item to be in the database. Create one item and delete it afterwards.
- NOTE: if you do not delete the items in table, importing csv will try to update items

### User Registration

1. User goes to frontend and signs up. This adds the user to Auth0. A user registered with Auth0 but not registered with the Lagaan Admin will be able to access the rankings and pick pages but not see any data.

2. User clicks on top right menu (with username) and selects "Copy Id". User can then send this to Lagaan Admin, who can create a new user with the given id using the Admin Dashboard.

3. User registered with both Auth0 and Lagaan system can access leaderboard and rankings.

---

## Features:

### Frontend Site

- Login, Logout, Sign-Up, User Authentication
- Dynamic Design -- looks good on all screens
- NFL Games Page
  - See game schedule by week
  - See outcomes of matches
- Pick Teams Page (private)
  - Pick two teams each week
  - Automatically disables teams picked in previous weeks
  - BYE Week selection option only available on certain weeks (week in range 4-12)
  - Pick windows close on Thu 6pm and Sun 1pm
- Rankings Page (private)
  - See a sortable, filterable, exportable table of users
  - Table initially sorted by rank
  - Current user highlighted
  - For each user, see:
    - ROW: Rank, Name, Picked Wins-Losses-Ties, Score
    - EXPANDABLE DETAIL PANEL: user's selected teams, up to but not including current week
- Weekly Grid
  - See all users's picks up to but not including current week

### Backend Site

Routes to edit `game`, `team`, and `user` data

| Method        | API calls                                                                              |
| ------------- | -------------------------------------------------------------------------------------- |
| `getList`     | `GET http://my.api.url/user/posts?sort=["id","ASC"]&range=[0, 24]&filter={"id":"123"}` |
| `getOne`      | `GET http://my.api.url/user/posts/123`                                                 |
| `create`      | `POST http://my.api.url/user/posts`                                                    |
| `update`      | `PUT http://my.api.url/user/posts/123`                                                 |
| `delete`      | `DELETE http://my.api.url/user/posts/123`                                              |
| `clear table` | `DELETE http://my.api.url/user/clear`                                                  |
| `reset table` | `DELETE http://my.api.url/user/reset`                                                  |

Routes to recalculate scores & ranks for `team`, and `user` data

| Method        | API calls                          |
| ------------- | ---------------------------------- |
| `score users` | `GET http://my.api.url/score/user` |
| `score teams` | `GET http://my.api.url/score/team` |

### Admin Site

- User Interface to perform create, read, update, and delete operations on Game, Team, and User data
- Ability to import/export table data from/to .csv files (experimental feature)
  - Import and export csv files', dates are in human readable format
- Button to rescore teams and users
- Button to clear all items from tables
- Button to remove season data from tables

---

## Future Features and Improvements:

### Frontend

Minor

- Pretty Home Page with short getting started guide
- Make banner with message: If name is red, you have not picked teams for week 7
- change current week on Sunday @ 1pm
- weekly grid rank and score

Medium

- NFL Grid of all users choices up to the current week

Major

- Log all changes made by user in logfile

### Backend

Minor

Medium

- If week over and not picked yet, experience loss penalty of loss

Major

- Implement Accurate Webscrapper
  - site being scrapped currently: https://www.pro-football-reference.com/years/2020/games.htm
  - WARNING: webscrapped game info is inaccurate because format of site changed when season started
- Maintain a table to store editable constants like kickoff date, or start and end of BYE selection period

### Admin

Minor

- Add a pretty show panel for each item so admin can see all data without going into edit-mode

Medium

- Page to easily set Team win-loss-tie by toggle, by game, by week
- Add admin password + Auth0 Account for Admin (add second one as necessary)

Major

- Log all changes made from Admin Account in log file
- validation when picking for users

### Data

- Create Auth0 accounts with given emails and changeme passwords for all users
- Get Game Data in .csv format from fixture download
