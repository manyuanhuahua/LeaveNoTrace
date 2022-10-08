from app.models import db, Park

def seed_parks():
    park1 = Park(
        name = "Yosemite National Park",
        description = "With over 3.5 million yearly visitors from throughout the world, the iconic Yosemite National Park is known for some of the most beautiful hikes and landscapes in the United States.",
        preview_img = "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2022/5/18/GettyImages-1353388525.jpg.rend.hgtvcom.966.644.suffix/1652924149143.jpeg",
        acreage = 759620,
        contact = "209-372-0200",
        state = "CA",
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
        state = "WA",
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
        state = "NE",
        country = "United States of America",
        lat = "39.19918616698728",
        log = "-119.92877222908082",
        park_originlinks = "http://parks.nv.gov/parks/lake-tahoe-nevada-state-park-1",
        park_hours = "dawn - dusk"
    )

    park4 = Park(
        name = "Zion National Park",
        description = "Zion National Park is a unique landscape with high cliffs, narrow gorges and a beautiful view. The park has many famous walks. Angels Landing is an intense switchback trail with truly spectacular views from the top of the canyon. Another famous hike is the unique Narrows "Trail", a very long hike through a river that lies between a steep gorge. Other notable trails include the East Rim Trail to the park's highest point, the Slot Canyon Subway Trail, and the family-friendly but equally beautiful Kayenta Trail.",
        preview_img = "https://images.pexels.com/photos/248820/pexels-photo-248820.jpeg",
        acreage = 146,597,
        contact = "435-772-3256",
        state = "UT",
        country = "United States of America",
        lat = "37.281686",
        log = "-113.025288",
        park_originlinks = "https://www.nps.gov/zion/index.htm",
        park_hours = "dawn - dusk"
    )

    park5 = Park(
        name = "Arches National Park",
        description = "Arches National Park, located in the Moab region of eastern Utah, is a highlight of any trip to the Southwest, especially for families with children. The park is also a haven for adventure travel and adrenaline junkies. Compared to other National Parks in the region, the highlights can be seen within a day or two. The bright red rock against the deep blue sky is an iconic southwestern sight enjoyed by all ages.",
        preview_img = "https://images.pexels.com/photos/62600/pexels-photo-62600.jpeg",
        acreage = 76,
        contact = "435-719-2299",
        state = "UT",
        country = "United States of America",
        lat = "38.69569371056261",
        log = "-109.57613495812087",
        park_originlinks = "https://www.nps.gov/arch/index.htm",
        park_hours = "8:00 am - 6:00 pm"
"
    )

    park6 = Park(
        name = "Bryce Canyon National Park",
        description = "Bryce Canyon is a series of gorgeous, amphitheater shaped canyons that are known for their striking hoodoos. Because of the park's relatively remote location, it gets a lot less foot and car traffic than other National Parks. It is home to trees that are well over 1,000 years old,  endangered species like Utah prairie dog, the California condor, and the southwestern willow flycatcher, and 400 native plant species.",
        preview_img = "https://images.pexels.com/photos/8884864/pexels-photo-8884864.jpeg",
        acreage = 35835,
        contact = "435-834-5322",
        state = "UT",
        country = "United States of America",
        lat = "37.592617713612476",
        log = "-112.18978583289712",
        park_originlinks = "https://www.nps.gov/brca/index.htm",
        park_hours = "dawn - dusk"
    )

    park7 = Park(
        name = "Chugach State Park",
        description = "This beautiful park is a short drive from Anchorage, making for a great day trip. The park is the third largest state park in the United States, providing hundreds of thousands of acres for outdoor recreation. There are miles of trails for hiking, skiing, camping, and rock climbing. This is a must see if you're in the area.",
        preview_img = "https://www.alaskapublic.org/wp-content/uploads/2021/02/20210218_Crow-Pass-Trail_Chugach-State-Park-600x450.jpg",
        acreage = 495000,
        contact = "907-345-5014",
        state = "AL",
        country = "United States of America",
        lat = "61.15113566257631",
        log = "-149.2380103004822",
        park_originlinks = "http://dnr.alaska.gov/parks/aspunits/chugach/chugachindex.htm",
        park_hours = "dawn - dusk"
    )

    park8 = Park(
        name = "Coconino National Forest",
        description = "Coconino National Forest borders other nearby National Forests, including the Prescott National Forest, Tonto National Forest, and Kaibab National Forest. The park also encompasses portions of ten wilderness areas.",
        preview_img = "https://images.pexels.com/photos/6315440/pexels-photo-6315440.jpeg",
        acreage = 1821495,
        contact = "928-527-3600",
        state = "AZ",
        country = "United States of America",
        lat = "34.9132042718336",
        log = "-111.5591342182186",
        park_originlinks = "https://www.fs.usda.gov/coconino",
        park_hours = "dawn - dusk"
    )

    park9 = Park(
        name = "Lost Dutchman State Park",
        description = "Lost Dutchman State Park is located in the Sonoran Desert near the Superstition Mountains in central Arizona. The park offers camping and access to numerous trails leading into Tonto National Forest and the Superstition Mountain Wilderness. ",
        preview_img = "https://arizona-content.usedirect.com/storage/20220311103513-feature1.jpg",
        acreage = 320,
        contact = "480-982-4485",
        state = "AZ",
        country = "United States of America",
        lat = "33.460074480248025",
        log = "-111.47785484579909",
        park_originlinks = "https://azstateparks.com/lost-dutchman/",
        park_hours = "dawn - dusk"
    )

    park10 = Park(
        name = "Mount Tamalpais State Park",
        description = "More than 50 miles of trail are within the park and connect to a larger, 200-mile-long trail system. Bicyclists are challenged by old railroad grade, or the twisting road to the highest point of the park's summit. Camping at Bootjack or Steep Ravine makes for a great overnight trip.",
        preview_img = "https://d3kfjvhh435dey.cloudfront.net/_laravel/images/uploads/2016/08/img_2685812.jpg",
        acreage = 6300,
        contact = "415-388-2070",
        state = "CA",
        country = "United States of America",
        lat = "37.8892842613358",
        log = "-122.61076664510792",
        park_originlinks = "http://www.parks.ca.gov/default.asp?page_id=471",
        park_hours = "dawn - dusk"
    )

    park11 = Park(
        name = "Rocky Mountain National Park",
        description = "Rocky Mountain National Park is one of the most popular natural parks featuring 76 mountains each over 10 thousand feet high. Equally enjoyable on foot or from your car, there are four separate ecosystems: montane, subalpine, alpine tundra, and riparian. ",
        preview_img = "https://images.pexels.com/photos/4107412/pexels-photo-4107412.jpeg",
        acreage = 265807,
        contact = "970-586-1206",
        state = "CO",
        country = "United States of America",
        lat = "40.340974056180826",
        log = "-105.6820157639068",
        park_originlinks = "http://www.nps.gov/romo/",
        park_hours = "dawn - dusk"
    )

    park12 = Park(
        name = "Everglades National Park",
        description = "The Everglades are the largest subtropical wilderness in the United States. This mangrove ecosystem and marine estuary is home to 36 protected species, including the Florida panther, American crocodile, and West Indian manatee.",
        preview_img = "https://www.gannett-cdn.com/-mm-/591f448b8a01799738e59e5f0c98dfa77e8f8fde/c=0-102-2048-1259/local/-/media/2016/07/01/USATODAY/USATODAY/636029857052338244-Lane-River-credit-NPSPhoto.jpg",
        acreage = 1508537,
        contact = "305-242-7700",
        state = "FL",
        country = "United States of America",
        lat = "25.27939778903861",
        log = "-80.86943918099752",
        park_originlinks = "http://www.nps.gov/ever/",
        park_hours = "dawn - dusk"
    )

    park13 = Park(
        name = "White River National Forest",
        description = "With 12 ski areas, 10 mountain peaks over 14,000 feet, 2,500 miles of trails, eight Wilderness areas, 1,900 miles of forest roads, and 2.3 million acres of nature, it is easy to see why White River National Forest is the most visited forest in the United States.",
        preview_img = "https://cdn.summitdaily.com/wp-content/uploads/sites/2/2017/12/Skiareapayments-atd-122717-1.jpg",
        acreage = 2285970,
        contact = "970-945-2521",
        state = "CO",
        country = "United States of America",
        lat = "39.291551796424585",
        log = "-107.02676969985234",
        park_originlinks = "https://www.fs.usda.gov/whiteriver",
        park_hours = "dawn - dusk"
    )

    park14 = Park(
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

    park15 = Park(
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
    db.session.add(park4)
    db.session.add(park5)
    db.session.add(park6)
    db.session.add(park7)
    db.session.add(park8)
    db.session.add(park9)
    db.session.add(park10)
    db.session.add(park11)
    db.session.add(park12)
    db.session.add(park13)
    db.session.add(park14)
    db.session.add(park15)



    db.session.commit()


def undo_parks():
    db.session.execute('TRUNCATE parks RESTART IDENTITY CASCADE;')
    db.session.commit()
