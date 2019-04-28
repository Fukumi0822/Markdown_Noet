
/*  テーブルを作成
------------------------------------------------------------*/

-- POST Table article_posts
CREATE TABLE IF NOT EXISTS article_posts(
  id_post INT auto_increment primary key,
  post_title VARCHAR(100),
  post_article LONGTEXT,
  post_label TEXT,
  user_id INT,
  page_view INT,
  comment LONGTEXT,
  timestamp DATETIME
);

CREATE TABLE IF NOT EXISTS users(
  id INT auto_increment primary key,
  user_name VARCHAR(50),
  user_icon_path TEXT,
  user_introduce TEXT,
  user_sex INT,
  user_type INT,
  u_password TEXT
);