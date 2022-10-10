
CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  username varchar(16) NOT NULL,
  password varchar(32) NOT NULL,
  lastlogin timestamp(6) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items_users (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name varchar(64) NOT NULL,
  url TEXT NOT NULL,
  imageurl TEXT NOT NULL,
  category varchar(16) NOT NULL
);

CREATE INDEX items_users_user_id_index
  ON items_users(user_id);

CREATE OR REPLACE FUNCTION attemptlogin("user" text, "pass" text)
  RETURNS JSON AS $BODY$
	DECLARE userExists BOOLEAN;
					loginSuccess BOOLEAN;
	BEGIN
  SELECT Exists((SELECT username FROM Users WHERE username=$1)) INTO userExists;
	SELECT Exists((SELECT username FROM Users WHERE username=$1 AND password=$2)) INTO loginSuccess;
	
	IF userExists THEN 
		IF loginSuccess THEN 
			UPDATE users SET lastLogin=CURRENT_TIMESTAMP WHERE username = $1;
			RETURN json_build_object('id', (SELECT id FROM users WHERE username = $1), 'username', $1, 'loginSuccessful', loginSuccess, 'lastLogin', (SELECT lastLogin FROM Users WHERE username=$1));
		END IF;
	END IF;
	RETURN json_build_object('username', $1, 'loginSuccessful', loginSuccess);
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
