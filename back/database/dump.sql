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
VALUES ('azertyuiop', 'Pauline', '', 'pauline@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'Adrien', '', 'adrien@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'Romain', '', 'romain@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'Valentine', '', 'valentine@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'Herby', '', 'herby@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'Anthony', '', 'anthony@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser1', '', 'fakeuser1@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser2', '', 'fakeuser2@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser3', '', 'fakeuser3@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser4', '', 'fakeuser4@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser5', '', 'fakeuser5@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser6', '', 'fakeuser6@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser7', '', 'fakeuser7@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser8', '', 'fakeuser8@mail.com');

INSERT INTO "user" ("pwd", "name", "profilePic", "email")
VALUES ('azertyuiop', 'FakeUser9', '', 'fakeuser9@mail.com');