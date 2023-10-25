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

INSERT INTO "conversation" ("name", "adminId", "updatedAt" )
VALUES ('conv1', 2, now());

INSERT INTO "conversation" ("name", "adminId", "updatedAt" )
VALUES ('conv2', 2, now());

INSERT INTO "conversation" ("name", "adminId", "updatedAt" )
VALUES ('conv3', 2, now());

INSERT INTO "conversationUser" ("convId", "userId")
VALUES (2, 2);

INSERT INTO "conversationUser" ("convId", "userId")
VALUES (3, 2);

INSERT INTO "conversationUser" ("convId", "userId")
VALUES (1, 2);

INSERT INTO "message" ("content", "convId", "userId", "updatedAt")
VALUES ('content1Conv1', 2, 2, now());
INSERT INTO "message" ("content", "convId", "userId", "updatedAt")
VALUES ('content2Conv1', 2, 2, now());

INSERT INTO "message" ("content", "convId", "userId", "updatedAt")
VALUES ('content1Conv2', 3, 2, now());
INSERT INTO "message" ("content", "convId", "userId", "updatedAt")
VALUES ('content2Conv2', 3, 2, now());

SELECT DISTINCT ON (m."convId") m."convId", m.content, c."name", c."id", c."adminId", m."updatedAt"
FROM "conversation" AS c
LEFT JOIN "message" as m ON m."convId" = c."id"
LEFT JOIN "message" as m2 ON m."convId" = m2."convId"
AND m."updatedAt" >= m2."updatedAt"
AND m."id" <> m2."id"
WHERE c.id IN(SELECT "convId" FROM "conversationUser" WHERE "userId" = 2)
ORDER BY m."convId" DESC;
