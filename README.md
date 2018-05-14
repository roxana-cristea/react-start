# React + Redux + Gulp + Webpack boilerplate

## Table of Contents
- [Installation](#installation)
- [Main dependencies](#main-dependencies)
- [Project structure](#project-structure)
  - [Assets](#assets---under-appassets)
  - [JSX files](#jsx-files---under-appscripts)
  - [Styling files](#styling-files---under-appstylus)


## Installation
- Clone this repo or download as zip
```
    cd react-start
    npm install
    gulp
```
- Open http://localhost:1340/ in your browser


## Main dependencies

### Module components
- React.JS
- Redux

### Build tools
- Webpack
- Gulp

## Project structure

### Assets - under `app/assets`
- images - used inside the app; can be divided into different folders for each page / component

### JSX files - under `app/scripts`

- #### `helpers`
  - `constants.js` - defines general values used in the entire project to avoid hardcoded values inside different files and to ease the process of updating specific values

- #### `stores`
  - general settings were applied for integrating `Redux` into the webapp - even though `Redux` is not actively used inside the project, this is the starting point for feature implementations

- #### `pages`
  - there are 2 pages available:
    - **Homepage**
      - main site page `Homepage.jsx`
    - **Not Found** page

### Styling files - under `app/stylus`
- the main styling file is `main.styl` that has general styling rules and also imports all other `.css` and `.styl` files
- for each page / screen of the webapp there is a corresponding `.styl` file
  - Example: **Homepage**
    - `homepage.styl`
