from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',profile_img='https://play.nintendo.com/images/Masthead_babymario.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',profile_img='https://play.nintendo.com/images/profile-mk-luigi.7bf2a8f2.aead314d58b63e27.png')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',profile_img='https://thumbs.dreamstime.com/b/closeup-super-mario-character-nintendo-platform-game-video-red-background-photographed-site-screen-149088103.jpg')
    Emma = User(
        username='Emma', email='Emma@aa.io', password='password',profile_image="https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703__340.jpg")
    Eva = User(
        username='Eva', email='Eva@aa.io', password='password',profile_image="https://s.itl.cat/pngfile/s/83-832842_unique-dps-for-fb-with-quotes-visit-us.jpg")
    Leo = User(
        username='Leo', email='Leo@aa.io', password='password',profile_image="https://www.teahub.io/photos/full/364-3646944_cool-profile-pictures-hd-pic-hwb37635-cat-with.jpg")
    Luca = User(
        username='Luca', email='Luca@aa.io', password='password',profile_image="https://cdn.pixabay.com/photo/2016/03/26/22/13/man-1281562__340.jpg")
    Lily = User(
        username='Lily', email='Lily@aa.io', password='password',profile_image="https://cdn.pixabay.com/photo/2016/04/21/22/29/girl-1344646__340.jpg")
    Jack = User(
        username='Jack', email='Jack@aa.io', password='password',profile_image="https://images.unsplash.com/photo-1510917065317-aa26965fe730?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80")
    Nora = User(
        username='Nora', email='Nora@aa.io', password='password',profile_image="https://i.pinimg.com/originals/69/e9/3b/69e93bc04784b616a8eabde78d5bcb40.jpg", bio="Nora User's bio")
    Theo = User(
        username='Theo', email='Theo@aa.io', password='password',profile_image="https://i.pinimg.com/736x/9a/68/7c/9a687c559de12b8d5df94e98508d5469.jpg", bio="Theo User's bio")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(Emma)
    db.session.add(Eva)
    db.session.add(Leo)
    db.session.add(Luca)
    db.session.add(Lily)
    db.session.add(Jack)
    db.session.add(Nora)
    db.session.add(Theo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
