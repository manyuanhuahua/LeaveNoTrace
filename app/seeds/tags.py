from app.models import db,Tag


def seed_tags():
    tag1 = Tag(
        name='forest',
        
    )

    tag2 = Tag(
        name='waterfall'
    )

    tag3 = Tag(
        name='dog friendly'
    )

    tag4 = Tag(
        name='no dogs'
    )

    tag5 = Tag(
        name='views'
    )

    tag6 = Tag(
        name='wildflowers'
    )

    tag7 = Tag(
        name='beach'
    )

    tag8 = Tag(
        name='hot springs'
    )

    tag9 = Tag(
        name='historic site'
    )

    tag10 = Tag(
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


def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
