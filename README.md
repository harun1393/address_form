Django Gulp Boilerplate v0.1
======
Author: Yan Hong

What's Included?
------
- [Django v1.9](https://docs.djangoproject.com/en/1.9/)
- Django base [Dockerfile](https://docs.docker.com/)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
- [Browser Sync](https://www.browsersync.io/docs/)
- Bower
- [Open Style UI Framework](http://hongyanh.github.io/open-style/)
- [Django Allauth](http://django-allauth.readthedocs.org/en/latest/)
- [Django Avatar](http://django-avatar.readthedocs.org/en/latest/)
- Raven (for [Sentry](https://getsentry.com/welcome/) integration)
- Postgresql connector
- Template structure

How to setup?
------
1. Create a key.py file and include following attributes:
```Python
# Change the values for your project settings
# Please don't include this file in your repository

# Project names
PROJECT_NAME = 'your_project_name'

# Secret keys
DJANGO_SALT = 'your_secret_keys'

# Database settings, by default, we use postgresql
DB_PASSWORD = 'db_password'
DB_NAME = 'db_name'
DB_USER = 'db_user'
DB_HOST = 'localhost'
DB_PORT = ''

# Debug mode, change it to False in production
DEBUG = True

# Localization settings
LANGUAGE_CODE = 'en-us' # Your language code
TIME_ZONE = 'America/Vancouver' # Your timezone
```
2. (Optional) Create a [virtualenv](https://virtualenv.readthedocs.org/en/latest/index.html) for your project
⋅⋅* Run `pip install virtualenv`
⋅⋅* CD to your project root
⋅⋅* Run `virtualenv venv`
⋅⋅* Run `source venv/bin/activate`
3. Run `pip install -r requirements.txt`
4. Install [PostgreSQL](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04) and create your user and database
3. Run `python manage.py migrate`
4. Install [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) with [npm](https://nodejs.org/en/) `npm install -g gulp`
5. Install [SASS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html) with `npm install -g jshint` and [JShint](http://jshint.com/install/) with `npm install -g jshint`
6. Run `python manage.py runserver`
7. In another terminal window, run `gulp` and it should bring up your default browser

Question?
------
Email: onlyhongyan@gmail.com
