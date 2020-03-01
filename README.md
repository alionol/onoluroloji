Bundling of CSS/SCSS, fonts, images/favicons, and JavaScript is done via **Webpack**. Site generation is done **Jekyll**.

## Development
### Project Structure
In overall, everything in the `_src/` directory is processed by `webpack`. `_layouts/`, `_includes/`, `_data/`, `_posts/` is used by `Jekyll`.

The following is the step-by-step walk-through of the build process:
+ All the static assets (images, js, css etc.) are bundled using `ẁebpack` into the `assets/` directory.
+ `Jekyll` templates in `_src/template` are injected with the bundled asset links using `webpack`, then outputted into `_layouts/` directory.
+ `Jekyll` then uses `assets/` and the processed `_layouts/` to create the webpages. Note that there is a `Jekyll` post-write hook in `_plugins/` which moves the contents of the `_site/assets/favicons/` directory to the `_site/` root.

### Dependencies & Dev Environment
+ Make sure you have `node.js` installed. See [node.js snap](https://snapcraft.io/node) for Linux installation, or check out the official page for other installation methods.

+ `Yarn` is being used as the package manager for `Nnde.js` modules. Install dependencies with `yarn`:
```shell
cd <projectDir>
yarn install
```

+ Make sure you have `ruby`, `jekyll` and `bundler` installed. See [Jekyll Docs](https://jekyllrb.com/docs/installation/).

+ Install `Ruby` dependencies of the project:
```shell
cd <projectDir>
bundle install
```

### Linting
`stylelint` is used for `css` and `scss` linting, `eslint` is used for `javascript` linting.
```shell
cd <projectDir>
yarn lint:all
yarn lint:all:fix
```

### Testing
Generated html is validated and checked for broken links, non-https links, presence of favicons using the `html-proofer`, a `Ruby` package. The configuration options is specified in `Rakefile`. Building with `Jekyll` also enforces strict front matter.
```shell
cd <projectDir>
yarn test
```

## License
The software code and the content are licensed separately, see below for the details.

### Code/Software License
Copyright 2019-2020 Cagatay Aydin (Çağatay Aydın in Turkish character set).

onol-uroloji-website is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

onol-uroloji-website is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with onol-uroloji-website.  If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).

### Content License
Copyright 2019-2020 Cagatay Aydin (Çağatay Aydın in Turkish character set).

The content (e.g. articles, blog posts, how-to's, tutorials, texts, original images and original digital work) is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/) unless otherwise stated. By default, this includes, but not restricted to, all the files and work in `./_posts`, `./_src/favicons`, `./_src/img` directories and all the markdown (`*.md`) files (except LICENSE.md files) unless otherwise stated.
