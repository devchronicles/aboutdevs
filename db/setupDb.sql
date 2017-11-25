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
-- Name: geo_location_city; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE geo_location_city (
    id integer NOT NULL,
    short_name character varying(255) NOT NULL,
    geo_location_state_id integer NOT NULL
);


ALTER TABLE geo_location_city OWNER TO aboutdevs;

--
-- Name: geo_administrative_area_level_2_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE geo_administrative_area_level_2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE geo_administrative_area_level_2_id_seq OWNER TO aboutdevs;

--
-- Name: geo_administrative_area_level_2_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE geo_administrative_area_level_2_id_seq OWNED BY geo_location_city.id;


--
-- Name: geo_location_state; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE geo_location_state (
    id integer NOT NULL,
    long_name character varying(255) NOT NULL,
    short_name character varying(255) NOT NULL,
    geo_location_country_id integer NOT NULL
);


ALTER TABLE geo_location_state OWNER TO aboutdevs;

--
-- Name: geo_adminstrative_area_level_1_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE geo_adminstrative_area_level_1_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE geo_adminstrative_area_level_1_id_seq OWNER TO aboutdevs;

--
-- Name: geo_adminstrative_area_level_1_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE geo_adminstrative_area_level_1_id_seq OWNED BY geo_location_state.id;


--
-- Name: geo_location; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE geo_location (
    id integer NOT NULL,
    geo_location_city_id integer NOT NULL,
    formatted_address character varying(255) NOT NULL,
    sub_locality character varying(255) NOT NULL,
    geometry geometry,
    longitude double precision,
    latitude double precision,
    CONSTRAINT enforce_srid CHECK ((st_srid(geometry) = 4326))
);


ALTER TABLE geo_location OWNER TO aboutdevs;

--
-- Name: geo_location_cache; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE geo_location_cache (
    id integer NOT NULL,
    search character varying(200) NOT NULL,
    cache json NOT NULL
);


ALTER TABLE geo_location_cache OWNER TO aboutdevs;

--
-- Name: geo_location_country; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE geo_location_country (
    id integer NOT NULL,
    long_name character varying(255) NOT NULL,
    short_name character varying(255) NOT NULL
);


ALTER TABLE geo_location_country OWNER TO aboutdevs;

--
-- Name: geo_location_country_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE geo_location_country_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE geo_location_country_id_seq OWNER TO aboutdevs;

--
-- Name: geo_location_country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE geo_location_country_id_seq OWNED BY geo_location_country.id;


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

ALTER SEQUENCE geo_location_id_seq OWNED BY geo_location.id;


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

ALTER SEQUENCE location_cache_id_seq OWNED BY geo_location_cache.id;


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

