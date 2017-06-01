SELECT id
FROM profession p
WHERE p.name_canonical_normalized = $1 OR p.name_feminine_normalized = $1