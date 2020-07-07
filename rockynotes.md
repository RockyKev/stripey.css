# Leveluptuts - Modern CSS

## 0  - Getting started

Notes: It's a quick walkthrough of the files.

1) npm i
2) `npm run start` creates a dist folder + start server
3)


## 1 - What is CSS Reset?
https://css-tricks.com/reboot-resets-reasoning/

What is normalized.css?

Diff browsers have different specs.
Attempts to strip default padding for browser.
cssreset wa so popular.

Normalized.css instead setting defaults to look standardize across browser.

normalized.csss
```
.hidden (display:none)
.sr-only (screen-reader only)
.invisible
.clearfix (for floats)
```

## 2 - Classless CSS
Lots of references: https://github.com/troxler/awesome-css-frameworks

## 3 - CSS Variables 101
```
:root {
  --black: #222;
}


body {
    background: var(--black);
}

```

## 4 - Variable Scoping

non-JS color changing.
```
:root {
  --background: blue;
}

body {
    background: var(--background);
}


@media only screen and (max-width: 800px) {
  :root {
    --background: red;
  }
}
```

## 5 - Colors and Intentions

He follows the Design Systems by Figma course.
This? -> https://designcode.io/design-system-figma

He also refers to things as 'colors of intentions'.
Like, your actions. Your action for clicking is red or something. I dunno. Still figuring it out.

1) Define :root{} as colors.
like `--blue: blue;`

2) Then define the 'intentions'.
So instead of saying `background: blue;`
You say `background: var(--background);`

## 6 - CSS Specificity

## 7 - Typography

## 8 - Kitchen Sink Files

## 9 - Forms and Inputs

## 10 - Buttons

## 11 - Elevations

## 12 - Elements and Layouts

## 13 - Media Queries

## 14 - Header

## 15 - The footer

## 16 - BEM and Cards

## 17 - When to make New Elements

## 18 - Super Easy Dark Mode

## 19 - Super Easy Themeing

## 20 Bonus - Oled Theme and Overrides

## 21 - WHere to go from here
