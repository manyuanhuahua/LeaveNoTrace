from app.models import db, Activity

def seed_activities():
    activity1 = Activity(
        trail_id = 1,
        user_id = 1,
        name = "My First hike",
        length = 6.00,
    )

    activity2 = Activity(
        trail_id = 2,
        user_id = 2,
        name = "First try",
        length = 4.30,
    )

    activity3 = Activity(
        trail_id = 3,
        user_id = 3,
        name = "Completed",
        length = 1.20,
    )







    db.session.add(activity1)
    db.session.add(activity2)
    db.session.add(activity3)


    db.session.commit()


def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
