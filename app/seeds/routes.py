# from app.models import db, Route

# def seed_routes():
#     route1 = Route(
#         activity_id = 1,
#         ori_lat = "37.74213",
#         ori_log = "-119.60186",
#         des_lat = "37.75714",
#         des_log ="-119.59769"
#     )


#     route2 = Route(
#         activity_id = 2,
#         ori_lat= "37.74611",
#         ori_log = "-119.59692",
#         des_lat = "37.75010",
#         des_log = "-119.59579"
#     )




#     db.session.add(route1)
#     db.session.add(route2)


#     db.session.commit()


# def undo_routes():
#     db.session.execute('TRUNCATE routes RESTART IDENTITY CASCADE;')
#     db.session.commit()
