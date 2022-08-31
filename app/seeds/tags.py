from app.models import db


def seed_tags():
    tag1 = Comment(
        name='forest'
    )

    tag2 = Comment(
        name='waterfall'
    )

    tag3 = Comment(
        name='dog friendly'
    )

    tag4 = Comment(
        name='no dogs'
    )

    tag5 = Comment(
        name='views'
    )

    tag6 = Comment(
        name='wildflowers'
    )

    tag7 = Comment(
        name='beach'
    )

    tag8 = Comment(
        name='hot springs'
    )

    tag9 = Comment(
        name='historic site'
    )

    tag10 = Comment(
        name='fee'
    )






    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)
    db.session.add(tag9)
    db.session.add(tag10)


    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
