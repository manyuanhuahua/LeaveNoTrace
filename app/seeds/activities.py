from app.models import db, Activity

def seed_activities():
    activity1 = Activity(
        trail_id = 1,
        user_id = 1,
        name = "My First hike",
        ori_lat = "37.74213",
        ori_log = "-119.60186",
        des_lat = "37.75714",
        des_log ="-119.59769"
    )


    activity2 = Activity(
        trail_id = 2,
        user_id = 2,
        name = "Completed",
        ori_lat= "37.74611",
        ori_log = "-119.59692",
        des_lat = "37.75010",
        des_log = "-119.59579"
    )







    db.session.add(activity1)
    db.session.add(activity2)



    db.session.commit()


def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
