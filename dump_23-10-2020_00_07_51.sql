--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--





--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md53175bce1d3201d16594cebf9d7eb3f9d';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Gallery_album; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_album" (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    collection boolean NOT NULL,
    thumbnail character varying(60) NOT NULL,
    aspect_h integer NOT NULL,
    aspect_w integer NOT NULL
);


ALTER TABLE public."Gallery_album" OWNER TO postgres;

--
-- Name: Gallery_album_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_album_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_album_id_seq" OWNER TO postgres;

--
-- Name: Gallery_album_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_album_id_seq" OWNED BY public."Gallery_album".id;


--
-- Name: Gallery_album_pictures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_album_pictures" (
    id integer NOT NULL,
    album_id integer NOT NULL,
    photo_id integer NOT NULL
);


ALTER TABLE public."Gallery_album_pictures" OWNER TO postgres;

--
-- Name: Gallery_album_pictures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_album_pictures_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_album_pictures_id_seq" OWNER TO postgres;

--
-- Name: Gallery_album_pictures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_album_pictures_id_seq" OWNED BY public."Gallery_album_pictures".id;


--
-- Name: Gallery_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_category" (
    id integer NOT NULL,
    title character varying(30) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."Gallery_category" OWNER TO postgres;

--
-- Name: Gallery_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_category_id_seq" OWNER TO postgres;

--
-- Name: Gallery_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_category_id_seq" OWNED BY public."Gallery_category".id;


--
-- Name: Gallery_comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_comment" (
    id integer NOT NULL,
    content text NOT NULL,
    censure boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."Gallery_comment" OWNER TO postgres;

--
-- Name: Gallery_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_comment_id_seq" OWNER TO postgres;

--
-- Name: Gallery_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_comment_id_seq" OWNED BY public."Gallery_comment".id;


--
-- Name: Gallery_comment_report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_comment_report" (
    id integer NOT NULL,
    comment_id integer NOT NULL,
    reporte_id integer NOT NULL
);


ALTER TABLE public."Gallery_comment_report" OWNER TO postgres;

--
-- Name: Gallery_comment_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_comment_report_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_comment_report_id_seq" OWNER TO postgres;

--
-- Name: Gallery_comment_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_comment_report_id_seq" OWNED BY public."Gallery_comment_report".id;


--
-- Name: Gallery_photo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_photo" (
    id integer NOT NULL,
    image character varying(100) NOT NULL,
    thumbnail character varying(100) NOT NULL,
    title character varying(30) NOT NULL,
    upload_date timestamp with time zone NOT NULL,
    description character varying(255) NOT NULL,
    approved boolean NOT NULL,
    censure boolean NOT NULL,
    permission character varying(56) NOT NULL,
    aspect_h integer NOT NULL,
    aspect_w integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."Gallery_photo" OWNER TO postgres;

--
-- Name: Gallery_photo_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_photo_category" (
    id integer NOT NULL,
    photo_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public."Gallery_photo_category" OWNER TO postgres;

--
-- Name: Gallery_photo_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_photo_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_photo_category_id_seq" OWNER TO postgres;

--
-- Name: Gallery_photo_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_photo_category_id_seq" OWNED BY public."Gallery_photo_category".id;


--
-- Name: Gallery_photo_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_photo_comments" (
    id integer NOT NULL,
    photo_id integer NOT NULL,
    comment_id integer NOT NULL
);


ALTER TABLE public."Gallery_photo_comments" OWNER TO postgres;

--
-- Name: Gallery_photo_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_photo_comments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_photo_comments_id_seq" OWNER TO postgres;

--
-- Name: Gallery_photo_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_photo_comments_id_seq" OWNED BY public."Gallery_photo_comments".id;


--
-- Name: Gallery_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_photo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_photo_id_seq" OWNER TO postgres;

--
-- Name: Gallery_photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_photo_id_seq" OWNED BY public."Gallery_photo".id;


--
-- Name: Gallery_photo_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_photo_metadata" (
    id integer NOT NULL,
    photo_id integer NOT NULL,
    metadata_id integer NOT NULL
);


ALTER TABLE public."Gallery_photo_metadata" OWNER TO postgres;

--
-- Name: Gallery_photo_metadata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_photo_metadata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_photo_metadata_id_seq" OWNER TO postgres;

--
-- Name: Gallery_photo_metadata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_photo_metadata_id_seq" OWNED BY public."Gallery_photo_metadata".id;


--
-- Name: Gallery_photo_report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_photo_report" (
    id integer NOT NULL,
    photo_id integer NOT NULL,
    reporte_id integer NOT NULL
);


ALTER TABLE public."Gallery_photo_report" OWNER TO postgres;

--
-- Name: Gallery_photo_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_photo_report_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_photo_report_id_seq" OWNER TO postgres;

--
-- Name: Gallery_photo_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_photo_report_id_seq" OWNED BY public."Gallery_photo_report".id;


--
-- Name: Gallery_reporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gallery_reporte" (
    id integer NOT NULL,
    content text NOT NULL,
    resolved boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    type smallint NOT NULL,
    CONSTRAINT "Gallery_reporte_type_check" CHECK ((type >= 0))
);


ALTER TABLE public."Gallery_reporte" OWNER TO postgres;

--
-- Name: Gallery_reporte_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gallery_reporte_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Gallery_reporte_id_seq" OWNER TO postgres;

--
-- Name: Gallery_reporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gallery_reporte_id_seq" OWNED BY public."Gallery_reporte".id;


--
-- Name: MetaData_iptckeyword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MetaData_iptckeyword" (
    id integer NOT NULL,
    name text NOT NULL,
    definition text NOT NULL,
    help_text text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."MetaData_iptckeyword" OWNER TO postgres;

--
-- Name: MetaData_iptckeyword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MetaData_iptckeyword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MetaData_iptckeyword_id_seq" OWNER TO postgres;

--
-- Name: MetaData_iptckeyword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MetaData_iptckeyword_id_seq" OWNED BY public."MetaData_iptckeyword".id;


--
-- Name: MetaData_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MetaData_metadata" (
    id integer NOT NULL,
    value text NOT NULL,
    approved boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    metadata_id integer NOT NULL
);


ALTER TABLE public."MetaData_metadata" OWNER TO postgres;

--
-- Name: MetaData_metadata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MetaData_metadata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MetaData_metadata_id_seq" OWNER TO postgres;

--
-- Name: MetaData_metadata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MetaData_metadata_id_seq" OWNED BY public."MetaData_metadata".id;


--
-- Name: Users_registerlink; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_registerlink" (
    id integer NOT NULL,
    code character varying(256) NOT NULL,
    status smallint NOT NULL,
    user_id integer,
    CONSTRAINT "Users_registerlink_status_check" CHECK ((status >= 0))
);


ALTER TABLE public."Users_registerlink" OWNER TO postgres;

--
-- Name: Users_registerlink_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_registerlink_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_registerlink_id_seq" OWNER TO postgres;

--
-- Name: Users_registerlink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_registerlink_id_seq" OWNED BY public."Users_registerlink".id;


--
-- Name: Users_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_user" (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    email character varying(254) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    birth_date date NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    is_active boolean NOT NULL,
    avatar character varying(100),
    deleted boolean NOT NULL,
    generation character varying(5) NOT NULL,
    user_type smallint NOT NULL,
    rol_type smallint NOT NULL,
    is_staff boolean NOT NULL,
    public_profile boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT "Users_user_rol_type_check" CHECK ((rol_type >= 0)),
    CONSTRAINT "Users_user_user_type_check" CHECK ((user_type >= 0))
);


ALTER TABLE public."Users_user" OWNER TO postgres;

--
-- Name: Users_user_albums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_user_albums" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    album_id integer NOT NULL
);


ALTER TABLE public."Users_user_albums" OWNER TO postgres;

--
-- Name: Users_user_albums_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_user_albums_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_user_albums_id_seq" OWNER TO postgres;

--
-- Name: Users_user_albums_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_user_albums_id_seq" OWNED BY public."Users_user_albums".id;


--
-- Name: Users_user_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_user_comments" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    comment_id integer NOT NULL
);


ALTER TABLE public."Users_user_comments" OWNER TO postgres;

--
-- Name: Users_user_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_user_comments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_user_comments_id_seq" OWNER TO postgres;

--
-- Name: Users_user_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_user_comments_id_seq" OWNED BY public."Users_user_comments".id;


--
-- Name: Users_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_user_groups" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public."Users_user_groups" OWNER TO postgres;

--
-- Name: Users_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_user_groups_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_user_groups_id_seq" OWNER TO postgres;

--
-- Name: Users_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_user_groups_id_seq" OWNED BY public."Users_user_groups".id;


--
-- Name: Users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_user_id_seq" OWNER TO postgres;

--
-- Name: Users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_user_id_seq" OWNED BY public."Users_user".id;


--
-- Name: Users_user_photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_user_photos" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    photo_id integer NOT NULL
);


ALTER TABLE public."Users_user_photos" OWNER TO postgres;

--
-- Name: Users_user_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_user_photos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_user_photos_id_seq" OWNER TO postgres;

--
-- Name: Users_user_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_user_photos_id_seq" OWNED BY public."Users_user_photos".id;


--
-- Name: Users_user_report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_user_report" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    reporte_id integer NOT NULL
);


ALTER TABLE public."Users_user_report" OWNER TO postgres;

--
-- Name: Users_user_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_user_report_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_user_report_id_seq" OWNER TO postgres;

--
-- Name: Users_user_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_user_report_id_seq" OWNED BY public."Users_user_report".id;


--
-- Name: Users_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_user_user_permissions" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public."Users_user_user_permissions" OWNER TO postgres;

--
-- Name: Users_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_user_user_permissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_user_user_permissions_id_seq" OWNER TO postgres;

--
-- Name: Users_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_user_user_permissions_id_seq" OWNED BY public."Users_user_user_permissions".id;


--
-- Name: WebAdmin_contactrequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WebAdmin_contactrequest" (
    id integer NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    phone_number integer NOT NULL,
    email character varying(254) NOT NULL,
    message text NOT NULL,
    resolved boolean NOT NULL,
    email_sent boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    reply text NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."WebAdmin_contactrequest" OWNER TO postgres;

--
-- Name: WebAdmin_contactrequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WebAdmin_contactrequest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."WebAdmin_contactrequest_id_seq" OWNER TO postgres;

--
-- Name: WebAdmin_contactrequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WebAdmin_contactrequest_id_seq" OWNED BY public."WebAdmin_contactrequest".id;


--
-- Name: WebAdmin_landingcaroussel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WebAdmin_landingcaroussel" (
    id integer NOT NULL
);


ALTER TABLE public."WebAdmin_landingcaroussel" OWNER TO postgres;

--
-- Name: WebAdmin_landingcaroussel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WebAdmin_landingcaroussel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."WebAdmin_landingcaroussel_id_seq" OWNER TO postgres;

--
-- Name: WebAdmin_landingcaroussel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WebAdmin_landingcaroussel_id_seq" OWNED BY public."WebAdmin_landingcaroussel".id;


--
-- Name: WebAdmin_landingcaroussel_news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WebAdmin_landingcaroussel_news" (
    id integer NOT NULL,
    landingcaroussel_id integer NOT NULL,
    news_id integer NOT NULL
);


ALTER TABLE public."WebAdmin_landingcaroussel_news" OWNER TO postgres;

--
-- Name: WebAdmin_landingcaroussel_news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WebAdmin_landingcaroussel_news_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."WebAdmin_landingcaroussel_news_id_seq" OWNER TO postgres;

--
-- Name: WebAdmin_landingcaroussel_news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WebAdmin_landingcaroussel_news_id_seq" OWNED BY public."WebAdmin_landingcaroussel_news".id;


--
-- Name: WebAdmin_news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WebAdmin_news" (
    id integer NOT NULL,
    title text NOT NULL,
    subtitle text NOT NULL,
    content text NOT NULL,
    image character varying(100) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."WebAdmin_news" OWNER TO postgres;

--
-- Name: WebAdmin_news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WebAdmin_news_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."WebAdmin_news_id_seq" OWNER TO postgres;

--
-- Name: WebAdmin_news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WebAdmin_news_id_seq" OWNED BY public."WebAdmin_news".id;


--
-- Name: WebAdmin_photorequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WebAdmin_photorequest" (
    id integer NOT NULL,
    reason text NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    identity_document character varying(30) NOT NULL,
    profession character varying(40) NOT NULL,
    address character varying(50) NOT NULL,
    district character varying(40) NOT NULL,
    phone_number character varying(12) NOT NULL,
    email character varying(254) NOT NULL,
    institution character varying(40) NOT NULL,
    resolved boolean NOT NULL,
    approved boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."WebAdmin_photorequest" OWNER TO postgres;

--
-- Name: WebAdmin_photorequest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WebAdmin_photorequest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."WebAdmin_photorequest_id_seq" OWNER TO postgres;

--
-- Name: WebAdmin_photorequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WebAdmin_photorequest_id_seq" OWNED BY public."WebAdmin_photorequest".id;


--
-- Name: WebAdmin_photorequest_photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WebAdmin_photorequest_photos" (
    id integer NOT NULL,
    photorequest_id integer NOT NULL,
    photo_id integer NOT NULL
);


ALTER TABLE public."WebAdmin_photorequest_photos" OWNER TO postgres;

--
-- Name: WebAdmin_photorequest_photos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WebAdmin_photorequest_photos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."WebAdmin_photorequest_photos_id_seq" OWNER TO postgres;

--
-- Name: WebAdmin_photorequest_photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WebAdmin_photorequest_photos_id_seq" OWNED BY public."WebAdmin_photorequest_photos".id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: knox_authtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knox_authtoken (
    digest character varying(128) NOT NULL,
    salt character varying(16) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    expires timestamp with time zone,
    token_key character varying(8) NOT NULL
);


ALTER TABLE public.knox_authtoken OWNER TO postgres;

