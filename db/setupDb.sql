--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET search_path = public, pg_catalog;

--
-- Name: _aboutdevs_cleanup_db(); Type: FUNCTION; Schema: public; Owner: aboutdevs
--

CREATE FUNCTION _aboutdevs_cleanup_db() RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  l_stmt TEXT;
BEGIN
  SELECT 'truncate ' || string_agg(format('%I.%I', schemaname, tablename), ',')
  INTO l_stmt
  FROM pg_tables
  WHERE schemaname IN ('public');

  EXECUTE l_stmt;
END;
$$;


ALTER FUNCTION public._aboutdevs_cleanup_db() OWNER TO aboutdevs;

--
-- Name: _aboutdevs_is_user_name_taken(character varying, integer); Type: FUNCTION; Schema: public; Owner: aboutdevs
--

CREATE FUNCTION _aboutdevs_is_user_name_taken(_user_name character varying, _user_id integer) RETURNS TABLE("exists" boolean)
    LANGUAGE sql
    AS $$
SELECT exists(SELECT u.id
              FROM "user" u
              WHERE u.name = _user_name and u.id != _user_id)
$$;


ALTER FUNCTION public._aboutdevs_is_user_name_taken(_user_name character varying, _user_id integer) OWNER TO aboutdevs;

--
-- Name: _aboutdevs_place_update_geometry(integer, double precision, double precision); Type: FUNCTION; Schema: public; Owner: aboutdevs
--

CREATE FUNCTION _aboutdevs_place_update_geometry(_id integer, _x double precision, _y double precision) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE google_place
  SET geometry = ST_SetSRID(ST_MakePoint(_x,_y),4326)
  WHERE id = _id;
END;
$$;


ALTER FUNCTION public._aboutdevs_place_update_geometry(_id integer, _x double precision, _y double precision) OWNER TO aboutdevs;

--
-- Name: _aboutdevs_select_tags_from_user(integer); Type: FUNCTION; Schema: public; Owner: aboutdevs
--

CREATE FUNCTION _aboutdevs_select_tags_from_user(_user_id integer) RETURNS TABLE(id integer, name character varying)
    LANGUAGE sql
    AS $$
SELECT t.id as id, t.name as name
    FROM tag t INNER JOIN user_tag ut ON t.id = ut.tag_id
    INNER JOIN "user" u ON u.id = ut.user_id
    WHERE u.id = _user_id
    ORDER BY name
$$;


ALTER FUNCTION public._aboutdevs_select_tags_from_user(_user_id integer) OWNER TO aboutdevs;

--
-- Name: _aboutdevs_update_tag(character varying, integer); Type: FUNCTION; Schema: public; Owner: aboutdevs
--