ALTER SEQUENCE location_cache_search_seq OWNED BY geo_location_cache.search;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE notification (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    read boolean DEFAULT false NOT NULL,
    type smallint NOT NULL,
    data json NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE notification OWNER TO postgres;

--
-- Name: COLUMN notification.read; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN notification.read IS 'Whether or not the user has read the notification';


--
-- Name: COLUMN notification.type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN notification.type IS 'Notification type. This is an enum/const that will be defined in code';


--
-- Name: COLUMN notification.user_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN notification.user_id IS 'The user the notification is for';


--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE notification_id_seq OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE notification_id_seq OWNED BY notification.id;


--
-- Name: profession; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE profession (
    name_canonical character varying(80) NOT NULL,
    name_feminine character varying(80),
    id integer NOT NULL,
    name_canonical_normalized character varying(80),
    name_feminine_normalized character varying(80)
);


ALTER TABLE profession OWNER TO aboutdevs;

--
-- Name: profession_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE profession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE profession_id_seq OWNER TO aboutdevs;

--
-- Name: profession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE profession_id_seq OWNED BY profession.id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE tag (
    id integer NOT NULL,
    name character varying(50) NOT NULL
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
    profession_other character varying(80),
    gender smallint NOT NULL,
    geo_location_id integer,
    profession_id integer,
    bio character varying(500),
    activities character varying(500),
    phone_whatsapp character varying(20),
    phone_alternative character varying(20),
    search_canonical text,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: COLUMN "user".oauth_profiles; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN "user".oauth_profiles IS 'A JSON containing information returned by OAuth providers';


--
-- Name: user_connection; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE user_connection (
    id integer NOT NULL,
    user_id integer NOT NULL,
    user_professional_id integer NOT NULL,
    request text NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE user_connection OWNER TO aboutdevs;

--
-- Name: user_connection_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE user_connection_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_connection_id_seq OWNER TO aboutdevs;

--
-- Name: user_connection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE user_connection_id_seq OWNED BY user_connection.id;


--
-- Name: user_recommendation; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE user_recommendation (
    id integer NOT NULL,
    user_recommended_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE user_recommendation OWNER TO aboutdevs;

--
-- Name: user_recommendation_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE user_recommendation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_recommendation_id_seq OWNER TO aboutdevs;

--
-- Name: user_recommendation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE user_recommendation_id_seq OWNED BY user_recommendation.id;


--
-- Name: user_service; Type: TABLE; Schema: public; Owner: aboutdevs
--

CREATE TABLE user_service (
    id integer NOT NULL,
    user_id integer NOT NULL,
    service character varying(64) NOT NULL,
    index smallint NOT NULL,
    service_canonical character varying(64) NOT NULL
);


ALTER TABLE user_service OWNER TO aboutdevs;

--
-- Name: user_service_id_seq; Type: SEQUENCE; Schema: public; Owner: aboutdevs
--

CREATE SEQUENCE user_service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_service_id_seq OWNER TO aboutdevs;

--
-- Name: user_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aboutdevs
--

ALTER SEQUENCE user_service_id_seq OWNED BY user_service.id;


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
-- Name: geo_location id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location ALTER COLUMN id SET DEFAULT nextval('geo_location_id_seq'::regclass);


--
-- Name: geo_location_cache id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_cache ALTER COLUMN id SET DEFAULT nextval('location_cache_id_seq'::regclass);


--
-- Name: geo_location_cache search; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_cache ALTER COLUMN search SET DEFAULT nextval('location_cache_search_seq'::regclass);


--
-- Name: geo_location_city id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_city ALTER COLUMN id SET DEFAULT nextval('geo_administrative_area_level_2_id_seq'::regclass);


--
-- Name: geo_location_country id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_country ALTER COLUMN id SET DEFAULT nextval('geo_location_country_id_seq'::regclass);


--
-- Name: geo_location_state id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_state ALTER COLUMN id SET DEFAULT nextval('geo_adminstrative_area_level_1_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notification ALTER COLUMN id SET DEFAULT nextval('notification_id_seq'::regclass);


--
-- Name: profession id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY profession ALTER COLUMN id SET DEFAULT nextval('profession_id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY tag ALTER COLUMN id SET DEFAULT nextval('tag_id_seq'::regclass);


--
-- Name: user_connection id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_connection ALTER COLUMN id SET DEFAULT nextval('user_connection_id_seq'::regclass);


--
-- Name: user_recommendation id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_recommendation ALTER COLUMN id SET DEFAULT nextval('user_recommendation_id_seq'::regclass);


--
-- Name: user_service id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_service ALTER COLUMN id SET DEFAULT nextval('user_service_id_seq'::regclass);


--
-- Name: user_tag id; Type: DEFAULT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_tag ALTER COLUMN id SET DEFAULT nextval('user_tag_id_seq'::regclass);


--
-- Name: geo_location_city geo_location_city_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_city
    ADD CONSTRAINT geo_location_city_pkey PRIMARY KEY (id);


--
-- Name: geo_location_country geo_location_country_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_country
    ADD CONSTRAINT geo_location_country_pkey PRIMARY KEY (id);


--
-- Name: geo_location geo_location_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location
    ADD CONSTRAINT geo_location_pkey PRIMARY KEY (id);


--
-- Name: geo_location_state geo_location_state_id_pk; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_state
    ADD CONSTRAINT geo_location_state_id_pk PRIMARY KEY (id);


--
-- Name: geo_location_cache location_cache_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_cache
    ADD CONSTRAINT location_cache_pkey PRIMARY KEY (id);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: profession profession_id_pk; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY profession
    ADD CONSTRAINT profession_id_pk PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: user_connection user_connection_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_connection
    ADD CONSTRAINT user_connection_pkey PRIMARY KEY (id);


--
-- Name: user user_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_id_pk PRIMARY KEY (id);


--
-- Name: user_recommendation user_recommendation_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT user_recommendation_pkey PRIMARY KEY (id);


--
-- Name: user_service user_service_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_service
    ADD CONSTRAINT user_service_pkey PRIMARY KEY (id);


--
-- Name: user_tag user_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_tag
    ADD CONSTRAINT user_tag_pkey PRIMARY KEY (id);


--
-- Name: geo_location_city_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_city_id_uindex ON geo_location_city USING btree (id);


--
-- Name: geo_location_country_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_country_id_uindex ON geo_location_country USING btree (id);


--
-- Name: geo_location_country_name_short_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_country_name_short_uindex ON geo_location_country USING btree (short_name);


--
-- Name: geo_location_country_name_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_country_name_uindex ON geo_location_country USING btree (long_name);


--
-- Name: geo_location_formatted_address_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_formatted_address_uindex ON geo_location USING btree (formatted_address);


--
-- Name: geo_location_gpx; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE INDEX geo_location_gpx ON geo_location USING gist (geography(geometry));


--
-- Name: geo_location_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_id_uindex ON geo_location USING btree (id);


--
-- Name: geo_location_spx; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE INDEX geo_location_spx ON geo_location USING gist (geometry);


--
-- Name: geo_location_state_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_state_id_uindex ON geo_location_state USING btree (id);


--
-- Name: geo_location_state_long_name_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_state_long_name_uindex ON geo_location_state USING btree (long_name);


--
-- Name: geo_location_state_short_name_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX geo_location_state_short_name_uindex ON geo_location_state USING btree (short_name);


--
-- Name: location_cache_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX location_cache_id_uindex ON geo_location_cache USING btree (id);


--
-- Name: location_cache_search_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX location_cache_search_uindex ON geo_location_cache USING btree (search);


--
-- Name: name_canonical_idx; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE INDEX name_canonical_idx ON profession USING gin (to_tsvector('ptu'::regconfig, (name_canonical)::text));


--
-- Name: profession_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX profession_id_uindex ON profession USING btree (id);


--
-- Name: profession_name_canonical_normalized_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX profession_name_canonical_normalized_uindex ON profession USING btree (name_canonical_normalized);


--
-- Name: profession_name_canonical_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX profession_name_canonical_uindex ON profession USING btree (name_canonical);


--
-- Name: profession_name_feminine_normalized_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX profession_name_feminine_normalized_uindex ON profession USING btree (name_feminine_normalized);


--
-- Name: profession_name_feminine_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX profession_name_feminine_uindex ON profession USING btree (name_feminine);


--
-- Name: search_canonical_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX search_canonical_idx ON "user" USING gin (to_tsvector('ptu'::regconfig, search_canonical));


--
-- Name: tag_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX tag_id_uindex ON tag USING btree (id);


--
-- Name: tag_name_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX tag_name_uindex ON tag USING btree (name);


--
-- Name: user_connection_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX user_connection_id_uindex ON user_connection USING btree (id);


--
-- Name: user_email_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_email_uindex ON "user" USING btree (email);


--
-- Name: user_name_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_name_uindex ON "user" USING btree (name);


--
-- Name: user_service_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX user_service_id_uindex ON user_service USING btree (id);


--
-- Name: user_tag_id_uindex; Type: INDEX; Schema: public; Owner: aboutdevs
--

CREATE UNIQUE INDEX user_tag_id_uindex ON user_tag USING btree (id);


--
-- Name: geo_location_state geo_location_state_geo_location_country_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY geo_location_state
    ADD CONSTRAINT geo_location_state_geo_location_country_id_fk FOREIGN KEY (geo_location_country_id) REFERENCES geo_location_country(id);


--
-- Name: notification notification_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- Name: user_connection user_connection_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_connection
    ADD CONSTRAINT user_connection_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- Name: user_connection user_connection_user_professional_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_connection
    ADD CONSTRAINT user_connection_user_professional_id_fk FOREIGN KEY (user_professional_id) REFERENCES "user"(id);


--
-- Name: user user_geo_location_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_geo_location_id_fk FOREIGN KEY (geo_location_id) REFERENCES geo_location(id);


--
-- Name: user user_profession_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_profession_id_fk FOREIGN KEY (profession_id) REFERENCES profession(id);


--
-- Name: user_service user_service_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: aboutdevs
--

ALTER TABLE ONLY user_service
    ADD CONSTRAINT user_service_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id);


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

