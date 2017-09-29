# places
This project is a less personalized version of another project I created called 'my_places.'  Just provide a US city and state, and the app will return information regarding costs, demographics, economics, climate, etc. related to that city.

The app runs in the terminal and allows you to compare data side-by-side with several other cities of your choosing.

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

Note: The input must be the city and state seperated by a comma.  It is not case or space sentiive, and the state can be either the abbreviation or the full spelling.

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

I personally use iTerminal with the following font settings:
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
You can compare several cities side-by-side (up to 6 additional cities with the above font settings)

```
$ open comparisons.js
```

Modify the list to include the cities you want to compare.

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

## Tech
The project uses the terminal to run the script in node.js.  The project is serverless! and stores data in a SQLite database using Sequelize's ORM.