--
-- Name: thumbnail_kvstore; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thumbnail_kvstore (
    key character varying(200) NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.thumbnail_kvstore OWNER TO postgres;

--
-- Name: Gallery_album id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_album" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_album_id_seq"'::regclass);


--
-- Name: Gallery_album_pictures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_album_pictures" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_album_pictures_id_seq"'::regclass);


--
-- Name: Gallery_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_category" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_category_id_seq"'::regclass);


--
-- Name: Gallery_comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_comment" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_comment_id_seq"'::regclass);


--
-- Name: Gallery_comment_report id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_comment_report" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_comment_report_id_seq"'::regclass);


--
-- Name: Gallery_photo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_photo_id_seq"'::regclass);


--
-- Name: Gallery_photo_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_category" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_photo_category_id_seq"'::regclass);


--
-- Name: Gallery_photo_comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_comments" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_photo_comments_id_seq"'::regclass);


--
-- Name: Gallery_photo_metadata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_metadata" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_photo_metadata_id_seq"'::regclass);


--
-- Name: Gallery_photo_report id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_report" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_photo_report_id_seq"'::regclass);


--
-- Name: Gallery_reporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_reporte" ALTER COLUMN id SET DEFAULT nextval('public."Gallery_reporte_id_seq"'::regclass);


--
-- Name: MetaData_iptckeyword id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MetaData_iptckeyword" ALTER COLUMN id SET DEFAULT nextval('public."MetaData_iptckeyword_id_seq"'::regclass);


--
-- Name: MetaData_metadata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MetaData_metadata" ALTER COLUMN id SET DEFAULT nextval('public."MetaData_metadata_id_seq"'::regclass);


--
-- Name: Users_registerlink id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_registerlink" ALTER COLUMN id SET DEFAULT nextval('public."Users_registerlink_id_seq"'::regclass);


--
-- Name: Users_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user" ALTER COLUMN id SET DEFAULT nextval('public."Users_user_id_seq"'::regclass);


--
-- Name: Users_user_albums id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_albums" ALTER COLUMN id SET DEFAULT nextval('public."Users_user_albums_id_seq"'::regclass);


--
-- Name: Users_user_comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_comments" ALTER COLUMN id SET DEFAULT nextval('public."Users_user_comments_id_seq"'::regclass);


--
-- Name: Users_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_groups" ALTER COLUMN id SET DEFAULT nextval('public."Users_user_groups_id_seq"'::regclass);


--
-- Name: Users_user_photos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_photos" ALTER COLUMN id SET DEFAULT nextval('public."Users_user_photos_id_seq"'::regclass);


--
-- Name: Users_user_report id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_report" ALTER COLUMN id SET DEFAULT nextval('public."Users_user_report_id_seq"'::regclass);


--
-- Name: Users_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_user_permissions" ALTER COLUMN id SET DEFAULT nextval('public."Users_user_user_permissions_id_seq"'::regclass);


--
-- Name: WebAdmin_contactrequest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_contactrequest" ALTER COLUMN id SET DEFAULT nextval('public."WebAdmin_contactrequest_id_seq"'::regclass);


--
-- Name: WebAdmin_landingcaroussel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_landingcaroussel" ALTER COLUMN id SET DEFAULT nextval('public."WebAdmin_landingcaroussel_id_seq"'::regclass);


--
-- Name: WebAdmin_landingcaroussel_news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_landingcaroussel_news" ALTER COLUMN id SET DEFAULT nextval('public."WebAdmin_landingcaroussel_news_id_seq"'::regclass);


--
-- Name: WebAdmin_news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_news" ALTER COLUMN id SET DEFAULT nextval('public."WebAdmin_news_id_seq"'::regclass);


--
-- Name: WebAdmin_photorequest id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_photorequest" ALTER COLUMN id SET DEFAULT nextval('public."WebAdmin_photorequest_id_seq"'::regclass);


--
-- Name: WebAdmin_photorequest_photos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_photorequest_photos" ALTER COLUMN id SET DEFAULT nextval('public."WebAdmin_photorequest_photos_id_seq"'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Data for Name: Gallery_album; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_album" (id, name, description, created_at, updated_at, collection, thumbnail, aspect_h, aspect_w) FROM stdin;
2	Corrida beauchef	Todos los años se realiza la corrida beauchef al rededor del parque O'higgins. Esta actividad es organizada por el CDI.	2020-06-28 21:47:58+00	2020-06-28 21:47:58+00	t	/media/c80647fd27f84ff39b057596dae8ac80_thumbnail.jpg	1	1
1	Robotica en el AMTC	Equipo de robotica que se prepara todos los años para competir a nivel internacional.	2020-06-28 21:31:14+00	2020-06-28 21:31:14+00	t	/media/560ccaaec6584b3aaa6a17419d71c392_thumbnail.jpg	2048	1357
4	Juegos de Rol	Algunas fotos de la comunidad de juegos de rol de mesa de beauchef	2020-06-28 22:15:50.682795+00	2020-06-28 22:15:50.682802+00	f	/media/0808826ad9b7444daa3e517569b79f6a_thumbnail.jpeg	9	16
5	Antiguo campus	Estas fotos las tome cuando iba a la universidad	2020-06-28 22:40:21.692215+00	2020-06-28 22:40:21.692221+00	f	/media/ebee9db357a248569165a595f0d83ca3_thumbnail.jpg	3	4
3	Premios nacionales	Nuestros profesores más destacados y académicos de nivel mundial	2020-06-28 22:07:32+00	2020-06-28 22:07:32+00	t	/media/744e4a5b7aaa4a9ba6868837490fa369_thumbnail.jpg	1	1
6	La primera patita 2018	Celebración de fiestas patrias en Beauchef, 2018	2020-06-29 21:28:29.544045+00	2020-06-29 21:28:29.544057+00	f	/media/5ffb6a0471e84882acf48509619cbf62_thumbnail.jpg	1	1
7	Decanos		2020-06-30 00:15:11+00	2020-06-30 00:15:11+00	t	/media/fb8869d8797c425a9628892e56efafae_thumbnail.jpeg	1	1
8	Conceptos de Beauchef 851	Antes de que beauchef 851 fuera realidad, los ingenieros imaginaron el futuro.	2020-06-30 00:18:18+00	2020-06-30 00:18:18+00	t	/media/888f29c387bf44b5a50501ad25ce340a_thumbnail.jpg	1	1
9	Fotos de mi abuelo		2020-07-01 03:00:54+00	2020-07-01 03:00:54+00	f	/media/5771ffbb7e6f4e0f830ccfdccf54b99a_thumbnail.jpg	267	398
\.


--
-- Data for Name: Gallery_album_pictures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_album_pictures" (id, album_id, photo_id) FROM stdin;
1	1	37
2	1	38
3	1	39
4	1	40
5	1	41
6	1	42
7	1	43
8	1	44
9	1	45
10	2	32
11	2	33
12	2	34
13	2	35
14	2	36
15	2	27
16	2	28
17	2	29
18	2	30
19	2	31
20	3	46
21	3	47
22	3	48
23	3	49
24	3	50
25	3	51
26	3	52
27	3	53
28	3	54
29	3	55
30	3	56
31	4	68
32	4	69
33	4	70
34	4	71
35	4	72
36	4	73
37	5	75
38	5	76
39	5	77
40	6	80
41	6	81
42	6	82
43	6	83
44	6	84
45	6	85
46	6	86
47	6	87
48	6	88
49	6	89
50	7	105
51	7	106
52	7	107
53	7	108
54	7	109
55	7	110
56	7	111
57	7	112
58	7	113
59	7	114
60	7	115
61	7	116
62	7	117
63	7	118
64	7	119
68	8	94
69	8	91
70	8	93
71	8	95
72	9	120
\.


--
-- Data for Name: Gallery_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_category" (id, title, created_at, updated_at) FROM stdin;
1	Beauchef 851	2020-03-24 22:23:25.584847+00	2020-03-24 22:23:25.584854+00
2	Beauchef 850	2020-03-24 22:23:55.829869+00	2020-03-24 22:23:55.829874+00
3	Movilizaciones	2020-03-24 22:24:22.018749+00	2020-03-24 22:24:22.018754+00
5	Deporte	2020-06-28 21:49:04.512081+00	2020-06-28 21:49:04.512087+00
6	Académicos	2020-06-29 22:11:46.204477+00	2020-06-29 22:11:46.204483+00
7	Movilizaciones estudiantiles	2020-06-29 22:13:29.685286+00	2020-06-29 22:13:29.685291+00
8	Fotos Históricas	2020-06-29 22:13:48.724709+00	2020-06-29 22:13:48.724714+00
9	Decanos	2020-07-01 16:06:04.061425+00	2020-07-01 16:06:04.061431+00
\.


--
-- Data for Name: Gallery_comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_comment" (id, content, censure, created_at, updated_at) FROM stdin;
7	qué bacanes eran las salas	f	2020-06-28 22:45:10.763918+00	2020-06-28 22:45:10.763923+00
17	Qué entretenidas eran las clases de zumba!	f	2020-06-28 22:48:27.595084+00	2020-06-28 22:48:27.595089+00
18	Secas! Bravooooooooo	f	2020-06-28 22:48:46.239747+00	2020-06-28 22:48:46.239752+00
19	súper importante elongar antes y después de la corrida	f	2020-06-28 22:49:11.586419+00	2020-06-28 22:49:11.586424+00
20	me gustaría tener una de esas medallas jaja	f	2020-06-28 22:49:35.76749+00	2020-06-28 22:49:35.767508+00
21	Nicanor Parra, un grande. Jamás me hubiese imaginado que pasó por la Escuela.	f	2020-06-28 22:49:36.04293+00	2020-06-28 22:49:36.042935+00
22	wow nunca había visto eso	f	2020-06-28 22:49:54.91514+00	2020-06-28 22:49:54.915145+00
23	qué genial debe haber sido ser alumna de nicanor	f	2020-06-28 22:50:25.017401+00	2020-06-28 22:50:25.017406+00
24	me encanta cómo se ve de noche 851	f	2020-06-28 22:50:54.715907+00	2020-06-28 22:50:54.715913+00
26	Los cursos de la edv son super entretenidos, ojalá vuelvan a impartirlos.	f	2020-06-28 22:51:59.531516+00	2020-06-28 22:51:59.531521+00
27	extraño la piscina, tengo muchas ganas de nadar :(	f	2020-06-28 22:52:19.154369+00	2020-06-28 22:52:19.154374+00
28	Esa foto es de verdad? o esta editada?	f	2020-06-28 22:53:11.707441+00	2020-06-28 22:53:11.707446+00
29	Precioso en todo caso	f	2020-06-28 22:53:18.650078+00	2020-06-28 22:53:18.650083+00
30	Qué es seco el profe maza! siempre lo veo en la tele, me encanta!	f	2020-06-28 22:54:24.643086+00	2020-06-28 22:54:24.643091+00
31	Oye igual cuatico que pasen esa cosas en una institución publica :/	f	2020-06-28 22:55:01.565726+00	2020-06-28 22:55:01.565731+00
32	El apunte de este profe es bastante bueno, siempre lo recomiendo.	f	2020-06-28 22:55:21.585101+00	2020-06-28 22:55:21.585106+00
33	La mona jaja, en realidad nadie sabe por qué esta ahí.	f	2020-06-28 22:55:50.105022+00	2020-06-28 22:55:50.105027+00
34	Mi abuelo estuvo ahí cuando la pusieron	f	2020-06-28 22:56:24.664379+00	2020-06-28 22:56:24.664384+00
35	Recuerdo que el profe Brieva hablada de él, y siempre lo mencionaba con mucho cariño. Me hubiese gustado conocerlo.	f	2020-06-28 22:56:33.451866+00	2020-06-28 22:56:33.451872+00
36	Me pregunto si todos los estudiantes tiene acceso a esos laboratorios o solo los estudiantes de magíster.	f	2020-06-28 22:57:07.348024+00	2020-06-28 22:57:07.348029+00
37	Esto es del departamento de física?	f	2020-06-28 22:57:46.455018+00	2020-06-28 22:57:46.455023+00
38	Qué bello el atardecer, sabían que ese fenómeno se llama dispersión de Rayleigh? Me parece fascinante.	f	2020-06-28 22:57:52.796465+00	2020-06-28 22:57:52.796471+00
39	Servet! un gran matemático.	f	2020-06-28 22:58:08.454049+00	2020-06-28 22:58:08.454054+00
40	Estan iguales o no jaja	f	2020-06-28 22:58:31.068596+00	2020-06-28 22:58:31.068601+00
41	Qué entretenido!	f	2020-06-28 22:59:01.403019+00	2020-06-28 22:59:01.403024+00
42	Esta foto me parece que es de la competencia de hace 10 años	f	2020-06-28 22:59:04.422627+00	2020-06-28 22:59:04.422632+00
43	Y como tomaron esta foto? Con el dron del AMTC?	f	2020-06-28 22:59:32.117053+00	2020-06-28 22:59:32.117058+00
44	Imagina los avances que se logran hoy en computacion social	f	2020-06-29 20:29:36.351903+00	2020-06-29 20:29:36.351909+00
45	Qué entrete!	f	2020-06-29 21:31:38.651183+00	2020-06-29 21:31:38.651188+00
46	Lástima que este año no habrá celebración del 18 :(	f	2020-06-29 21:32:10.495423+00	2020-06-29 21:32:10.495428+00
47	Wow yo recuerdo haber estado ahí	f	2020-06-29 21:33:27.60451+00	2020-06-29 21:33:27.604515+00
48	Sería bacán que hicieran unas clases intensivas de baile, me gustaría aprender a bailar cueca y otros bailes típicos.	f	2020-06-29 21:34:02.931538+00	2020-06-29 21:34:02.931543+00
49	Me pregunto si eso estará disponible para exhibición en la facultad	f	2020-06-29 21:35:50.655173+00	2020-06-29 21:35:50.655179+00
50	Jajaja no, eso me parece hall sur. Ahora tiene alfombra y la distribución de las mesas es diferente.	f	2020-06-29 21:36:55.117911+00	2020-06-29 21:36:55.117916+00
51	Y quién organiza estas actividades, tengo ideas para el próximo año.	f	2020-06-29 21:48:47.452536+00	2020-06-29 21:48:47.452542+00
52	Qué genial, en ese entonces no habían tantas casas y contaminación lumínica como ahora.	f	2020-06-29 21:51:12.065051+00	2020-06-29 21:51:12.065056+00
1	Wow! Es la mona, el clásico lugar de encuentro jajaja	f	2020-06-28 22:38:41+00	2020-05-12 22:38:41+00
2	Ohhh yo recuerdo cuando computación tenía muchos pisos en ese edifcio!	f	2020-05-12 22:41:35+00	2020-06-28 22:41:35+00
3	Efectivamente, antes trabajamos con Terminales físicas conectadas al MainFrame para calcular	f	2020-05-12 22:42:07+00	2020-06-28 22:42:07+00
4	No se realizaban tantas actividades cuando estaba estudiando. Eramos mas dedicados.	f	2020-05-13 22:42:42+00	2020-06-28 22:42:42+00
5	Yo tuve clases con él cuando tomé el electivo de astronomía general. Que bueno que sigue ejerciendo.	f	2020-06-28 22:44:06+00	2020-05-12 22:44:06+00
6	Oye esa foto la tomé yo! la sacaste de Flickr ???	f	2020-05-13 22:45:00+00	2020-06-28 22:45:00+00
8	recuerdo que fue mi profesor	f	2020-05-13 22:45:35+00	2020-06-28 22:45:35+00
9	muy simpático Mario, siempre dispuesto a resolver dudas.	f	2020-05-13 22:45:55+00	2020-06-28 22:45:55+00
10	Seca!	f	2020-05-13 22:46:09+00	2020-06-28 22:46:09+00
11	Mi abuelo es el de más a la derecha en la fila de al medio. Aún siendo joven es reconocible!	f	2020-05-13 22:46:41+00	2020-06-28 22:46:41+00
12	Recuerdo las clases de Mecánica Estadística, al profe le encataba comentar datos interesantes sobre la materia.	f	2020-05-13 22:46:51+00	2020-06-28 22:46:51+00
13	qué bonitos	f	2020-05-24 22:47:11+00	2020-06-28 22:47:11+00
14	cuándo se repetirá esta actividad?	f	2020-05-24 22:47:25+00	2020-06-28 22:47:25+00
15	Increible como ha evolucionado la técnologia ...	f	2020-05-24 22:47:42+00	2020-06-28 22:47:42+00
16	ojalá haya feria del postulante este año :(	f	2020-05-24 22:47:54+00	2020-06-28 22:47:54+00
\.


--
-- Data for Name: Gallery_comment_report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_comment_report" (id, comment_id, reporte_id) FROM stdin;
1	21	7
2	44	8
3	7	9
4	41	12
\.


--
-- Data for Name: Gallery_photo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_photo" (id, image, thumbnail, title, upload_date, description, approved, censure, permission, aspect_h, aspect_w, created_at, updated_at) FROM stdin;
13	dda51e8485a146d2a6984143b77e0aeb.jpg	dda51e8485a146d2a6984143b77e0aeb_thumbnail.jpg	Foto N-10 subida el 14-3-2020	2012-12-12 03:00:00+00	Mechoneos  del 2015	t	f	CC BY	3	4	2020-03-14 15:44:01.440659+00	2020-03-14 15:44:01.440666+00
28	da6ac1a49e38432b865974b3eee02695.jpg	da6ac1a49e38432b865974b3eee02695_thumbnail.jpg	Entrega de números	2019-11-15 03:00:00+00	Participanted de la corrida recogiendo su número.	t	f	CC BY	533	800	2020-06-28 21:26:29+00	2020-06-28 21:26:29+00
66	6603bb53d2f64b77bd863f0708bdb4d1.jpg	6603bb53d2f64b77bd863f0708bdb4d1_thumbnail.jpg	Clases de Nicanor	1960-12-12 04:00:00+00	Nicanor Parra impartiendo clases en la FCFM.	t	f	CC BY	83	125	2020-05-13 22:10:34+00	2020-06-28 22:10:34+00
8	61b0e8efda724ead8006c96d57507416.jpg	61b0e8efda724ead8006c96d57507416_thumbnail.jpg	Foto N-5 subida el 14-3-2020	2012-12-12 03:00:00+00	Salas de 851	t	f	CC BY	53	80	2020-03-14 15:43:56.65861+00	2020-03-14 15:43:56.658617+00
9	e9d5bb22a0e34aaa8cd38ba78baf7bd4.jpg	e9d5bb22a0e34aaa8cd38ba78baf7bd4_thumbnail.jpg	Foto N-6 subida el 14-3-2020	2012-12-12 03:00:00+00	Piscina de 851	t	f	CC BY	53	80	2020-03-14 15:43:57.248741+00	2020-03-14 15:43:57.248748+00
4	b09846d998214a5fa6693de477d1bac7.jpg	b09846d998214a5fa6693de477d1bac7_thumbnail.jpg	Foto N-1 subida el 14-3-2020	2012-12-12 03:00:00+00	Calán hace años	t	f	CC BY	1459	1458	2020-03-14 15:43:53.634965+00	2020-03-14 15:43:53.634972+00
29	53af62f56c744ebcbdbfa18e12ae86c8.jpg	53af62f56c744ebcbdbfa18e12ae86c8_thumbnail.jpg	Participantes de la corrida	2019-11-15 03:00:00+00	Participantes de la corrida reunidos para la premiación.	t	f	CC BY	533	800	2020-06-28 21:26:30+00	2020-06-28 21:26:30+00
15	df6533d629ac44a7b9650befe1386cdd.jpg	df6533d629ac44a7b9650befe1386cdd_thumbnail.jpg	Foto N-12 subida el 14-3-2020	2012-12-12 03:00:00+00	Ceremonias	t	f	CC BY	81	128	2020-03-14 15:44:03.720803+00	2020-03-14 15:44:03.72081+00
11	3a2f2cf8b1094c3b844ffcffc64904b0.jpg	3a2f2cf8b1094c3b844ffcffc64904b0_thumbnail.jpg	Foto N-8 subida el 14-3-2020	2012-12-12 03:00:00+00	Toma feminista 2019	t	f	CC BY	3	4	2020-03-14 15:43:59.388777+00	2020-03-14 15:43:59.388784+00
10	b4116317c0994f9c8360fda8be85c664.jpg	b4116317c0994f9c8360fda8be85c664_thumbnail.jpg	Foto N-7 subida el 14-3-2020	2012-12-12 03:00:00+00	Canchas del -3	t	f	CC BY	53	80	2020-03-14 15:43:58.372869+00	2020-03-14 15:43:58.372876+00
14	52273478abeb4bfea25bc07e0a004b26.jpeg	52273478abeb4bfea25bc07e0a004b26_thumbnail.jpeg	Foto N-11 subida el 14-3-2020	2012-12-12 03:00:00+00	Escuela de verano	t	f	CC BY	533	800	2020-03-14 15:44:02.301662+00	2020-03-14 15:44:02.301669+00
5	9b2063fcc60847978ecc6978da31b847.jpg	9b2063fcc60847978ecc6978da31b847_thumbnail.jpg	Injenieria	2012-12-12 03:00:00+00	Frontis de beauchef	t	t	CC BY	4	3	2020-03-14 15:43:54.068853+00	2020-07-11 14:47:19.37122+00
24	9e5ef45c2db64db49d8bc2d83b1a6ae3.jpeg	9e5ef45c2db64db49d8bc2d83b1a6ae3_thumbnail.jpeg	Nicanor	2012-12-12 03:00:00+00	Clases Humanistas de estudios antipoeticos por Nicanor Parra	t	f	CC BY	473	710	2020-03-14 15:44:12+00	2020-03-14 15:44:12+00
18	8cb6e54de66145c78274e1823384ed17.jpg	8cb6e54de66145c78274e1823384ed17_thumbnail.jpg	Foto N-15 subida el 14-3-2020	2012-12-12 03:00:00+00	Foto artística	t	f	CC BY	169	350	2020-03-14 15:44:06.297267+00	2020-03-14 15:44:06.297274+00
12	63b234550f3d4ce2bdb538b4b54e5b43.jpeg	63b234550f3d4ce2bdb538b4b54e5b43_thumbnail.jpeg	Foto N-9 subida el 14-3-2020	2012-12-12 03:00:00+00	Salas de clases	t	f	CC BY	61	92	2020-03-14 15:44:00.058316+00	2020-03-14 15:44:00.058321+00
32	0b78cd7f7f17437d8cebbd3e7051d045.jpg	0b78cd7f7f17437d8cebbd3e7051d045_thumbnail.jpg	Corrida beauchef	2019-11-15 03:00:00+00	Participantes reunidos después de la corrida.	t	f	CC BY	533	800	2020-06-28 21:26:33+00	2020-06-28 21:26:33+00
17	c4624cc54c874e87b9ba3a0cbb9a49db.jpg	c4624cc54c874e87b9ba3a0cbb9a49db_thumbnail.jpg	Foto N-14 subida el 14-3-2020	2012-12-12 03:00:00+00	Auditorio d'etigny	t	f	CC BY	683	1024	2020-03-14 15:44:05.143166+00	2020-03-14 15:44:05.143172+00
23	9997da5c2bdf46ffb6ccde5406b1ff89.jpg	9997da5c2bdf46ffb6ccde5406b1ff89_thumbnail.jpg	Foto N-20 subida el 14-3-2020	2012-12-12 03:00:00+00	Competencias	t	f	CC BY	3	4	2020-03-14 15:44:11.353054+00	2020-03-14 15:44:11.353061+00
26	dc82d92ed41e42e59720fc4d85e84788.JPG	dc82d92ed41e42e59720fc4d85e84788_thumbnail.JPG	Cumpleaños con amigos	2020-03-03 03:00:00+00	Foto foto foto	f	f	CC BY	3	4	2020-03-24 22:53:17+00	2020-07-01 03:28:42.46515+00
22	892bb7a186a647ea9e6e10ae89be5452.jpg	892bb7a186a647ea9e6e10ae89be5452_thumbnail.jpg	Foto N-19 subida el 14-3-2020	2012-12-12 03:00:00+00	escuela de verano	t	f	CC BY	4	3	2020-03-14 15:44:10.509067+00	2020-03-14 15:44:10.509074+00
2	7f658686a23e4ca5be6d5ba2aa79556c.JPG	7f658686a23e4ca5be6d5ba2aa79556c_thumbnail.JPG	Foto N-1 subida el 14-3-2020	2020-03-19 03:00:00+00	Los cabros	f	f	CC BY	3	4	2020-03-14 15:19:23.11034+00	2020-06-28 20:58:08.49571+00
7	34109c9dbe5f43098e5cd7d5cc78e134.jpg	34109c9dbe5f43098e5cd7d5cc78e134_thumbnail.jpg	Foto N-4 subida el 14-3-2020	2012-12-12 03:00:00+00	Frontis 851	t	f	CC BY	1	1	2020-03-14 15:43:55.036841+00	2020-03-14 15:43:55.036847+00
3	9154effe322d4f2f9f969f90d837d308.JPG	9154effe322d4f2f9f969f90d837d308_thumbnail.JPG	Estuvo bueno el cumpleaños	2020-03-19 03:00:00+00	Una bonita jornada con los amigos	f	f	CC BY-NC	3	4	2020-03-14 15:19:30.115274+00	2020-06-28 20:58:17.248372+00
19	596d9023423049a2af5661e8ac8ba4cb.jpg	596d9023423049a2af5661e8ac8ba4cb_thumbnail.jpg	Foto N-16 subida el 14-3-2020	2012-12-12 03:00:00+00	Foto histórica	t	f	CC BY	63	100	2020-03-14 15:44:07.305294+00	2020-03-14 15:44:07.305301+00
6	1b2d13df6f3a46c0931902ba40436555.jpg	1b2d13df6f3a46c0931902ba40436555_thumbnail.jpg	Foto N-2 subida el 14-3-2020	2012-12-12 03:00:00+00	Escalera de caracol	t	f	CC BY	100	151	2020-03-14 15:43:54.192145+00	2020-03-14 15:43:54.192151+00
30	be5cf360d8934f1eb7013958fac2b47f.jpg	be5cf360d8934f1eb7013958fac2b47f_thumbnail.jpg	Precalentamiento	2019-11-15 03:00:00+00	Elongación previa al inicio de la corrida.	t	f	CC BY	533	800	2020-06-28 21:26:31+00	2020-06-28 21:26:31+00
1	5ac3ba4248fc4d7cae6762a9c300a85e.JPG	5ac3ba4248fc4d7cae6762a9c300a85e_thumbnail.JPG	Foto N-2 subida el 14-3-2020	2020-03-19 03:00:00+00	Mis amigos en Concepcion	f	t	CC BY	3	4	2020-03-14 15:19:16.425855+00	2020-07-11 14:46:54.638485+00
25	f32d41d943cc4ea7aacbe0be98a85822.jpg	f32d41d943cc4ea7aacbe0be98a85822_thumbnail.jpg	Foto N-22 subida el 14-3-2020	2012-12-12 03:00:00+00	Foto panorámica	t	f	CC BY	53	80	2020-03-14 15:44:13.672848+00	2020-03-14 15:44:13.672855+00
16	d13fff451c124434ae830f877271bc49.jpeg	d13fff451c124434ae830f877271bc49_thumbnail.jpeg	Foto N-13 subida el 14-3-2020	2012-12-12 03:00:00+00	Toma feminista	t	f	CC BY	14	25	2020-03-14 15:44:04.101263+00	2020-03-14 15:44:04.101268+00
20	ac2f5dbb2adf4806beb0dcb717c8817f.jpg	ac2f5dbb2adf4806beb0dcb717c8817f_thumbnail.jpg	Foto N-17 subida el 14-3-2020	2012-12-12 03:00:00+00	Auditorio d'etigny de noche	t	f	CC BY	683	1024	2020-03-14 15:44:08.316988+00	2020-03-14 15:44:08.316995+00
34	c0743f7ca7924573945bddb3c74625c3.jpg	c0743f7ca7924573945bddb3c74625c3_thumbnail.jpg	Premiación hombres 2019	2019-11-15 03:00:00+00	Premiación de primer, segundo y tercer lugar de la corrida beauchef en categoría varones.	t	f	CC BY	533	800	2020-06-28 21:26:36+00	2020-06-28 21:26:36+00
31	37c58d7b5409475aa9b61089f0a931a6.jpg	37c58d7b5409475aa9b61089f0a931a6_thumbnail.jpg	Corrida beauchef	2019-11-15 03:00:00+00	Primera estudiante en completar el recorrido.	t	f	CC BY	533	800	2020-06-28 21:26:32+00	2020-06-28 21:26:32+00
21	3bd2b2c030e44f8195e44592b0101394.jpg	3bd2b2c030e44f8195e44592b0101394_thumbnail.jpg	Foto N-18 subida el 14-3-2020	2012-12-12 03:00:00+00	foto histórica	t	f	CC BY	86	135	2020-03-14 15:44:09.438991+00	2020-03-14 15:44:09.438998+00
33	1e4ad1a6a1b3425dafde4715659e4c37.jpg	1e4ad1a6a1b3425dafde4715659e4c37_thumbnail.jpg	Premiación corrida 2019	2019-11-15 03:00:00+00	Premiación de primer, segundo y tercer lugar de la corrida beauchef en categoría damas.	t	f	CC BY	533	800	2020-06-28 21:26:34+00	2020-06-28 21:26:34+00
42	90aa4a3eec2d46c1bcb63f4574159cc9.jpg	90aa4a3eec2d46c1bcb63f4574159cc9_thumbnail.jpg	Equipo Robots Nao	2020-06-22 04:00:00+00	RoboticaRobotica	t	f	CC BY-SA	667	1000	2020-06-28 21:31:08+00	2020-06-28 21:31:08+00
43	13a050de7d80472d8e9fd470f73f80a9.jpg	13a050de7d80472d8e9fd470f73f80a9_thumbnail.jpg	NAOs y visión	2020-06-22 04:00:00+00	Los NAOs cuentan con un sistema de dos cámaras para navegar por el entorno. Sin embargo el programa debe ser escrito por los equipos utilizando los últimos avances de inteligencia computacional.	t	f	CC BY-SA	667	1000	2020-06-28 21:31:09.284583+00	2020-06-28 21:46:17.441022+00
58	dd89b2db05e04cb88ab7ee848ebfa52e.jpg	dd89b2db05e04cb88ab7ee848ebfa52e_thumbnail.jpg	Generaciones pasadas	1960-12-12 04:00:00+00	Generación del 60'.	t	f	CC BY	3	4	2020-05-13 22:10:29+00	2020-06-28 22:10:29+00
47	c8501f841dc74442bd07139670343064.jpg	c8501f841dc74442bd07139670343064_thumbnail.jpg	Foto N-1 subida el 28-6-2020	1990-10-10 03:00:00+00	Carlos Conca.	t	f	CC BY	1000	667	2020-06-28 21:37:54.306416+00	2020-06-28 21:37:54.306423+00
49	6fa7a1b0f2e6472c82ecd6777e88fc49.jpg	6fa7a1b0f2e6472c82ecd6777e88fc49_thumbnail.jpg	Foto N-3 subida el 28-6-2020	1990-10-10 03:00:00+00	Eric Goles	t	f	CC BY	1000	667	2020-06-28 21:37:54.507839+00	2020-06-28 21:37:54.507846+00
39	0ea729dc4310496a9d7157d46a172a2e.jpg	0ea729dc4310496a9d7157d46a172a2e_thumbnail.jpg	Pepper	2020-06-22 04:00:00+00	Pepper es uno de los nuevos robots que se unen a la familia del AMTC. Contando con mecanismos más modernos suele ser el más atractivo para los niños.	t	f	CC BY-SA	3	4	2020-06-28 21:31:05.22079+00	2020-06-28 21:47:34.27372+00
45	e9ad4ba3b181482785322d75f1192381.jpg	e9ad4ba3b181482785322d75f1192381_thumbnail.jpg	Equipo de NAOs	2020-06-22 04:00:00+00	El AMTC tiene un equipo de robot NAO que participa activamente en la competencia mundial de futbol robotico. En el año 2015 ganarón el 3er lugar compitiendo contra Alemania.	t	f	CC BY-SA	667	1000	2020-06-28 21:31:11.240934+00	2020-06-28 21:40:57.350309+00
57	4312d5f4e78545e292da9dbdcfff6864.jpg	4312d5f4e78545e292da9dbdcfff6864_thumbnail.jpg	Foto N-2 subida el 28-6-2020	1960-12-12 04:00:00+00	Cerro Calán en sus inicios.	t	f	CC BY	1459	1458	2020-06-28 22:10:29.257015+00	2020-06-28 22:10:29.257023+00
62	a95627965c3749dba5ee1041f46782c2.jpg	a95627965c3749dba5ee1041f46782c2_thumbnail.jpg		1960-12-12 04:00:00+00	Hall sur zócalo.	t	f	CC BY	589	826	2020-05-13 22:10:30+00	2020-06-28 22:10:30+00
52	13ca80e08d004a00bf028cfa0ca84f58.jpg	13ca80e08d004a00bf028cfa0ca84f58_thumbnail.jpg	Manuel del Pino	1990-10-10 03:00:00+00	Manuel del Pino.	t	f	CC BY	1000	667	2020-05-13 21:37:57+00	2020-06-28 21:37:57+00
54	a559d3132eac4c60998f54042574fd50.jpg	a559d3132eac4c60998f54042574fd50_thumbnail.jpg	Foto N-9 subida el 28-6-2020	1990-10-10 03:00:00+00	Mario Hamuy.	t	f	CC BY	1000	667	2020-06-28 21:38:00.708019+00	2020-06-28 21:38:00.708026+00
38	89bb039eccb24924b836bc9bf50bd57c.jpg	89bb039eccb24924b836bc9bf50bd57c_thumbnail.jpg	Comite de revision NAOs	2020-06-22 04:00:00+00	Antes de partir a competir los equipos exponen frente a un comité de al menos 3 profesores para prevenir cualquier falla técnica.	t	f	CC BY-SA	681	1024	2020-06-28 21:31:04.238952+00	2020-06-28 21:33:20.745979+00
37	560ccaaec6584b3aaa6a17419d71c392.jpg	560ccaaec6584b3aaa6a17419d71c392_thumbnail.jpg	Primer Dron del AMTC	2020-06-22 04:00:00+00	En el año 2010 se construyó un dron a control remoto como uno de las tesis financiadas por el AMTC. Esto antes de que existieran opciones comerciales	t	f	CC BY-SA	2048	1357	2020-06-28 21:31:04.173321+00	2020-06-28 21:34:52.39819+00
40	1546cfa98eb7470baba6184e256e59ad.jpg	1546cfa98eb7470baba6184e256e59ad_thumbnail.jpg	Feria del postulante: robotica	2020-06-22 04:00:00+00	Durante la feria del postulante, y otros eventos de presentacion, el AMTC muestra los robot a los futuros mechones y a la prensa.	t	f	CC BY-SA	531	800	2020-06-28 21:31:06.197266+00	2020-06-28 21:43:49.391607+00
51	2de80d2d62c3441f82299231537c8a05.jpg	2de80d2d62c3441f82299231537c8a05_thumbnail.jpg	Foto N-6 subida el 28-6-2020	1990-10-10 03:00:00+00	Juan Asenjo.	t	f	CC BY	1000	667	2020-06-28 21:37:56.329241+00	2020-06-28 21:37:56.32925+00
60	c755ded07fab42b987a2cb9c9b7ac978.jpg	c755ded07fab42b987a2cb9c9b7ac978_thumbnail.jpg		1960-12-12 04:00:00+00	Intrumentación experimental.	t	f	CC BY	589	834	2020-05-13 22:10:29+00	2020-06-28 22:10:29+00
46	578bd966bd8844a9b5e35971dd800cbf.jpg	578bd966bd8844a9b5e35971dd800cbf_thumbnail.jpg	Foto N-2 subida el 28-6-2020	1990-10-10 03:00:00+00	Enrique Tirapegui.	t	f	CC BY	1000	667	2020-06-28 21:37:53.590945+00	2020-06-28 21:37:53.590952+00
35	5bb1f0ae9dd545b092e7a6c051622816.jpg	5bb1f0ae9dd545b092e7a6c051622816_thumbnail.jpg	Primer lugar femenino 2019	2019-11-15 03:00:00+00	Ganadora junto a su medalla obtenida tras completar el recorrido en el menor tiempo.	t	f	CC BY	533	800	2020-06-28 21:26:38+00	2020-06-28 21:26:38+00
48	2f9ff26dbc954feea15efb85c87514bd.jpg	2f9ff26dbc954feea15efb85c87514bd_thumbnail.jpg	Foto N-4 subida el 28-6-2020	1990-10-10 03:00:00+00	Fernando Lund.	t	f	CC BY	1000	667	2020-06-28 21:37:54.397644+00	2020-06-28 21:37:54.397649+00
56	ff9e78fe2c6d4ca29076adc330fafb3d.jpg	ff9e78fe2c6d4ca29076adc330fafb3d_thumbnail.jpg	Servet Martinez	1990-10-10 03:00:00+00	Profesor de Matemáticas Servet Martínez.	t	f	CC BY	1000	667	2020-05-13 21:38:01+00	2020-06-28 21:38:01+00
61	c2aabcaa6ec24b148a128afa8b3dfa6d.jpg	c2aabcaa6ec24b148a128afa8b3dfa6d_thumbnail.jpg	Observatorio en Cerro Calán	1960-12-12 04:00:00+00	Vista desde Cerro Calán	t	f	CC BY	373	565	2020-05-13 22:10:30+00	2020-06-28 22:10:30+00
41	13255257b7954d8b94e57b53799931e3.jpg	13255257b7954d8b94e57b53799931e3_thumbnail.jpg	Bender	2020-06-22 04:00:00+00	Bender partió inicialmente como una cabeza por dos estudiantes de ingeniería eléctrica. Esto comenzó el 2007 y el 2011 Bender ganó un premio a la innovación gracas a su cara expresiva.	t	f	CC BY-SA	3	2	2020-06-28 21:31:07.726733+00	2020-06-28 21:39:46.492881+00
44	be8d552868dd4cc897cce8d33064b447.jpg	be8d552868dd4cc897cce8d33064b447_thumbnail.jpg	Vision de Bender	2020-06-22 04:00:00+00	Bender cuenta con 3 camaras para navegar por el entorno, además de un laser super potente en su base para mapear el ambiente. Todas estas herramientas le permiten ver.	t	f	CC BY-SA	667	1000	2020-06-28 21:31:10.26256+00	2020-06-28 21:35:53.601219+00
36	9ba41fc31da0498099b27ff02aff70bc.jpg	9ba41fc31da0498099b27ff02aff70bc_thumbnail.jpg	Precalentamiento con zumba	2019-11-15 03:00:00+00	Calentamiento previo a la carrera, todos los participantes se reunen para bailar zumba en el patio central.	t	f	CC BY	533	800	2020-06-28 21:26:39+00	2020-06-28 21:26:39+00
53	ca03000b5b5d452583e24c56d64f12cc.jpg	ca03000b5b5d452583e24c56d64f12cc_thumbnail.jpg	Foto N-8 subida el 28-6-2020	1990-10-10 03:00:00+00	María Teresa Ruiz.	t	f	CC BY	1000	667	2020-06-28 21:37:58.813968+00	2020-06-28 21:37:58.813975+00
50	744e4a5b7aaa4a9ba6868837490fa369.jpg	744e4a5b7aaa4a9ba6868837490fa369_thumbnail.jpg	José Maza	1990-10-10 03:00:00+00	Profesor de Astronomía José Maza.	t	f	CC BY	1000	667	2020-05-13 21:37:55+00	2020-06-28 21:37:55+00
55	f70bde8eff7f446d8d21ee79cb55c098.jpg	f70bde8eff7f446d8d21ee79cb55c098_thumbnail.jpg	Foto N-10 subida el 28-6-2020	1990-10-10 03:00:00+00	Patricio Felmer.	t	f	CC BY	1000	667	2020-06-28 21:38:00.904691+00	2020-06-28 21:38:00.904699+00
64	723665de17a04529a2a3e2b4701aff0e.jpg	723665de17a04529a2a3e2b4701aff0e_thumbnail.jpg		1960-12-12 04:00:00+00	Salas de clases en los años 70	t	f	CC BY	589	827	2020-05-13 22:10:31+00	2020-06-28 22:10:31+00
59	632e1fb5139a4e13aeed92d1989e6fae.jpg	632e1fb5139a4e13aeed92d1989e6fae_thumbnail.jpg		1960-12-12 04:00:00+00	Frontis 850	t	f	CC BY	589	935	2020-05-13 22:10:29+00	2020-06-28 22:10:29+00
65	70b9679244ed4d8da229217cd04be823.jpg	70b9679244ed4d8da229217cd04be823_thumbnail.jpg		1960-12-12 04:00:00+00	Entrada de 850, hacia la izquierda se enuentra la biblioteca central.	t	f	CC BY	589	815	2020-05-13 22:10:33+00	2020-06-28 22:10:33+00
77	64865bcbb7ce408682a71cd9370b4935.jpg	64865bcbb7ce408682a71cd9370b4935_thumbnail.jpg	Antiguo CEC	2005-07-19 04:00:00+00	El antiguo edificio del Centro de Computación antes de que construyeran el campus nuevo	t	f	CC BY-SA	3	4	2020-06-28 22:40:20.34257+00	2020-06-28 22:40:20.342577+00
68	0808826ad9b7444daa3e517569b79f6a.jpeg	0808826ad9b7444daa3e517569b79f6a_thumbnail.jpeg	Rol beauchef	2020-06-11 04:00:00+00	Juegos de mesa en el Hall Sur	t	f	CC BY-NC-SA	9	16	2020-06-28 22:15:43.691682+00	2020-06-28 22:15:43.691689+00
76	fbab320feac54ecca3d2e52fbef04fd6.jpg	fbab320feac54ecca3d2e52fbef04fd6_thumbnail.jpg	Fisica	2005-07-19 04:00:00+00	Frontis de la facultad de física.	t	t	CC BY-NC-SA	3	4	2020-06-28 22:40:19.33674+00	2020-07-01 20:03:24.11695+00
67	66d2fecb25324678884c57550b938098.jpg	66d2fecb25324678884c57550b938098_thumbnail.jpg	Sismografo	1960-12-12 04:00:00+00	Sismógrafo.	t	f	CC BY	1000	729	2020-05-07 22:10:35+00	2020-06-28 22:10:35+00
87	3cca6e9907c34e9dbe54068e356e292e.jpg	3cca6e9907c34e9dbe54068e356e292e_thumbnail.jpg	La primera patita 2018Nº7	2018-09-12 03:00:00+00	Actividades	t	f	CC BY	1	1	2020-06-29 21:27:17.95697+00	2020-06-29 21:27:17.956977+00
70	cb72f1c42b0449da99de7dbff39601e0.jpg	cb72f1c42b0449da99de7dbff39601e0_thumbnail.jpg	Rol beauchef	2020-06-11 04:00:00+00	Ceremonia de apertura	t	f	CC BY-NC-SA	9	16	2020-04-09 22:15:45+00	2020-06-28 22:15:45+00
84	ab543d84c906452f8152361fdea48123.jpg	ab543d84c906452f8152361fdea48123_thumbnail.jpg	La primera patita 2018Nº6	2018-09-12 03:00:00+00	Baile grupal	t	f	CC BY	1	1	2020-06-29 21:27:16.957739+00	2020-06-29 21:27:16.957745+00
71	2b94a68b47b945ae9720b4c9868b8743.jpg	2b94a68b47b945ae9720b4c9868b8743_thumbnail.jpg	Rol beauchef	2020-06-11 04:00:00+00	Vista panorámica de las competencias durante la jornada de Rol.	t	f	CC BY-NC-SA	9	16	2020-04-08 22:15:46+00	2020-06-28 22:15:46+00
91	569e149615a44f768ff9f9c7075d2753.jpg	569e149615a44f768ff9f9c7075d2753_thumbnail.jpg		2008-01-18 03:00:00+00	Planificación: Maqueta\r\nPor trivino	t	f	CC BY-NC-ND	3	4	2020-06-29 22:29:01.741231+00	2020-06-29 22:29:01.741237+00
75	ebee9db357a248569165a595f0d83ca3.jpg	ebee9db357a248569165a595f0d83ca3_thumbnail.jpg	sala F10	2005-07-19 04:00:00+00	En esta hermosa sala tuve clases con uno de los mejores profesores de electromagnetismo.	t	f	CC BY-NC-SA	3	4	2020-06-28 22:40:18.452252+00	2020-06-28 22:40:18.452258+00
79	600c034cbb7947d68f3a420c8c40e808.jpg	600c034cbb7947d68f3a420c8c40e808_thumbnail.jpg	Realizacion de BRC 2019	2019-10-09 03:00:00+00	Foto del lugar en que se realizó el evento. Este año, además de los robots velocístas, se mostraron battle-bots.\n\nFoto recuperada de @fablabudechile	t	f	CC BY-NC-ND	809	1080	2020-06-29 21:03:17.887252+00	2020-06-29 21:04:07.033128+00
81	9310223cc8c14546b77aae4954de4dd1.jpg	9310223cc8c14546b77aae4954de4dd1_thumbnail.jpg	La primera patita 2018Nº3	2018-09-12 03:00:00+00	Juegos tipicos	t	f	CC BY	1	1	2020-06-29 21:27:12.770144+00	2020-06-29 21:27:12.770151+00
80	5ffb6a0471e84882acf48509619cbf62.jpg	5ffb6a0471e84882acf48509619cbf62_thumbnail.jpg	La primera patita 2018Nº2	2018-09-12 03:00:00+00	Juegos tipicos	t	f	CC BY	1	1	2020-06-29 21:27:11.433921+00	2020-06-29 21:27:11.433928+00
85	6181ff7d333c46ffa77d49d999f84dfb.jpg	6181ff7d333c46ffa77d49d999f84dfb_thumbnail.jpg	La primera patita 2018Nº5	2018-09-12 03:00:00+00	Foto grupal	t	f	CC BY	1	1	2020-06-29 21:27:17.478035+00	2020-06-29 21:27:17.478042+00
78	716bbf5838e94670b9f529783922137d.jpg	716bbf5838e94670b9f529783922137d_thumbnail.jpg	Beauchef 851 de noche	2018-07-06 04:00:00+00	Foto tomada en Beauchef 851 luego de una larga sesión de estudio	t	f	CC BY	5	4	2020-06-29 20:55:21.492368+00	2020-06-29 20:57:20.216106+00
86	88a394303c904ab3852fb7a30b5345e8.jpg	88a394303c904ab3852fb7a30b5345e8_thumbnail.jpg	La primera patita 2018Nº8	2018-09-12 03:00:00+00	Daniel Muñoz	t	f	CC BY	1	1	2020-06-29 21:27:17.792746+00	2020-06-29 21:27:17.792753+00
27	c80647fd27f84ff39b057596dae8ac80.jpg	c80647fd27f84ff39b057596dae8ac80_thumbnail.jpg	Medalla de corrida beauchef	2019-11-15 03:00:00+00	Medallas entregadas a l@s ganadores de la corrida. Existens distintas categorías para alumnos, académicos y funcionarios.	t	f	CC BY	533	800	2020-06-28 21:26:28+00	2020-06-28 21:26:28+00
94	0e14971ab06042bdabb523349fefba82.jpeg	0e14971ab06042bdabb523349fefba82_thumbnail.jpeg		2008-01-18 03:00:00+00	Planificación: Nivel calle\r\nPor trivino	t	f	CC BY-NC-ND	160	213	2020-06-29 22:29:05.630189+00	2020-06-29 22:29:05.630195+00
92	4fdb201e08de40eb9dd15fd51ebbd20c.jpg	4fdb201e08de40eb9dd15fd51ebbd20c_thumbnail.jpg		2008-01-18 03:00:00+00	Planificación: -1\r\nPor trivino	t	f	CC BY-NC-ND	3	4	2020-06-29 22:29:03.270149+00	2020-06-29 22:29:03.270156+00
82	5d464e3a1b1b4b79aefca86838610145.jpg	5d464e3a1b1b4b79aefca86838610145_thumbnail.jpg	La primera patita 2018Nº4	2018-09-12 03:00:00+00	Juegos tipicos	t	f	CC BY	1	1	2020-06-29 21:27:13.032633+00	2020-06-29 21:27:13.03264+00
88	0df1ddb75ba143f687fb985b401f7ce4.jpg	0df1ddb75ba143f687fb985b401f7ce4_thumbnail.jpg	La primera patita 2018Nº9	2018-09-12 03:00:00+00	Baile en pareja	t	f	CC BY	1	1	2020-06-29 21:27:19.232109+00	2020-06-29 21:27:19.232116+00
83	90185727c4fc4363ab848a0dd6ab13d7.jpg	90185727c4fc4363ab848a0dd6ab13d7_thumbnail.jpg	La primera patita 2018Nº1	2018-09-12 03:00:00+00	Stands conmemorativos	t	f	CC BY	1	1	2020-06-29 21:27:13.247044+00	2020-06-29 21:27:13.247051+00
72	75e1dab80d80445cbaa382c9335eadfa.jpg	75e1dab80d80445cbaa382c9335eadfa_thumbnail.jpg	Rol beauchef	2020-06-11 04:00:00+00	Juegos de mesa en el Hall Sur	t	f	CC BY-NC-SA	9	16	2020-04-04 21:15:47+00	2020-06-28 22:15:47+00
69	9133c89941f34505b5676ccb013e4de4.jpg	9133c89941f34505b5676ccb013e4de4_thumbnail.jpg	Rol beauchef	2020-06-11 04:00:00+00	Rol Beacuhef preparando las actividades del dia	t	f	CC BY-NC-SA	9	16	2020-04-09 22:15:44+00	2020-06-28 22:15:44+00
89	fd9be4e03af545678d53b679dc2bbf19.jpg	fd9be4e03af545678d53b679dc2bbf19_thumbnail.jpg	La primera patita 2018Nº10	2018-09-12 03:00:00+00	Cueca entre estudiantes	t	f	CC BY	1	1	2020-06-29 21:27:23.267998+00	2020-06-29 21:27:23.268004+00
93	888f29c387bf44b5a50501ad25ce340a.jpg	888f29c387bf44b5a50501ad25ce340a_thumbnail.jpg		2008-01-18 03:00:00+00	Planificación: -3\r\nPor trivino	t	f	CC BY-NC-ND	3	4	2020-06-29 22:29:04.504674+00	2020-06-29 22:29:04.504681+00
90	e048d4c987674dee99a7c1d6be4efc9f.jpg	e048d4c987674dee99a7c1d6be4efc9f_thumbnail.jpg	Toma de torre Justicia Espada	2018-05-18 04:00:00+00	Mujeres de la facultad se toman la torre Justicia Espada, ex Torre Central, ante el nulo apoyo de la Facultad	t	f	CC BY	3	4	2020-06-29 22:12:26.582657+00	2020-06-29 22:12:26.582664+00
95	be093f1daac14f528e39806c9feabfb4.jpg	be093f1daac14f528e39806c9feabfb4_thumbnail.jpg		2008-01-18 03:00:00+00	Planificación: Estructura\r\nPor trivino	t	f	CC BY-NC-ND	3	4	2020-06-29 22:29:08.116796+00	2020-06-29 22:29:08.116803+00
97	4ee8825ebf2f49eebc4000de70f872c8.jpg	4ee8825ebf2f49eebc4000de70f872c8_thumbnail.jpg		2014-05-14 04:00:00+00	Por canavarr	t	f	CC BY	3	4	2020-06-29 22:30:12.911653+00	2020-06-29 22:30:12.91166+00
96	64d36bfab1e24c3b8f671760a92d018a.jpg	64d36bfab1e24c3b8f671760a92d018a_thumbnail.jpg		2014-05-14 04:00:00+00	Mitica foto del toro	t	f	CC BY	1	1	2020-06-29 22:30:11.720366+00	2020-06-29 22:30:11.720373+00
98	e7a598ff4c1e41e0a58f8e33bdf4d3fa.jpeg	e7a598ff4c1e41e0a58f8e33bdf4d3fa_thumbnail.jpeg		1919-12-15 04:43:00+00	Justicia Espada: Primer mujer ingeniera de latinoamerica	t	f	CC BY	239	400	2020-06-29 22:45:55.142513+00	2020-06-29 22:45:55.142521+00
73	05f228e573544d8dac3acd0984dbb73e.jpg	05f228e573544d8dac3acd0984dbb73e_thumbnail.jpg	Rol beauchef	2020-06-11 04:00:00+00	Presentación de jugadoras profesionales	t	f	CC BY-NC-SA	9	16	2020-04-09 22:15:48+00	2020-06-28 22:15:48+00
109	0866e5aef7cd4a14866f72e00034aabd.jpg	0866e5aef7cd4a14866f72e00034aabd_thumbnail.jpg	Francisco Mardones	2020-06-29 04:00:00+00	Decano de la FCFM 1920-1927	t	f	CC BY	17	11	2020-06-29 23:11:46.927702+00	2020-07-01 16:05:31.118249+00
108	90703c5211694a1386c727b123cbd0a9.jpeg	90703c5211694a1386c727b123cbd0a9_thumbnail.jpeg	Manuel Trucco Franzani	2020-06-29 04:00:00+00	Decano de la FCFM 1911-1918	t	f	CC BY	333	250	2020-06-29 23:11:46.103054+00	2020-07-01 16:05:31.121244+00
107	e0d26e67e1104af8b221e7f036314535.jpeg	e0d26e67e1104af8b221e7f036314535_thumbnail.jpeg	Carlos Gregorio Avalos Varela	2020-06-29 04:00:00+00	Decano de la FCFM 1907	t	f	CC BY	1	1	2020-06-29 23:11:43.867982+00	2020-07-01 16:05:31.208529+00
106	ac6b6d2a24ae46b7a3c8dda284d86a36.jpg	ac6b6d2a24ae46b7a3c8dda284d86a36_thumbnail.jpg	Andrés Antonio Gorbea	2020-06-29 04:00:00+00	Decano de la FCFM 1843-1852	t	f	CC BY	99	98	2020-06-29 23:11:43.325761+00	2020-07-01 16:05:31.310279+00
105	556e01dc9feb459c92139f613cd7c86f.jpeg	556e01dc9feb459c92139f613cd7c86f_thumbnail.jpeg	Uldaricio Prado Bustamante	2020-06-29 04:00:00+00	Decano de la FCFM 1884-1892	t	f	CC BY	1	1	2020-06-29 23:11:42.207376+00	2020-07-01 16:05:31.321078+00
118	8d4329c9a21247eaa38da287d7202e5f.png	8d4329c9a21247eaa38da287d7202e5f_thumbnail.png	Patricio Aceituno	2020-06-29 04:00:00+00	Decano de la FCFM 2014-2018	t	f	CC BY	263	177	2020-06-29 23:47:16.905863+00	2020-07-01 16:05:30.789728+00
117	11808ba0775e4980907dc96ab7166228.jpeg	11808ba0775e4980907dc96ab7166228_thumbnail.jpeg	Mauricio Sarrazín	2020-06-29 04:00:00+00	Decano de la FCFM 1990-1994	t	f	CC BY	1013	800	2020-06-29 23:27:39.476417+00	2020-07-01 16:05:30.812779+00
115	95ec806c2c4848a28126c725c2822e09.jpeg	95ec806c2c4848a28126c725c2822e09_thumbnail.jpeg	Victor Perez V.	2020-06-29 04:00:00+00	Decano de la FCFM 1994-2002	t	f	CC BY	4	3	2020-06-29 23:27:38.661469+00	2020-07-01 16:05:30.810732+00
119	043cd7f66c6045b387a4981f63c26b40.jpeg	043cd7f66c6045b387a4981f63c26b40_thumbnail.jpeg	Francisco Martinez Concha	2020-06-29 04:00:00+00	Decano de la FCFM 2019-	t	f	CC BY	73	50	2020-06-29 23:47:17.460798+00	2020-07-01 16:05:30.673073+00
116	e3d8b495becb4fa5915b14748ed42620.jpeg	e3d8b495becb4fa5915b14748ed42620_thumbnail.jpeg	Francisco Brieva R.	2020-06-29 04:00:00+00	Decano de la FCFM 2002-2014	t	f	CC BY	61	50	2020-06-29 23:27:38.920396+00	2020-07-01 16:05:30.788943+00
120	5771ffbb7e6f4e0f830ccfdccf54b99a.jpg	5771ffbb7e6f4e0f830ccfdccf54b99a_thumbnail.jpg	Mis fotos del 90Nº1	2020-06-01 04:00:00+00	Una foto de 1920	f	f	CC BY-ND	267	398	2020-07-01 03:00:53.511632+00	2020-07-01 16:49:57.285687+00
122	9a82eda92dc04914acf7271035d7ab70.jpg	9a82eda92dc04914acf7271035d7ab70_thumbnail.jpg		1980-07-31 04:00:00+00	Famosa escalera en espiral	f	f	CC BY-SA	53	80	2020-07-01 20:01:10.57857+00	2020-07-01 20:01:10.578577+00
114	2ed53a8bad4941e8a698b86036b9c0fa.jpeg	2ed53a8bad4941e8a698b86036b9c0fa_thumbnail.jpeg	Atilano Lamana	2020-06-29 04:00:00+00	Decano de la FCFM 1985-1990	t	f	CC BY	113	150	2020-06-29 23:27:36.188318+00	2020-07-01 16:05:30.855818+00
113	2ce57630db7b4d219ae2534372ffb7c4.jpeg	2ce57630db7b4d219ae2534372ffb7c4_thumbnail.jpeg	Enrique D’Etigny	2020-06-29 04:00:00+00	Decano de la FCFM 1963-1971	t	f	CC BY	133	200	2020-06-29 23:27:34.724206+00	2020-07-01 16:05:30.992521+00
112	c68b223fc8344a0d932be9c0eba89634.jpg	c68b223fc8344a0d932be9c0eba89634_thumbnail.jpg	Reinaldo Harnecker	2020-06-29 04:00:00+00	Decano de la FCFM 1948-1954	t	f	CC BY	40	49	2020-06-29 23:27:33.944927+00	2020-07-01 16:05:31.068366+00
111	c0a47fd25bd04411821fed8d4ce01fa3.jpg	c0a47fd25bd04411821fed8d4ce01fa3_thumbnail.jpg	Domingo Santa Maria	2020-06-29 04:00:00+00	Decano de la FCFM 1907-1909	t	f	CC BY	64	65	2020-06-29 23:14:11.623118+00	2020-07-01 16:05:31.077653+00
110	fb8869d8797c425a9628892e56efafae.jpeg	fb8869d8797c425a9628892e56efafae_thumbnail.jpeg	Gustavo Lira	2020-06-29 04:00:00+00	Decano de la 1929-1930	t	f	CC BY	137	133	2020-06-29 23:11:48.767507+00	2020-07-01 16:05:31.099722+00
121	8f945b919964457f887b18ae8e22c420.jpg	8f945b919964457f887b18ae8e22c420_thumbnail.jpg		1980-07-31 04:00:00+00	El auditorio d-etgny	t	f	CC BY-SA	683	1024	2020-07-01 20:01:10.00748+00	2020-07-01 20:02:27.000376+00
\.


--
-- Data for Name: Gallery_photo_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_photo_category" (id, photo_id, category_id) FROM stdin;
1	6	1
2	7	1
3	8	1
4	9	1
5	10	1
6	17	1
7	20	1
8	5	2
9	11	2
10	18	2
11	19	2
12	24	2
13	25	2
15	16	3
17	11	3
21	29	5
22	27	5
23	8	5
24	28	5
25	31	5
26	7	5
27	30	5
28	32	5
29	33	5
30	34	5
31	35	5
32	36	5
33	53	6
34	47	6
35	49	6
36	50	6
37	54	6
38	51	6
39	46	6
40	48	6
41	56	6
42	55	6
43	52	6
44	21	8
45	66	8
46	24	8
47	19	8
48	60	8
49	59	8
50	57	8
51	64	8
52	61	8
53	58	8
54	62	8
55	65	8
56	67	8
57	16	7
58	11	7
59	114	9
60	113	9
61	112	9
62	111	9
63	110	9
64	109	9
65	108	9
66	107	9
67	106	9
68	105	9
69	118	9
70	117	9
71	115	9
72	119	9
73	116	9
74	122	8
75	121	8
76	72	7
\.


--
-- Data for Name: Gallery_photo_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_photo_comments" (id, photo_id, comment_id) FROM stdin;
1	65	1
2	77	2
3	77	3
4	70	4
5	50	5
6	76	6
7	64	7
8	55	8
9	54	9
10	53	10
11	58	11
12	48	12
13	45	13
14	44	14
15	67	15
16	40	16
17	36	17
18	33	18
19	30	19
20	27	20
21	66	21
22	25	22
23	24	23
24	20	24
26	14	26
27	9	27
28	20	28
29	20	29
30	50	30
31	16	31
32	52	32
33	65	33
34	65	34
35	46	35
36	22	36
37	60	37
38	77	38
39	56	39
40	64	40
41	70	41
42	18	42
43	25	43
44	67	44
45	87	45
46	81	46
47	86	47
48	88	48
49	67	49
50	64	50
51	70	51
52	61	52
\.


--
-- Data for Name: Gallery_photo_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_photo_metadata" (id, photo_id, metadata_id) FROM stdin;
11	4	22
12	4	23
13	4	24
14	4	25
15	4	26
17	4	28
18	4	29
19	4	30
20	4	31
22	5	22
23	5	23
24	5	24
25	5	25
26	5	26
28	5	28
29	5	29
30	5	30
31	5	31
33	6	22
34	6	23
35	6	24
36	6	25
37	6	26
39	6	28
40	6	29
41	6	30
42	6	31
44	7	22
45	7	23
46	7	24
47	7	25
48	7	26
50	7	28
51	7	29
52	7	30
53	7	31
55	8	22
56	8	23
57	8	24
58	8	25
59	8	26
61	8	28
62	8	29
63	8	30
64	8	31
66	9	22
67	9	23
68	9	24
69	9	25
70	9	26
72	9	28
73	9	29
74	9	30
75	9	31
77	10	22
78	10	23
79	10	24
80	10	25
81	10	26
83	10	28
84	10	29
85	10	30
86	10	31
88	11	22
89	11	23
90	11	24
91	11	25
92	11	26
94	11	28
95	11	29
96	11	30
97	11	31
99	12	22
100	12	23
101	12	24
102	12	25
103	12	26
105	12	28
106	12	29
107	12	30
108	12	31
110	13	22
111	13	23
112	13	24
113	13	25
114	13	26
116	13	28
117	13	29
118	13	30
119	13	31
121	14	22
122	14	23
123	14	24
124	14	25
125	14	26
127	14	28
128	14	29
129	14	30
130	14	31
132	15	22
133	15	23
134	15	24
135	15	25
136	15	26
138	15	28
139	15	29
140	15	30
141	15	31
143	16	22
144	16	23
145	16	24
146	16	25
147	16	26
149	16	28
150	16	29
151	16	30
152	16	31
154	17	22
155	17	23
156	17	24
157	17	25
158	17	26
160	17	28
161	17	29
162	17	30
163	17	31
165	18	22
166	18	23
167	18	24
168	18	25
169	18	26
171	18	28
172	18	29
173	18	30
174	18	31
176	19	22
177	19	23
178	19	24
179	19	25
180	19	26
182	19	28
183	19	29
184	19	30
185	19	31
187	20	22
188	20	23
189	20	24
190	20	25
191	20	26
193	20	28
194	20	29
195	20	30
196	20	31
198	21	22
199	21	23
200	21	24
201	21	25
202	21	26
204	21	28
205	21	29
206	21	30
207	21	31
209	22	22
210	22	23
211	22	24
212	22	25
213	22	26
215	22	28
216	22	29
217	22	30
218	22	31
220	23	22
221	23	23
222	23	24
223	23	25
224	23	26
226	23	28
227	23	29
228	23	30
229	23	31
233	24	24
237	24	28
238	24	29
242	25	22
243	25	23
244	25	24
245	25	25
246	25	26
248	25	28
249	25	29
250	25	30
251	25	31
253	26	21
254	27	37
255	27	38
256	27	39
257	27	40
258	27	41
259	28	37
260	28	38
261	28	39
262	28	40
263	28	41
264	29	37
265	29	38
266	29	39
267	29	40
268	29	41
269	30	37
270	30	38
271	30	39
272	30	40
273	30	41
274	31	37
275	31	38
276	31	39
277	31	40
278	31	41
279	32	37
280	32	38
281	32	39
282	32	40
283	32	41
284	33	37
285	33	38
286	33	39
287	33	40
288	33	41
289	34	37
290	34	38
291	34	39
292	34	40
293	34	41
294	35	37
295	35	38
296	35	39
297	35	40
298	35	41
299	36	37
300	36	38
301	36	39
302	36	40
303	36	41
304	38	36
305	37	36
306	39	36
307	40	36
308	41	36
309	42	36
310	43	36
311	44	36
312	45	36
313	37	42
314	44	43
315	46	45
316	46	44
317	46	29
318	46	46
319	47	45
320	47	44
321	47	29
322	47	46
323	48	45
324	48	44
325	48	29
326	48	46
327	49	45
328	49	44
329	49	29
330	49	46
331	50	45
332	50	44
333	50	29
334	50	46
335	51	45
336	51	44
337	51	29
338	51	46
339	52	45
340	52	44
341	52	29
342	52	46
343	53	45
344	53	44
345	53	29
346	53	46
347	54	45
348	54	44
349	54	29
350	54	46
351	55	45
352	55	44
353	55	29
354	55	46
355	56	45
356	56	44
357	56	29
358	56	46
359	41	43
360	45	47
361	40	48
362	40	43
363	43	49
364	43	47
365	39	48
366	57	50
367	57	51
368	57	52
369	58	50
370	58	51
371	58	52
372	59	50
373	59	51
374	59	52
375	60	50
376	60	51
377	60	52
378	61	50
379	61	51
380	61	52
381	62	50
382	62	51
383	62	52
384	64	50
385	64	51
386	64	52
387	65	50
388	65	51
389	65	52
393	67	50
394	67	51
395	67	52
396	68	53
397	68	54
398	69	53
399	69	54
400	70	53
401	70	54
402	71	53
403	71	54
404	72	53
405	72	54
406	73	53
407	73	54
408	75	57
409	75	55
410	76	57
411	76	55
412	77	56
415	80	60
416	80	61
417	80	62
418	81	60
419	81	61
420	81	62
421	82	60
422	82	61
423	82	62
424	83	60
425	83	61
426	83	62
427	84	60
428	84	61
429	84	62
430	85	60
431	85	61
432	85	62
433	86	60
434	86	61
435	86	62
436	87	60
437	87	61
438	87	62
439	88	60
440	88	61
441	88	62
442	89	60
443	89	61
444	89	62
445	90	23
446	91	63
447	92	63
448	93	63
449	94	63
450	95	63
451	98	50
452	66	21
453	24	21
454	119	64
455	116	64
456	118	64
457	117	64
458	115	64
459	114	64
460	113	64
461	112	64
462	111	64
463	110	64
464	109	64
465	108	64
466	107	64
467	106	64
468	105	64
469	121	36
470	121	37
471	122	36
472	122	37
473	78	63
\.


--
-- Data for Name: Gallery_photo_report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_photo_report" (id, photo_id, reporte_id) FROM stdin;
1	76	2
2	37	3
3	31	4
4	26	11
5	13	13
6	94	14
\.


--
-- Data for Name: Gallery_reporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gallery_reporte" (id, content, resolved, created_at, updated_at, type) FROM stdin;
1	Comentarios ofensivos	f	2020-06-28 22:42:52.035185+00	2020-06-28 22:42:52.035191+00	1
4	Usuario no es autor del contenido, Contenido inapropiado	f	2020-06-29 21:23:40.841022+00	2020-06-29 21:23:40.841027+00	2
5	Comentarios ofensivos	f	2020-06-29 21:30:54.613983+00	2020-06-29 21:30:54.613989+00	1
6	Fotos inapropiadas	f	2020-06-29 21:31:16.218857+00	2020-06-29 21:31:16.218863+00	1
7	Contenido inapropiado, Contenido difamatorio	f	2020-06-29 21:34:53.083082+00	2020-06-29 21:34:53.083088+00	3
8	Contenido inapropiado	f	2020-06-29 21:35:18.403716+00	2020-06-29 21:35:18.403722+00	3
9	Contenido inapropiado	f	2020-06-29 21:37:02.006224+00	2020-06-29 21:37:02.006229+00	3
10	Fotos inapropiadas	f	2020-06-29 21:37:38.601696+00	2020-06-29 21:37:38.601702+00	1
11	Contenido inapropiado, Incita a la violencia	f	2020-06-29 21:38:02.339075+00	2020-06-29 21:38:02.33908+00	2
12	Contenido inapropiado	f	2020-06-29 21:48:57.414178+00	2020-06-29 21:48:57.414183+00	3
13	Contenido inapropiado, Incita a la violencia	f	2020-06-29 21:54:58.614011+00	2020-06-29 21:54:58.614017+00	2
3	Usuario no es autor del contenido	t	2020-06-29 21:23:18.62435+00	2020-07-01 20:03:04.536414+00	2
2	Usuario no es autor del contenido	t	2020-06-28 22:43:02.167757+00	2020-07-01 20:03:24.121288+00	2
14	Usuario no es autor del contenido	t	2020-07-03 15:25:01.009578+00	2020-07-03 15:25:23.589313+00	2
\.


--
-- Data for Name: MetaData_iptckeyword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MetaData_iptckeyword" (id, name, definition, help_text, created_at, updated_at) FROM stdin;
1	Palabras Clave	Keywords to express the subject of the image. Keywords may be free text and don’t have to be taken from a controlled vocabulary. Codes from the controlled vocabulary IPTC Subject NewsCodes must go to the "Subject Code" field.	Terminos o frases usadas para indicar lo que sucede en la imagen.	2020-02-12 20:27:09+00	2020-02-12 20:27:09+00
2	Ciudad	The contact information city part.	Ciudad o dirección.	2020-02-19 22:56:00+00	2020-02-19 22:56:00+00
3	Evento	Names or describes the specific event at which the photo was taken.	Nombre del evento en cuestión.	2020-02-19 22:56:51+00	2020-02-19 22:56:51+00
4	Género	Artistic, style, journalistic, product or other genre(s) of the image (expressed by a term from any Controlled Vocabulary)	Arte, periodismo, realismo u otro género.	2020-02-19 22:58:45+00	2020-02-19 22:58:45+00
5	Lugar	A location shown in the image.	Nombre del lugar	2020-02-19 22:59:33+00	2020-02-19 22:59:33+00
6	Organización	Name of the organisation or company which is featured in the image.	Nombre de la organización en la imagen.	2020-02-19 23:01:02+00	2020-02-19 23:01:02+00
7	Persona	Name of a person shown in the image.	Nombre de la persona en la fotografía.	2020-02-19 23:21:49+00	2020-02-19 23:21:49+00
8	Fecha	Designates the date and optionally the time the content of the image was created rather than the date of the creation of the digital representation.	La fecha en que fue tomada la imagen, o el periodo.	2020-02-19 23:22:21+00	2020-02-19 23:22:21+00
\.


--
-- Data for Name: MetaData_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MetaData_metadata" (id, value, approved, created_at, updated_at, metadata_id) FROM stdin;
35	Robocoup	t	2020-06-28 21:25:56.242118+00	2020-06-28 21:58:08.02513+00	3
42	Dron	t	2020-06-28 21:34:51.874902+00	2020-06-28 21:58:11.172383+00	1
41	parque ohiggins	t	2020-06-28 21:26:27.909682+00	2020-06-28 21:58:13.307393+00	5
43	Bender	t	2020-06-28 21:35:53.315473+00	2020-06-28 21:58:17.814098+00	1
40	5k	t	2020-06-28 21:26:27.710676+00	2020-06-28 21:58:20.859623+00	3
44	academicos	t	2020-06-28 21:37:50.202251+00	2020-06-28 21:58:23.907412+00	1
29	profesores	t	2020-03-14 15:43:51+00	2020-06-28 21:58:24.994316+00	1
45	premios nacionales	t	2020-06-28 21:37:50.353861+00	2020-06-28 21:58:26.948566+00	1
39	medalla	t	2020-06-28 21:26:27.512541+00	2020-06-28 21:58:28.008635+00	1
23	toma feminista	t	2020-03-14 15:43:49+00	2020-06-28 21:58:32.05919+00	3
28	foto histórica	t	2020-03-14 15:43:50+00	2020-06-28 21:58:33.451533+00	1
30	premiación	t	2020-03-14 15:43:51+00	2020-06-28 21:58:35.334062+00	1
16	mechoneo	t	2020-03-14 15:36:38+00	2020-06-28 21:58:37.08107+00	3
26	inducción	t	2020-03-14 15:43:50+00	2020-06-28 21:58:38.535514+00	3
24	biblioteca	t	2020-03-14 15:43:50+00	2020-06-28 21:58:39.959936+00	5
25	Calán	t	2020-03-14 15:43:50+00	2020-06-28 21:58:41.036719+00	5
22	piscina	t	2020-03-14 15:43:49+00	2020-06-28 21:58:42.009232+00	5
50	historicas	t	2020-06-28 22:10:24.016704+00	2020-06-28 22:10:24.016709+00	1
51	historica	t	2020-06-28 22:10:24.212329+00	2020-06-28 22:10:24.212334+00	1
60	fiestas-patrias	t	2020-06-29 21:27:08.007198+00	2020-07-01 20:04:01.852664+00	3
31	cancha	t	2020-03-14 15:43:51+00	2020-06-28 21:57:36.058367+00	5
57	Beauchef 850	t	2020-06-28 22:40:17.401449+00	2020-07-01 20:42:34.043631+00	5
47	NAO	t	2020-06-28 21:40:56.837241+00	2020-06-28 21:57:49.351363+00	1
34	Javier Ruiz	t	2020-06-28 21:25:56.208416+00	2020-06-28 21:57:50.890165+00	7
36	AMTC	t	2020-06-28 21:25:56.491423+00	2020-06-28 21:57:52.713679+00	6
38	deporte	t	2020-06-28 21:26:27.50892+00	2020-06-28 21:57:55.234035+00	1
48	Pepper	t	2020-06-28 21:43:48.871698+00	2020-06-28 21:58:02.594593+00	1
49	Inteligencia Computacional	t	2020-06-28 21:46:17.147065+00	2020-06-28 21:58:06.336948+00	1
61	Eventos sociales	f	2020-06-29 21:27:08.25557+00	2020-07-02 20:26:58.917885+00	3
62	beauchef850	f	2020-06-29 21:27:08.294007+00	2020-07-02 20:26:58.936237+00	3
58	beauchef851	f	2020-06-29 20:55:19.630707+00	2020-07-02 20:26:58.947838+00	3
53	Actividades Sociales	f	2020-06-28 22:15:42.94667+00	2020-07-03 18:08:27.391178+00	1
64	decanos	f	2020-07-01 16:05:30.123515+00	2020-07-03 18:09:25.786991+00	1
52	fcfm	f	2020-06-28 22:10:24.224542+00	2020-07-03 18:09:25.79439+00	1
55	Campus antiguo	f	2020-06-28 22:40:17.196276+00	2020-07-03 18:09:25.800561+00	1
54	Rol Beauchef	f	2020-06-28 22:15:43.043688+00	2020-07-03 18:09:25.818459+00	1
56	CEC	f	2020-06-28 22:40:17.393703+00	2020-07-03 18:09:25.821692+00	1
37	corrida beauchef	f	2020-06-28 21:26:27.24538+00	2020-07-03 18:10:11.251147+00	1
46	premio nacional	f	2020-06-28 21:37:50.423781+00	2020-07-03 18:10:11.273747+00	1
33	2014	f	2020-06-28 21:25:55.996689+00	2020-07-03 18:10:11.281542+00	1
63	beauchef 851	t	2020-06-29 22:29:00.47667+00	2020-07-03 18:39:56.059342+00	1
21	Nicanor Parra	t	2020-03-14 15:36:39+00	2020-07-10 20:39:38.929683+00	7
\.


--
-- Data for Name: Users_registerlink; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_registerlink" (id, code, status, user_id) FROM stdin;
1	2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3	0	8
\.


--
-- Data for Name: Users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_user" (id, password, last_login, is_superuser, email, first_name, last_name, birth_date, date_joined, is_active, avatar, deleted, generation, user_type, rol_type, is_staff, public_profile, created_at, updated_at) FROM stdin;
5	pbkdf2_sha256$120000$pShBSQGx6Z7A$SedZ9md9AZMA9tswdudUlRXQVzMa0FFyNKsRAdHRwgc=	\N	f	spam.dario@gmail.com	Alberto	Perez	1987-02-11	2020-06-28 22:32:19.260394+00	t	avatars/avatarCropped.png	f		1	2	f	t	2020-06-28 22:32:19+00	2020-06-28 22:36:35.390081+00
1	pbkdf2_sha256$120000$Jim4ZTWcNdI9$609fHEDuR39en27zUQYEaofct5FuSL5HkS9FoLHqFN4=	2020-07-01 16:23:31.164749+00	t	dario@leit.cl	Dario	Palma	2000-01-01	2020-03-14 14:25:02.430542+00	t	avatars/profil.jpg	f		3	6	t	t	2020-03-14 14:25:02+00	2020-06-28 22:52:25.915192+00
8	pbkdf2_sha256$120000$Q36NeqmoU74r$7E57chX3lbuXT/hRjYoVS49AGtJlKjRqYrquxfimdzw=	2020-08-15 02:00:54.952384+00	t	isaiasvenegasalmonacid@gmail.com	Isaias	Venegas	1997-11-23	2020-06-29 20:45:04.088893+00	t	avatars/canva-photo-editor1.png	f		3	1	t	t	2020-06-29 20:45:04+00	2020-06-29 20:45:04+00
7	pbkdf2_sha256$120000$y6OIF6cjy95q$d17MR4TA1CcWvqdvCfRR1l1T5MHMUj6nadCbsZrrnWQ=	\N	f	maria.bollo@ug.uchile.cl	Don	Gato	1996-12-12	2020-06-28 22:35:10.366035+00	t	avatars/ACXM0860.JPG	f		1	1	f	t	2020-06-28 22:35:10+00	2020-06-29 21:32:31.96471+00
3	pbkdf2_sha256$120000$w5dAO9PK3ccl$aD5pxCuUZUswUWPkXlx1p2EaPWk1yU5XA7ZfZ+JtrHk=	\N	t	m.victoria1263@gmail.com	Victoria	Bollo	1996-12-12	2020-03-14 15:26:15.855321+00	t	avatars/1-OAN-1852-copia.jpg	f		3	1	t	t	2020-03-14 15:26:15+00	2020-03-14 15:45:47+00
4	pbkdf2_sha256$120000$E9x8EkHjJrfs$x0/wV8YW1UJMnxV/mVvipbfQuiYQ8piF4MF+3Ij6BFY=	\N	t	rafael.castillo@uchile.cl	Rafael	Castillo	1970-03-22	2020-03-24 22:51:25.57766+00	t	avatars/Captura_de_pantalla_2020-03-24_a_las_19.53.22.png	f		3	5	t	t	2020-03-24 22:51:25+00	2020-03-24 22:53:45.895601+00
6	pbkdf2_sha256$120000$3I4vZnOztLLz$mcZ2ycj3sum0JczpBoMbUn9xJaqL39gOFWbCwsM0uxk=	\N	f	dpalma@dcc.uchile.cl	Camilo	Vasquez	1987-02-11	2020-06-28 22:33:11.388996+00	t	avatars/avatarCropped_jQL7RJL.png	f		1	6	f	t	2020-06-28 22:33:11+00	2020-06-28 22:51:30.677524+00
\.


--
-- Data for Name: Users_user_albums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_user_albums" (id, user_id, album_id) FROM stdin;
1	1	1
2	3	2
3	3	3
4	1	4
5	5	5
6	8	6
7	5	9
\.


--
-- Data for Name: Users_user_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_user_comments" (id, user_id, comment_id) FROM stdin;
1	7	1
2	1	2
3	5	3
4	5	4
5	5	5
6	1	6
7	7	7
8	7	8
9	7	9
10	7	10
11	5	11
12	7	12
13	7	13
14	7	14
15	6	15
16	7	16
17	7	17
18	7	18
19	7	19
20	7	20
21	6	21
22	7	22
23	7	23
24	7	24
26	7	26
27	7	27
28	6	28
29	6	29
30	3	30
31	6	31
32	3	32
33	1	33
34	5	34
35	3	35
36	6	36
37	1	37
38	3	38
39	5	39
40	1	40
41	3	41
42	6	42
43	6	43
44	1	44
45	7	45
46	7	46
47	7	47
48	7	48
49	7	49
50	7	50
51	7	51
52	7	52
\.


--
-- Data for Name: Users_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_user_groups" (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: Users_user_photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_user_photos" (id, user_id, photo_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	3	4
5	3	5
6	3	6
7	3	7
8	3	8
9	3	9
10	3	10
11	3	11
12	3	12
13	3	13
14	3	14
15	3	15
16	3	16
17	3	17
18	3	18
19	3	19
20	3	20
21	3	21
22	3	22
23	3	23
24	3	24
25	3	25
26	1	26
27	3	27
28	3	28
29	3	29
30	3	30
31	3	31
32	3	32
33	3	33
34	3	34
35	3	35
36	3	36
37	1	38
38	1	37
39	1	39
40	1	40
41	1	41
42	1	42
43	1	43
44	1	44
45	1	45
46	3	46
47	3	47
48	3	48
49	3	49
50	3	50
51	3	51
52	3	52
53	3	53
54	3	54
55	3	55
56	3	56
57	3	57
58	3	58
59	3	59
60	3	60
61	3	61
62	3	62
63	3	64
64	3	65
65	3	66
66	3	67
67	1	68
68	1	69
69	1	70
70	1	71
71	1	72
72	1	73
73	5	75
74	5	76
75	5	77
76	8	78
77	8	79
78	8	80
79	8	81
80	8	82
81	8	83
82	8	84
83	8	85
84	8	86
85	8	87
86	8	88
87	8	89
88	8	90
89	8	91
90	8	92
91	8	93
92	8	94
93	8	95
94	8	96
95	8	97
96	8	98
103	8	105
104	8	106
105	8	107
106	8	108
107	8	109
108	8	110
109	8	111
110	8	112
111	8	113
112	8	114
113	8	115
114	8	116
115	8	117
116	8	118
117	8	119
118	5	120
119	5	121
120	5	122
\.


--
-- Data for Name: Users_user_report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_user_report" (id, user_id, reporte_id) FROM stdin;
1	1	1
2	3	5
3	8	6
4	1	10
\.


--
-- Data for Name: Users_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_user_user_permissions" (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: WebAdmin_contactrequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WebAdmin_contactrequest" (id, first_name, last_name, phone_number, email, message, resolved, email_sent, created_at, reply, updated_at) FROM stdin;
1	Carlos	Silva	931178484	csilva@gmail.com	Me gustaria sabe si estan buscando expandir su equipo con estudiantes de otras universidades	f	f	2020-07-01 04:36:06.647079+00		2020-07-01 04:36:06.647087+00
2	Carlos	Silva	931178484	csilva@gmail.com	Me gustaria sabe si estan buscando expandir su equipo con estudiantes de otras universidades	f	f	2020-07-01 04:36:06.680038+00		2020-07-01 04:36:06.680045+00
\.


--
-- Data for Name: WebAdmin_landingcaroussel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WebAdmin_landingcaroussel" (id) FROM stdin;
1
\.


--
-- Data for Name: WebAdmin_landingcaroussel_news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WebAdmin_landingcaroussel_news" (id, landingcaroussel_id, news_id) FROM stdin;
1	1	1
2	1	2
3	1	3
\.


--
-- Data for Name: WebAdmin_news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WebAdmin_news" (id, title, subtitle, content, image, created_at, updated_at) FROM stdin;
3	Premiación a nuestros profesores	por sus más de 20 años de servicio docente.	En mayo, y como es tradición desde el año 1991, Ingeniería Industrial premió a los profesores y estudiantes que tuvieron un desempeño destacado durante el año 2016.\r\n\r\nLa ceremonia, uno de los actos más importantes del Departamento que organiza Pregrado, con la colaboración de Tutoría, contó con la presencia de las autoridades de la Universidad de Chile. Entre ellas, Aldo Casali, Director de la Escuela de Ingeniería y Ciencias, quien la presidió; Fernando Ordóñez, Director de Ingeniería Industrial; Juan Velásquez, Director de Docencia del Departamento, y Franco Amigo, Presidente del Centro de Estudiantes de Ingeniería Industrial (CEIN), además de profesores, funcionarios, alumnos, personal de colaboración, familiares e invitados especiales.	webadmin/ea96c7413c5c4eec8d44ecb0485f66b6.jpg	2020-02-24 19:04:02+00	2020-02-24 19:04:02+00
2	Actividad: Beauchef Inexplorado	Larga tradición beauchefiana	El miércoles 1 de Julio la  Biblioteca Central realizó un Tour virtual "Beauchef Inexplorado", guiado por el Profesor Patricio Aceituno, donde se revelaró la historia patrimonial y los secretos que guarda Beauchef 850.\r\n\r\nLa actividad fue todo un éxito con los estudiantes actuales y estudiantes egresados nostálgicos.	webadmin/4f898c8275454d628951e70f7130a8cf.jpg	2020-02-24 19:03:12+00	2020-02-24 19:03:12+00
1	Lanzamiento de Memoria Fotográfica	Gran lanzamiento	Se abre la plataforma Memoria Fotográfica en la FCFM con el objetivo de recuperar las experiencias de sus estudiantes, docentes y funcionarios. Todos son bienvenidos a participar de esta comunidad beauchefiana. Este mes nos encontramos a la búsqueda de fotografías de los años 40. La mejor fotografía será recompensada.	webadmin/5f245e6bc86e47439ca4b4bf71434f62.jpg	2020-02-24 19:00:12+00	2020-02-24 19:00:12+00
\.


--
-- Data for Name: WebAdmin_photorequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WebAdmin_photorequest" (id, reason, first_name, last_name, identity_document, profession, address, district, phone_number, email, institution, resolved, approved, created_at, updated_at) FROM stdin;
2	Me gustaría escribir una columna de opinión sobre las actividades realcionadas a robótica, para ello quisiera incluir esta imagen.	Mario	Hugo	272893784	Periodista	los molinos	Santiago centro	98643963	m.victoria1263@gmail.com	TVN	f	f	2020-06-29 21:43:41.987704+00	2020-06-29 21:43:41.987709+00
3	Hola, estoy realizando una recopilación fotográfica de poetas de Chile, donde quisiera incluir esta foto de Nicanor Parra.	Camilo	Pérez	203452942	Periodista	santa lucía	Santiago centro	78721983	m.victoria1263@gmail.com	Biblioteca nacional	f	f	2020-06-29 21:58:06.889657+00	2020-06-29 21:58:06.889668+00
1	Quisiera exhibir la obra ingenieril en in congreso, me gusta esta captura ya que se puede apreciar la escalera desde un ángulo crítico para la construcción.	vicky	bacán	12121212-1	Ingeniera	Beauchef 850	Santiago centro	78721983	maria.bollo@ug.uchile.cl	Universidad de chile	t	t	2020-06-29 21:30:12.212095+00	2020-06-29 21:30:12.212102+00
4	Quisiera obtener estas fotos para exponerlas en un trabajo del colegio	Juanin	Harry	19829954-5	Estudiante	Pasaje San Adolfo 2935	Puente Alto	957221778	isaias.venegas@ug.uchile.cl	Colegio De Chile	t	t	2020-06-29 22:47:55.869778+00	2020-06-29 22:47:55.869783+00
\.


--
-- Data for Name: WebAdmin_photorequest_photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WebAdmin_photorequest_photos" (id, photorequest_id, photo_id) FROM stdin;
1	1	6
2	2	41
3	3	24
4	4	91
5	4	92
6	4	93
7	4	94
8	4	95
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add user	1	add_user
2	Can change user	1	change_user
3	Can delete user	1	delete_user
4	Can view user	1	view_user
5	Can add album	2	add_album
6	Can change album	2	change_album
7	Can delete album	2	delete_album
8	Can view album	2	view_album
9	Can add category	3	add_category
10	Can change category	3	change_category
11	Can delete category	3	delete_category
12	Can view category	3	view_category
13	Can add comment	4	add_comment
14	Can change comment	4	change_comment
15	Can delete comment	4	delete_comment
16	Can view comment	4	view_comment
17	Can add photo	5	add_photo
18	Can change photo	5	change_photo
19	Can delete photo	5	delete_photo
20	Can view photo	5	view_photo
21	Can add reporte	6	add_reporte
22	Can change reporte	6	change_reporte
23	Can delete reporte	6	delete_reporte
24	Can view reporte	6	view_reporte
25	Can add iptc keyword	7	add_iptckeyword
26	Can change iptc keyword	7	change_iptckeyword
27	Can delete iptc keyword	7	delete_iptckeyword
28	Can view iptc keyword	7	view_iptckeyword
29	Can add metadata	8	add_metadata
30	Can change metadata	8	change_metadata
31	Can delete metadata	8	delete_metadata
32	Can view metadata	8	view_metadata
33	Can add contact request	9	add_contactrequest
34	Can change contact request	9	change_contactrequest
35	Can delete contact request	9	delete_contactrequest
36	Can view contact request	9	view_contactrequest
37	Can add landing caroussel	10	add_landingcaroussel
38	Can change landing caroussel	10	change_landingcaroussel
39	Can delete landing caroussel	10	delete_landingcaroussel
40	Can view landing caroussel	10	view_landingcaroussel
41	Can add news	11	add_news
42	Can change news	11	change_news
43	Can delete news	11	delete_news
44	Can view news	11	view_news
45	Can add photo request	12	add_photorequest
46	Can change photo request	12	change_photorequest
47	Can delete photo request	12	delete_photorequest
48	Can view photo request	12	view_photorequest
49	Can add log entry	13	add_logentry
50	Can change log entry	13	change_logentry
51	Can delete log entry	13	delete_logentry
52	Can view log entry	13	view_logentry
53	Can add permission	14	add_permission
54	Can change permission	14	change_permission
55	Can delete permission	14	delete_permission
56	Can view permission	14	view_permission
57	Can add group	15	add_group
58	Can change group	15	change_group
59	Can delete group	15	delete_group
60	Can view group	15	view_group
61	Can add content type	16	add_contenttype
62	Can change content type	16	change_contenttype
63	Can delete content type	16	delete_contenttype
64	Can view content type	16	view_contenttype
65	Can add session	17	add_session
66	Can change session	17	change_session
67	Can delete session	17	delete_session
68	Can view session	17	view_session
69	Can add auth token	18	add_authtoken
70	Can change auth token	18	change_authtoken
71	Can delete auth token	18	delete_authtoken
72	Can view auth token	18	view_authtoken
73	Can add kv store	19	add_kvstore
74	Can change kv store	19	change_kvstore
75	Can delete kv store	19	delete_kvstore
76	Can view kv store	19	view_kvstore
77	Can add register link	20	add_registerlink
78	Can change register link	20	change_registerlink
79	Can delete register link	20	delete_registerlink
80	Can view register link	20	view_registerlink
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2020-03-14 15:06:59.755055+00	1	dario@leit.cl	2	[{"changed": {"fields": ["first_name", "last_name", "avatar", "user_type", "public_profile"]}}]	1	1
2	2020-03-14 15:07:33.046453+00	2	spam@dario.cl	1	[{"added": {}}]	1	1
3	2020-03-14 15:07:59.206887+00	2	spam@dario.cl	3		1	1
4	2020-03-14 15:47:00.548826+00	3	m.victoria1263@gmail.com	2	[{"changed": {"fields": ["is_superuser", "user_type", "is_staff", "public_profile"]}}]	1	1
5	2020-03-14 15:47:31.90635+00	32	Metadata [Palabras Clave:nicanor parra]	2	[{"changed": {"fields": ["approved"]}}]	8	1
6	2020-03-14 15:47:41.391727+00	31	Metadata [Palabras Clave:cancha]	2	[{"changed": {"fields": ["approved"]}}]	8	1
7	2020-03-14 15:47:50.749981+00	30	Metadata [Palabras Clave:premiación]	2	[{"changed": {"fields": ["approved"]}}]	8	1
8	2020-03-14 15:47:58.962465+00	29	Metadata [Palabras Clave:profesores]	2	[{"changed": {"fields": ["approved"]}}]	8	1
9	2020-03-14 15:48:09.69072+00	28	Metadata [Palabras Clave:foto histórica]	2	[{"changed": {"fields": ["approved"]}}]	8	1
10	2020-03-14 15:50:10.418264+00	26	Metadata [Palabras Clave:inducción]	2	[{"changed": {"fields": ["approved"]}}]	8	1
11	2020-03-14 15:50:16.163144+00	21	Metadata [Palabras Clave:nicanor parra]	2	[{"changed": {"fields": ["approved"]}}]	8	1
12	2020-03-14 15:50:22.325685+00	24	Metadata [Palabras Clave:biblioteca]	2	[{"changed": {"fields": ["approved"]}}]	8	1
13	2020-03-14 15:50:39.07498+00	23	Metadata [Palabras Clave:toma feminista]	2	[{"changed": {"fields": ["approved"]}}]	8	1
14	2020-03-14 15:51:08.111534+00	18	Metadata [Palabras Clave:profesores]	2	[{"changed": {"fields": ["approved"]}}]	8	1
15	2020-03-14 15:51:14.379262+00	11	Metadata [Palabras Clave:piscina]	2	[{"changed": {"fields": ["approved"]}}]	8	1
16	2020-03-14 15:51:27.725663+00	22	Metadata [Palabras Clave:piscina]	2	[{"changed": {"fields": ["approved"]}}]	8	1
17	2020-03-14 15:51:34.191733+00	16	Metadata [Palabras Clave:mechoneo]	2	[{"changed": {"fields": ["approved"]}}]	8	1
18	2020-03-24 22:25:21.011895+00	25	Metadata [Lugar:Calán]	2	[{"changed": {"fields": ["metadata"]}}]	8	1
19	2020-03-24 22:25:32.381661+00	20	Metadata [Lugar:cancha]	2	[{"changed": {"fields": ["metadata"]}}]	8	1
20	2020-03-24 22:25:44.832378+00	32	Metadata [Persona:nicanor parra]	2	[{"changed": {"fields": ["metadata"]}}]	8	1
21	2020-03-24 22:37:58.966841+00	1	Metadata [Palabras Clave:Tag1]	2	[{"changed": {"fields": ["approved"]}}]	8	1
22	2020-03-24 22:38:04.783295+00	2	Metadata [Palabras Clave:Tag2]	2	[{"changed": {"fields": ["approved"]}}]	8	1
23	2020-03-24 22:38:11.448835+00	3	Metadata [Palabras Clave:Tag3]	2	[{"changed": {"fields": ["approved"]}}]	8	1
24	2020-03-24 22:38:17.419277+00	4	Metadata [Palabras Clave:Tag1]	2	[{"changed": {"fields": ["approved"]}}]	8	1
25	2020-03-24 22:38:37.890899+00	5	Metadata [Palabras Clave:Tag2]	2	[{"changed": {"fields": ["approved"]}}]	8	1
26	2020-03-24 22:39:08.625245+00	6	Metadata [Palabras Clave:Tag3]	2	[{"changed": {"fields": ["approved"]}}]	8	1
27	2020-03-24 22:48:05.291111+00	11	Metadata [Palabras Clave:piscina]	2	[{"changed": {"fields": ["approved"]}}]	8	1
28	2020-03-24 22:51:56.622033+00	4	rafael.castillo@uchile.cl	2	[{"changed": {"fields": ["is_superuser", "user_type", "is_staff", "public_profile"]}}]	1	1
29	2020-06-28 21:50:24.065431+00	2	Album Corrida beauchef	1	[{"added": {}}]	2	1
30	2020-06-28 21:50:45.716232+00	2	Album Corrida beauchef	2	[{"changed": {"fields": ["collection", "thumbnail"]}}]	2	1
31	2020-06-28 21:51:18.362258+00	3	m.victoria1263@gmail.com	2	[{"changed": {"fields": ["albums"]}}]	1	1
32	2020-06-28 21:52:47.027659+00	1	Album Robotica en el AMTC	2	[{"changed": {"fields": ["collection"]}}]	2	1
33	2020-06-28 22:01:43.766297+00	27	Photo: Medalla de corrida beauchef	2	[{"changed": {"fields": ["title"]}}]	5	1
34	2020-06-28 22:02:04.60495+00	28	Photo: Entrega de números	2	[{"changed": {"fields": ["title"]}}]	5	1
35	2020-06-28 22:02:27.323751+00	29	Photo: Participantes de la corrida	2	[{"changed": {"fields": ["title"]}}]	5	1
36	2020-06-28 22:02:50.962685+00	30	Photo: Precalentamiento	2	[{"changed": {"fields": ["title"]}}]	5	1
37	2020-06-28 22:03:21.070366+00	33	Photo: Premiación corrida 2019	2	[{"changed": {"fields": ["title"]}}]	5	1
38	2020-06-28 22:03:44.727514+00	36	Photo: Precalentamiento con zumba	2	[{"changed": {"fields": ["title"]}}]	5	1
39	2020-06-28 22:04:07.431993+00	35	Photo: Primer lugar femenino 2019	2	[{"changed": {"fields": ["title"]}}]	5	1
40	2020-06-28 22:04:34.782333+00	34	Photo: Premiación hombres 2019	2	[{"changed": {"fields": ["title"]}}]	5	1
41	2020-06-28 22:05:57.435728+00	42	Photo: Equipo Robots Nao	2	[{"changed": {"fields": ["title"]}}]	5	1
42	2020-06-28 22:06:23.779319+00	31	Photo: Corrida beauchef	2	[{"changed": {"fields": ["title"]}}]	5	1
43	2020-06-28 22:06:38.664748+00	32	Photo: Corrida beauchef	2	[{"changed": {"fields": ["title"]}}]	5	1
44	2020-06-28 22:08:52.107777+00	3	Album Profesores y personajes	1	[{"added": {}}]	2	1
45	2020-06-28 22:09:25.272011+00	3	Album Profesores y personajes	2	[{"changed": {"fields": ["thumbnail"]}}]	2	1
46	2020-06-28 22:09:40.733395+00	3	m.victoria1263@gmail.com	2	[{"changed": {"fields": ["albums"]}}]	1	1
47	2020-06-28 22:22:46.077777+00	3	Album Permios nacionales	2	[{"changed": {"fields": ["name"]}}]	2	1
48	2020-06-28 22:28:14.253705+00	74	Photo: Foto N-1 subida el 28-6-2020	3		5	1
49	2020-06-28 22:28:34.372695+00	63	Photo: Foto N-1 subida el 28-6-2020	3		5	1
50	2020-06-28 22:34:47.709766+00	5	spam.dario@gmail.com	2	[{"changed": {"fields": ["is_active", "public_profile"]}}]	1	1
51	2020-06-28 22:35:12.498146+00	6	dpalma@dcc.uchile.cl	2	[{"changed": {"fields": ["first_name", "last_name", "is_active", "public_profile"]}}]	1	1
52	2020-06-28 22:35:38.092342+00	7	maria.bollo@ug.uchile.cl	2	[{"changed": {"fields": ["is_active", "public_profile"]}}]	1	1
53	2020-06-28 22:54:15.818257+00	3	Album Premios nacionales	2	[{"changed": {"fields": ["name", "description"]}}]	2	1
54	2020-06-29 23:22:00.397124+00	8	isaiasvenegasalmonacid@gmail.com	2	[{"changed": {"fields": ["is_superuser", "is_staff"]}}]	1	1
55	2020-06-29 23:29:22.498815+00	8	isaiasvenegasalmonacid@gmail.com	2	[{"changed": {"fields": ["user_type"]}}]	1	1
56	2020-06-29 23:31:53.506453+00	104	Photo: Gustavo Lira	3		5	8
57	2020-06-29 23:31:53.508768+00	103	Photo: Francisco Mardones	3		5	8
58	2020-06-29 23:31:53.510337+00	102	Photo: Manuel Trucco Franzani	3		5	8
59	2020-06-29 23:31:53.512029+00	101	Photo: Carlos Gregorio Avalos Varela	3		5	8
60	2020-06-29 23:31:53.51349+00	100	Photo: Andrés Antonio Gorbea	3		5	8
61	2020-06-29 23:31:53.514899+00	99	Photo: Uldaricio Prado Bustamante	3		5	8
62	2020-06-30 00:16:24.812062+00	7	Album Decanos	1	[{"added": {}}]	2	1
63	2020-06-30 00:17:27.846604+00	7	Album Decanos	2	[{"changed": {"fields": ["thumbnail"]}}]	2	1
64	2020-06-30 00:19:26.345952+00	8	Album Conceptos de Beauchef 851	1	[{"added": {}}]	2	1
65	2020-06-30 00:21:05.925939+00	8	Album Conceptos de Beauchef 851	2	[{"changed": {"fields": ["pictures"]}}]	2	1
66	2020-07-01 02:20:48.775105+00	3	Noticia: Premiación a nuestros profesores con imagen subida el 2020-02-24 16:04:02-03:00	2	[{"changed": {"fields": ["content"]}}]	11	1
67	2020-07-01 02:26:29.253082+00	2	Noticia: Actividad: Beauchef Inexplorado con imagen subida el 2020-02-24 16:03:12-03:00	2	[{"changed": {"fields": ["title", "content"]}}]	11	1
68	2020-07-01 02:30:14.946879+00	1	Noticia: Lanzamiento de Memoria Fotográfica con imagen subida el 2020-02-24 16:00:12-03:00	2	[{"changed": {"fields": ["title", "content"]}}]	11	1
69	2020-07-01 02:31:29.272041+00	1	Noticia: Lanzamiento de Memoria Fotográfica con imagen subida el 2020-02-24 16:00:12-03:00	2	[{"changed": {"fields": ["content"]}}]	11	1
70	2020-07-01 02:36:00.458002+00	73	Photo: Rol beauchef	2	[{"changed": {"fields": ["created_at"]}}]	5	1
71	2020-07-01 02:36:22.33793+00	72	Photo: Rol beauchef	2	[{"changed": {"fields": ["created_at"]}}]	5	1
72	2020-07-01 02:36:42.622442+00	71	Photo: Rol beauchef	2	[{"changed": {"fields": ["created_at"]}}]	5	1
73	2020-07-01 02:36:59.718808+00	70	Photo: Rol beauchef	2	[{"changed": {"fields": ["created_at"]}}]	5	1
74	2020-07-01 02:37:14.304164+00	69	Photo: Rol beauchef	2	[{"changed": {"fields": ["created_at"]}}]	5	1
75	2020-07-01 02:38:13.120914+00	67	Photo: Sismografo	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
76	2020-07-01 02:38:36.523997+00	66	Photo: Clases de Nicanor	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
77	2020-07-01 02:39:01.015022+00	65	Photo id: 65 uploaded at 2020-05-13 18:10:33-04:00	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
78	2020-07-01 02:39:20.395737+00	64	Photo id: 64 uploaded at 2020-05-13 18:10:31-04:00	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
79	2020-07-01 02:39:46.995001+00	62	Photo id: 62 uploaded at 2020-05-13 18:10:30-04:00	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
80	2020-07-01 02:40:22.785682+00	61	Photo: Observatorio en Cerro Calán	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
81	2020-07-01 02:40:41.387437+00	60	Photo id: 60 uploaded at 2020-05-13 18:10:29-04:00	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
82	2020-07-01 02:41:15.845801+00	59	Photo id: 59 uploaded at 2020-05-13 18:10:29-04:00	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
83	2020-07-01 02:41:42.96858+00	58	Photo: Generaciones pasadas	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
84	2020-07-01 02:42:30.070168+00	56	Photo: Servet Martinez	2	[{"changed": {"fields": ["title", "description", "created_at"]}}]	5	1
85	2020-07-01 02:43:13.91153+00	50	Photo: José Maza	2	[{"changed": {"fields": ["title", "description", "created_at"]}}]	5	1
86	2020-07-01 02:43:36.19403+00	52	Photo: Manuel del Pino	2	[{"changed": {"fields": ["title", "created_at"]}}]	5	1
87	2020-07-01 02:44:38.533584+00	1	Comentario: "Wow! Es la mona, el clásico lugar de encuentro jaj..."	2	[{"changed": {"fields": ["updated_at"]}}]	4	1
88	2020-07-01 02:44:49.729294+00	2	Comentario: "Ohhh yo recuerdo cuando computación tenía muchos p..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
89	2020-07-01 02:45:26.258843+00	3	Comentario: "Efectivamente, antes trabajamos con Terminales fís..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
90	2020-07-01 02:45:37.155177+00	4	Comentario: "No se realizaban tantas actividades cuando estaba ..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
91	2020-07-01 02:45:54.241911+00	5	Comentario: "Yo tuve clases con él cuando tomé el electivo de a..."	2	[{"changed": {"fields": ["updated_at"]}}]	4	1
92	2020-07-01 02:46:04.982298+00	6	Comentario: "Oye esa foto la tomé yo! la sacaste de Flickr ???..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
93	2020-07-01 02:46:19.406537+00	8	Comentario: "recuerdo que fue mi profesor..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
94	2020-07-01 02:46:30.091963+00	9	Comentario: "muy simpático Mario, siempre dispuesto a resolver ..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
95	2020-07-01 02:46:39.328171+00	10	Comentario: "Seca!..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
96	2020-07-01 02:46:49.630316+00	11	Comentario: "Mi abuelo es el de más a la derecha en la fila de ..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
97	2020-07-01 02:46:59.969471+00	12	Comentario: "Recuerdo las clases de Mecánica Estadística, al pr..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
98	2020-07-01 02:47:40.024746+00	13	Comentario: "qué bonitos..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
99	2020-07-01 02:47:51.680492+00	14	Comentario: "cuándo se repetirá esta actividad?..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
100	2020-07-01 02:48:05.041655+00	15	Comentario: "Increible como ha evolucionado la técnologia ......"	2	[{"changed": {"fields": ["created_at"]}}]	4	1
101	2020-07-01 02:48:16.955484+00	16	Comentario: "ojalá haya feria del postulante este año :(..."	2	[{"changed": {"fields": ["created_at"]}}]	4	1
102	2020-07-01 03:01:26.816747+00	9	Album Fotos de mi abuelo	2	[{"changed": {"fields": ["name"]}}]	2	1
103	2020-07-01 03:10:53.563696+00	26	Photo: Cumpleaños con amigos	2	[{"changed": {"fields": ["title", "approved"]}}]	5	1
104	2020-07-01 03:16:04.645572+00	66	Photo: Clases de Nicanor	2	[{"changed": {"fields": ["metadata"]}}]	5	1
105	2020-07-01 03:17:52.206015+00	24	Photo: Nicanor	2	[{"changed": {"fields": ["title", "description", "metadata"]}}]	5	1
106	2020-07-01 04:31:05.161868+00	8	isaiasvenegasalmonacid@gmail.com	2	[{"changed": {"fields": ["avatar"]}}]	1	1
107	2020-07-01 04:32:37.483413+00	8	isaiasvenegasalmonacid@gmail.com	2	[{"changed": {"fields": ["avatar"]}}]	1	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	Users	user
2	Gallery	album
3	Gallery	category
4	Gallery	comment
5	Gallery	photo
6	Gallery	reporte
7	MetaData	iptckeyword
8	MetaData	metadata
9	WebAdmin	contactrequest
10	WebAdmin	landingcaroussel
11	WebAdmin	news
12	WebAdmin	photorequest
13	admin	logentry
14	auth	permission
15	auth	group
16	contenttypes	contenttype
17	sessions	session
18	knox	authtoken
19	thumbnail	kvstore
20	Users	registerlink
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	MetaData	0001_initial	2020-03-14 14:24:41.649515+00
2	Gallery	0001_initial	2020-03-14 14:24:42.00634+00
3	contenttypes	0001_initial	2020-03-14 14:24:42.033278+00
4	contenttypes	0002_remove_content_type_name	2020-03-14 14:24:42.053257+00
5	auth	0001_initial	2020-03-14 14:24:42.162339+00
6	auth	0002_alter_permission_name_max_length	2020-03-14 14:24:42.174147+00
7	auth	0003_alter_user_email_max_length	2020-03-14 14:24:42.181099+00
8	auth	0004_alter_user_username_opts	2020-03-14 14:24:42.188687+00
9	auth	0005_alter_user_last_login_null	2020-03-14 14:24:42.198556+00
10	auth	0006_require_contenttypes_0002	2020-03-14 14:24:42.2011+00
11	auth	0007_alter_validators_add_error_messages	2020-03-14 14:24:42.217349+00
12	auth	0008_alter_user_username_max_length	2020-03-14 14:24:42.230129+00
13	auth	0009_alter_user_last_name_max_length	2020-03-14 14:24:42.237771+00
14	Users	0001_initial	2020-03-14 14:24:42.550736+00
15	WebAdmin	0001_initial	2020-03-14 14:24:42.724638+00
16	admin	0001_initial	2020-03-14 14:24:42.795944+00
17	admin	0002_logentry_remove_auto_add	2020-03-14 14:24:42.8463+00
18	admin	0003_logentry_add_action_flag_choices	2020-03-14 14:24:42.867231+00
19	knox	0001_initial	2020-03-14 14:24:42.9238+00
20	knox	0002_auto_20150916_1425	2020-03-14 14:24:43.001878+00
21	knox	0003_auto_20150916_1526	2020-03-14 14:24:43.044748+00
22	knox	0004_authtoken_expires	2020-03-14 14:24:43.067758+00
23	knox	0005_authtoken_token_key	2020-03-14 14:24:43.112103+00
24	knox	0006_auto_20160818_0932	2020-03-14 14:24:43.162895+00
25	sessions	0001_initial	2020-03-14 14:24:43.210015+00
26	thumbnail	0001_initial	2020-03-14 14:24:43.246766+00
27	Gallery	0002_auto_20200629_1624	2020-06-29 20:24:14.520489+00
28	Users	0002_auto_20200629_1624	2020-06-29 20:24:14.62403+00
29	WebAdmin	0002_auto_20200629_1624	2020-06-29 20:24:14.719368+00
30	Gallery	0003_auto_20200630_2304	2020-07-01 03:05:08.882384+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
h1gu56jq005jtv6ajxtupd9otb8muaip	MjM5NTU5NzQzMjM5YTZmMDAzZWExZWI2YzMyYjgxZGRmYWNmYzNjYjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2MGE1NzA3MWJjNjAwMjU2Yjg1NGZjMDU2ZjVmYWMzNTliZTQ5NjcyIn0=	2020-03-28 15:03:10.951387+00
h2ivg5r7md0g5xju5fo8j49flvyw9ril	MjM5NTU5NzQzMjM5YTZmMDAzZWExZWI2YzMyYjgxZGRmYWNmYzNjYjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2MGE1NzA3MWJjNjAwMjU2Yjg1NGZjMDU2ZjVmYWMzNTliZTQ5NjcyIn0=	2020-07-12 20:30:05.92557+00
dl7r0yokrjarm7yl1ix8yuy59bf20yyn	MjM5NTU5NzQzMjM5YTZmMDAzZWExZWI2YzMyYjgxZGRmYWNmYzNjYjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2MGE1NzA3MWJjNjAwMjU2Yjg1NGZjMDU2ZjVmYWMzNTliZTQ5NjcyIn0=	2020-07-13 23:21:45.182133+00
d8v70wuhnuk7k7n5i7nv1tm68oheuq39	Y2IyNDMwY2Y2MzEwOTVjMzI3ZGI1M2M4MDg5MDdhOWEwNzdkZTFjNTp7Il9hdXRoX3VzZXJfaWQiOiI4IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwNjYwNjE3ZDU5MzNmYTNjNzQ3NGFlZmI0NzU1ZTRmNzQ2Yzg5YTlhIn0=	2020-07-13 23:30:25.580148+00
26vbzoyus1snnpu4nceug4n4q7ijjrtl	MjM5NTU5NzQzMjM5YTZmMDAzZWExZWI2YzMyYjgxZGRmYWNmYzNjYjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2MGE1NzA3MWJjNjAwMjU2Yjg1NGZjMDU2ZjVmYWMzNTliZTQ5NjcyIn0=	2020-07-15 04:29:57.447651+00
vwbn8990uw9l8ndan5vdcosn8tv27vvn	MjM5NTU5NzQzMjM5YTZmMDAzZWExZWI2YzMyYjgxZGRmYWNmYzNjYjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2MGE1NzA3MWJjNjAwMjU2Yjg1NGZjMDU2ZjVmYWMzNTliZTQ5NjcyIn0=	2020-07-15 16:23:31.166954+00
y56t99ufyi7d1ni2a6cu55zn9ptua3fm	Y2IyNDMwY2Y2MzEwOTVjMzI3ZGI1M2M4MDg5MDdhOWEwNzdkZTFjNTp7Il9hdXRoX3VzZXJfaWQiOiI4IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwNjYwNjE3ZDU5MzNmYTNjNzQ3NGFlZmI0NzU1ZTRmNzQ2Yzg5YTlhIn0=	2020-07-17 19:36:27.301348+00
f38p622kepc1b367icqlh4nlnyw44h45	Y2IyNDMwY2Y2MzEwOTVjMzI3ZGI1M2M4MDg5MDdhOWEwNzdkZTFjNTp7Il9hdXRoX3VzZXJfaWQiOiI4IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIwNjYwNjE3ZDU5MzNmYTNjNzQ3NGFlZmI0NzU1ZTRmNzQ2Yzg5YTlhIn0=	2020-08-29 02:00:54.954892+00
\.


--
-- Data for Name: knox_authtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knox_authtoken (digest, salt, created, user_id, expires, token_key) FROM stdin;
141e28e25c45878bd6ad7e423013a62ef7c7b04a09108a2528e62461d7f6213e2e0b19184d4e691f985fc000b41773b4bff1380c63ce1935e5494114806cc855	1b4680898604b420	2020-03-24 22:51:25.606253+00	4	2020-03-25 10:51:25.605912+00	212b8b56
3a4e83a42b67725abc9362942c37de7fa90821ae0c19e74c04f7ab315fc8f23612f1039fb01d27a9060349933b03fc5c5939e03ae8ba599b6d042a286d203573	7d1f9d68cdb4ec34	2020-03-24 22:52:27.462054+00	4	2020-03-25 10:52:27.4618+00	cc014132
acaee79d1f61babbd7b12bf8b561ef8b20ff15ca735c7ea6e8db09e8e4927ed26a309b16c042241d5b4604d6122b070aad6c520a36adc8fbf65461998665af81	7bac6d4ca7cd2abc	2020-06-28 22:47:12.047076+00	6	2020-06-29 10:47:12.046824+00	6121fa01
ce91ada7b6d8b6eb90f24fbe955cff27b5b2090f12887b469a8db7ff05e33dc3766a97cde98823cc3146d5c38aad7b805eddbf5d2f76c5837cb9f84812b7f3a6	b7fa61309f24f445	2020-06-29 21:22:01.701258+00	3	2020-06-30 09:22:01.700978+00	18dc1225
23edf7dbc730ac45627e0999e9d24c2cf049f32346e6e415eaec7a9f280e1f23fb50ba4551a780860f30545d92bc19da50f9eb963b1c08113fb80914c0ed6aff	84cb3943f92ce43d	2020-06-29 21:24:01.389471+00	7	2020-06-30 09:24:01.38922+00	4e33db3c
172427ba125375340c0e7f8fddb8276ca83d04d788aea411443491a9148995b8836735016ed95efa45805a1ce6b100600a2ad29b573119f200fd5175be2bf132	ddad2a556447a66d	2020-06-29 22:10:47.390549+00	3	2020-06-30 10:10:47.390294+00	4be9b47d
c78f09f87400dbc527c7452fb8214899cf0786fe97f2eed9e29cdc7308cb1d60e252f034253cdd01b97ca5c3c35cd01dec4301052cece1b6b89fbfc6694b1a28	2bc6090525aee664	2020-07-01 16:12:07.86431+00	5	2020-07-02 04:12:07.864053+00	2549bf5a
1e62e37160595cd5f2206679f1a300ba90f0f5b1600f16042834963b6184a596cc6a0a873ba4dee1f7d77134cfd0104ff0f12eb1ad4ea06a2870f6403201f22c	6f4199b1b6a66fe7	2020-07-01 16:45:34.557886+00	5	2020-07-02 04:45:34.557631+00	7e207368
3d710ba3dfa0a169294c6c94c9157017465b1ce8d80e6b2c1b50f79971f77eccb8fc7fcbefcca01008f6400abdd54a3e026e47121d307386324ee2750d13f8e3	e9c34311c7b59227	2020-07-01 19:59:24.684668+00	5	2020-07-02 07:59:24.684417+00	d075fa63
b4c91447c000818d85f099732ba1579e594e48a65a312f4292bec7aae88835b96e25769c04ae3c86ff8a91dca66eec647c3c465453697ac867118f9b3f2d2977	5f76052529780dd7	2020-10-22 22:03:11.474661+00	1	2020-10-23 10:03:11.474278+00	4c3920bb
be5dac8dfa926ed62453477f4ffb68bd0a516fec3e4c72b3bd25c804ed600daaee05266ec77b3b149161a48d4c03142496825966651a55d7955f0b2d1e4fa4a1	929cb8c18aa7a738	2020-10-22 22:04:01.854811+00	8	2020-10-23 10:04:01.854547+00	768b9690
\.


--
-- Data for Name: thumbnail_kvstore; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thumbnail_kvstore (key, value) FROM stdin;
sorl-thumbnail||image||f478b50b8ea53824775dc29d156a8de9	{"name": "5ac3ba4248fc4d7cae6762a9c300a85e.JPG", "storage": "django.core.files.storage.FileSystemStorage", "size": [4608, 3456]}
sorl-thumbnail||image||8e91cab6429ce543683b55fb09a768b4	{"name": "cache/e3/50/e3505fef6d0ce0a5a4e2fa4813b3e963.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||f478b50b8ea53824775dc29d156a8de9	["8e91cab6429ce543683b55fb09a768b4"]
sorl-thumbnail||image||64d609e19287c9c5a5a6f8bc33dfea13	{"name": "7f658686a23e4ca5be6d5ba2aa79556c.JPG", "storage": "django.core.files.storage.FileSystemStorage", "size": [4608, 3456]}
sorl-thumbnail||image||2fac678c43d7d5f4bd05f6f7c8f406bf	{"name": "cache/25/2b/252b2fac8d78813a0203ffa7f2c3c08d.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||64d609e19287c9c5a5a6f8bc33dfea13	["2fac678c43d7d5f4bd05f6f7c8f406bf"]
sorl-thumbnail||image||d52f457c7f341c20f947480ed13c5e9e	{"name": "9154effe322d4f2f9f969f90d837d308.JPG", "storage": "django.core.files.storage.FileSystemStorage", "size": [4608, 3456]}
sorl-thumbnail||image||a97de67b48a5a7ba27eb95e8e71a27be	{"name": "cache/ad/43/ad4315e1dcff94b44f7d3d5d427874c1.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||d52f457c7f341c20f947480ed13c5e9e	["a97de67b48a5a7ba27eb95e8e71a27be"]
sorl-thumbnail||image||bc6a940079ad7b05001ecf5d27f2b152	{"name": "b09846d998214a5fa6693de477d1bac7.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1458, 1459]}
sorl-thumbnail||image||dd01c118d58f6c278c92d56e015413d7	{"name": "cache/ac/a4/aca4364bae73a52af5f16daa35231aeb.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [479, 480]}
sorl-thumbnail||thumbnails||bc6a940079ad7b05001ecf5d27f2b152	["dd01c118d58f6c278c92d56e015413d7"]
sorl-thumbnail||image||8f5d1caf91ccafc8da7b4d0a73d180b6	{"name": "9b2063fcc60847978ecc6978da31b847.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [240, 320]}
sorl-thumbnail||image||09198ac30bcb74c3c3d71988b3d39a19	{"name": "cache/b3/f2/b3f2ca7a2ab7b626219a41ce48b4b08e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [360, 480]}
sorl-thumbnail||thumbnails||8f5d1caf91ccafc8da7b4d0a73d180b6	["09198ac30bcb74c3c3d71988b3d39a19"]
sorl-thumbnail||image||6637f3207f19b494ada21789afcd8360	{"name": "1b2d13df6f3a46c0931902ba40436555.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1510, 1000]}
sorl-thumbnail||image||8efd1c3a41c9716dd23dba61b8fbacae	{"name": "cache/ec/be/ecbe79b82cdd71e6183bcdd506467e3b.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [724, 480]}
sorl-thumbnail||thumbnails||6637f3207f19b494ada21789afcd8360	["8efd1c3a41c9716dd23dba61b8fbacae"]
sorl-thumbnail||image||e6a78ec4d646ab22ac0078c84d3238b4	{"name": "34109c9dbe5f43098e5cd7d5cc78e134.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 320]}
sorl-thumbnail||image||5dc74385a7bc9648de47772dda4b2797	{"name": "cache/8a/ce/8ace0cfaafe6456e582dbdbd149a533c.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||e6a78ec4d646ab22ac0078c84d3238b4	["5dc74385a7bc9648de47772dda4b2797"]
sorl-thumbnail||image||065c2d75db781345dc3da148e9a9bee5	{"name": "61b0e8efda724ead8006c96d57507416.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 530]}
sorl-thumbnail||image||e4d99f2e2a2c703b497754b21ac7ec40	{"name": "cache/65/82/65822cc11ae17c195091edc90f91ba07.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [724, 480]}
sorl-thumbnail||thumbnails||065c2d75db781345dc3da148e9a9bee5	["e4d99f2e2a2c703b497754b21ac7ec40"]
sorl-thumbnail||image||48e7c0c708452492e85c68e1e0481238	{"name": "e9d5bb22a0e34aaa8cd38ba78baf7bd4.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 530]}
sorl-thumbnail||image||4bfbe59dfea790eaa9817476d249a054	{"name": "cache/0f/eb/0feb5838880c28aa92a91226f6afe700.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [724, 480]}
sorl-thumbnail||thumbnails||48e7c0c708452492e85c68e1e0481238	["4bfbe59dfea790eaa9817476d249a054"]
sorl-thumbnail||image||179611f83e699c54435326dca42bf644	{"name": "b4116317c0994f9c8360fda8be85c664.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 530]}
sorl-thumbnail||image||03bab82fb9455a547e1b7a27e7f07248	{"name": "cache/08/3f/083fad4f83f94b6b144365e8b7b41536.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [724, 480]}
sorl-thumbnail||thumbnails||179611f83e699c54435326dca42bf644	["03bab82fb9455a547e1b7a27e7f07248"]
sorl-thumbnail||image||ffd85318848dc09d296ad36b497b9c74	{"name": "3a2f2cf8b1094c3b844ffcffc64904b0.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1200, 900]}
sorl-thumbnail||image||6a14b1410daf59732db489a82063e681	{"name": "cache/1a/11/1a1134b363a238f943c035e3f373c59f.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||ffd85318848dc09d296ad36b497b9c74	["6a14b1410daf59732db489a82063e681"]
sorl-thumbnail||image||29d12614c9c3597f82d362a124e23cc3	{"name": "63b234550f3d4ce2bdb538b4b54e5b43.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [276, 183]}
sorl-thumbnail||image||44241f56c34a32cfa35c5390e85f8a07	{"name": "cache/e5/63/e563f17955e37c29428d1815f6cd2d33.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [723, 480]}
sorl-thumbnail||thumbnails||29d12614c9c3597f82d362a124e23cc3	["44241f56c34a32cfa35c5390e85f8a07"]
sorl-thumbnail||image||c81c25cf035cac250354dbfacb66b32e	{"name": "dda51e8485a146d2a6984143b77e0aeb.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [960, 720]}
sorl-thumbnail||image||1383c01786940c42c95b7fff2cb1b09f	{"name": "cache/83/98/839847ec544ce0926f1a0f15fb42a282.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||c81c25cf035cac250354dbfacb66b32e	["1383c01786940c42c95b7fff2cb1b09f"]
sorl-thumbnail||image||a19dad79c9e45452b1920f8e0045fb71	{"name": "52273478abeb4bfea25bc07e0a004b26.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||4253225fc001d7e9a375a9452e522b63	{"name": "cache/08/2b/082bf8db1564a7ec786bf5ac624705c7.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||a19dad79c9e45452b1920f8e0045fb71	["4253225fc001d7e9a375a9452e522b63"]
sorl-thumbnail||image||8eed3222820b12e8377718114c8b1560	{"name": "df6533d629ac44a7b9650befe1386cdd.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [2048, 1296]}
sorl-thumbnail||image||45f4b983ce3710917391ed64f9ff2ff5	{"name": "cache/7b/14/7b14328664e4c1228ae482c9be607a07.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [758, 480]}
sorl-thumbnail||thumbnails||8eed3222820b12e8377718114c8b1560	["45f4b983ce3710917391ed64f9ff2ff5"]
sorl-thumbnail||image||681a423bd9f73b0d9986dabc62bce876	{"name": "d13fff451c124434ae830f877271bc49.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [300, 168]}
sorl-thumbnail||image||9080058a626f4d79ef7509547de34780	{"name": "cache/75/58/75587e9b1e12e8866d8191c508f63463.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [857, 480]}
sorl-thumbnail||thumbnails||681a423bd9f73b0d9986dabc62bce876	["9080058a626f4d79ef7509547de34780"]
sorl-thumbnail||image||e66cd2ff0800780bce909aa8df5de432	{"name": "c4624cc54c874e87b9ba3a0cbb9a49db.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1024, 683]}
sorl-thumbnail||image||5c658f74b62d4b7b698dd55e31b4ba3d	{"name": "cache/72/bf/72bf02ce16075b21e776132b47bd7454.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [719, 480]}
sorl-thumbnail||thumbnails||e66cd2ff0800780bce909aa8df5de432	["5c658f74b62d4b7b698dd55e31b4ba3d"]
sorl-thumbnail||image||83597239de7366d0c0a7aa945c317012	{"name": "8cb6e54de66145c78274e1823384ed17.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [700, 338]}
sorl-thumbnail||image||d295da0fb78015f9fadd7ede9aec8fcb	{"name": "cache/b6/cd/b6cd9bd132183d77e6fc3b5196dce66c.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [994, 480]}
sorl-thumbnail||thumbnails||83597239de7366d0c0a7aa945c317012	["d295da0fb78015f9fadd7ede9aec8fcb"]
sorl-thumbnail||image||e0d87cecde9aff887fff01bc3831ad90	{"name": "596d9023423049a2af5661e8ac8ba4cb.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [500, 315]}
sorl-thumbnail||image||e946fbb67185de80dc900d3a43d0d501	{"name": "cache/db/42/db42e93e14c2f0363959f50de25eef6b.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [761, 480]}
sorl-thumbnail||thumbnails||e0d87cecde9aff887fff01bc3831ad90	["e946fbb67185de80dc900d3a43d0d501"]
sorl-thumbnail||image||e958b50a5fd9a27fff954cf719c95187	{"name": "ac2f5dbb2adf4806beb0dcb717c8817f.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1024, 683]}
sorl-thumbnail||image||21605cb40c0c63dcf964d18b606b9549	{"name": "cache/97/ea/97eaa6c6541924c2f4da894a3cfb9f77.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [719, 480]}
sorl-thumbnail||thumbnails||e958b50a5fd9a27fff954cf719c95187	["21605cb40c0c63dcf964d18b606b9549"]
sorl-thumbnail||image||e0c050bc7058f9983e71f8d4ad7374b3	{"name": "3bd2b2c030e44f8195e44592b0101394.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [540, 344]}
sorl-thumbnail||image||99ea215cf521af514779f6fb72a15f95	{"name": "cache/36/eb/36ebfd651b4b00327df5f7a1b76bfe3e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [753, 480]}
sorl-thumbnail||thumbnails||e0c050bc7058f9983e71f8d4ad7374b3	["99ea215cf521af514779f6fb72a15f95"]
sorl-thumbnail||image||07ca6404863196cee701ce69c85a6bc5	{"name": "892bb7a186a647ea9e6e10ae89be5452.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [960, 1280]}
sorl-thumbnail||image||b5a02c9d538fe163eb97637fcd42ae13	{"name": "cache/d5/aa/d5aa147e6fc6acabf70fb0e721382be1.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [360, 480]}
sorl-thumbnail||thumbnails||07ca6404863196cee701ce69c85a6bc5	["b5a02c9d538fe163eb97637fcd42ae13"]
sorl-thumbnail||image||5f1ba1f00545174b9d2ab311c170564c	{"name": "9997da5c2bdf46ffb6ccde5406b1ff89.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1280, 960]}
sorl-thumbnail||image||9d7ed4cf75f7c6415ba1119573b496d8	{"name": "cache/43/a8/43a8593fd5bd29d2ef89dd70d931318a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||5f1ba1f00545174b9d2ab311c170564c	["9d7ed4cf75f7c6415ba1119573b496d8"]
sorl-thumbnail||image||7dba4f82a0f86c704411a789c6a8e000	{"name": "9e5ef45c2db64db49d8bc2d83b1a6ae3.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [710, 473]}
sorl-thumbnail||image||916e4e128514db1274ac44511a045012	{"name": "cache/78/f2/78f266140d9f94d76465e3e1b85da545.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||7dba4f82a0f86c704411a789c6a8e000	["916e4e128514db1274ac44511a045012"]
sorl-thumbnail||image||ad6c220af3ea744dafe6b8238124ab36	{"name": "f32d41d943cc4ea7aacbe0be98a85822.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [2000, 1325]}
sorl-thumbnail||image||443da2a5e11ed518013468f40f5ce271	{"name": "cache/3a/2f/3a2f33d0f743c595c2bcb177f86afdb9.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [724, 480]}
sorl-thumbnail||thumbnails||ad6c220af3ea744dafe6b8238124ab36	["443da2a5e11ed518013468f40f5ce271"]
sorl-thumbnail||image||d3b48a662de7253262f87ce361ebfe48	{"name": "dc82d92ed41e42e59720fc4d85e84788.JPG", "storage": "django.core.files.storage.FileSystemStorage", "size": [4608, 3456]}
sorl-thumbnail||image||c31faa5ea27fb0b26f6bcf1aa33cdeb2	{"name": "cache/cc/4f/cc4f4d64a667ac445c0a27c713190a7f.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||d3b48a662de7253262f87ce361ebfe48	["c31faa5ea27fb0b26f6bcf1aa33cdeb2"]
sorl-thumbnail||image||fac0d6728022c23e69ba8487ae27fd7d	{"name": "c80647fd27f84ff39b057596dae8ac80.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||2e301afb93c5b00ac7f7c16c594e4986	{"name": "cache/6f/8e/6f8ec9269f70f3a73c4867b193aee146.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||fac0d6728022c23e69ba8487ae27fd7d	["2e301afb93c5b00ac7f7c16c594e4986"]
sorl-thumbnail||image||330f44492547e73c11fa2510d2ccafbc	{"name": "da6ac1a49e38432b865974b3eee02695.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||ff2d394b0bfcda02c3a6832792c238f4	{"name": "cache/3b/2f/3b2f1e7f79c251e3312857ad044dfd6c.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||330f44492547e73c11fa2510d2ccafbc	["ff2d394b0bfcda02c3a6832792c238f4"]
sorl-thumbnail||image||3cbc1b1aaf018effaa00a65b79ff3ee5	{"name": "53af62f56c744ebcbdbfa18e12ae86c8.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||e169791f26d5566ec44d3510ca3df74d	{"name": "cache/3f/22/3f22130dd5bd729288b7964c7df23ab1.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||3cbc1b1aaf018effaa00a65b79ff3ee5	["e169791f26d5566ec44d3510ca3df74d"]
sorl-thumbnail||image||1ee558abf561f6b8334259e4d0143e79	{"name": "be5cf360d8934f1eb7013958fac2b47f.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||de13c2af60225c31d6fcc73a59456d46	{"name": "cache/53/50/53504214d0f3963ae5dc6957d5d83128.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||1ee558abf561f6b8334259e4d0143e79	["de13c2af60225c31d6fcc73a59456d46"]
sorl-thumbnail||image||6039366d6f6b636cc3b2a1af84d5d347	{"name": "37c58d7b5409475aa9b61089f0a931a6.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||209174a9b99c3ea98720ea2f82b2b833	{"name": "cache/64/0a/640aa634dd87ce157ffbd30940cd480a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||6039366d6f6b636cc3b2a1af84d5d347	["209174a9b99c3ea98720ea2f82b2b833"]
sorl-thumbnail||image||9e2dbf5cd296092fa33c26af4866735c	{"name": "0b78cd7f7f17437d8cebbd3e7051d045.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||cb4836e2a34a7e188edd48eccb28f4ae	{"name": "cache/20/11/20117447675686bc6f5f60f4d4b66b76.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||9e2dbf5cd296092fa33c26af4866735c	["cb4836e2a34a7e188edd48eccb28f4ae"]
sorl-thumbnail||image||8c2c6400696c354245016fcb1a147c73	{"name": "1e4ad1a6a1b3425dafde4715659e4c37.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||daf9a95eb5070191c477a6ba6804369f	{"name": "cache/d3/47/d3479971dbeaaf7ffe5725dacebbd471.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||8c2c6400696c354245016fcb1a147c73	["daf9a95eb5070191c477a6ba6804369f"]
sorl-thumbnail||image||483b6f9f201375eba72a26056fb17125	{"name": "c0743f7ca7924573945bddb3c74625c3.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||838f44a16e7858e5d064083ccf66a1ba	{"name": "cache/e5/00/e50067c33b67d7be40728318182c93e1.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||483b6f9f201375eba72a26056fb17125	["838f44a16e7858e5d064083ccf66a1ba"]
sorl-thumbnail||image||9180e07c2175331aea9a883db050046c	{"name": "5bb1f0ae9dd545b092e7a6c051622816.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||5594a92310e26db565a1d63a40ee1d6f	{"name": "cache/ac/22/ac229ed2b30e15cb8b3c66bfad740ac3.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||9180e07c2175331aea9a883db050046c	["5594a92310e26db565a1d63a40ee1d6f"]
sorl-thumbnail||image||bc042feda1e4944fe944371b9467c603	{"name": "9ba41fc31da0498099b27ff02aff70bc.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 533]}
sorl-thumbnail||image||6b76ddf09cb63749fbbce2cbc1078807	{"name": "cache/af/e8/afe85d4de2dbb70e3abccad607e982b3.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [720, 480]}
sorl-thumbnail||thumbnails||bc042feda1e4944fe944371b9467c603	["6b76ddf09cb63749fbbce2cbc1078807"]
sorl-thumbnail||image||dfe916052dc9a8b7617adf34d332973f	{"name": "89bb039eccb24924b836bc9bf50bd57c.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1024, 681]}
sorl-thumbnail||image||c20ee5c698b610e6f198aebf44d5c679	{"name": "cache/ab/78/ab781d66015451a90fd1439c2bccc26f.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [721, 480]}
sorl-thumbnail||image||07c8e864fcf9ad71b9920a59af81e8ce	{"name": "560ccaaec6584b3aaa6a17419d71c392.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1357, 2048]}
sorl-thumbnail||thumbnails||dfe916052dc9a8b7617adf34d332973f	["c20ee5c698b610e6f198aebf44d5c679"]
sorl-thumbnail||image||4b67405daffa4eb9b597de8537e36734	{"name": "cache/bf/16/bf169236fa92754084983b51cfe4445e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [318, 480]}
sorl-thumbnail||thumbnails||07c8e864fcf9ad71b9920a59af81e8ce	["4b67405daffa4eb9b597de8537e36734"]
sorl-thumbnail||image||d5b0a44553d31110376b3a0b796166da	{"name": "0ea729dc4310496a9d7157d46a172a2e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 600]}
sorl-thumbnail||image||60d3139de6ddac5c71fa7e32e5af6033	{"name": "cache/e3/54/e35473e06a6e200b8b6c5767a3cb061d.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||d5b0a44553d31110376b3a0b796166da	["60d3139de6ddac5c71fa7e32e5af6033"]
sorl-thumbnail||image||01396ef187124412b9926a057e611e9c	{"name": "1546cfa98eb7470baba6184e256e59ad.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 531]}
sorl-thumbnail||image||f35995ecf1a8dbdfdf00ed6313651bf9	{"name": "cache/2e/0d/2e0d318fdb86c7632cf1632b8c52e008.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [723, 480]}
sorl-thumbnail||thumbnails||01396ef187124412b9926a057e611e9c	["f35995ecf1a8dbdfdf00ed6313651bf9"]
sorl-thumbnail||image||f3eaa94e6796eab8eeb6cf77535a3f84	{"name": "13255257b7954d8b94e57b53799931e3.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1000, 1500]}
sorl-thumbnail||image||95b018f89c4d80426d63ad064d313aa4	{"name": "cache/99/d2/99d22e2f0b7ba48c3d21d983e9162e31.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||f3eaa94e6796eab8eeb6cf77535a3f84	["95b018f89c4d80426d63ad064d313aa4"]
sorl-thumbnail||image||62ab07915db0a6ec8cff8074572a2ad5	{"name": "90aa4a3eec2d46c1bcb63f4574159cc9.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1000, 667]}
sorl-thumbnail||image||0172c83c394d16f1b9a7f2e69f574c00	{"name": "cache/cc/64/cc6485735cd0a58bce2c37c35a4c5f61.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [719, 480]}
sorl-thumbnail||thumbnails||62ab07915db0a6ec8cff8074572a2ad5	["0172c83c394d16f1b9a7f2e69f574c00"]
sorl-thumbnail||image||1f7de6aa8ccc9e748ca062a38fa3cbd3	{"name": "13a050de7d80472d8e9fd470f73f80a9.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1000, 667]}
sorl-thumbnail||image||895d656349aee3cbbb9e51a284e9e6bd	{"name": "cache/8f/42/8f425ee0f57d5de96113375a61203b73.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [719, 480]}
sorl-thumbnail||thumbnails||1f7de6aa8ccc9e748ca062a38fa3cbd3	["895d656349aee3cbbb9e51a284e9e6bd"]
sorl-thumbnail||image||74a9c33155d029b99bdfee74031b07b6	{"name": "be8d552868dd4cc897cce8d33064b447.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1000, 667]}
sorl-thumbnail||image||97e8fd5236b26abb38c88be76b0999bd	{"name": "cache/a0/91/a091180441a0b3f5a043104311dc8fa4.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [719, 480]}
sorl-thumbnail||thumbnails||74a9c33155d029b99bdfee74031b07b6	["97e8fd5236b26abb38c88be76b0999bd"]
sorl-thumbnail||image||fdfe72a31b814baca4aa372ba334a8b9	{"name": "e9ad4ba3b181482785322d75f1192381.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1000, 667]}
sorl-thumbnail||image||cc06ccf0c906f04bf6bf53f6edfa9a0c	{"name": "cache/48/e5/48e54ef023022722a91563d6c83a0e15.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [719, 480]}
sorl-thumbnail||thumbnails||fdfe72a31b814baca4aa372ba334a8b9	["cc06ccf0c906f04bf6bf53f6edfa9a0c"]
sorl-thumbnail||image||3f458d89c003e7131ff513792431e169	{"name": "578bd966bd8844a9b5e35971dd800cbf.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||e20f8dd80afc4a04c30143e680beb35d	{"name": "cache/35/69/356942222b28017bfac2addedd38a816.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||3f458d89c003e7131ff513792431e169	["e20f8dd80afc4a04c30143e680beb35d"]
sorl-thumbnail||image||ef407422300e44bfa0ec952ef5a8652f	{"name": "c8501f841dc74442bd07139670343064.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||90347a2faccd84a5114da813886b9efe	{"name": "cache/e2/87/e28732043569de463098281750429987.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||ef407422300e44bfa0ec952ef5a8652f	["90347a2faccd84a5114da813886b9efe"]
sorl-thumbnail||image||66603693b642e379394212e1298b32ff	{"name": "2f9ff26dbc954feea15efb85c87514bd.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||26e0a3acfe1d65634966eda76ead70c0	{"name": "cache/86/20/8620bb9a30466a879f34e07dc4c771fd.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||66603693b642e379394212e1298b32ff	["26e0a3acfe1d65634966eda76ead70c0"]
sorl-thumbnail||image||b978c97de3f6bb4751f2992052193ff6	{"name": "6fa7a1b0f2e6472c82ecd6777e88fc49.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||d9cb065e4c1c1685054115380de7b694	{"name": "cache/af/9e/af9e7fc7f7262b408cfc9eda228b3525.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||b978c97de3f6bb4751f2992052193ff6	["d9cb065e4c1c1685054115380de7b694"]
sorl-thumbnail||image||77a4c923c807cf6d1e22e525f884b502	{"name": "744e4a5b7aaa4a9ba6868837490fa369.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||62d86f4123aff6fce682b79a9ffead0c	{"name": "cache/24/ee/24eea62addde4344580b2137c3f22872.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||77a4c923c807cf6d1e22e525f884b502	["62d86f4123aff6fce682b79a9ffead0c"]
sorl-thumbnail||image||d22164aacc75cb0e4015220b4378c6ec	{"name": "2de80d2d62c3441f82299231537c8a05.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||e3f63183b0af377c36e465434ae741ed	{"name": "cache/67/29/6729a4c5fb9d4d222ff8a44ab2850917.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||d22164aacc75cb0e4015220b4378c6ec	["e3f63183b0af377c36e465434ae741ed"]
sorl-thumbnail||image||722f5b301c7a6c6f8c7b99de61750d9b	{"name": "13ca80e08d004a00bf028cfa0ca84f58.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||abf9986b7ea910472c2a343741b95c12	{"name": "cache/80/a9/80a951548634d006bf3cbdc968a46bea.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||722f5b301c7a6c6f8c7b99de61750d9b	["abf9986b7ea910472c2a343741b95c12"]
sorl-thumbnail||image||87223bde5084a588ae2fc7233d4a0795	{"name": "ca03000b5b5d452583e24c56d64f12cc.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||522fd50a1ad3adbc8fcfdf3ca2bbb393	{"name": "cache/8a/64/8a64eb094a45cddac6bcc8a43de3c79a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||87223bde5084a588ae2fc7233d4a0795	["522fd50a1ad3adbc8fcfdf3ca2bbb393"]
sorl-thumbnail||image||eb57fe33e09828c1985a624e20a5227e	{"name": "a559d3132eac4c60998f54042574fd50.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||5ecd3a7c4e1af69b613388aff89baa74	{"name": "cache/87/96/87969a2251810e2b1753ec73adb08e79.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||eb57fe33e09828c1985a624e20a5227e	["5ecd3a7c4e1af69b613388aff89baa74"]
sorl-thumbnail||image||090ee865f53195a3cbfb2601a4e4e52f	{"name": "f70bde8eff7f446d8d21ee79cb55c098.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||870857dc6dc3582d26c19ca3055d5304	{"name": "cache/e0/a6/e0a67dd7a8e74e5186db031f161e1640.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||090ee865f53195a3cbfb2601a4e4e52f	["870857dc6dc3582d26c19ca3055d5304"]
sorl-thumbnail||image||a9018a7c9c270b8eade5058337e61e5b	{"name": "ff9e78fe2c6d4ca29076adc330fafb3d.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [667, 1000]}
sorl-thumbnail||image||4827611564d6734bc9c59776b34f3a66	{"name": "cache/a3/b6/a3b634baa7e59e5f9ae508c0045ca6d4.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [320, 480]}
sorl-thumbnail||thumbnails||a9018a7c9c270b8eade5058337e61e5b	["4827611564d6734bc9c59776b34f3a66"]
sorl-thumbnail||image||151e34d31fab543e4df3415600740d75	{"name": "4312d5f4e78545e292da9dbdcfff6864.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1458, 1459]}
sorl-thumbnail||image||8f1de8763c5b9b0c103f271a86801bdb	{"name": "cache/11/53/11539dbb9f968492e999d66519e25a71.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [479, 480]}
sorl-thumbnail||thumbnails||151e34d31fab543e4df3415600740d75	["8f1de8763c5b9b0c103f271a86801bdb"]
sorl-thumbnail||image||c3395c244e9178327df645c923738b9b	{"name": "dd89b2db05e04cb88ab7ee848ebfa52e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1440, 1080]}
sorl-thumbnail||image||e4f4eecb4ef0f124b051cc6659c372d4	{"name": "cache/9d/6e/9d6edec93de71009e3a63c2d802ad811.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||c3395c244e9178327df645c923738b9b	["e4f4eecb4ef0f124b051cc6659c372d4"]
sorl-thumbnail||image||95d87415704cf07872a49d305b346ce4	{"name": "632e1fb5139a4e13aeed92d1989e6fae.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [935, 589]}
sorl-thumbnail||image||0c16e6e2cfd388e487756e108668637e	{"name": "cache/d6/e4/d6e49d2ea24a60020da444844ee97dd9.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [761, 480]}
sorl-thumbnail||thumbnails||95d87415704cf07872a49d305b346ce4	["0c16e6e2cfd388e487756e108668637e"]
sorl-thumbnail||image||819323b8c12e90a59e612e6e571a0209	{"name": "c755ded07fab42b987a2cb9c9b7ac978.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [834, 589]}
sorl-thumbnail||image||5f89813cbe6391485a2d777c748eda7c	{"name": "cache/a7/66/a76601ce4c362082f24fdea85067aba8.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [679, 480]}
sorl-thumbnail||thumbnails||819323b8c12e90a59e612e6e571a0209	["5f89813cbe6391485a2d777c748eda7c"]
sorl-thumbnail||image||41a1353cb618de1b261808875474619d	{"name": "c2aabcaa6ec24b148a128afa8b3dfa6d.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1130, 746]}
sorl-thumbnail||image||86eb6b17488cb836f165e622b343d75e	{"name": "cache/b3/ea/b3ea666f5eb4e1f7e0a395bceb6f9069.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [727, 480]}
sorl-thumbnail||thumbnails||41a1353cb618de1b261808875474619d	["86eb6b17488cb836f165e622b343d75e"]
sorl-thumbnail||image||5e9469abbb8263a70f44071ecf32b082	{"name": "a95627965c3749dba5ee1041f46782c2.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [826, 589]}
sorl-thumbnail||image||5634c64c26c1f7be1bdc83bfbe1beee0	{"name": "cache/1b/7e/1b7e04e1124b06085388def6b898a4b1.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [673, 480]}
sorl-thumbnail||thumbnails||5e9469abbb8263a70f44071ecf32b082	["5634c64c26c1f7be1bdc83bfbe1beee0"]
sorl-thumbnail||image||264c16e9be63c07adf04e044b29ca805	{"name": "723665de17a04529a2a3e2b4701aff0e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [827, 589]}
sorl-thumbnail||image||05cbe230254e375f4ca51b76b0227b9d	{"name": "cache/42/c3/42c34ab273a9c11d446fb8ab57ccc521.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [673, 480]}
sorl-thumbnail||thumbnails||264c16e9be63c07adf04e044b29ca805	["05cbe230254e375f4ca51b76b0227b9d"]
sorl-thumbnail||image||58d1d27b2448d65fa8c1678695351980	{"name": "70b9679244ed4d8da229217cd04be823.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [815, 589]}
sorl-thumbnail||image||781692bacaa756290e20c549a9545a2c	{"name": "cache/c3/ab/c3abf8e4f6cdb548b96d21a357e9391e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [664, 480]}
sorl-thumbnail||thumbnails||58d1d27b2448d65fa8c1678695351980	["781692bacaa756290e20c549a9545a2c"]
sorl-thumbnail||image||4d8ae979e060622224c7026cbe137a3f	{"name": "6603bb53d2f64b77bd863f0708bdb4d1.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1000, 664]}
sorl-thumbnail||image||56dda8f28f910548da9583307a83848e	{"name": "cache/b0/5b/b05b4844ea4b0cc854d1bdba89aef582.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [722, 480]}
sorl-thumbnail||thumbnails||4d8ae979e060622224c7026cbe137a3f	["56dda8f28f910548da9583307a83848e"]
sorl-thumbnail||image||194812c5d1990f72bfab6b2eead492e4	{"name": "66d2fecb25324678884c57550b938098.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [729, 1000]}
sorl-thumbnail||image||7497fd32225e844790f1154f7356f43a	{"name": "cache/3e/9e/3e9e66dfad394b97da0e9386549f8c49.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [349, 480]}
sorl-thumbnail||thumbnails||194812c5d1990f72bfab6b2eead492e4	["7497fd32225e844790f1154f7356f43a"]
sorl-thumbnail||image||28344c08ab159fc3c469279777707ba2	{"name": "0808826ad9b7444daa3e517569b79f6a.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [960, 540]}
sorl-thumbnail||image||9ffc5b5a14165590ec8807b37061d8a2	{"name": "cache/46/84/4684b5a5fd04d032be2d92b35ab2403b.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [853, 480]}
sorl-thumbnail||thumbnails||28344c08ab159fc3c469279777707ba2	["9ffc5b5a14165590ec8807b37061d8a2"]
sorl-thumbnail||image||076afa4148b432c239785d016274c8be	{"name": "9133c89941f34505b5676ccb013e4de4.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [960, 540]}
sorl-thumbnail||image||a98950232e15e28401cec45315ba8e21	{"name": "cache/a5/c8/a5c850162af55f23949fe70f8f0d324b.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [853, 480]}
sorl-thumbnail||thumbnails||076afa4148b432c239785d016274c8be	["a98950232e15e28401cec45315ba8e21"]
sorl-thumbnail||image||163f91089d6a2e643094e07052eddf33	{"name": "cb72f1c42b0449da99de7dbff39601e0.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [960, 540]}
sorl-thumbnail||image||b6fcce529486256c5e118d746fbccaa6	{"name": "cache/90/00/90005f81287ac692fefa01ae5cfc6166.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [853, 480]}
sorl-thumbnail||thumbnails||163f91089d6a2e643094e07052eddf33	["b6fcce529486256c5e118d746fbccaa6"]
sorl-thumbnail||image||105094c728d517558811825b515936ae	{"name": "2b94a68b47b945ae9720b4c9868b8743.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [960, 540]}
sorl-thumbnail||image||35886408cf11f5e774ba97fc67f0bacd	{"name": "cache/db/6c/db6cf87e4db663b9ce42c0be404322e2.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [853, 480]}
sorl-thumbnail||thumbnails||105094c728d517558811825b515936ae	["35886408cf11f5e774ba97fc67f0bacd"]
sorl-thumbnail||image||c05cbd15a7b4b74d1d60cca90940cf64	{"name": "75e1dab80d80445cbaa382c9335eadfa.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [960, 540]}
sorl-thumbnail||image||fe48272284fe28a390ab59de8f36a125	{"name": "cache/de/80/de80ded1509d4e92072c880019461d54.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [853, 480]}
sorl-thumbnail||thumbnails||c05cbd15a7b4b74d1d60cca90940cf64	["fe48272284fe28a390ab59de8f36a125"]
sorl-thumbnail||image||d83af012facdd11f56cae243c436f751	{"name": "05f228e573544d8dac3acd0984dbb73e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [960, 540]}
sorl-thumbnail||image||1026827968e984bb9a4afa8d2a458710	{"name": "cache/45/da/45da2a3cdf6389295c9a1cd99c17a06a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [853, 480]}
sorl-thumbnail||thumbnails||d83af012facdd11f56cae243c436f751	["1026827968e984bb9a4afa8d2a458710"]
sorl-thumbnail||image||1ee3987a999241852ddb1cbb4cad7980	{"name": "ebee9db357a248569165a595f0d83ca3.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1024, 768]}
sorl-thumbnail||image||f1e8c84531f7e65388399a4ae6b94307	{"name": "cache/ca/e0/cae0d68b1746d61ae8bf0b030f0f680a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||1ee3987a999241852ddb1cbb4cad7980	["f1e8c84531f7e65388399a4ae6b94307"]
sorl-thumbnail||image||62cfc9fa2a3dc045fbec01a4756ad0b9	{"name": "fbab320feac54ecca3d2e52fbef04fd6.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1024, 768]}
sorl-thumbnail||image||397206fdb67f6ec6e1bf85aecd4c2389	{"name": "cache/28/40/2840bea6e8e2a48fa28c18035bed74fa.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||62cfc9fa2a3dc045fbec01a4756ad0b9	["397206fdb67f6ec6e1bf85aecd4c2389"]
sorl-thumbnail||image||5c045d96e810139f567a4f36213c27d9	{"name": "64865bcbb7ce408682a71cd9370b4935.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1024, 768]}
sorl-thumbnail||image||fbc1242056f41daa86f0e7ffdf890e59	{"name": "cache/23/f4/23f46bc3f028f8affbeed5ac1cc07f7a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||5c045d96e810139f567a4f36213c27d9	["fbc1242056f41daa86f0e7ffdf890e59"]
sorl-thumbnail||image||96c856863913d53fff999dfeff9811fe	{"name": "716bbf5838e94670b9f529783922137d.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1350]}
sorl-thumbnail||image||c2176d0f6c46c397916a084e4cb57312	{"name": "cache/70/7b/707baf3dc82417ba4511a49f65a7a0de.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [384, 480]}
sorl-thumbnail||thumbnails||96c856863913d53fff999dfeff9811fe	["c2176d0f6c46c397916a084e4cb57312"]
sorl-thumbnail||image||001b4b6b7ae95e7c7587d567d668a2b2	{"name": "600c034cbb7947d68f3a420c8c40e808.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 809]}
sorl-thumbnail||image||80868999056ff3e3ac214a87c1ad70c2	{"name": "cache/fe/c4/fec46c45fa69ad269b22955551496d90.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||001b4b6b7ae95e7c7587d567d668a2b2	["80868999056ff3e3ac214a87c1ad70c2"]
sorl-thumbnail||image||b7d1d86a11fd54c0f37b33c2f23d5414	{"name": "5ffb6a0471e84882acf48509619cbf62.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||af43681a566564b2e391062fb1807469	{"name": "cache/95/8c/958c15b614d4e67c7231a86e442d3f56.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||b7d1d86a11fd54c0f37b33c2f23d5414	["af43681a566564b2e391062fb1807469"]
sorl-thumbnail||image||4ab1493fb292b46cb0ffbbb00120ec93	{"name": "9310223cc8c14546b77aae4954de4dd1.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||70940691d8e8abfe1f7a8760fb1aaeae	{"name": "cache/14/f1/14f1755b294545fb18b32b2771d776f9.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||4ab1493fb292b46cb0ffbbb00120ec93	["70940691d8e8abfe1f7a8760fb1aaeae"]
sorl-thumbnail||image||aeaf1e173b664753e66e174dfdfe4c26	{"name": "5d464e3a1b1b4b79aefca86838610145.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||eac717588265e94d878f914de116c5b3	{"name": "cache/b8/8f/b88fc7eeaf26f7b2a233657db32e6c8d.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||aeaf1e173b664753e66e174dfdfe4c26	["eac717588265e94d878f914de116c5b3"]
sorl-thumbnail||image||c3a52ff0fff9eee92e4db82f103264b1	{"name": "90185727c4fc4363ab848a0dd6ab13d7.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||e96de164b19c95b2794f291b11792438	{"name": "cache/ad/e4/ade4bccf55c689c483e79a19f218b185.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||c3a52ff0fff9eee92e4db82f103264b1	["e96de164b19c95b2794f291b11792438"]
sorl-thumbnail||image||9f83a85b49873a5c02e50edd0a890753	{"name": "ab543d84c906452f8152361fdea48123.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||7d04e37585b6a0383864633e86d1b773	{"name": "cache/d1/51/d151f970b30fe17196c7ec28d1cc007a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||9f83a85b49873a5c02e50edd0a890753	["7d04e37585b6a0383864633e86d1b773"]
sorl-thumbnail||image||2ddb9b6b8b0f24e9aedbf1be9d61903e	{"name": "6181ff7d333c46ffa77d49d999f84dfb.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||ba2ac6c6136aaa67e8601cd818b40298	{"name": "cache/9c/f8/9cf86600d9b4c36840c8ba5bcd579bb0.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||2ddb9b6b8b0f24e9aedbf1be9d61903e	["ba2ac6c6136aaa67e8601cd818b40298"]
sorl-thumbnail||image||183d76a2a3184b8ddf8f2128ead3940c	{"name": "88a394303c904ab3852fb7a30b5345e8.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||3a7547b5c96db312c7d29a244598db1a	{"name": "cache/2b/6e/2b6ec6e0f860cd063d3858e76f87424d.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||183d76a2a3184b8ddf8f2128ead3940c	["3a7547b5c96db312c7d29a244598db1a"]
sorl-thumbnail||image||01398d216a738034c9835c038bf1d150	{"name": "3cca6e9907c34e9dbe54068e356e292e.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||19b124d5002694b277effe8aa27ac2f5	{"name": "cache/7f/85/7f858175a28cc957e8296c9148eb674c.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||01398d216a738034c9835c038bf1d150	["19b124d5002694b277effe8aa27ac2f5"]
sorl-thumbnail||image||136a854ae352e4b85c135751de31e531	{"name": "0df1ddb75ba143f687fb985b401f7ce4.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||2f34ead65d63943ef0bbc833c3163689	{"name": "cache/49/26/49261c18572095dec2e1b13b488d5115.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||136a854ae352e4b85c135751de31e531	["2f34ead65d63943ef0bbc833c3163689"]
sorl-thumbnail||image||a9878a700313021595f59718bad457df	{"name": "fd9be4e03af545678d53b679dc2bbf19.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1080, 1080]}
sorl-thumbnail||image||7822b8c7c646a8bdfb89a08431285e52	{"name": "cache/e6/2d/e62dec98326d4ec5f5b40d0c90c8166a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||a9878a700313021595f59718bad457df	["7822b8c7c646a8bdfb89a08431285e52"]
sorl-thumbnail||image||54786d4019b5f9aac819dda150060df1	{"name": "e048d4c987674dee99a7c1d6be4efc9f.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1280, 960]}
sorl-thumbnail||image||ca92e87d7caf1c482535da7046d78c49	{"name": "cache/c6/ea/c6ea13184c75a6419a6fc2c17fed7811.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||54786d4019b5f9aac819dda150060df1	["ca92e87d7caf1c482535da7046d78c49"]
sorl-thumbnail||image||ca2303b1f56df6012f9f78aefe9f4ed9	{"name": "569e149615a44f768ff9f9c7075d2753.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||image||25b6752354035172dd48a5d0c3a39023	{"name": "cache/d2/4f/d24f11c3cb000d24482fc12cde8c41f5.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||ca2303b1f56df6012f9f78aefe9f4ed9	["25b6752354035172dd48a5d0c3a39023"]
sorl-thumbnail||image||aab40639c018f99f6d2c8a1c568d86e0	{"name": "4fdb201e08de40eb9dd15fd51ebbd20c.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||image||cc339e53b93a069cee9ecda38373c04e	{"name": "cache/6f/f5/6ff57af28bccc31667459d1d6f21711b.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||aab40639c018f99f6d2c8a1c568d86e0	["cc339e53b93a069cee9ecda38373c04e"]
sorl-thumbnail||image||037dd691b2377dd0cc8a7f2da0018595	{"name": "888f29c387bf44b5a50501ad25ce340a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||image||8b3c907357dbe0da3c3a241babe5eeff	{"name": "cache/6e/fd/6efd9e9c7c0d280fe4c235982bda72de.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||037dd691b2377dd0cc8a7f2da0018595	["8b3c907357dbe0da3c3a241babe5eeff"]
sorl-thumbnail||image||c59cbbdeb3700920c9d99fca0927cbba	{"name": "0e14971ab06042bdabb523349fefba82.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [639, 480]}
sorl-thumbnail||image||483db9ad7269e46a63078af236af0bda	{"name": "cache/4c/5d/4c5dd949b74f5cb0f47ce5763451fa5b.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [639, 480]}
sorl-thumbnail||thumbnails||c59cbbdeb3700920c9d99fca0927cbba	["483db9ad7269e46a63078af236af0bda"]
sorl-thumbnail||image||ee8d388df0a88814ff9ee13e78b9d946	{"name": "be093f1daac14f528e39806c9feabfb4.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||image||2b203b7806ab64c64cc9fcf222d126fe	{"name": "cache/d3/09/d309f3b6fe3453cf5059233d0dcf89ef.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||ee8d388df0a88814ff9ee13e78b9d946	["2b203b7806ab64c64cc9fcf222d126fe"]
sorl-thumbnail||image||496ad0fd47407e959a6fb78ed92904fc	{"name": "64d36bfab1e24c3b8f671760a92d018a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [512, 512]}
sorl-thumbnail||image||557128728e308c36a3e52ad5f3f2e62f	{"name": "cache/18/ac/18ac0ec643cda639eec5bfddb2392f52.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||496ad0fd47407e959a6fb78ed92904fc	["557128728e308c36a3e52ad5f3f2e62f"]
sorl-thumbnail||image||ee31e092c6701f8dfc9588a88ee1f38b	{"name": "4ee8825ebf2f49eebc4000de70f872c8.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||image||11b64c50f559247b0d214bce52ae5f19	{"name": "cache/76/4e/764ef65615df10c1eb99b47b8c7b8250.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [640, 480]}
sorl-thumbnail||thumbnails||ee31e092c6701f8dfc9588a88ee1f38b	["11b64c50f559247b0d214bce52ae5f19"]
sorl-thumbnail||image||54a016d96a480f71c1d31779e18aa90b	{"name": "e7a598ff4c1e41e0a58f8e33bdf4d3fa.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 478]}
sorl-thumbnail||image||19f38f15c5d78383eb3fb36d490612bd	{"name": "cache/61/88/6188d6cf1a173fd1c5e39bbc46af2b16.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [803, 480]}
sorl-thumbnail||thumbnails||54a016d96a480f71c1d31779e18aa90b	["19f38f15c5d78383eb3fb36d490612bd"]
sorl-thumbnail||image||7ec7d32137a97ee50249291400329d1c	{"name": "1a8a519198c54cb6a90f8605dc4015aa.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [150, 150]}
sorl-thumbnail||image||1fdcf7a094579e2a4c3b0074828d4973	{"name": "cache/f5/b3/f5b3c3025b62b515b58f23323184dbb7.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||7ec7d32137a97ee50249291400329d1c	["1fdcf7a094579e2a4c3b0074828d4973"]
sorl-thumbnail||image||1f75374c338b383c738c1932ce86b79d	{"name": "d9940bc6220e4b008f6f5426d18ad03c.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [196, 198]}
sorl-thumbnail||image||e54199105971e5031ea10f40a917b8ff	{"name": "cache/9c/04/9c04d64fb041bf69fbda6afe9040eced.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [475, 480]}
sorl-thumbnail||thumbnails||1f75374c338b383c738c1932ce86b79d	["e54199105971e5031ea10f40a917b8ff"]
sorl-thumbnail||image||285660b429f65b560971474cdb4d7277	{"name": "7bacd36d1d4f49189d3cfe68f9ee7cd5.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [150, 150]}
sorl-thumbnail||image||cd7fab19d5b6acdfef7b8933e3303887	{"name": "cache/e7/7e/e77e17eda730517ddf45cb14e17cf6bb.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||285660b429f65b560971474cdb4d7277	["cd7fab19d5b6acdfef7b8933e3303887"]
sorl-thumbnail||image||147b17e734bef991aa311efb0915f9d9	{"name": "28ac0be858834b54b6217d137a290d89.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [250, 333]}
sorl-thumbnail||image||d995b21ad524d0f2ac13634d6636672e	{"name": "cache/5d/de/5dde0bc0d863f42b03d1d4fa83bc9aec.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [360, 480]}
sorl-thumbnail||thumbnails||147b17e734bef991aa311efb0915f9d9	["d995b21ad524d0f2ac13634d6636672e"]
sorl-thumbnail||image||b38257856ce9bfef2ede1d1596dd9216	{"name": "8a0e5496c37646bc8ddb05db0bbb5007.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [220, 340]}
sorl-thumbnail||image||569a675147c2daf70d6e8e3e6cf1ac68	{"name": "cache/a3/ef/a3efbe0a507ef7caadea22b93928082a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [310, 480]}
sorl-thumbnail||thumbnails||b38257856ce9bfef2ede1d1596dd9216	["569a675147c2daf70d6e8e3e6cf1ac68"]
sorl-thumbnail||image||bb35d905470dcc8a0f848b1056a203b9	{"name": "a35d787818e04fc39590223f52ae5428.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [399, 411]}
sorl-thumbnail||image||7f867d9e9b73f12befe60d6d8be2ce99	{"name": "cache/a8/27/a8270ac0cf0fe5d49a54ad74ccfd1659.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [465, 480]}
sorl-thumbnail||thumbnails||bb35d905470dcc8a0f848b1056a203b9	["7f867d9e9b73f12befe60d6d8be2ce99"]
sorl-thumbnail||image||2906e779edef4d2ab3c1f5c0412f1e4c	{"name": "556e01dc9feb459c92139f613cd7c86f.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [150, 150]}
sorl-thumbnail||image||ab971024874be40b47fbfb6ce9af58b2	{"name": "cache/21/92/219288a1ffe3afb0c447dce53fb31deb.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||2906e779edef4d2ab3c1f5c0412f1e4c	["ab971024874be40b47fbfb6ce9af58b2"]
sorl-thumbnail||image||0a593a3306b1cb5d6f595ff5151e3e83	{"name": "ac6b6d2a24ae46b7a3c8dda284d86a36.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [196, 198]}
sorl-thumbnail||image||0af3f87528f20f16cec0afd9ed0502e3	{"name": "cache/af/73/af7393ff70567bcf5c009f7610e9b60f.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [475, 480]}
sorl-thumbnail||thumbnails||0a593a3306b1cb5d6f595ff5151e3e83	["0af3f87528f20f16cec0afd9ed0502e3"]
sorl-thumbnail||image||eeb9a5755a13a252228252f82e23439b	{"name": "e0d26e67e1104af8b221e7f036314535.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [150, 150]}
sorl-thumbnail||image||4d2c448bf2a9270c93a8e2e28aa45765	{"name": "cache/64/ec/64ec879208cb50755cda8f4740fe8d23.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [480, 480]}
sorl-thumbnail||thumbnails||eeb9a5755a13a252228252f82e23439b	["4d2c448bf2a9270c93a8e2e28aa45765"]
sorl-thumbnail||image||47f28421c1b83fe59d92b13c4f00ace8	{"name": "90703c5211694a1386c727b123cbd0a9.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [250, 333]}
sorl-thumbnail||image||060375a02363c9238e78e8c31f7c7076	{"name": "cache/60/19/6019c68112d69bead7c42b6cf4c81f33.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [360, 480]}
sorl-thumbnail||thumbnails||47f28421c1b83fe59d92b13c4f00ace8	["060375a02363c9238e78e8c31f7c7076"]
sorl-thumbnail||image||30cb03051f7a77562fb049781d121c6c	{"name": "0866e5aef7cd4a14866f72e00034aabd.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [220, 340]}
sorl-thumbnail||image||637f25f2121827b10a4bb06d130fd98f	{"name": "cache/82/12/8212e46e71bd60e9258ac55fc76abdee.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [310, 480]}
sorl-thumbnail||thumbnails||30cb03051f7a77562fb049781d121c6c	["637f25f2121827b10a4bb06d130fd98f"]
sorl-thumbnail||image||7ac4f1360e9492634f40b9c1c25c94c9	{"name": "fb8869d8797c425a9628892e56efafae.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [399, 411]}
sorl-thumbnail||image||4d8eae30dfe63cc8664b899a460a4446	{"name": "cache/26/71/2671a735fe1d52ebe4d1834a754a56cf.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [465, 480]}
sorl-thumbnail||thumbnails||7ac4f1360e9492634f40b9c1c25c94c9	["4d8eae30dfe63cc8664b899a460a4446"]
sorl-thumbnail||image||d8bb24e84c6d15bce091e4f73de3f895	{"name": "c0a47fd25bd04411821fed8d4ce01fa3.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [195, 192]}
sorl-thumbnail||image||022cf483a5356ce7ebfb14eab0e519b2	{"name": "cache/09/95/099588663664c9ceb5c3821e09016cb5.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [487, 480]}
sorl-thumbnail||thumbnails||d8bb24e84c6d15bce091e4f73de3f895	["022cf483a5356ce7ebfb14eab0e519b2"]
sorl-thumbnail||image||298c26bdab427febb9804b57e1597e75	{"name": "c68b223fc8344a0d932be9c0eba89634.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [196, 160]}
sorl-thumbnail||image||eb6d1c3a9b1f2f2273632dd801d33b28	{"name": "cache/c9/87/c987a52a2deaeb8f0a53a2d0fd66a6b6.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [588, 480]}
sorl-thumbnail||thumbnails||298c26bdab427febb9804b57e1597e75	["eb6d1c3a9b1f2f2273632dd801d33b28"]
sorl-thumbnail||image||0d93127ae236d4debf616236406318c6	{"name": "2ce57630db7b4d219ae2534372ffb7c4.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [200, 133]}
sorl-thumbnail||image||290527ddcdb90945bbafc93d26eccc3f	{"name": "cache/b2/75/b2755bf416418420e2503616825ff2aa.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [721, 480]}
sorl-thumbnail||thumbnails||0d93127ae236d4debf616236406318c6	["290527ddcdb90945bbafc93d26eccc3f"]
sorl-thumbnail||image||c9ffe887be8478474d705b9bb1602b3f	{"name": "2ed53a8bad4941e8a698b86036b9c0fa.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [150, 113]}
sorl-thumbnail||image||89b7f80f37a450002242489d94081e11	{"name": "cache/2e/fd/2efd25adb5403d68fe430a88fe2c1e01.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [637, 480]}
sorl-thumbnail||thumbnails||c9ffe887be8478474d705b9bb1602b3f	["89b7f80f37a450002242489d94081e11"]
sorl-thumbnail||image||438d325b9f8da762098dcc44dcfc4808	{"name": "95ec806c2c4848a28126c725c2822e09.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [150, 200]}
sorl-thumbnail||image||76810e6bf71be5cbabfdc60f28664291	{"name": "cache/1b/b8/1bb8982d6a7a1efffc9f0c7bc04d4662.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [360, 480]}
sorl-thumbnail||thumbnails||438d325b9f8da762098dcc44dcfc4808	["76810e6bf71be5cbabfdc60f28664291"]
sorl-thumbnail||image||2dae90db3815e0e0ae7f7e3e356ef6c9	{"name": "e3d8b495becb4fa5915b14748ed42620.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [200, 244]}
sorl-thumbnail||image||1226ca83b2e5865dd4d1f8c8c576b8ef	{"name": "cache/de/f3/def3cf87a33b14ddf95474f71f872e76.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [393, 480]}
sorl-thumbnail||thumbnails||2dae90db3815e0e0ae7f7e3e356ef6c9	["1226ca83b2e5865dd4d1f8c8c576b8ef"]
sorl-thumbnail||image||f68b102cc5051fb9f80cd90e361aee74	{"name": "11808ba0775e4980907dc96ab7166228.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [800, 1013]}
sorl-thumbnail||image||49ad33283e5ed78c64a359f5d25a6cb2	{"name": "cache/df/d2/dfd24a1aa2f5f5144d7efcf30f391331.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [379, 480]}
sorl-thumbnail||thumbnails||f68b102cc5051fb9f80cd90e361aee74	["49ad33283e5ed78c64a359f5d25a6cb2"]
sorl-thumbnail||image||0063cd93763f7acb2e03ddf1003dd649	{"name": "8d4329c9a21247eaa38da287d7202e5f.png", "storage": "django.core.files.storage.FileSystemStorage", "size": [177, 263]}
sorl-thumbnail||image||cf051212a8fbb03574c93fbd4c9945d5	{"name": "cache/87/bd/87bdd4fe49f09dd9bb1b92bcee5ee2ea.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [323, 480]}
sorl-thumbnail||thumbnails||0063cd93763f7acb2e03ddf1003dd649	["cf051212a8fbb03574c93fbd4c9945d5"]
sorl-thumbnail||image||78fd47bc0ff18a14c202c5d4038a2445	{"name": "043cd7f66c6045b387a4981f63c26b40.jpeg", "storage": "django.core.files.storage.FileSystemStorage", "size": [500, 730]}
sorl-thumbnail||image||ae4089f5f318d54b9aa98ea332e7cb6b	{"name": "cache/a8/53/a853dc70839838e3aa7d607adf8b17d2.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [328, 480]}
sorl-thumbnail||thumbnails||78fd47bc0ff18a14c202c5d4038a2445	["ae4089f5f318d54b9aa98ea332e7cb6b"]
sorl-thumbnail||image||2c083b9d447fec92a09ca82e5110200b	{"name": "5771ffbb7e6f4e0f830ccfdccf54b99a.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [796, 534]}
sorl-thumbnail||image||493d4926218825b7d8a8d5a9bcebc2a2	{"name": "cache/90/76/9076544b45df47677e972084dd7ff2cf.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [715, 480]}
sorl-thumbnail||thumbnails||2c083b9d447fec92a09ca82e5110200b	["493d4926218825b7d8a8d5a9bcebc2a2"]
sorl-thumbnail||image||e893a1daf0d774ccaa3cc3aad275821e	{"name": "8f945b919964457f887b18ae8e22c420.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1024, 683]}
sorl-thumbnail||image||8077c1931af8c19f5fe84b80ca2cd277	{"name": "cache/9a/84/9a846c46715b394e8cf41bb78da1849f.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [719, 480]}
sorl-thumbnail||thumbnails||e893a1daf0d774ccaa3cc3aad275821e	["8077c1931af8c19f5fe84b80ca2cd277"]
sorl-thumbnail||image||3fb17f28ba1ade080c19e6dcdd463f07	{"name": "9a82eda92dc04914acf7271035d7ab70.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [1280, 848]}
sorl-thumbnail||image||75b1dc48a39aad7a61015c7bace39b1b	{"name": "cache/60/64/6064f998ce863e59d40e1104e58ef9ca.jpg", "storage": "django.core.files.storage.FileSystemStorage", "size": [724, 480]}
sorl-thumbnail||thumbnails||3fb17f28ba1ade080c19e6dcdd463f07	["75b1dc48a39aad7a61015c7bace39b1b"]
\.


--
-- Name: Gallery_album_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_album_id_seq"', 9, true);


--
-- Name: Gallery_album_pictures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_album_pictures_id_seq"', 72, true);


--
-- Name: Gallery_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_category_id_seq"', 9, true);


--
-- Name: Gallery_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_comment_id_seq"', 52, true);


--
-- Name: Gallery_comment_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_comment_report_id_seq"', 4, true);


--
-- Name: Gallery_photo_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_photo_category_id_seq"', 76, true);


--
-- Name: Gallery_photo_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_photo_comments_id_seq"', 52, true);


--
-- Name: Gallery_photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_photo_id_seq"', 122, true);


--
-- Name: Gallery_photo_metadata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_photo_metadata_id_seq"', 473, true);


--
-- Name: Gallery_photo_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_photo_report_id_seq"', 6, true);


--
-- Name: Gallery_reporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gallery_reporte_id_seq"', 14, true);


--
-- Name: MetaData_iptckeyword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MetaData_iptckeyword_id_seq"', 8, true);


--
-- Name: MetaData_metadata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MetaData_metadata_id_seq"', 64, true);


--
-- Name: Users_registerlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_registerlink_id_seq"', 1, true);


--
-- Name: Users_user_albums_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_user_albums_id_seq"', 7, true);


--
-- Name: Users_user_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_user_comments_id_seq"', 52, true);


--
-- Name: Users_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_user_groups_id_seq"', 1, false);


--
-- Name: Users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_user_id_seq"', 8, true);


--
-- Name: Users_user_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_user_photos_id_seq"', 120, true);


--
-- Name: Users_user_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_user_report_id_seq"', 4, true);


--
-- Name: Users_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_user_user_permissions_id_seq"', 1, false);


--
-- Name: WebAdmin_contactrequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WebAdmin_contactrequest_id_seq"', 2, true);


--
-- Name: WebAdmin_landingcaroussel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WebAdmin_landingcaroussel_id_seq"', 1, true);


--
-- Name: WebAdmin_landingcaroussel_news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WebAdmin_landingcaroussel_news_id_seq"', 3, true);


--
-- Name: WebAdmin_news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WebAdmin_news_id_seq"', 3, true);


--
-- Name: WebAdmin_photorequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WebAdmin_photorequest_id_seq"', 4, true);


--
-- Name: WebAdmin_photorequest_photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WebAdmin_photorequest_photos_id_seq"', 8, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 80, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 107, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 20, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 30, true);


--
-- Name: Gallery_album_pictures Gallery_album_pictures_album_id_photo_id_61e98c54_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_album_pictures"
    ADD CONSTRAINT "Gallery_album_pictures_album_id_photo_id_61e98c54_uniq" UNIQUE (album_id, photo_id);


--
-- Name: Gallery_album_pictures Gallery_album_pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_album_pictures"
    ADD CONSTRAINT "Gallery_album_pictures_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_album Gallery_album_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_album"
    ADD CONSTRAINT "Gallery_album_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_category Gallery_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_category"
    ADD CONSTRAINT "Gallery_category_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_comment Gallery_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_comment"
    ADD CONSTRAINT "Gallery_comment_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_comment_report Gallery_comment_report_comment_id_reporte_id_c87b8497_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_comment_report"
    ADD CONSTRAINT "Gallery_comment_report_comment_id_reporte_id_c87b8497_uniq" UNIQUE (comment_id, reporte_id);


--
-- Name: Gallery_comment_report Gallery_comment_report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_comment_report"
    ADD CONSTRAINT "Gallery_comment_report_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_photo_category Gallery_photo_category_photo_id_category_id_c1d60b4f_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_category"
    ADD CONSTRAINT "Gallery_photo_category_photo_id_category_id_c1d60b4f_uniq" UNIQUE (photo_id, category_id);


--
-- Name: Gallery_photo_category Gallery_photo_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_category"
    ADD CONSTRAINT "Gallery_photo_category_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_photo_comments Gallery_photo_comments_photo_id_comment_id_e286b65c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_comments"
    ADD CONSTRAINT "Gallery_photo_comments_photo_id_comment_id_e286b65c_uniq" UNIQUE (photo_id, comment_id);


--
-- Name: Gallery_photo_comments Gallery_photo_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_comments"
    ADD CONSTRAINT "Gallery_photo_comments_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_photo_metadata Gallery_photo_metadata_photo_id_metadata_id_f4e8f7e0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_metadata"
    ADD CONSTRAINT "Gallery_photo_metadata_photo_id_metadata_id_f4e8f7e0_uniq" UNIQUE (photo_id, metadata_id);


--
-- Name: Gallery_photo_metadata Gallery_photo_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_metadata"
    ADD CONSTRAINT "Gallery_photo_metadata_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_photo Gallery_photo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo"
    ADD CONSTRAINT "Gallery_photo_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_photo_report Gallery_photo_report_photo_id_reporte_id_32695a1f_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_report"
    ADD CONSTRAINT "Gallery_photo_report_photo_id_reporte_id_32695a1f_uniq" UNIQUE (photo_id, reporte_id);


--
-- Name: Gallery_photo_report Gallery_photo_report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_report"
    ADD CONSTRAINT "Gallery_photo_report_pkey" PRIMARY KEY (id);


--
-- Name: Gallery_reporte Gallery_reporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_reporte"
    ADD CONSTRAINT "Gallery_reporte_pkey" PRIMARY KEY (id);


--
-- Name: MetaData_iptckeyword MetaData_iptckeyword_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MetaData_iptckeyword"
    ADD CONSTRAINT "MetaData_iptckeyword_pkey" PRIMARY KEY (id);


--
-- Name: MetaData_metadata MetaData_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MetaData_metadata"
    ADD CONSTRAINT "MetaData_metadata_pkey" PRIMARY KEY (id);


--
-- Name: Users_registerlink Users_registerlink_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_registerlink"
    ADD CONSTRAINT "Users_registerlink_pkey" PRIMARY KEY (id);


--
-- Name: Users_registerlink Users_registerlink_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_registerlink"
    ADD CONSTRAINT "Users_registerlink_user_id_key" UNIQUE (user_id);


--
-- Name: Users_user_albums Users_user_albums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_albums"
    ADD CONSTRAINT "Users_user_albums_pkey" PRIMARY KEY (id);


--
-- Name: Users_user_albums Users_user_albums_user_id_album_id_eec33fdb_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_albums"
    ADD CONSTRAINT "Users_user_albums_user_id_album_id_eec33fdb_uniq" UNIQUE (user_id, album_id);


--
-- Name: Users_user_comments Users_user_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_comments"
    ADD CONSTRAINT "Users_user_comments_pkey" PRIMARY KEY (id);


--
-- Name: Users_user_comments Users_user_comments_user_id_comment_id_95f62f51_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_comments"
    ADD CONSTRAINT "Users_user_comments_user_id_comment_id_95f62f51_uniq" UNIQUE (user_id, comment_id);


--
-- Name: Users_user Users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user"
    ADD CONSTRAINT "Users_user_email_key" UNIQUE (email);


--
-- Name: Users_user_groups Users_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_groups"
    ADD CONSTRAINT "Users_user_groups_pkey" PRIMARY KEY (id);


--
-- Name: Users_user_groups Users_user_groups_user_id_group_id_21477a3e_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_groups"
    ADD CONSTRAINT "Users_user_groups_user_id_group_id_21477a3e_uniq" UNIQUE (user_id, group_id);


--
-- Name: Users_user_photos Users_user_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_photos"
    ADD CONSTRAINT "Users_user_photos_pkey" PRIMARY KEY (id);


--
-- Name: Users_user_photos Users_user_photos_user_id_photo_id_b9849010_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_photos"
    ADD CONSTRAINT "Users_user_photos_user_id_photo_id_b9849010_uniq" UNIQUE (user_id, photo_id);


--
-- Name: Users_user Users_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user"
    ADD CONSTRAINT "Users_user_pkey" PRIMARY KEY (id);


--
-- Name: Users_user_report Users_user_report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_report"
    ADD CONSTRAINT "Users_user_report_pkey" PRIMARY KEY (id);


--
-- Name: Users_user_report Users_user_report_user_id_reporte_id_9b0d2916_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_report"
    ADD CONSTRAINT "Users_user_report_user_id_reporte_id_9b0d2916_uniq" UNIQUE (user_id, reporte_id);


--
-- Name: Users_user_user_permissions Users_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_user_permissions"
    ADD CONSTRAINT "Users_user_user_permissions_pkey" PRIMARY KEY (id);


--
-- Name: Users_user_user_permissions Users_user_user_permissions_user_id_permission_id_87c10865_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_user_permissions"
    ADD CONSTRAINT "Users_user_user_permissions_user_id_permission_id_87c10865_uniq" UNIQUE (user_id, permission_id);


--
-- Name: WebAdmin_contactrequest WebAdmin_contactrequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_contactrequest"
    ADD CONSTRAINT "WebAdmin_contactrequest_pkey" PRIMARY KEY (id);


--
-- Name: WebAdmin_landingcaroussel_news WebAdmin_landingcarousse_landingcaroussel_id_news_5bd5a2e8_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_landingcaroussel_news"
    ADD CONSTRAINT "WebAdmin_landingcarousse_landingcaroussel_id_news_5bd5a2e8_uniq" UNIQUE (landingcaroussel_id, news_id);


--
-- Name: WebAdmin_landingcaroussel_news WebAdmin_landingcaroussel_news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_landingcaroussel_news"
    ADD CONSTRAINT "WebAdmin_landingcaroussel_news_pkey" PRIMARY KEY (id);


--
-- Name: WebAdmin_landingcaroussel WebAdmin_landingcaroussel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_landingcaroussel"
    ADD CONSTRAINT "WebAdmin_landingcaroussel_pkey" PRIMARY KEY (id);


--
-- Name: WebAdmin_news WebAdmin_news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_news"
    ADD CONSTRAINT "WebAdmin_news_pkey" PRIMARY KEY (id);


--
-- Name: WebAdmin_photorequest_photos WebAdmin_photorequest_ph_photorequest_id_photo_id_823b466d_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_photorequest_photos"
    ADD CONSTRAINT "WebAdmin_photorequest_ph_photorequest_id_photo_id_823b466d_uniq" UNIQUE (photorequest_id, photo_id);


--
-- Name: WebAdmin_photorequest_photos WebAdmin_photorequest_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_photorequest_photos"
    ADD CONSTRAINT "WebAdmin_photorequest_photos_pkey" PRIMARY KEY (id);


--
-- Name: WebAdmin_photorequest WebAdmin_photorequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_photorequest"
    ADD CONSTRAINT "WebAdmin_photorequest_pkey" PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: knox_authtoken knox_authtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knox_authtoken
    ADD CONSTRAINT knox_authtoken_pkey PRIMARY KEY (digest);


--
-- Name: knox_authtoken knox_authtoken_salt_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knox_authtoken
    ADD CONSTRAINT knox_authtoken_salt_key UNIQUE (salt);


--
-- Name: thumbnail_kvstore thumbnail_kvstore_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thumbnail_kvstore
    ADD CONSTRAINT thumbnail_kvstore_pkey PRIMARY KEY (key);


--
-- Name: Gallery_album_pictures_album_id_ab4209ff; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_album_pictures_album_id_ab4209ff" ON public."Gallery_album_pictures" USING btree (album_id);


--
-- Name: Gallery_album_pictures_photo_id_18b313fb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_album_pictures_photo_id_18b313fb" ON public."Gallery_album_pictures" USING btree (photo_id);


--
-- Name: Gallery_comment_report_comment_id_b41f9a4e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_comment_report_comment_id_b41f9a4e" ON public."Gallery_comment_report" USING btree (comment_id);


--
-- Name: Gallery_comment_report_reporte_id_aa993faa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_comment_report_reporte_id_aa993faa" ON public."Gallery_comment_report" USING btree (reporte_id);


--
-- Name: Gallery_photo_category_category_id_b1c01df1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_photo_category_category_id_b1c01df1" ON public."Gallery_photo_category" USING btree (category_id);


--
-- Name: Gallery_photo_category_photo_id_e0e2358b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_photo_category_photo_id_e0e2358b" ON public."Gallery_photo_category" USING btree (photo_id);


--
-- Name: Gallery_photo_comments_comment_id_8c729206; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_photo_comments_comment_id_8c729206" ON public."Gallery_photo_comments" USING btree (comment_id);


--
-- Name: Gallery_photo_comments_photo_id_e989a7bd; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_photo_comments_photo_id_e989a7bd" ON public."Gallery_photo_comments" USING btree (photo_id);


--
-- Name: Gallery_photo_metadata_metadata_id_caacf894; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_photo_metadata_metadata_id_caacf894" ON public."Gallery_photo_metadata" USING btree (metadata_id);


--
-- Name: Gallery_photo_metadata_photo_id_790f9386; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_photo_metadata_photo_id_790f9386" ON public."Gallery_photo_metadata" USING btree (photo_id);


--
-- Name: Gallery_photo_report_photo_id_f902610b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_photo_report_photo_id_f902610b" ON public."Gallery_photo_report" USING btree (photo_id);


--
-- Name: Gallery_photo_report_reporte_id_6c16ef1c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Gallery_photo_report_reporte_id_6c16ef1c" ON public."Gallery_photo_report" USING btree (reporte_id);


--
-- Name: MetaData_metadata_metadata_id_3844c82d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MetaData_metadata_metadata_id_3844c82d" ON public."MetaData_metadata" USING btree (metadata_id);


--
-- Name: Users_user_albums_album_id_8226d241; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_albums_album_id_8226d241" ON public."Users_user_albums" USING btree (album_id);


--
-- Name: Users_user_albums_user_id_31e7fd27; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_albums_user_id_31e7fd27" ON public."Users_user_albums" USING btree (user_id);


--
-- Name: Users_user_comments_comment_id_9d71dfd3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_comments_comment_id_9d71dfd3" ON public."Users_user_comments" USING btree (comment_id);


--
-- Name: Users_user_comments_user_id_43c22275; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_comments_user_id_43c22275" ON public."Users_user_comments" USING btree (user_id);


--
-- Name: Users_user_email_3445d80e_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_email_3445d80e_like" ON public."Users_user" USING btree (email varchar_pattern_ops);


--
-- Name: Users_user_groups_group_id_884146f8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_groups_group_id_884146f8" ON public."Users_user_groups" USING btree (group_id);


--
-- Name: Users_user_groups_user_id_e0963e48; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_groups_user_id_e0963e48" ON public."Users_user_groups" USING btree (user_id);


--
-- Name: Users_user_photos_photo_id_c5b31008; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_photos_photo_id_c5b31008" ON public."Users_user_photos" USING btree (photo_id);


--
-- Name: Users_user_photos_user_id_257a82e9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_photos_user_id_257a82e9" ON public."Users_user_photos" USING btree (user_id);


--
-- Name: Users_user_report_reporte_id_63da9897; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_report_reporte_id_63da9897" ON public."Users_user_report" USING btree (reporte_id);


--
-- Name: Users_user_report_user_id_b42c2023; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_report_user_id_b42c2023" ON public."Users_user_report" USING btree (user_id);


--
-- Name: Users_user_user_permissions_permission_id_cfe39496; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_user_permissions_permission_id_cfe39496" ON public."Users_user_user_permissions" USING btree (permission_id);


--
-- Name: Users_user_user_permissions_user_id_ffe2deb0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Users_user_user_permissions_user_id_ffe2deb0" ON public."Users_user_user_permissions" USING btree (user_id);


--
-- Name: WebAdmin_landingcaroussel_news_landingcaroussel_id_f5519883; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WebAdmin_landingcaroussel_news_landingcaroussel_id_f5519883" ON public."WebAdmin_landingcaroussel_news" USING btree (landingcaroussel_id);


--
-- Name: WebAdmin_landingcaroussel_news_news_id_6cabb197; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WebAdmin_landingcaroussel_news_news_id_6cabb197" ON public."WebAdmin_landingcaroussel_news" USING btree (news_id);


--
-- Name: WebAdmin_photorequest_photos_photo_id_b1149160; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WebAdmin_photorequest_photos_photo_id_b1149160" ON public."WebAdmin_photorequest_photos" USING btree (photo_id);


--
-- Name: WebAdmin_photorequest_photos_photorequest_id_01853020; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "WebAdmin_photorequest_photos_photorequest_id_01853020" ON public."WebAdmin_photorequest_photos" USING btree (photorequest_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: knox_authtoken_digest_188c7e77_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_digest_188c7e77_like ON public.knox_authtoken USING btree (digest varchar_pattern_ops);


--
-- Name: knox_authtoken_salt_3d9f48ac_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_salt_3d9f48ac_like ON public.knox_authtoken USING btree (salt varchar_pattern_ops);


--
-- Name: knox_authtoken_token_key_8f4f7d47; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_token_key_8f4f7d47 ON public.knox_authtoken USING btree (token_key);


--
-- Name: knox_authtoken_token_key_8f4f7d47_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_token_key_8f4f7d47_like ON public.knox_authtoken USING btree (token_key varchar_pattern_ops);


--
-- Name: knox_authtoken_user_id_e5a5d899; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX knox_authtoken_user_id_e5a5d899 ON public.knox_authtoken USING btree (user_id);


--
-- Name: thumbnail_kvstore_key_3f850178_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX thumbnail_kvstore_key_3f850178_like ON public.thumbnail_kvstore USING btree (key varchar_pattern_ops);


--
-- Name: Gallery_album_pictures Gallery_album_pictures_album_id_ab4209ff_fk_Gallery_album_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_album_pictures"
    ADD CONSTRAINT "Gallery_album_pictures_album_id_ab4209ff_fk_Gallery_album_id" FOREIGN KEY (album_id) REFERENCES public."Gallery_album"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_album_pictures Gallery_album_pictures_photo_id_18b313fb_fk_Gallery_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_album_pictures"
    ADD CONSTRAINT "Gallery_album_pictures_photo_id_18b313fb_fk_Gallery_photo_id" FOREIGN KEY (photo_id) REFERENCES public."Gallery_photo"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_comment_report Gallery_comment_repo_comment_id_b41f9a4e_fk_Gallery_c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_comment_report"
    ADD CONSTRAINT "Gallery_comment_repo_comment_id_b41f9a4e_fk_Gallery_c" FOREIGN KEY (comment_id) REFERENCES public."Gallery_comment"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_comment_report Gallery_comment_repo_reporte_id_aa993faa_fk_Gallery_r; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_comment_report"
    ADD CONSTRAINT "Gallery_comment_repo_reporte_id_aa993faa_fk_Gallery_r" FOREIGN KEY (reporte_id) REFERENCES public."Gallery_reporte"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_photo_category Gallery_photo_catego_category_id_b1c01df1_fk_Gallery_c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_category"
    ADD CONSTRAINT "Gallery_photo_catego_category_id_b1c01df1_fk_Gallery_c" FOREIGN KEY (category_id) REFERENCES public."Gallery_category"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_photo_category Gallery_photo_category_photo_id_e0e2358b_fk_Gallery_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_category"
    ADD CONSTRAINT "Gallery_photo_category_photo_id_e0e2358b_fk_Gallery_photo_id" FOREIGN KEY (photo_id) REFERENCES public."Gallery_photo"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_photo_comments Gallery_photo_commen_comment_id_8c729206_fk_Gallery_c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_comments"
    ADD CONSTRAINT "Gallery_photo_commen_comment_id_8c729206_fk_Gallery_c" FOREIGN KEY (comment_id) REFERENCES public."Gallery_comment"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_photo_comments Gallery_photo_comments_photo_id_e989a7bd_fk_Gallery_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_comments"
    ADD CONSTRAINT "Gallery_photo_comments_photo_id_e989a7bd_fk_Gallery_photo_id" FOREIGN KEY (photo_id) REFERENCES public."Gallery_photo"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_photo_metadata Gallery_photo_metada_metadata_id_caacf894_fk_MetaData_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_metadata"
    ADD CONSTRAINT "Gallery_photo_metada_metadata_id_caacf894_fk_MetaData_" FOREIGN KEY (metadata_id) REFERENCES public."MetaData_metadata"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_photo_metadata Gallery_photo_metadata_photo_id_790f9386_fk_Gallery_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_metadata"
    ADD CONSTRAINT "Gallery_photo_metadata_photo_id_790f9386_fk_Gallery_photo_id" FOREIGN KEY (photo_id) REFERENCES public."Gallery_photo"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_photo_report Gallery_photo_report_photo_id_f902610b_fk_Gallery_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_report"
    ADD CONSTRAINT "Gallery_photo_report_photo_id_f902610b_fk_Gallery_photo_id" FOREIGN KEY (photo_id) REFERENCES public."Gallery_photo"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Gallery_photo_report Gallery_photo_report_reporte_id_6c16ef1c_fk_Gallery_reporte_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gallery_photo_report"
    ADD CONSTRAINT "Gallery_photo_report_reporte_id_6c16ef1c_fk_Gallery_reporte_id" FOREIGN KEY (reporte_id) REFERENCES public."Gallery_reporte"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: MetaData_metadata MetaData_metadata_metadata_id_3844c82d_fk_MetaData_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MetaData_metadata"
    ADD CONSTRAINT "MetaData_metadata_metadata_id_3844c82d_fk_MetaData_" FOREIGN KEY (metadata_id) REFERENCES public."MetaData_iptckeyword"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_registerlink Users_registerlink_user_id_dce89798_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_registerlink"
    ADD CONSTRAINT "Users_registerlink_user_id_dce89798_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_albums Users_user_albums_album_id_8226d241_fk_Gallery_album_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_albums"
    ADD CONSTRAINT "Users_user_albums_album_id_8226d241_fk_Gallery_album_id" FOREIGN KEY (album_id) REFERENCES public."Gallery_album"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_albums Users_user_albums_user_id_31e7fd27_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_albums"
    ADD CONSTRAINT "Users_user_albums_user_id_31e7fd27_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_comments Users_user_comments_comment_id_9d71dfd3_fk_Gallery_comment_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_comments"
    ADD CONSTRAINT "Users_user_comments_comment_id_9d71dfd3_fk_Gallery_comment_id" FOREIGN KEY (comment_id) REFERENCES public."Gallery_comment"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_comments Users_user_comments_user_id_43c22275_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_comments"
    ADD CONSTRAINT "Users_user_comments_user_id_43c22275_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_groups Users_user_groups_group_id_884146f8_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_groups"
    ADD CONSTRAINT "Users_user_groups_group_id_884146f8_fk_auth_group_id" FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_groups Users_user_groups_user_id_e0963e48_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_groups"
    ADD CONSTRAINT "Users_user_groups_user_id_e0963e48_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_photos Users_user_photos_photo_id_c5b31008_fk_Gallery_photo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_photos"
    ADD CONSTRAINT "Users_user_photos_photo_id_c5b31008_fk_Gallery_photo_id" FOREIGN KEY (photo_id) REFERENCES public."Gallery_photo"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_photos Users_user_photos_user_id_257a82e9_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_photos"
    ADD CONSTRAINT "Users_user_photos_user_id_257a82e9_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_report Users_user_report_reporte_id_63da9897_fk_Gallery_reporte_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_report"
    ADD CONSTRAINT "Users_user_report_reporte_id_63da9897_fk_Gallery_reporte_id" FOREIGN KEY (reporte_id) REFERENCES public."Gallery_reporte"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_report Users_user_report_user_id_b42c2023_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_report"
    ADD CONSTRAINT "Users_user_report_user_id_b42c2023_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_user_permissions Users_user_user_perm_permission_id_cfe39496_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_user_permissions"
    ADD CONSTRAINT "Users_user_user_perm_permission_id_cfe39496_fk_auth_perm" FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: Users_user_user_permissions Users_user_user_permissions_user_id_ffe2deb0_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_user_user_permissions"
    ADD CONSTRAINT "Users_user_user_permissions_user_id_ffe2deb0_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: WebAdmin_landingcaroussel_news WebAdmin_landingcaro_landingcaroussel_id_f5519883_fk_WebAdmin_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_landingcaroussel_news"
    ADD CONSTRAINT "WebAdmin_landingcaro_landingcaroussel_id_f5519883_fk_WebAdmin_" FOREIGN KEY (landingcaroussel_id) REFERENCES public."WebAdmin_landingcaroussel"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: WebAdmin_landingcaroussel_news WebAdmin_landingcaro_news_id_6cabb197_fk_WebAdmin_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_landingcaroussel_news"
    ADD CONSTRAINT "WebAdmin_landingcaro_news_id_6cabb197_fk_WebAdmin_" FOREIGN KEY (news_id) REFERENCES public."WebAdmin_news"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: WebAdmin_photorequest_photos WebAdmin_photoreques_photo_id_b1149160_fk_Gallery_p; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_photorequest_photos"
    ADD CONSTRAINT "WebAdmin_photoreques_photo_id_b1149160_fk_Gallery_p" FOREIGN KEY (photo_id) REFERENCES public."Gallery_photo"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: WebAdmin_photorequest_photos WebAdmin_photoreques_photorequest_id_01853020_fk_WebAdmin_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WebAdmin_photorequest_photos"
    ADD CONSTRAINT "WebAdmin_photoreques_photorequest_id_01853020_fk_WebAdmin_" FOREIGN KEY (photorequest_id) REFERENCES public."WebAdmin_photorequest"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT "django_admin_log_user_id_c564eba6_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: knox_authtoken knox_authtoken_user_id_e5a5d899_fk_Users_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knox_authtoken
    ADD CONSTRAINT "knox_authtoken_user_id_e5a5d899_fk_Users_user_id" FOREIGN KEY (user_id) REFERENCES public."Users_user"(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

