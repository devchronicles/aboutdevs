SELECT exists(SELECT u.id
              FROM "user" u
              WHERE u.name = $1 and u.id != $2)