USE clinic;

CREATE TABLE IF NOT EXISTS credentials (
    id INTEGER AUTO_INCREMENT,
    password VARCHAR(255),
    login VARCHAR(255),
    user_id VARCHAR(255),
    PRIMARY KEY (id)
);
