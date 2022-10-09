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

    trail6 = Trail(
        park_id = 4,
        name = "Angels Landing Trail",
        description = "The Angels Landing Trail is a strenuous route in Zion National Park with steep drop-offs and very narrow sections. The technical route and incredible views of Zion Canyon make this hike the most popular in Zion.",
        preview_img = "https://www.nps.gov/zion/planyourvisit/images/Angels-Landing-Hike.jpg",
        length = 4.4,
        elevation = 1604,
        difficulty = "Hard",
        lat = 37.274253331805276,
        log = -112.9499519185691,
        trail_tags = [Tag.query.get(4), Tag.query.get(5), Tag.query.get(6), Tag.query.get(10)]
    )

    trail7 = Trail(
        park_id = 4,
        name = "The Zion Narrows Riverside Walk",
        description = "This route along the Riverside Walk Trail is a relatively easy and paved out and back located at the end of the Zion Canyon Scenic Drive. This route only includes the maintained trail. Those looking for a longer adventure can find the full Zion Narrows route that continues down the river past this trail's endpoint. ",
        preview_img = "https://www.citrusmilo.com/zion2010/joebraun_riversidewalk21.jpg",
        length = 1.9,
        elevation = 193,
        difficulty = "Easy",
        lat = 37.306373195477,
        log = -112.94928803982606,
        trail_tags = [Tag.query.get(7), Tag.query.get(6), Tag.query.get(4), Tag.query.get(10), Tag.query.get(5)]
    )

    trail8 = Trail(
        park_id = 5,
        name = "Delicate Arch Trail",
        description = "Delicate Arch Trail is a short hike in Arches National Park to Utah's most recognizable natural arch, which you will likely recognize from the Utah license plate. ",
        preview_img = "https://www.discovermoab.com/wp-content/uploads/2018/06/Winter-Sunset-at-Delicate-Arch_1-2.jpg",
        length = 3.2,
        elevation = 629,
        difficulty = "Moderate",
        lat = 38.74066652531155,
        log = -109.50989177391547,
        trail_tags = [Tag.query.get(5), Tag.query.get(6), Tag.query.get(4), Tag.query.get(10)]
    )

    trail9 = Trail(
        park_id = 5,
        name = "Devils Garden",
        description = "Devils Garden is a popular, challenging hike at the northern end of the park. The trail offers incredible views of unique arches, including Landscape Arch, which is one of the longest natural spans in the world.",
        preview_img = "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_501,q_75,w_741/v1/clients/utahddm/57442f3149_b5d9b091-cbad-403c-ad6f-a221795e33f1.jpg",
        length = 7.9,
        elevation = 1085,
        difficulty = "Hard",
        lat = 38.804668368729274,
        log = -109.61373194383832,
        trail_tags = [Tag.query.get(5), Tag.query.get(6), Tag.query.get(4), Tag.query.get(10)]
    )

    trail10 = Trail(
        park_id = 6,
        name = "Navajo Loop and Queens Garden Trail",
        description = "Featuring incredible views and unique rock formations, this hike is one of the best ways to experience the hoodoos and spires of Bryce Canyon National Park. This great trail takes you by some of the park's most iconic features, including Queen Victoria and Thor's Hammer. ",
        preview_img = "https://s27363.pcdn.co/wp-content/uploads/2017/08/Sunset-Point-Bryce.jpg.optimal.jpg",
        length = 3.1,
        elevation = 649,
        difficulty = "Moderate",
        lat = 37.618714437039415,
        log = -112.1621056297728,
        trail_tags = [Tag.query.get(5), Tag.query.get(4), Tag.query.get(10)]
    )

    trail11 = Trail(
        park_id = 6,
        name = "Fairyland Loop Trail",
        description = "Fairyland Loop Trail begins at Fairyland Point, at the northern portion of Bryce Canyon National Park, and takes you through spectacular hoodoos and scenery along the rim and into the canyon; including a spur trail to Tower Bridge. ",
        preview_img = "https://www.nps.gov/brca/planyourvisit/images/Fairyland_20140613_069.jpg",
        length = 7.8,
        elevation = 1545,
        difficulty = "Moderate",
        lat = 37.63590107121967,
        log = -112.1492545046402,
        trail_tags = [Tag.query.get(5), Tag.query.get(4), Tag.query.get(10)]
    )

    trail12 = Trail(
        park_id = 7,
        name = "Flattop Mountain Trail",
        description = "This is an awesome hike in Anchorage with incredible views the whole way up! The route leaves from the Glen Alps parking area. Visitors have reported it is moderate in difficulty to the second saddle, after which becomes more difficult due to a series scrambles to the summit.",
        preview_img = "http://www.rockymountainhikingtrails.com/rocky-mountain-photos/hallett-peak/flattop-mountain-trail-2.jpg",
        length = 3.3,
        elevation = 1430,
        difficulty = "Hard",
        lat = 40.31634033261484,
        log = -105.65741976036918,
        trail_tags = [Tag.query.get(3), Tag.query.get(5), Tag.query.get(6),Tag.query.get(10)]
    )

    trail13 = Trail(
        park_id = 8,
        name = "Devils Bridge Trail",
        description = "Devils Bridge is the largest natural sandstone arch located in the Sedona area of Coconino National Forest. This is a great hike that offers breathtaking views of Red Rock country.",
        preview_img = "https://modernhiker-storage.s3.amazonaws.com/modernhiker/wp-content/uploads/2018/07/Devils-Bridge-11-1030x698.jpg",
        length = 3.9,
        elevation = 521,
        difficulty = "Moderate",
        lat = 34.90176505871836,
        log = -111.8111565317109,
        trail_tags = [Tag.query.get(3), Tag.query.get(5), Tag.query.get(6)]
    )

    trail14 = Trail(
        park_id = 9,
        name = "Flatiron via Siphon Draw Trail",
        description = "Flatiron via Siphon Draw Trail is a very challenging day hike in the Superstition Mountains. It is full of tough scrambles and is recommended for seasoned hikers and scramblers only. Bring plenty of water and wear sturdy shoes.",
        preview_img = "https://thekarabou.com/wp-content/uploads/2020/01/COM-Flat-Iron-16-1024x683.jpg",
        length = 5.5,
        elevation = 2641,
        difficulty = "Hard",
        lat = 39.17547632998192,
        log = -119.93118839417714,
        trail_tags = [Tag.query.get(3), Tag.query.get(5), Tag.query.get(6),Tag.query.get(10)]
    )

    trail15 = Trail(
        park_id = 10,
        name = "Dipsea Trail, Steep Ravine Trail, and Matt Davis Loop",
        description = "The hike begins along the Dipsea Trail in the town of Stinson Beach. It climbs gradually with many ocean views until you reach its junction with the Steep Ravine Trail. Be sure to turn around and take in the incredible views of Stinson Beach on your way up this section.",
        preview_img = "https://liveandlethike.files.wordpress.com/2020/05/dsc07700.jpg",
        length = 7.5,
        elevation = 1689,
        difficulty = "Moderate",
        lat = 37.8919206514026,
        log = -122.62085174510784,
        trail_tags = [Tag.query.get(4), Tag.query.get(5), Tag.query.get(6)]
    )

    trail16 = Trail(
        park_id = 11,
        name = "Emerald Lake Trail",
        description = "This scenic hiking trail through the Tyndall Gorge to Emerald Lake is an extremely popular route in Rocky Mountain National Park. ",
        preview_img = "https://dayhikesneardenver.com/wp-content/uploads/2010/07/emerald-lake-rocky-mountain-national-park-tim-lumley.jpg",
        length = 3.2,
        elevation = 698,
        difficulty = "Easy",
        lat = 40.582383008412975,
        log = -105.58997498236616,
        trail_tags = [Tag.query.get(4),Tag.query.get(2),Tag.query.get(5), Tag.query.get(6),Tag.query.get(10)]
    )

    trail17 = Trail(
        park_id = 12,
        name = "Shark Valley Tram Trail",
        description = "Shark Valley is in the very heart of the Everglades freshwater marsh. The trail is paved and you can walk, ride your bike (or rent a bike there) or take a guided tram ride through it. ",
        preview_img = "https://www.nps.gov/common/uploads/cropped_image/479C02A2-0F53-DDC0-8B96400D3234A1E9.jpg",
        length = 15.8,
        elevation = 22,
        difficulty = "Easy",
        lat = 25.75718255537075,
        log = -80.76528804544449,
        trail_tags = [Tag.query.get(3), Tag.query.get(6),Tag.query.get(10)]
    )

    trail18 = Trail(
        park_id = 13,
        name = "Quandary Peak Trail",
        description = "Located a few miles south of Breckenridge, this challenging hike to the summit of Quandary Peak features incredible views and rocky switchbacks. ",
        preview_img = "https://cdn2.apstatic.com/photos/hike/7033447_medium_1554998013.jpg",
        length = 6.6,
        elevation = 3326,
        difficulty = "Hard",
        lat = 39.38566410117619,
        log = -106.0619379738935,
        trail_tags = [Tag.query.get(6),Tag.query.get(10)]
    )

    trail19 = Trail(
        park_id = 14,
        name = "Temescal Canyon Trail",
        description = "This is a very popular area for birding, hiking, and mountain biking, so you'll likely encounter other people while exploring. The best times to visit this trail are June through October. Dogs are welcome and may be off-leash in some areas.",
        preview_img = "http://photos2.meetupstatic.com/photos/event/b/c/f/e/event_90288382.jpeg",
        length = 3.8,
        elevation = 935,
        difficulty = "Moderate",
        lat = 33.46487710765542,
        log = -111.47950524313589,
        trail_tags = [Tag.query.get(4), Tag.query.get(5), Tag.query.get(6),Tag.query.get(10)]
    )

    trail20 = Trail(
        park_id = 15,
        name = "Ryan Mountain",
        description = "Ryan Mountain is one of the most popular destinations in Joshua Tree! With awe inspiring rock formations and incredible panoramic views across the landscape — Ryan Mountain doesn’t disappoint.",
        preview_img = "https://roadtrippingcalifornia.com/wp-content/uploads/2021/04/Ryan-Mountain-Trail-Joshua-Tree-National-Park.jpg",
        length = 2.9,
        elevation = 1062,
        difficulty = "Moderate",
        lat = 33.98670652599337,
        log = -116.13482157698436,
        trail_tags = [Tag.query.get(3), Tag.query.get(5), Tag.query.get(6),Tag.query.get(10)]
    )







    db.session.add(trail1)
    db.session.add(trail2)
    db.session.add(trail3)
    db.session.add(trail4)
    db.session.add(trail5)
    db.session.add(trail6)
    db.session.add(trail7)
    db.session.add(trail8)
    db.session.add(trail9)
    db.session.add(trail10)
    db.session.add(trail11)
    db.session.add(trail12)
    db.session.add(trail13)
    db.session.add(trail14)
    db.session.add(trail15)
    db.session.add(trail16)
    db.session.add(trail17)
    db.session.add(trail18)
    db.session.add(trail19)
    db.session.add(trail20)
   

    db.session.commit()


def undo_trails():
    db.session.execute('TRUNCATE trails RESTART IDENTITY CASCADE;')
    db.session.commit()
