from flask.cli import AppGroup
from .users import seed_users, undo_users
from .trails import seed_trails,undo_trails
from .tags import seed_tags, undo_tags
from .reviews import seed_reviews,undo_reviews
from .parks import seed_parks,undo_parks
from .activities import seed_activities,undo_activities
from .photos import seed_photos,undo_photos

# from .routes import seed_routes,undo_routes
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_parks()
    seed_tags()
    seed_trails()
    seed_reviews()
    seed_activities()
    seed_photos()

    # seed_routes()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_photos()
    undo_activities()
    undo_reviews()
    undo_trails()
    undo_tags()
    undo_parks()
    undo_users()
    # Add other undo functions here
