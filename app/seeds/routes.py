from app.models import db, Route

def seed_routes():
    route1 = Route(
        activity_id = 1,
        lat = "37.74213",
        log = "-119.60186",
    )

    route2 = Route(
        activity_id = 1,
        lat = "37.75714",
        log = "-119.59769"
    )

    route3 = Route(
        activity_id = 2,
        lat = "37.74611",
        log = "-119.59692",
    )

    route4 = Route(
        activity_id = 2,
        lat = "37.75010",
        log = "-119.59579",
    )





    db.session.add(route1)
    db.session.add(route2)
    db.session.add(route3)
    db.session.add(route4)


    db.session.commit()


def undo_routes():
    db.session.execute('TRUNCATE routes RESTART IDENTITY CASCADE;')
    db.session.commit()
