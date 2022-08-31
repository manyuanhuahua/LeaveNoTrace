from app.models import db, User, Trail, Review

def seed_reviews():
    review1 = Review(
        user_id = 1,
        trail_id = 1,
        content = "I love this trail!!",
        rating = 3
    )

    review2 = Review(
        user_id = 2,
        trail_id = 1,
        content = "Nice walk as always.",
        rating = 5
    )

    review3 = Review(
        user_id = 6,
        trail_id = 1,
        content = "Great trail!",
        rating = 4
    )

    review4 = Review(
        user_id = 4,
        trail_id = 2,
        content = "Great hike, went clockwise so waterfalls were at the end and on the down hill section of the trail.",
        rating = 4
    )

    review5 = Review(
        user_id = 7,
        trail_id = 2,
        content = "As expected there is not much water",
        rating = 3
    )

    review6 = Review(
        user_id = 10,
        trail_id = 2,
        content = "So many little waterfalls. Lovely hike, beautiful shady trail.",
        rating = 5
    )

    review7 = Review(
        user_id = 1,
        trail_id = 3,
        content = "Awesome trail",
        rating = 4
    )

    review8 = Review(
        user_id = 8,
        trail_id = 3,
        content = "",
        rating = 5
    )

    review9 = Review(
        user_id = 10,
        trail_id = 3,
        content = "Beautiful and diverse trail.",
        rating = 4
    )

    review10 = Review(
        user_id = 6,
        trail_id = 4,
        content = "Scenic, hot in the summer.",
        rating = 4
    )
    review11 = Review(
        user_id = 7,
        trail_id = 4,
        content = "It needs some maintenance, trails are poorly marked too.",
        rating = 2
    )

    review12 = Review(
        user_id = 3,
        trail_id = 5,
        content = "Kinda boring",
        rating = 2
    )

    review13 = Review(
        user_id = 9,
        trail_id = 5,
        content = "Very hot turned around a mile before the peaks because of the heat and exposure.",
        rating = 1
    )

    review14 = Review(
        user_id = 11,
        trail_id = 5,
        content = "Temp was perfect for hiking, nice breeze and cool.",
        rating = 4
    )

    review15 = Review(
        user_id = 2,
        trail_id = 5,
        content = "About 4 hours for the complete route.",
        rating = 3
    )




    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)


    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
