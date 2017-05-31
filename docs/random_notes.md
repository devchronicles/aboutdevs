CREATE INDEX name_canonical_idx ON profession USING GIN (to_tsvector('ptu', name_canonical));


SELECT to_tsvector('ptu','professor de dança') @@ to_tsquery('ptu','Professora & danca');

select * from profession p where to_tsvector('ptu', p.name_canonical) @@ to_tsquery('ptu', 'marceneiro')
order by p.name_canonical

npm run test-p -- ./test/integration/basicEntityAccessSpec.js

