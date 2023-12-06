
CREATE TABLE id_account (
    int_account_id BIGINT NOT NULL AUTO_INCREMENT,
    str_email VARCHAR(10) NOT NULL UNIQUE,
    str_hashed_password VARCHAR(128) NOT NULL,
    str_password_salt VARCHAR(128) NOT NULL,
    str_last_login_ip DATETIME NULL,
    dt_created_date DATETIME NULL,
    dt_modified_date DATETIME NULL,
    dt_password_changed DATETIME NULL,
    dt_last_login DATETIME NULL,
    CONSTRAINT `id_account_PK_int_account_id` PRIMARY KEY (int_account_id)
);


CREATE TABLE id_user (
    int_user_id BIGINT NOT NULL AUTO_INCREMENT,
    int_account_id BIGINT NOT NULL,
    str_name VARCHAR(40) NOT NULL,
    str_phone_number VARCHAR(10) NOT NULL,
    dt_date_of_birth DATETIME NULL,
    int_gender INT NOT NULL,
    str_address VARCHAR(60) NOT NULL,
    CONSTRAINT `id_user_PK_int_user_id`  PRIMARY KEY (int_user_id),
    CONSTRAINT `id_user_FK_int_account_id` FOREIGN KEY (`int_account_id`) REFERENCES `id_account` (`int_account_id`)
);
