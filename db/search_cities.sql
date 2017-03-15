select sq.id, sq.name, s.shortname as state from (
    SELECT
        c.id,
        c.name,
        c.stateid
    FROM geo_city c
    WHERE to_tsvector('su', c.name) @@ to_tsquery('su', $1)
    LIMIT 10
) as sq JOIN geo_state s ON sq.stateid = s.id
ORDER BY sq.name
