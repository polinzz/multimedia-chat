CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "pwd" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "profilePic" VARCHAR(255)
);

CREATE TABLE "conversation" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "convPic" VARCHAR(255),
    "adminId" BIGINT NOT NULL,
    "updatedAt" DATE NOT NULL
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
    "updatedAt" DATE NOT NULL
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
