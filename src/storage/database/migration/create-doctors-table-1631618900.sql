USE queuedb;

CREATE TABLE IF NOT EXISTS doctors (
    doctorID VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    gender VARCHAR(255),
    birthday DATE,
    userID VARCHAR(255),
    FOREIGN KEY (userID) REFERENCES credentials(userID),
    PRIMARY KEY (doctorID)
);
