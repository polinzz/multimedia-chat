CREATE TABLE "users"(
    "id" BIGINT NOT NULL AUTO_INCREMENT,
    "pwd" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NULL,
    "profilePic" VARCHAR(255) NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");

CREATE TABLE "conversations"(
    "id" BIGINT NOT NULL AUTO_INCREMENT,
    "name" VARCHAR(255) NULL,
    "convPic" VARCHAR(255) NULL,
    "adminId" BIGINT NOT NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "conversations" ADD PRIMARY KEY("id");

CREATE TABLE "conversationUsers"(
    "id" BIGINT NOT NULL AUTO_INCREMENT,
    "convId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL
);
ALTER TABLE
    "conversationUsers" ADD PRIMARY KEY("id");

CREATE TABLE "messages"(
    "id" BIGINT NOT NULL AUTO_INCREMENT,
    "convId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "content" TEXT NULL,
    "link" VARCHAR(255) NULL,
    "updatedAt" DATE NOT NULL
);
ALTER TABLE
    "messages" ADD PRIMARY KEY("id");

ALTER TABLE
    "conversationUsers" ADD CONSTRAINT "conversationusers_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_convid_foreign" FOREIGN KEY("convId") REFERENCES "conversations"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_userid_foreign" FOREIGN KEY("userId") REFERENCES "users"("id");
ALTER TABLE
    "conversations" ADD CONSTRAINT "conversations_adminid_foreign" FOREIGN KEY("adminId") REFERENCES "users"("id");
ALTER TABLE
    "conversationUsers" ADD CONSTRAINT "conversationusers_convid_foreign" FOREIGN KEY("convId") REFERENCES "conversations"("id");