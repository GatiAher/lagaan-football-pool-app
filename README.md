# Lagaan Pool Application

## Set-Up

### General Set-Up

Download all necessary packages. This project uses yarn and package.json files to manage dependencies.

```bash
$ yarn
$ cd backend/ && yarn && cd ..
$ cd frontend/ && yarn && cd ..
$ cd admin/ && yarn && cd ..
```

### Frontend Set-Up

Frontend uses Auth0 so you need to provide the configuration variables to access the Auth0 service. Make file `frontend/.env` and add the following key-value pairs. Get the values from Auth0 Dashboard.

```
REACT_APP_AUTH0_DOMAIN=<xxx.us.auth0.com>
REACT_APP_AUTH0_CLIENT_ID=<yyy>
```

### Backend Set-Up

Backend uses SQLite database, so you need to provide the database storage file.

```bash
$ touch backend/db/database.sqlite
```

## To Run

### Yarn Scripts

- Run all: `yarn start`
- Run backend: `yarn start-server`
- Run frontend: `yarn start-front`
- Run admin; `yarn start-admin`

### Access From Browser:

- Backend: http://localhost:3001 (see 404 page)
- Frontend: http://localhost:3000 (see Home page)
- Admin: http://localhost:3002 (see Admin Dashboard)

### Populate Database

- Go to Admin Dashboard and click on RESET buttons

## When Changing Domains

### Configuration

- in `frontend/package.json` and `admin/package.json`, change value of proxy to new backend domain

```json
"proxy": "http://localhost:3001",
```

- in `admin/src/App.js` change url given to dataProvider to new backend domain

```javascript
const dataProvider = simpleRestProvider("http://localhost:3001");
```

### Auth0

- Go to Auth0 Dashboard and configure proper callback urls.

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
- Rankings Page (private)
  - See a sortable, filterable, exportable table of users
  - Table initially sorted by rank
  - Current user highlighted
  - For each user, see:
    - ROW: Rank, Name, Picked Wins-Losses-Ties, Last Week's Choices, Score
    - EXPANDABLE DETAIL PANEL: user's selected and remaining teams

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
- Button to rescore teams and users
- Button to clear all items from tables
- Button to remove season data from tables

---

## Future Features and Improvements:

### Frontend

- Pretty Home Page with short getting started guide
- Profile Edit Page
  - Currently only Admin can alter user preference data
  - User will be allowed to edit user's preference data
- Ability to create new Lagaan Football users from frontend page
  - Auth0 service cannot post to backend on localhost
  - Current System of Registering new users:
    1. Create new user, either from front end (new user sign up) or Auth0 Dashboard (create new user). This creates a user in Auth0
    2. Notify Admin
    3. Admin will go to Auth0 Dashboard and copy new user's `sub` key
    4. Admin will go to Admin Dashboard and create a new User with `user.id` = `sub` key

### Backend

- Implement Accurate Webscrapper
  - site being scrapped currently: https://www.pro-football-reference.com/years/2020/games.htm
  - WARNING: webscrapped game info is inaccurate because format of site changed when season started
- Maintain a table to store editable constants like kickoff date, or start and end of BYE selection period

### Admin

- Set timer to re-rank users and re-score teams on a weekly basis
- Add a pretty show panel for each item so admin can see all data without going into edit-mode
- Add admin password
- Ability to delete Auth0 User Data when deleting Lagaan Football User Data
