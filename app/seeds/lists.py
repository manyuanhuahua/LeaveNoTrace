from app.models import db, List, Trail



def seed_lists():
    list1 = List(
        user_id = 1,
        name='Next month list',
        list_trails = [Trail.query.get(1), Trail.query.get(2), Trail.query.get(4)]
    )

    list2 = List(
        user_id = 1,
        name='Fav list',
        list_trails = [Trail.query.get(3), Trail.query.get(2), Trail.query.get(4)]
    )

    list3 = List(
        user_id = 2,
        name='Interested',
        list_trails = [Trail.query.get(1), Trail.query.get(2), Trail.query.get(3)]
    )

    list4 = List(
        user_id = 3,
        name='Trails wanna go',
        list_trails = [Trail.query.get(1), Trail.query.get(3), Trail.query.get(5)]
    )

    list5 = List(
        user_id = 1,
        name='starred list',
        list_trails = [Trail.query.get(2), Trail.query.get(4)]
    )







    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)




    db.session.commit()


def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()