CREATE FUNCTION _aboutdevs_update_tag(_name character varying, _relevance integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NOT exists(SELECT 1 FROM tag t WHERE t.name = _name) THEN
      INSERT INTO tag(name, relevance) VALUES (_name, _relevance);
    END IF;
END;
$$;


ALTER FUNCTION public._aboutdevs_update_tag(_name character varying, _relevance integer) OWNER TO aboutdevs;

--
-- Name: _aboutdevs_user_update_geometry(integer, double precision, double precision); Type: FUNCTION; Schema: public; Owner: aboutdevs
--

CREATE FUNCTION _aboutdevs_user_update_geometry(_id integer, _x double precision, _y double precision) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE "user"
  SET geometry = ST_SetSRID(ST_MakePoint(_x,_y),4326)
  WHERE id = _id;
END;
$$;


ALTER FUNCTION public._aboutdevs_user_update_geometry(_id integer, _x double precision, _y double precision) OWNER TO aboutdevs;

--
-- Name: ptu; Type: TEXT SEARCH CONFIGURATION; Schema: public; Owner: postgres
--

CREATE TEXT SEARCH CONFIGURATION ptu (
    PARSER = pg_catalog."default" );

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR asciiword WITH portuguese_stem;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR word WITH unaccent, portuguese_stem;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR numword WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR email WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR url WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR host WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR sfloat WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR version WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR hword_numpart WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR hword_part WITH unaccent, portuguese_stem;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR hword_asciipart WITH portuguese_stem;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR numhword WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR asciihword WITH portuguese_stem;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR hword WITH unaccent, portuguese_stem;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR url_path WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR file WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR "float" WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR "int" WITH simple;

ALTER TEXT SEARCH CONFIGURATION ptu
    ADD MAPPING FOR uint WITH simple;


ALTER TEXT SEARCH CONFIGURATION ptu OWNER TO postgres;

--
-- Name: su; Type: TEXT SEARCH CONFIGURATION; Schema: public; Owner: postgres
--

CREATE TEXT SEARCH CONFIGURATION su (
    PARSER = pg_catalog."default" );

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR asciiword WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR word WITH unaccent, simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR numword WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR email WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR url WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR host WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR sfloat WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR version WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR hword_numpart WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR hword_part WITH unaccent, simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR hword_asciipart WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR numhword WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR asciihword WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR hword WITH unaccent, simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR url_path WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR file WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR "float" WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR "int" WITH simple;

ALTER TEXT SEARCH CONFIGURATION su
    ADD MAPPING FOR uint WITH simple;


ALTER TEXT SEARCH CONFIGURATION su OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: google_place; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE google_place (
    id integer NOT NULL,
    formatted_address character varying(255) NOT NULL,
    geometry geometry,
    longitude double precision,
    latitude double precision,
    google_place_id character varying(255) NOT NULL,
    google_place_details json,
    CONSTRAINT enforce_srid CHECK ((st_srid(geometry) = 4326))
);


ALTER TABLE google_place OWNER TO aboutdevs;

--
-- Name: geo_location_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE geo_location_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE geo_location_id_seq OWNER TO aboutdevs;

--
-- Name: geo_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE geo_location_id_seq OWNED BY google_place.id;


--
-- Name: google_place_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE google_place_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE google_place_id_seq OWNER TO aboutdevs;

--
-- Name: google_place_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE google_place_id_seq OWNED BY google_place.id;


--
-- Name: google_places_textsearch_cache; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE google_places_textsearch_cache (
    id integer NOT NULL,
    search character varying(200) NOT NULL,
    cache json NOT NULL
);


ALTER TABLE google_places_textsearch_cache OWNER TO aboutdevs;

--
-- Name: google_places_textsearch_cache_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE google_places_textsearch_cache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE google_places_textsearch_cache_id_seq OWNER TO aboutdevs;

--
-- Name: google_places_textsearch_cache_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE google_places_textsearch_cache_id_seq OWNED BY google_places_textsearch_cache.id;


--
-- Name: location_cache_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE location_cache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE location_cache_id_seq OWNER TO aboutdevs;

--
-- Name: location_cache_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE location_cache_id_seq OWNED BY google_places_textsearch_cache.id;


--
-- Name: location_cache_search_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE location_cache_search_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE location_cache_search_seq OWNER TO aboutdevs;

--
-- Name: location_cache_search_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE location_cache_search_seq OWNED BY google_places_textsearch_cache.search;


--
-- Name: stackoverflow_tags_cache; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE stackoverflow_tags_cache (
    search character varying(50) NOT NULL,
    cache json NOT NULL,
    last_updated_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL,
    id integer NOT NULL
);


ALTER TABLE stackoverflow_tags_cache OWNER TO aboutdevs;

--
-- Name: stackoverflow_tags_cache_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE stackoverflow_tags_cache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE stackoverflow_tags_cache_id_seq OWNER TO aboutdevs;

--
-- Name: stackoverflow_tags_cache_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE stackoverflow_tags_cache_id_seq OWNED BY stackoverflow_tags_cache.id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE tag (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    relevance integer NOT NULL,
    last_updated_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL
);


ALTER TABLE tag OWNER TO aboutdevs;

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tag_id_seq OWNER TO aboutdevs;

--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE tag_id_seq OWNED BY tag.id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id integer DEFAULT nextval('user_id_seq'::regclass) NOT NULL,
    display_name character varying(50) NOT NULL,
    photo_url character varying(255) NOT NULL,
    oauth_profiles json,
    status smallint DEFAULT 0 NOT NULL,
    type smallint DEFAULT 0 NOT NULL,
    title character varying(80),
    bio text,
    search_canonical text,
    name character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    company_name character varying(80),
    company_url character varying(255),
    social_links json,
    google_place_id integer,
    google_place_formatted_address character varying(255),
    info_groups json,
    colors json,
    tags text,
    geometry geometry,
    CONSTRAINT enforce_srid CHECK ((st_srid(geometry) = 4326))
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: COLUMN "user".oauth_profiles; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN "user".oauth_profiles IS 'A JSON containing information returned by OAuth providers';


--
-- Name: user_tag; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE user_tag (
    id integer NOT NULL,
    user_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE user_tag OWNER TO aboutdevs;

--
-- Name: user_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE user_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_tag_id_seq OWNER TO aboutdevs;

--
-- Name: user_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE user_tag_id_seq OWNED BY user_tag.id;


--
-- Name: google_place id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY google_place ALTER COLUMN id SET DEFAULT nextval('google_place_id_seq'::regclass);


--
-- Name: google_places_textsearch_cache id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY google_places_textsearch_cache ALTER COLUMN id SET DEFAULT nextval('google_places_textsearch_cache_id_seq'::regclass);


--
-- Name: google_places_textsearch_cache search; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY google_places_textsearch_cache ALTER COLUMN search SET DEFAULT nextval('location_cache_search_seq'::regclass);


--
-- Name: stackoverflow_tags_cache id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY stackoverflow_tags_cache ALTER COLUMN id SET DEFAULT nextval('stackoverflow_tags_cache_id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY tag ALTER COLUMN id SET DEFAULT nextval('tag_id_seq'::regclass);


--
-- Name: user_tag id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_tag ALTER COLUMN id SET DEFAULT nextval('user_tag_id_seq'::regclass);


--
-- Name: google_place geo_location_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY google_place
    ADD CONSTRAINT geo_location_pkey PRIMARY KEY (id);


--
-- Name: google_places_textsearch_cache location_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY google_places_textsearch_cache
    ADD CONSTRAINT location_cache_pkey PRIMARY KEY (id);


--
-- Name: stackoverflow_tags_cache stackoverflow_tags_cache_id_pk; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY stackoverflow_tags_cache
    ADD CONSTRAINT stackoverflow_tags_cache_id_pk PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: user user_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_id_pk PRIMARY KEY (id);


--
-- Name: user_tag user_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_tag
    ADD CONSTRAINT user_tag_pkey PRIMARY KEY (id);


--
-- Name: geo_location_formatted_address_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_formatted_address_uindex ON google_place USING btree (formatted_address);


--
-- Name: geo_location_gpx; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE INDEX geo_location_gpx ON google_place USING gist (geography(geometry));


--
-- Name: geo_location_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_id_uindex ON google_place USING btree (id);


--
-- Name: geo_location_spx; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE INDEX geo_location_spx ON google_place USING gist (geometry);


--
-- Name: google_place_google_place_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX google_place_google_place_id_uindex ON google_place USING btree (google_place_id);


--
-- Name: location_cache_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX location_cache_id_uindex ON google_places_textsearch_cache USING btree (id);


--
-- Name: location_cache_search_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX location_cache_search_uindex ON google_places_textsearch_cache USING btree (search);


--
-- Name: search_canonical_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_canonical_idx ON "user" USING gin (to_tsvector('ptu'::regconfig, search_canonical));


--
-- Name: stackoverflow_tags_cache_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX stackoverflow_tags_cache_id_uindex ON stackoverflow_tags_cache USING btree (id);


--
-- Name: stackoverflow_tags_cache_search_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX stackoverflow_tags_cache_search_uindex ON stackoverflow_tags_cache USING btree (search);


--
-- Name: tag_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX tag_id_uindex ON tag USING btree (id);


--
-- Name: tag_name_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX tag_name_uindex ON tag USING btree (name);


--
-- Name: user_email_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_email_uindex ON "user" USING btree (email);


--
-- Name: user_geometry_gpx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_geometry_gpx ON "user" USING gist (geography(geometry));


--
-- Name: user_geometry_spx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_geometry_spx ON "user" USING gist (geometry);


--
-- Name: user_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_name_uindex ON "user" USING btree (name);


--
-- Name: user_tag_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX user_tag_id_uindex ON user_tag USING btree (id);


--
-- Name: user user_google_place_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_google_place_id_fk FOREIGN KEY (google_place_id) REFERENCES google_place(id);


--
-- Name: user_tag user_tag_tag_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_tag
    ADD CONSTRAINT user_tag_tag_id_fk FOREIGN KEY (tag_id) REFERENCES tag(id);


--
-- Name: user_tag user_tag_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_tag
    ADD CONSTRAINT user_tag_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- PostgreSQL database dump complete
--

