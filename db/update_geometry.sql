update geo_location
  set geometry = ST_SetSRID(
        ST_MakePoint(
            $2,
            $3,
        4326)
  where id = $1