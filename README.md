# places
The project is a less personal version of another project I creted called 'my_places.'  Just provide a US city and state, and the app will return information regarding costs, demographics, economics, climate, etc. re that city.  The app also allows you to compare data side-by-side with several other cities of your choosing.

## Getting Started
After forking, cloning, and accessing the directory:
```
$ npm install
```

## Usage
```
$ node app.js
```

Then provide the prompt a city and state right there in the terminal
```
Name the place ==>: new york, ny
```

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

I personally use iTerminal with the following font settings...
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

modify the list to include the cities you want to compare.  They will remain until modified.
