# Project styles

`scss/` is copied from the installed kni-cascade npm package on the first install.
It is deliberately absent from the template, so each new project starts from its
installed release. After setup, commit this directory in your project and customize
it freely. Subsequent installs and dependency updates never overwrite it.

`global.scss` imports the foundation once and adds project-level styles.
Component `.module.scss` files can use the config-only `scss/00-sass` entry for
variables/mixins without repeating global CSS.
