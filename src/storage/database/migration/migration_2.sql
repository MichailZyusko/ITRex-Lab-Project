USE queuedb;

CREATE TABLE IF NOT EXISTS credentials (
    id INTEGER AUTO_INCREMENT,
    password VARCHAR(255),
    login VARCHAR(255),
    userID VARCHAR(255),
    createdAt DATETIME,
    updatedAt DATETIME,
    PRIMARY KEY (id)
);

ALTER TABLE credentials ADD INDEX index_id(userID);
