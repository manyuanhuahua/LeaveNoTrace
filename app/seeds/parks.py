from app.models import db, Park

def seed_parks():
    park1 = Park(
        name = "Yosemite National Park",
        description = "With over 3.5 million yearly visitors from throughout the world, the iconic Yosemite National Park is known for some of the most beautiful hikes and landscapes in the United States.",
        preview_img = "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2022/5/18/GettyImages-1353388525.jpg.rend.hgtvcom.966.644.suffix/1652924149143.jpeg",
        acreage = 759620,
        contact = "209-372-0200",
        state = "California",
        country = "United States of America",
        lat = 37.89579591469285,
        log = -119.53329183222338,
        park_originlinks = "https://www.nps.gov/yose/index.htm",
        park_hours = "dawn - dusk"
    )

    park2 = Park(
        name = "Mount Rainier National Park",
        description = "Mount Rainier National Park is located in west-central Washington and is ideal for hiking, mountain climbing and scenic drives. Most roads are open from late May to early October, which allow for both stunning views and access to a wide range of hiking trails and other sites.",
        preview_img = "https://mikeputnamphoto.com/wp-content/uploads/2016/01/Mt.-Rainier-National-Park.jpg",
        acreage = 236381,
        contact = "360-569-6600",
        state = "Washington",
        country = "United States of America",
        lat = 46.89872106336748,
        log = -121.728685937905,
        park_originlinks = "https://www.nps.gov/mora/index.htm",
        park_hours = "dawn - dusk"
    )

    park3 = Park(
        name = "Lake Tahoe-Nevada State Park",
        description = "Lake Tahoe-Nevada State Park is located, like the name suggests, on the Nevada side of Lake Tahoe. It has a landscape that encompasses part of the lake and the beautiful forrest of aspens that surrounds it. It is a wonderful place to hike, horseback ride and mountain bike.",
        preview_img = "https://img.peapix.com/a72f65f9efa64cb1b164d3d44b85850f_480.jpg",
        acreage = 14301,
        contact = "775-831-0494",
        state = "Nevada",
        country = "United States of America",
        lat = "39.19918616698728",
        log = "-119.92877222908082",
        park_originlinks = "http://parks.nv.gov/parks/lake-tahoe-nevada-state-park-1",
        park_hours = "dawn - dusk"
    )







    db.session.add(park1)
    db.session.add(park2)
    db.session.add(park3)




    db.session.commit()


def undo_parks():
    db.session.execute('TRUNCATE parks RESTART IDENTITY CASCADE;')
    db.session.commit()
