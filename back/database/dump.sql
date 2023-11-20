CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "pwd" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "profilePic" VARCHAR(255),
    "email" VARCHAR(255)
);

CREATE TABLE "conversation" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "convPic" VARCHAR(255),
    "adminId" BIGINT NOT NULL,
    "updatedAt" timestamp NOT NULL
);

CREATE TABLE "conversationUser" (
    "id" SERIAL PRIMARY KEY,
    "convId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL
);

CREATE TABLE "message" (
    "id" SERIAL PRIMARY KEY,
    "author" VARCHAR(255) NOT NULL,
    "convId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "content" TEXT,
    "link" VARCHAR(255),
    "updatedAt" timestamp NOT NULL
);

ALTER TABLE
    "conversationUser" ADD CONSTRAINT "conversationusers_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "message" ADD CONSTRAINT "messages_convid_foreign" FOREIGN KEY("convId") REFERENCES "conversation"("id");
ALTER TABLE
    "message" ADD CONSTRAINT "messages_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "conversation" ADD CONSTRAINT "conversations_adminid_foreign" FOREIGN KEY("adminId") REFERENCES "user"("id");
ALTER TABLE
    "conversationUser" ADD CONSTRAINT "conversationusers_convid_foreign" FOREIGN KEY("convId") REFERENCES "conversation"("id");

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Pauline', '', 'pauli');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Adrien', '', 'adri');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Romain', '', 'romain@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Valentine', '', 'valentine@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Herby', '', 'herby@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'Anthony', '', 'anthony@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser1', '', 'fakeuser1@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser2', '', 'fakeuser2@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser3', '', 'fakeuser3@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser4', '', 'fakeuser4@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser5', '', 'fakeuser5@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser6', '', 'fakeuser6@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser7', '', 'fakeuser7@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser8', '', 'fakeuser8@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('az', 'FakeUser9', '', 'fakeuser9@mail.com');

INSERT INTO "conversation" ("name", "adminId", "updatedAt" )
VALUES ('Planification Week-end', 2, now());

INSERT INTO "conversation" ("name", "adminId", "updatedAt" )
VALUES ('Projets', 2, now());

INSERT INTO "conversation" ("name", "adminId", "updatedAt" )
VALUES ('Actualités du Jour', 2, now());

INSERT INTO "conversation" ("name", "adminId", "updatedAt" )
VALUES ('Café des Amis', 2, now());

INSERT INTO "conversationUser" ("convId", "userId")
VALUES (2, 2);

INSERT INTO "conversationUser" ("convId", "userId")
VALUES (3, 2);

INSERT INTO "conversationUser" ("convId", "userId")
VALUES (1, 2);

INSERT INTO "conversationUser" ("convId", "userId")
VALUES (4, 2);

INSERT INTO "conversationUser" ("convId", "userId")
VALUES (4, 1);

INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('Salut ca va', 1, 2, now(), 'Adrien');
INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('he ho, tu reponds', 1, 2, now(), 'Adrien');

INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('Salut ca va', 2, 2, now(), 'Adrien');
INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('he ho, tu reponds', 2, 2, now(), 'Adrien');

INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('Salut salut', 3, 2, now(), 'Adrien');
INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('t es la ?', 3, 2, now(), 'Adrien');

INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('Salut ! Nouveau café en ville !!', 4, 2, now(), 'Adrien');
INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('Ça marche, samedi à 15h ?', 4, 1, now(), 'Pauline');
INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('Parfait ! On se retrouve là-bas.', 4, 2, now(), 'Adrien');
INSERT INTO "message" ("content", "convId", "userId", "updatedAt", "author")
VALUES ('Super, trop hâte !', 4, 1, now(), 'Pauline');


