### ESLint

There is a precommit hook on this repo that will fix linting issues.
All of the rules in ESLint are AirBnB standards except the following:

* 4 space indenting (Easier to read)
* Comma dangling (Makes future commits nicer)
* Arrow functions (Cleaner than old functions)

### Committing Code

The precommit hook will run ESLint, commits will fail if ESLint fails, you will see what needs fixed to allow the commit. `npm-debug.log` files will be removed before the committing automatically.
