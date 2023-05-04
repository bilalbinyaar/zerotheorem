// // PORT=80
// // HOST=35.224.209.204
// // USERDB=root
// // DATABASE=zero_theorem_mysql
// // PASSWORD=Pak123@@@
// // INST_CONN_NAME=annular-arena-374409:us-central1:mysql-zt

// var admin = require("firebase-admin");

// var serviceAccount = require(__dirname + "/zt.json");
// // Initialize the app with a service account, granting admin privileges
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // The database URL depends on the location of the database
//   databaseURL: "https://zero-theorem-50b67-default-rtdb.firebaseio.com/",
// });
// // As an admin, the app has access to read and write all data, regardless of Security Rules
// var dbFirebase = admin.database();
// const express = require("express");

// require("dotenv").config();
// const app = express();
// const cors = require("cors");
// app.use(cors());
// const mysql = require("mysql");
// const db = mysql.createPool({
//   connectionLimit: 10,
//   host: "35.224.209.204",
//   user: "root",
//   password: "Pak123@@@",
//   database: "zero_theorem_mysql",
// });
// // console.log("Database connection is successfull");
// db.getConnection((err, con) => {
//   if (err) {
//     console.log(err.code);
//   } else {
//     console.log("Database is connected successfully");
//   }
// });
// PORT = process.env.PORT || 8085;

// //Crud operations by using express with mysql
// app.get("/getData", function (req, res) {
//   var query = "select * from Strategies;";
//   db.query(query, (err, result) => {
//     if (err) {
//       res.json({ msg: err });
//     } else {
//       res.json({ msg: result });
//     }
//   });
// });

// app.get("/get_stats", function (req, res) {
//   var query = "select * from Stats";
//   db.query(query, (err, result) => {
//     if (err) {
//       res.json({ msg: err });
//     } else {
//       res.json({ msg: result });
//     }
//   });
// });

// app.get("/get_strategies", async function (req, res) {
//   console.log("I am here to print query");
//   var query = "select * from Strategies";
//   db.query(query, (err, result) => {
//     if (err) {
//       res.json({ response: err });
//     } else {
//       res.json({ response: result });
//     }
//   });
// });

// app.get("/get_btc_minute_data", function (req, res) {
//   var query = "select * from BTC_Minute_Data";
//   db.query(query, (err, result) => {
//     if (err) {
//       res.json({ msg: err });
//     } else {
//       res.json({ msg: result });
//     }
//   });
// });

// app.get("/", function (req, res) {
//   res.send("<h4>Welcome to Rest API service for zero theorem</h4>");
// });

// app.listen(PORT, function () {
//   console.log("Server is listening in node server ", PORT);
// });

