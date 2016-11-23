# Bootstrap 4 Prototyping Glue

This starter project brings together the Sass from [Bootstrap 4](http://v4-alpha.getbootstrap.com/) and a set of [Panini](https://github.com/zurb/panini) HTML templates. Panini is a simple, intuitive flat file generator for Gulp that was designed specifically for rapid prototyping. The simplicity makes it easy to isolate front-end design (CSS, JS, and HTML patterns) from other aspects of your project, but Panini still allows for HTML partials, external Handlebars helpers, or data from JSON or YAML when needed.

## Requirements

In order to use this project, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

### Setup

To manually set up the project, first download it with Git:

```bash
git clone https://github.com/gluethegiant/bootstrap4-prototyping-glue projectname
```

Then open the folder in your command line and install the needed dependencies:

```bash
cd projectname
npm install
```

### Starting

Start the project with `npm start`. The Sass and HTML will be compiled in the background as you save changes. Compile minified CSS and JS with `npm build`.

```bash
npm start
npm build
```
