# Leveluptuts - Modern CSS

## 0 - Getting started

Notes: It's a quick walkthrough of the files.

1. npm i
2. `npm run start` creates a dist folder + start server
3.

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

1. Define :root{} as colors.
   like `--blue: blue;`

2. Then define the 'intentions'.
   So instead of saying `background: blue;`
   You say `background: var(--background);`

## 6 - CSS Specificity

### least to most Specific

element: h1, div
attribute: class, attribute [type="input"]
id: Higher. can cause trouble for styling.
!important: this means that there's a bigger problem with your css.

### Specific based on apply order

```
h1 {
  font-size: 1rem;
}

// this will apply
h1 {
  font-size: 2rem;
}
```

```
.header {
  font-size: 2rem;
}

// this is ignored, since .header is a class.
h1 {
  front-size: 1rem;
}
```

```
// this is ignored. This is 1 level of specificity.
.header {
  font-size: 1rem;
}

// this is applied. Because it's 3 levels of specificity.
.wrapper .container .header {
  font-size: 2rem;
}
```

## 7 - Typography

https://type-scale.com/

## 8 - Kitchen Sink Files

This is where we play around with the demo file to see if it aligns with our design.

## 9 - Forms and Inputs

To target placeholder text, you use

```
::placeholder {
  color: var(--grey);
}
```

## 10 - Buttons

Design tokens - made popular by Tailwind

```

button {
  --buttonColor: var(--green);
  --textColor: var(--black);

  appearance: none;
  color: var(--textColor);
  background-color: var(--buttonColor);
  border: none;
  border-radius: 10px;
  padding: 5px 25px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

button.cancel {
  --buttonColor: var(--red);
  --textColor: white;
}

```

You turn your default colors of a button into these tokens. Then change them within the state.

## 11 - Elevations

Create a elevation system (He stole it from [tailwind](https://tailwindcss.com/docs/box-shadow/)) to control your shadows and depth.

## 12 - Form Elements and Layouts

adding custom grid and flex classes.

## 13 - Media Queries

You have to hard-code your widths in media queries.

THIS IS NOT VALID CSS!!! You can't use variables

```
@media only screen and (min-width: var(--med)) {
    body {
        background: red !important;
    }
}
```

For incredibly responsive design:

```
.flex {
    --justifyContent: space-between;
    display: block;
    justify-content: var(--justifyContent);
}

/* Final Media Query */
@media only screen and (min-width: 800px) {
    :root {
        --baseFontSize: 80.5%;
    }

    .flex {
        display: flex;
    }
}
```

So on small screens, it's a block element. It only starts breaking into flex patterns on bigger screens.

## 14 - Header

This is saying - all elements that are NEXT to that pattern.
So the first a tag doesn't get a left.
But the next ones do.

```
header nav a + a {
    margin-left: 10px;
}
```

You can also mathmatically calculate the header size.
This statement is saying, use the headerHeight (which is also assigned to the header) and ADD 3rems to give it some extra space.

Like this: https://i.imgur.com/htCIVXT.png

```
.layout {
    padding: calc(3rem + var(--headerHeight)) var(--containerPadding);
}
```

box-sizing border set.
if you do 100%, it adds 100% PLUS padding.

## 15 - The footer

Scope with CSS Variables

So you typically define things into :root as a global.

But this ALSO works.
`footerTextColor` exists in the parent element, so it borrows it from here.

```
footer {
    --footerTextColor: white;
    color: var(--footerTextColor);
}

footer a {
    color: var(--footerTextColor);
}
```

## 16 - BEM and Cards

BEM - element means no standalone meaning

1. Identify key pieces and focus on intentions.
2. Abstract major elements

---

ISSUE: You put your elements in a card, and they're using the margin that was defined from other elements. This is a easy way to remove it.

This says:
The first element inside `.card`, remove the margin-top.
The last element inside `.card`, remove the margin-bottom.

```
.card > *:first-child {
    margin-top: 0;
}

.card > *:last-child {
    margin-bottom: 0;
}
```

## 17 - When to make New Elements

This is more about rules.
The intention is not to constantly do overrides.

It's also a better idea than creating custom css for every section of element.

aside:
This is a easy way to do a 2 column approach.

```
.split {
    display: grid;
    grid-template-columns: 33% 65%;
    grid-gap: 2%;
}
```

## 18 - Super Easy Dark Mode

Define colors intentions - VERY SUBJECTIVE

You might reach a point where you're describing everything as a color intention. This is where you have to make some really strong design choices.

Themes - it's a way to make your site change it's concept without having to fuck around with a lot of edits.

## 19 - Super Easy Themeing

Design Tokens!
Creating various elements and then having it trickle down.

https://www.happyhues.co/

## 20 Bonus - Oled Theme and Overrides

## 21 - WHere to go from here