// const insertStrategiesDataSql = () => {
//   const ref = dbFirebase.ref("strategies");
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on(
//     "value",
//     (snapshot) => {
//       const data = snapshot.val();
//       var value;
//       for (var key in data) {
//         value = data[key];
//         // console.log("Here is the key -->", key);
//         // console.log("Here is the data -->", value.currency);
//         var query = `REPLACE INTO Strategies (Execution_Time, Strategy_Name, Current_Position, Price, Size, Currency) VALUES ('${value.execution_time}','${value.strategy_name}','${value.current_position}','${value.price}','${value.size}','${value.currency}')`;
//         db.query(query, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(result);
//           }
//         });
//       }
//     },
//     (errorObject) => {
//       console.log("The read failed: " + errorObject.name);
//     }
//   );
// };

// const insertStatsDataSql = () => {
//   const ref = dbFirebase.ref("Stats");
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on(
//     "value",
//     (snapshot) => {
//       const rec_data = snapshot.val();
//       var value;
//       for (var key in rec_data) {
//         data = rec_data[key];
//         console.log("Here is the key -->", key);
//         console.log("Here is the data -->", data.sortino);
//         var query = `REPLACE INTO Stats (strategy_name, avg_drawdown, avg_drawdown_duration, consective_wins, consective_losses, current_drawdown_duration, current_drawdown, max_drawdown, max_drawdown_duration, loss_percentage, r2_score, sharpe, sortino, total_losses, total_negative_pnl, total_pnl, total_positive_pnl, total_wins, win_percentage) VALUES ('${data.StrategyName}','${data.average_drawdown}','${data.average_drawdown_duration}','${data.consective_wins}','${data.consective_losses}','${data.curr_drawdown_duration}','${data.current_drawdown}','${data.max_drawdown}','${data.max_drawdown_duration}','${data.loss_percentage}','${data.r2_score}','${data.sharpe}','${data.sortino}','${data.total_losses}','${data.total_negative_pnl}','${data.total_pnl}','${data.total_positive_pnl}','${data.total_wins}','${data.win_percentage}')`;
//         db.query(query, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(result);
//           }
//         });
//       }
//     },
//     (errorObject) => {
//       console.log("The read failed: " + errorObject.name);
//     }
//   );
// };

// const insertBtcMinuteDataSql = () => {
//   const ref = dbFirebase.ref("BTC/minute_data/");
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on(
//     "value",
//     (snapshot) => {
//       const rec_data = snapshot.val();
//       var value;
//       for (var key in rec_data) {
//         data = rec_data[key];
//         console.log("Here is the key -->", key);
//         console.log("Here is the data -->", data.timestamp);
//         var query = `replace INTO BTC_Minute_Data(Data_Timestamp, Closing_Value, Opening_Value, Low, High, Volume) VALUES ('${data.timestamp}','${data.Close}','${data.Open}','${data.Low}','${data.High}','${data.Volume}')`;
//         db.query(query, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(result);
//           }
//         });
//       }
//     },
//     (errorObject) => {
//       console.log("The read failed: " + errorObject.name);
//     }
//   );
// };
// // insertStrategiesDataSql();
// // insertStatsDataSql();
// // insertBtcMinuteDataSql();

// const ref = dbFirebase.ref("strategies");
// // Get the data on a post that has changed
// ref.on("child_changed", (snapshot) => {
//   const data = snapshot.val();
//   var value;
//   console.log("Data is changed");
//   for (var key in data) {
//     // value = data[key];
//     // console.log("Here is the key -->", key);
//     // console.log("Here is the data -->", data.execution_time);
//     var query = `REPLACE INTO Strategies (start_time, strategy_name, current_position, price, size, currency, time_horizon) VALUES ('${data.start_time}','${data.strategy_name}','${data.current_position}','${data.price}','${data.size}','${data.currency}','${data.time_horizon}')`;
//     db.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//       }
//     });
//   }
// });

// const ref2 = dbFirebase.ref("Stats");
// // Get the data on a post that has changed
// ref2.on("child_changed", (snapshot) => {
//   const data = snapshot.val();
//   var value;
//   for (var key in data) {
//     // value = data[key];
//     // console.log("Here is the key -->", key);
//     // console.log("Here is the data -->", data.StrategyName);
//     var query = `REPLACE INTO Stats (strategy_name, avg_drawdown, avg_drawdown_duration, consective_wins, consective_losses, current_drawdown_duration, current_drawdown, max_drawdown, max_drawdown_duration, loss_percentage, r2_score, sharpe, sortino, total_losses, total_negative_pnl, total_pnl, total_positive_pnl, total_wins, win_percentage) VALUES ('${data.StrategyName}','${data.average_drawdown}','${data.average_drawdown_duration}','${data.consective_wins}','${data.consective_losses}','${data.curr_drawdown_duration}','${data.current_drawdown}','${data.max_drawdown}','${data.max_drawdown_duration}','${data.loss_percentage}','${data.r2_score}','${data.sharpe}','${data.sortino}','${data.total_losses}','${data.total_negative_pnl}','${data.total_pnl}','${data.total_positive_pnl}','${data.total_wins}','${data.win_percentage}')`;
//     db.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//       }
//     });
//   }
// });

// var admin = require("firebase-admin");

// var serviceAccount = require(__dirname + "/zt.json");
// // Initialize the app with a service account, granting admin privileges
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // The database URL depends on the location of the database
//   databaseURL: "https://zero-theorem-50b67-default-rtdb.firebaseio.com/",
// });
// // As an admin, the app has access to read and write all data, regardless of Security Rules
// var dbFirebase = admin.database();
// const express = require("express");

// require("dotenv").config();
// const app = express();
// const cors = require("cors");
// app.use(cors());
// const mysql = require("mysql");
// var ledgers_listeners_objs = [];
// const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USERDB,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });
// // console.log("Database connection is successfull");
// db.connect((err, con) => {
//   if (err) {
//     console.log(err.code);
//   } else {
//     console.log("Database is connected successfully");
//   }
// });
// PORT = process.env.PORT || 8085;

// //Crud operations by using express with mysql
// app.get("/getData", function (req, res) {
//   var query = "select * from Strategies;";
//   db.query(query, (err, result) => {
//     if (err) {
//       res.json({ msg: err });
//     } else {
//       res.json({ msg: result });
//     }
//   });
// });

// app.get("/get_stats", function (req, res) {
//   var query = "select * from Stats";
//   db.query(query, (err, result) => {
//     if (err) {
//       res.json({ msg: err });
//     } else {
//       res.json({ msg: result });
//     }
//   });
// });

// app.get("/get_strategies", async function (req, res) {
//   console.log("I am here to print query");
//   var query = "select * from Strategies";
//   db.query(query, (err, result) => {
//     if (err) {
//       res.json({ response: err });
//     } else {
//       res.json({ response: result });
//     }
//   });
// });

// app.get("/get_btc_minute_data", function (req, res) {
//   var query = "select * from BTC_Minute_Data";
//   db.query(query, (err, result) => {
//     if (err) {
//       res.json({ msg: err });
//     } else {
//       res.json({ msg: result });
//     }
//   });
// });

// app.get("/", function (req, res) {
//   res.send("<h4>Welcome to Rest API service for zero theorem</h4>");
// });

// app.listen(PORT, function () {
//   console.log("Server is listening in node server ", PORT);
// });

// const insertStrategiesDataSql = () => {
//   const ref = dbFirebase.ref("strategies");
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on(
//     "value",
//     (snapshot) => {
//       const data = snapshot.val();
//       var value;
//       for (var key in data) {
//         value = data[key];
//         // console.log("Here is the key -->", key);
//         // console.log("Here is the data -->", value.currency);
//         var query = `REPLACE INTO Strategies (Execution_Time, Strategy_Name, Current_Position, Price, Size, Currency) VALUES ('${value.execution_time}','${value.strategy_name}','${value.current_position}','${value.price}','${value.size}','${value.currency}')`;
//         db.query(query, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log(result);
//           }
//         });
//       }
//     },
//     (errorObject) => {
//       console.log("The read failed: " + errorObject.name);
//     }
//   );
// };

// const insertStatsDataSql = () => {
//   const ref = dbFirebase.ref("Stats");
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on(
//     "value",
//     (snapshot) => {
//       const rec_data = snapshot.val();
//       var value;
//       for (var key in rec_data) {
//         data = rec_data[key];
//         // console.log("Here is the key -->", key);
//         // console.log("Here is the data -->", data.sortino);
//         var query = `REPLACE INTO Stats (strategy_name, avg_drawdown, avg_drawdown_duration, consective_wins, consective_losses, current_drawdown_duration, current_drawdown, max_drawdown, max_drawdown_duration, loss_percentage, r2_score, sharpe, sortino, total_losses, total_negative_pnl, total_pnl, total_positive_pnl, total_wins, win_percentage) VALUES ('${data.StrategyName}','${data.average_drawdown}','${data.average_drawdown_duration}','${data.consective_wins}','${data.consective_losses}','${data.curr_drawdown_duration}','${data.current_drawdown}','${data.max_drawdown}','${data.max_drawdown_duration}','${data.loss_percentage}','${data.r2_score}','${data.sharpe}','${data.sortino}','${data.total_losses}','${data.total_negative_pnl}','${data.total_pnl}','${data.total_positive_pnl}','${data.total_wins}','${data.win_percentage}')`;
//         db.query(query, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log(result);
//           }
//         });
//       }
//     },
//     (errorObject) => {
//       console.log("The read failed: " + errorObject.name);
//     }
//   );
// };

// const insertBtcMinuteDataSql = () => {
//   const ref = dbFirebase.ref("BTC/minute_data/");
//   // Attach an asynchronous callback to read the data at our posts reference
//   ref.on(
//     "value",
//     (snapshot) => {
//       const rec_data = snapshot.val();
//       var value;
//       for (var key in rec_data) {
//         data = rec_data[key];
//         // console.log("Here is the key -->", key);
//         // console.log("Here is the data -->", data.timestamp);
//         var query = `replace INTO BTC_Minute_Data(Data_Timestamp, Closing_Value, Opening_Value, Low, High, Volume) VALUES ('${data.timestamp}','${data.Close}','${data.Open}','${data.Low}','${data.High}','${data.Volume}')`;
//         db.query(query, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log(result);
//           }
//         });
//       }
//     },
//     (errorObject) => {
//       console.log("The read failed: " + errorObject.name);
//     }
//   );
// };
// // insertStrategiesDataSql();
// // insertStatsDataSql();
// // insertBtcMinuteDataSql();

// const ref = dbFirebase.ref("strategies");
// // Get the data on a post that has changed
// ref.on("value", (snapshot) => {
//   const data = snapshot.val();
//   var value;
//   // console.log("Data is changed");
//   for (var key in data) {
//     // value = data[key];
//     // console.log("Here is the key -->", key);
//     // console.log("Here is the data -->", data[key].currency);
//     var query = `REPLACE INTO Strategies (start_time, strategy_name, current_position, price, size, currency, time_horizon) VALUES ('${data[key].start_time}','${data[key].strategy_name}','${data[key].current_position}','${data[key].price}','${data[key].size}','${data[key].currency}','${data[key].time_horizon}')`;
//     db.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(result);
//       }
//     });
//   }
// });

// const ref2 = dbFirebase.ref("Stats");
// // Get the data on a post that has changed
// ref2.on("value", (snapshot) => {
//   const data = snapshot.val();
//   var value;
//   for (var key in data) {
//     value = data[key];
//     // console.log("Here is the key -->", key);
//     // console.log("Here is the data -->", data.StrategyName);
//     var query = `REPLACE INTO Stats (strategy_name, avg_drawdown, avg_drawdown_duration, consective_wins, consective_losses, current_drawdown_duration, current_drawdown, max_drawdown, max_drawdown_duration, loss_percentage, r2_score, sharpe, sortino, total_losses, total_negative_pnl, total_pnl, total_positive_pnl, total_wins, win_percentage) VALUES ('${data[key].StrategyName}','${data[key].average_drawdown}','${data[key].average_drawdown_duration}','${data[key].consective_wins}','${data[key].consective_losses}','${data[key].curr_drawdown_duration}','${data[key].current_drawdown}','${data[key].max_drawdown}','${data[key].max_drawdown_duration}','${data[key].loss_percentage}','${data[key].r2_score}','${data[key].sharpe}','${data[key].sortino}','${data[key].total_losses}','${data[key].total_negative_pnl}','${data[key].total_pnl}','${data[key].total_positive_pnl}','${data[key].total_wins}','${data[key].win_percentage}')`;
//     db.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(result);
//       }
//     });
//   }
// });

// // const ref3 = dbFirebase.ref("LedgerNames");
// // // Get the data on a post that has changed
// // ref3.on("value", (snapshot) => {
// //   const data = snapshot.val();
// //   var value;
// //   for (var key in data) {
// //     // value = data[key];
// //     console.log("Here is the key -->", key);
// //     console.log("Here is the data -->", data);
// //     var query = `REPLACE INTO LedgerNames (Name) VALUES ('${data[key]}')`;
// //     var query_for_creating_table = `create table if not exists ${data[key]}  (ledger_timestamp varchar(64) primary key, balance double(12, 2), buy_price double(12,2), pnl double(6,2), pnl_sum double(6, 2), prediction varchar(64), sell_price double(12, 2))`;
// //     db.query(query, (err, result) => {
// //       if (err) {
// //         console.log(err);
// //       } else {
// //         console.log(result);
// //       }
// //     });

// //     db.query(query_for_creating_table, (err, result) => {
// //       if (err) {
// //         console.log(err);
// //       } else {
// //         console.log(result);
// //       }
// //     });
// //   }
// // });

// class Listener_on_add_child {
//   constructor(node) {
//     this.node = node;
//     console.log("Object is created for listener -->", this.node);
//     var ref4 = dbFirebase.ref(this.node);
//     // Get the data on a post that has changed
//     ref4.on("child_added", (snapshot) => {
//       const data = snapshot.val();
//       var value;
//       for (var key in data) {
//         // value = data[key];
//         // console.log("Here is the key -->", key, this.node);
//         // console.log("Here is the data -->", data.date);
//         var query = `REPLACE INTO ${this.node} (ledger_timestamp, balance, buy_price, pnl, pnl_sum, prediction, sell_price) VALUES ('${data.date}',
//         '${data.balance}','${data.buy_price}','${data.pnl}','${data.pnl_sum}','${data.prediction}','${data.sell_price}')`;
//         db.query(query, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log(result);
//           }
//         });
//       }
//     });
//   }
// }

// class Listener_on_child_value {
//   constructor(node) {
//     this.node = node;
//     const ref4 = dbFirebase.ref(this.node);
//     // Get the data on a post that has changed
//     ref4.on("value", (snapshot) => {
//       const data = snapshot.val();
//       var value;
//       for (var key in data) {
//         // value = data[key];
//         // console.log("Here is the key -->", key);
//         // console.log("Here is the data -->", data);
//         var query = `REPLACE INTO LedgerNames (Name) VALUES ('${data[key]}')`;
//         var query_for_creating_table = `create table if not exists ${data[key]}  (ledger_timestamp varchar(64) primary key, balance double(12, 2), buy_price double(12,2), pnl double(6,2), pnl_sum double(6, 2), prediction varchar(64), sell_price double(12, 2))`;
//         if (ledgers_listeners_objs.includes(this.node) == false) {
//           ledgers_listeners_objs.push(new Listener_on_add_child(data[key]));
//         }
//         db.query(query, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log(result);
//           }
//         });

//         db.query(query_for_creating_table, (err, result) => {
//           if (err) {
//             console.log(err);
//           } else {
//             // console.log(result);
//           }
//         });
//       }
//     });
//   }
// }

// new Listener_on_child_value("LedgerNames");

// // const db = mysql.createPool({
// //   connectionLimit: 10,
// //   host: "35.224.209.204",
// //   user: "root",
// //   password: "Pak123@@@",
// //   database: "zero_theorem_mysql",
// // });
