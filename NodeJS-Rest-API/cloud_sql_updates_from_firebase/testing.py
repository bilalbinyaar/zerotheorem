import pymysql.cursors

# Connect to the database
connection = pymysql.connect(host='35.224.209.204',
                             user='root',
                             password='Pak123@@@',
                             database='zero_theorem_mysql',
                             cursorclass=pymysql.cursors.DictCursor)

with connection:
    with connection.cursor() as cursor:
        # Create a new record
        sql = "select * from AREA51_0M24BTC16"
        cursor.execute(sql)
        print(cursor.fetchall())

    # # connection is not autocommit by default. So you must commit to save
    # # your changes.
    # connection.commit()

    # with connection.cursor() as cursor:
    #     # Read a single record
    #     sql = "SELECT `id`, `password` FROM `users` WHERE `email`=%s"
    #     cursor.execute(sql, ('webmaster@python.org',))
    #     result = cursor.fetchone()
    #     print(result)