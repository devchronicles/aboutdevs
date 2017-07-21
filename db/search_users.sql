SELECT
  u.id,
  u.name,
  u.display_name,
  u.gender,
  u.photo_url,
  u.bio,
  u.profession_other,
  u.profession_id,
  ST_Distance(g.geometry :: GEOGRAPHY, ST_SetSRID(ST_MakePoint(-43.342683, -21.999333), 4326) :: GEOGRAPHY) /
  1000 AS distance
FROM "user" u INNER JOIN geo_location g ON (u.geo_location_id = g.id)
WHERE u.type = 1 AND to_tsvector('ptu', u.search_canonical) @@ to_tsquery('ptu', 'professor')

ORDER BY distance
LIMIT 120
