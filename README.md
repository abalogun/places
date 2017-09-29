# places
This project is a less personalized version of another project I created called 'my_places.'  Just provide a US city and state, and the app will return information regarding costs, demographics, economics, climate, etc. associated with that city.

The app runs in the terminal and allows you to compare data side-by-side with several other cities of your choosing.

The app is for my own personal use.

## Getting Started
After forking, cloning, and accessing the directory run the following:
```
$ npm install
```

## Usage
Start the app for each query
```
$ node app.js
```

Then provide the prompt a city and state.
```
Name the place ==>: new york, ny
```

If the app has never seen the entry before it will make the necessary web requests, otherwise it will pull directly from the database.

Note: The input **must be the city and state seperated by a comma.  It is not case or space sentiive, and the state can be either the abbreviation or the full spelling.

## Output
The output is best viewed when the terminal is in fullscreen and the font settings are similar to the following:
```
Collection: English
Family: SF Mono
Typeface: Regular
Size: 14
Character Spacing: 0.985
Line Spacing: 1
```

The following is my personal preference using iTerminal2:
```
Collection: All Fonts
Family: Operator Mono
Typeface: Light Italic
Size: 18
Horizontal: 60%
Vertical: 100%
```
and a background rgb color of
```
25, 27, 45
```

## Comparison Cities
Several cities can be compared side-by-side.  To modify the cities open the following file and modify the list (Up to 6 cities and states depending on the current font settings).

```
$ open comparisons.js
```

## Extra
To view the list of cities in your database input 'ALL' after starting the app
```
$ Name the place ==>: ALL
```

To see the raw code associated with a place input the word 'TEST' before your emtry.
```
Name the place ==>: TEST san francisco, ca
```

To exit the app without providing an entry simply press enter or type 'EXIT'
```
Name the place ==>: EXIT
```
## Extra Extra
To see Web Developer salaries for the city per Indeed open dataMaker.js in the utils directory and uncomment lines 129 and 130.

## Tech
The project uses the terminal to run the script in node.js.  The project is serverless! and stores data in a SQLite database using Sequelize's ORM.

## Websites Used (so far)
* datausa.io
* areavibes.com
* bestplaces.net
* indeed.com
