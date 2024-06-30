# Getting Started

Prerequisites `Node Js` and `Yarn`

Run application locally on port `5000`:

```
yarn start
```

# About the project

Application contains .csv file with open food truck data.
CSV file is parsed on application start and loads data to memory.
API provides few HTTP endpoint to use data:

- `/api/foodtrucks` returns all food trucks
- `/api/foodtrucks/foodItems` returns all food categories that food trucks provide, can be used in search
- `/api/foodtrucks/search` can be used to search food trucks by applicant, food item, by coordinated in given point and
  radius

  Application provides UI with filters to search by truck name, food and radius in km

# Build and run docker image
```
docker build -t foodtruck-task-js .
```

```
docker run -p 5000:5000 foodtruck-task-js
```
# Possible improvements 
- Change format of input data. CSV could be little problematic to parse, I noticed on open data resource option to use json. Maybe defining model and using json parser can be better from clean code perspective and easier to sync by fetching data online
- Keeping data in memory is fast solution for showcase task, but adding persistent layer would be beneficial. 
- Add sync with open data source. We can fetch fresh data online and have the latest food tuck updates. 
- Add more tests. I tried to cover major functionality, but few more test could be added.   
- Work little bit on data parsing, some fields contains strange values. Add rules to remove data that is not aligned with other records
- Add authorization and implement users
- Add some features related to users - comments, rating, list of visited trucks etc
- Add integration with maps
- Set up yarn workspaces to use common models