// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require("express");
var jwt = require("jsonwebtoken");

const mariadb = require("./database/connect.js");
mariadb.getConnection(function (err, connection) {});

const auth = async (req, res, next) => {
  try {
    // if (req.header("Authorization")) {
    //   const token = req.header("Authorization").replace("Bearer ", "");
    //   console.log(token);
    //   const decoded = jwt.verify(token, "thisisssecret");
    //   console.log(decoded);

    mariadb.query("select * from user", function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("USER DB");
        console.log(rows);
      }
    });
    // } else {
    //   throw new Error("로그인을 해주세요");
    // }

    // if (!user) {
    //   throw new Error();
    // }
    // req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "로그인을 해주세요" });
  }
};

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express();

app.use(auth);

// 이제 터미널에 node app.js 를 입력해보자.

app.get("/user", function (req, res) {
  const phoneNumber = req.query.phoneNumber;

  try {
    mariadb.query(
      "select * from user where phoneNumber = ?",
      [phoneNumber],
      function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
          res.send(rows);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

// 6월 달 포스터 페이지 리스트 조회
app.get("/poster", function (req, res) {
    const month = req.query.month;

    try {
        mariadb.query(
            "select * from poster where month = ?",
            [month],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rows);
                    res.send(rows);
                }
            }
        );
    } catch (e) {
        console.log(e);
    }
});

// 포스터 생성, multipart/form-data
app.post("/poster", function (req, res) {
    const month = req.body.month;
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;

    try {
        mariadb.query(
            "insert into poster (month, title, content, image) values (?, ?, ?, ?)",
            [month, title, content, image],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rows);
                    res.send(rows);
                }
            }
        );
    } catch (e) {
        console.log(e);
    }
});
  
// 3000 포트로 서버 오픈
app.listen(3001, function () {
  console.log("start! express server on port 3001");
});
