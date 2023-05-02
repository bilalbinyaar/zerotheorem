const redis = require("redis");
const mysql = require("mysql");
const cron = require("node-cron");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const redisClient = redis.createClient({
  host: process.env.REDIS_IP,
});
redisClient.on("error", function (error) {
  console.error(error);
});

const db = mysql.createPool({
  connectionLimit: 100,
  host: "34.134.161.148",
  user: "sorez",
  waitForConnections: true,
  password: "sorez",
  database: "zero_theorem_mysql",
});

db.getConnection((err, con) => {
  if (err) {
    console.log(err.code);
  } else {
    console.log("Database is connected successfully");
  }
});

const cacheDataStrategies = async () => {
  const query = "select * from Strategies";
  db.query(query, async function (err, result) {
    if (err) {
      console.error(err);
      return;
    }

    const resultStr = JSON.stringify(result);
    const now = new Date();
    const minutesToNextHour = 60 - now.getMinutes() + 13;
    const expiry = new Date(now.getTime() + minutesToNextHour * 60 * 1000); // Set expiry time to the next starting hour (UTC time)
    const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
    redisClient.setex("strategies", timeToLive, resultStr);
    console.log(`Data cached successfully at ${new Date()} for strategies`);
  });
};

const cacheDataStats = async () => {
  const query = "select * from Stats";
  db.query(query, async function (err, result) {
    if (err) {
      console.error(err);
      return;
    }

    const resultStr = JSON.stringify(result);
    const now = new Date();
    const minutesToNextHour = 60 - now.getMinutes() + 13;
    const expiry = new Date(now.getTime() + minutesToNextHour * 60 * 1000); // Set expiry time to the next starting hour (UTC time)
    const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
    redisClient.setex("get_stats", timeToLive, resultStr);
    console.log(`Data cached successfully at ${new Date()} for stats`);
  });
};

const cacheDataLedger = async () => {
  const query = "select * from Strategies";
  db.query(query, async function (err, result) {
    if (err) {
      console.error(err);
      return;
    } else {
      for (let i = 0; i < result.length; i++) {
        const ledger_name = result[i].strategy_name;
        redisClient.get(ledger_name, async function (err, data) {
          if (err) {
            console.error(err);
            return;
          }
          if (data === null) {
            // Cache the ledger if it is not already in Redis
            const ledger_query = `SELECT * FROM ${ledger_name}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
            db.query(ledger_query, async function (error, queryResult) {
              if (error) {
                console.error(error);
                return;
              } else {
                setTimeout(() => {
                  const resultStr = JSON.stringify(queryResult);
                  const now = new Date();
                  const minutesToNextHour = 60 - now.getMinutes() + 13;
                  const expiry = new Date(
                    now.getTime() + minutesToNextHour * 60 * 1000
                  ); // Set expiry time to the next starting hour (UTC time)
                  const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                  redisClient.setex(ledger_name, timeToLive, resultStr);
                  console.log(
                    `Data cached successfully at ${new Date()} for ledger ${ledger_name} with length ${
                      queryResult.length
                    } number ${i}`
                  );
                }, 100);
              }
            });
          }
        });
      }
      // res.send("Data cached successfully");
    }
  });
};

const cacheDataCompressedLedger = async () => {
  const query = "select * from Strategies";
  db.query(query, async function (err, result) {
    if (err) {
      console.error(err);
      return;
    } else {
      for (let i = 0; i < result.length; i++) {
        const ledger_name = result[i].strategy_name + "_PNL";
        redisClient.get(ledger_name, async function (err, data) {
          if (err) {
            console.error(err);
            return;
          }
          if (data === null) {
            // Cache the ledger if it is not already in Redis
            const ledger_query = `SELECT * FROM ${ledger_name}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
            db.query(ledger_query, async function (error, queryResult) {
              if (error) {
                console.error(error);
                return;
              } else {
                setTimeout(() => {
                  const resultStr = JSON.stringify(queryResult);
                  const now = new Date();
                  const minutesToNextHour = 60 - now.getMinutes() + 13;
                  const expiry = new Date(
                    now.getTime() + minutesToNextHour * 60 * 1000
                  ); // Set expiry time to the next starting hour (UTC time)
                  const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
                  redisClient.setex(ledger_name, timeToLive, resultStr);
                  console.log(
                    `Data cached successfully at ${new Date()} for compressed ledger ${ledger_name} with length ${
                      queryResult.length
                    } number ${i}`
                  );
                }, 100);
              }
            });
          }
        });
      }
      // res.send("Data cached successfully");
    }
  });
};

// Run the cacheData function every 30 seconds
cron.schedule(
  "15 * * * *",
  async () => {
    await cacheDataStrategies();
    console.log("Caching for strategies are completed");
    await cacheDataStats();
    console.log("Caching for stats are completed");
    await cacheDataLedger();
    console.log("Caching for ledger are completed");
    await cacheDataCompressedLedger();
    console.log("Caching for compressed ledgers are completed");
  },
  {
    timezone: "UTC",
  }
);
redisClient.on("error", function (error) {
  console.error(error);
});

app.get("/", (req, res) => {
  res.send(`Redis is server running on ${process.env.REDIS_IP}`);
  // const query = "select * from Strategies";
  // db.query(query, async function (err, result) {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   } else {
  //     for (let i = 0; i < result.length; i++) {
  //       const ledger_name = result[i].strategy_name;
  //       redisClient.get(ledger_name, async function (err, data) {
  //         if (err) {
  //           console.error(err);
  //           return;
  //         }
  //         if (data === null) {
  //           // Cache the ledger if it is not already in Redis
  //           const ledger_query = `SELECT * FROM ${ledger_name}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
  //           db.query(ledger_query, async function (error, queryResult) {
  //             if (error) {
  //               console.error(error);
  //               return;
  //             } else {
  //               setTimeout(() => {
  //                 const resultStr = JSON.stringify(queryResult);
  //                 const now = new Date();
  //                 const minutesToNextHour = 60 - now.getMinutes();
  //                 const expiry = new Date(
  //                   now.getTime() + minutesToNextHour * 60 * 1000
  //                 ); // Set expiry time to the next starting hour (UTC time)
  //                 const timeToLive = Math.floor((expiry - now) / 1000); // Convert to seconds
  //                 redisClient.setex(ledger_name, timeToLive, resultStr);
  //                 console.log(
  //                   `Data cached successfully at ${new Date()} for ledger ${ledger_name} with length ${
  //                     queryResult.length
  //                   } number ${i}`
  //                 );
  //               }, 100);
  //             }
  //           });
  //         }
  //       });
  //     }
  //     res.send("Data cached successfully");
  //   }
  // });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
console.log("Data caching script started...");
