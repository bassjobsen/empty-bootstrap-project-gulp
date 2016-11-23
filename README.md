# Bootstrap 4 Prototyping Glue

This [Bootstrap 4](http://v4-alpha.getbootstrap.com/) project includes a Sass compiler and a set of Panini HTML templates for you. [Panini](https://github.com/zurb/panini) is a super simple flat file generator for use with Gulp. It compiles a series of HTML pages using a common layout. These pages can also include HTML partials, external Handlebars helpers, or external data as JSON or YAML.

## Requirements

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Git](https://git-scm.com/)

### Setup

To manually set up the project, first download it with Git:

```bash
git clone https://github.com/gluethegiant/bootstrap4-prototyping-glue projectname
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `npm start` to run the Sass and HTML template compiler. They will re-run every time you save a Sass or HTML template file.

