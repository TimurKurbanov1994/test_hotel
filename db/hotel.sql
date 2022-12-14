PGDMP                     
    z            hotel    14.1    15.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16384    hotel    DATABASE     p   CREATE DATABASE hotel WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE hotel;
                user    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                user    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   user    false    4            ?            1259    41063    client    TABLE     ?   CREATE TABLE public.client (
    id integer NOT NULL,
    name character varying NOT NULL,
    "lastName" character varying NOT NULL,
    vip boolean DEFAULT false NOT NULL
);
    DROP TABLE public.client;
       public         heap    user    false    4            ?            1259    41062    client_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.client_id_seq;
       public          user    false    214    4                       0    0    client_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;
          public          user    false    213            ?            1259    41055    order    TABLE     ?   CREATE TABLE public."order" (
    id integer NOT NULL,
    start_date date NOT NULL,
    end_date date,
    booked boolean DEFAULT true NOT NULL,
    vip boolean NOT NULL,
    "clientId" integer NOT NULL,
    "roomId" integer NOT NULL
);
    DROP TABLE public."order";
       public         heap    user    false    4            ?            1259    41054    order_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.order_id_seq;
       public          user    false    212    4                       0    0    order_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;
          public          user    false    211            ?            1259    41046    room    TABLE     ?   CREATE TABLE public.room (
    id integer NOT NULL,
    type character varying NOT NULL,
    price integer NOT NULL,
    square integer NOT NULL
);
    DROP TABLE public.room;
       public         heap    user    false    4            ?            1259    41045    room_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.room_id_seq;
       public          user    false    210    4                       0    0    room_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.room_id_seq OWNED BY public.room.id;
          public          user    false    209            k           2604    41066 	   client id    DEFAULT     f   ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);
 8   ALTER TABLE public.client ALTER COLUMN id DROP DEFAULT;
       public          user    false    214    213    214            i           2604    41058    order id    DEFAULT     f   ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);
 9   ALTER TABLE public."order" ALTER COLUMN id DROP DEFAULT;
       public          user    false    211    212    212            h           2604    41049    room id    DEFAULT     b   ALTER TABLE ONLY public.room ALTER COLUMN id SET DEFAULT nextval('public.room_id_seq'::regclass);
 6   ALTER TABLE public.room ALTER COLUMN id DROP DEFAULT;
       public          user    false    210    209    210                      0    41063    client 
   TABLE DATA           ;   COPY public.client (id, name, "lastName", vip) FROM stdin;
    public          user    false    214   ?                 0    41055    order 
   TABLE DATA           ^   COPY public."order" (id, start_date, end_date, booked, vip, "clientId", "roomId") FROM stdin;
    public          user    false    212   ?                 0    41046    room 
   TABLE DATA           7   COPY public.room (id, type, price, square) FROM stdin;
    public          user    false    210   Q                  0    0    client_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.client_id_seq', 4, true);
          public          user    false    213                       0    0    order_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.order_id_seq', 8, true);
          public          user    false    211                       0    0    room_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.room_id_seq', 23, true);
          public          user    false    209            p           2606    41061 $   order PK_1031171c13130102495201e3e20 
   CONSTRAINT     f   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20";
       public            user    false    212            r           2606    41071 %   client PK_96da49381769303a6515a8785c7 
   CONSTRAINT     e   ALTER TABLE ONLY public.client
    ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.client DROP CONSTRAINT "PK_96da49381769303a6515a8785c7";
       public            user    false    214            n           2606    41053 #   room PK_c6d46db005d623e691b2fbcba23 
   CONSTRAINT     c   ALTER TABLE ONLY public.room
    ADD CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.room DROP CONSTRAINT "PK_c6d46db005d623e691b2fbcba23";
       public            user    false    210            s           2606    41077 $   order FK_71fdc983df50c0cd45d8b36b473    FK CONSTRAINT     ?   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_71fdc983df50c0cd45d8b36b473" FOREIGN KEY ("roomId") REFERENCES public.room(id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "FK_71fdc983df50c0cd45d8b36b473";
       public          user    false    212    3182    210            t           2606    41072 $   order FK_9b27855a9c2ade186e5c55d1ec3    FK CONSTRAINT     ?   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES public.client(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3";
       public          user    false    3186    212    214               B   x?3??0??֋M???.l?L?2??0???{/l??0?¦??} ????.?"????? ??0?         e   x?m?Q?0C??]f?M?w?{'?????h?i?????{0??4?*EL4}҃?G??KB?I?g?????*J??\???ۂ?jf???Ր?>l?ܰa? m5-V         ?   x???A?0E?ӻh:?J???????x ?g?s#???6]??g??2?*Z????Jr??xG8a?K???(2o2?CT㬉g???????>.?0J#u?x.!K?O8???G?~F?d*??ЯtU?????G?S?R?
?
_??b!U$?)?l?r??K?,E?[c?$?a     