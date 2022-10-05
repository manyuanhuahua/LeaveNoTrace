from app.models import db, Tag, Trail, List



def seed_trails():
    trail1 = Trail(
        park_id = 1,
        name = "Vernal and Nevada Falls via Mist Trail",
        description = "Experience this 6.0-mile loop trail near Yosemite Valley, California. Generally considered a challenging route, it takes an average of 4 h 0 min to complete. ",
        preview_img = "https://boundtoexplore.com/wp-content/uploads/2019/07/mist-trail-hike-yosemite-15.jpg",
        length = 6.00,
        elevation = 2162,
        difficulty = "Hard",
        lat = 37.72620918325973,
        log = -119.55160191563179,
        trail_tags = [Tag.query.get(1), Tag.query.get(3), Tag.query.get(6)]
      
    )

    trail2 = Trail(
        park_id = 1,
        name = "Upper Yosemite Falls Trail",
        description = " Generally considered a challenging route, it takes an average of 5 h 35 min to complete. This is a very popular area for backpacking, camping, and hiking, so you'll likely encounter other people while exploring. The best times to visit this trail are April through October.",
        preview_img = "https://s27363.pcdn.co/wp-content/uploads/2020/05/Yosemite-Falls-Hike.jpg.optimal.jpg",
        length = 7.60,
        elevation = 3218,
        difficulty = "Hard",
        lat = 37.759742120669905,
        log = -119.59877519119395,
        trail_tags = [Tag.query.get(2), Tag.query.get(4),Tag.query.get(5),Tag.query.get(6), Tag.query.get(9)]
    )

    trail3 = Trail(
        park_id = 1,
        name = "Lower Yosemite Falls Trail",
        description = " This is a very popular area for hiking and walking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime.",
        preview_img = "https://c4.wallpaperflare.com/wallpaper/708/173/220/lower-yosemite-falls-trail-bridge-footbridge-yosemite-valley-wallpaper-preview.jpg",
        length = 1.20,
        elevation = 59,
        difficulty = "Easy",
        lat = 37.748486122184836,
        log = -119.59637337330318,
        trail_tags = [Tag.query.get(3), Tag.query.get(4),Tag.query.get(5), Tag.query.get(7)]
    )

    trail4 = Trail(
        park_id = 2,
        name = "Skyline Trail Loop",
        description = "Generally considered a challenging route, it takes an average of 3 h 40 min to complete. This is a very popular area for backpacking and hiking, so you'll likely encounter other people while exploring.",
        preview_img = "https://s27363.pcdn.co/wp-content/uploads/2020/09/Best-Hikes-Mt-Rainier.jpg.optimal.jpg",
        length = 6.20,
        elevation = 1788,
        difficulty = "Hard",
        lat = 46.78670287662199,
        log = -121.73619047301776,
        trail_tags = [Tag.query.get(2), Tag.query.get(8)]
    )

    trail5 = Trail(
        park_id = 3,
        name = "Marlette Lake from Chimney Beach",
        description = "This is a very popular area for birding, hiking, and mountain biking, so you'll likely encounter other people while exploring. The best times to visit this trail are June through October. Dogs are welcome and may be off-leash in some areas.",
        preview_img = "https://img-aws.ehowcdn.com/700x/cdn.onlyinyourstate.com/wp-content/uploads/2022/04/GettyImages-1140270677.jpg",
        length = 5.80,
        elevation = 1627,
        difficulty = "Moderate",
        lat = 39.17547632998192,
        log = -119.93118839417714,
        trail_tags = [Tag.query.get(7), Tag.query.get(8), Tag.query.get(5)]
    )






    db.session.add(trail1)
    db.session.add(trail2)
    db.session.add(trail3)
    db.session.add(trail4)
    db.session.add(trail5)



    db.session.commit()


def undo_trails():
    db.session.execute('TRUNCATE trails RESTART IDENTITY CASCADE;')
    db.session.commit()
