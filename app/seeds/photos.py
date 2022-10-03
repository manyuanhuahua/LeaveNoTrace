from app.models import db, Photo


def seed_photos():
    photo1 = Photo(
        user_id = 1,
        trail_id = 1,
        url='https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg'
    )

    photo2 = Photo(
        user_id = 2,
        trail_id = 1,
        url='https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg'
    )

    photo3 = Photo(
        user_id = 6,
        trail_id = 1,
        url='https://images.pexels.com/photos/3484061/pexels-photo-3484061.jpeg'
    )

    photo4 = Photo(
        user_id = 4,
        trail_id = 2,
        url='https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg'
    )

    photo5 = Photo(
        user_id = 7,
        trail_id = 2,
        url='https://images.pexels.com/photos/3274903/pexels-photo-3274903.jpeg'
    )

    photo6 = Photo(
        user_id = 10,
        trail_id = 2,
        url='https://images.pexels.com/photos/6043246/pexels-photo-6043246.jpeg'
    )

    photo7 = Photo(
        user_id = 1,
        trail_id = 3,
        url='https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg'
    )

    photo8 = Photo(
        user_id = 8,
        trail_id = 3,
        url='https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
    )

    photo9 = Photo(
        user_id = 10,
        trail_id = 3,
        url='https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg'
    )

    photo10 = Photo(
        user_id = 6,
        trail_id = 4,
        url='https://images.pexels.com/photos/461956/pexels-photo-461956.jpeg'
    )
    photo11 = Photo(
        user_id = 7,
        trail_id = 4,
        url='https://images.pexels.com/photos/257092/pexels-photo-257092.jpeg'
    )

    photo12 = Photo(
        user_id = 3,
        trail_id = 5,
        url='https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg'
    )

    photo13 = Photo(
        user_id = 9,
        trail_id = 5,
        url='https://images.pexels.com/photos/2440021/pexels-photo-2440021.jpeg'
    )

    photo14 = Photo(
        user_id = 11,
        trail_id = 5,
        url='https://images.pexels.com/photos/772429/pexels-photo-772429.jpeg'
    )

    photo15 = Photo(
        user_id = 2,
        trail_id = 5,
        url='https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg'
    )




    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo7)
    db.session.add(photo8)
    db.session.add(photo9)
    db.session.add(photo10)
    db.session.add(photo11)
    db.session.add(photo12)
    db.session.add(photo13)
    db.session.add(photo14)
    db.session.add(photo15)


    db.session.commit()


def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
