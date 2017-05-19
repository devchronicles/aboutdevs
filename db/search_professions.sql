SELECT p.name_canonical
FROM profession p
WHERE to_tsvector('ptu', p.name_canonical) @@ to_tsquery('ptu', $1)
ORDER BY p.name_canonical
