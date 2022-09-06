from app.models import db, Activity

def seed_activities():
    activity1 = Activity(
        trail_id = 1,
        user_id = 1,
        name = "My First hike",
        ori_lat = 37.74213,
        ori_log = -119.60186,
        des_lat = 37.75714,
        des_log =-119.59769,
        distance="6.2 mi",
        duration="2 hours 26 mins",
        static_url = "https://fullsuitcase.com/wp-content/uploads/2022/03/Zermatt-hiking-map-indicating-10-best-hikes.jpg"
    )


    activity2 = Activity(
        trail_id = 2,
        user_id = 2,
        name = "Completed",
        ori_lat= 37.74611,
        ori_log = -119.59692,
        des_lat = 37.75010,
        des_log = -119.59579,
        distance="2.2 mi",
        duration="1 hours 15 mins",
        static_url = "https://s27363.pcdn.co/wp-content/uploads/2019/09/Glymur-Map.jpg.optimal.jpg"
    )







    db.session.add(activity1)
    db.session.add(activity2)



    db.session.commit()


def undo_activities():
    db.session.execute('TRUNCATE activities RESTART IDENTITY CASCADE;')
    db.session.commit()
