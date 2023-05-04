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
    redisClient.set(
      "strategies",
      resultStr,
      "NX",
      "XX",
      "EX",
      timeToLive,
      (errorMessage, redisResult) => {
        if (err) {
          console.log(
            `Data cached is not successful at ${new Date()} for strategies with error ${errorMessage}`
          );
        } else {
          console.log(
            `Data cached successfully at ${new Date()} for strategies`
          );
        }
      }
    );
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
    redisClient.set(
      "get_stats",
      resultStr,
      "NX",
      "XX",
      "EX",
      timeToLive,
      (errorMessage, redisResult) => {
        if (err) {
          console.log(
            `Data cached successfully at ${new Date()} for stats with error ${errorMessage}`
          );
        } else {
          console.log(
            `Data cached is not successful at ${new Date()} for stats`
          );
        }
      }
    );
    console.log(`Data cached successfully at ${new Date()} for stats`);
  });
};

const cacheDataLedger = async (timeH) => {
  const query = "select * from Strategies";
  db.query(query, async function (err, result) {
    if (err) {
      console.error(err);
      return;
    } else {
      for (let i = 0; i < result.length; i++) {
        const ledger_name = result[i].strategy_name;

        if (ledger_name.includes("R")) {
          var curr_timeH = parseInt(ledger_name.split("R")[1].split("B")[0]);
          if (curr_timeH == timeH) {
            redisClient.get(ledger_name, async function (err, data) {
              if (err) {
                console.error(err);
                return;
              } else {
                // Cache the ledger if it is not already in Redis
                const ledger_query = `SELECT * FROM ${ledger_name}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
                db.query(ledger_query, async function (error, queryResult) {
                  if (error) {
                    console.error(error);
                    return;
                  } else {
                    const resultStr = JSON.stringify(queryResult);
                    const timeHorizon = timeH; // Set the horizon time in hours
                    const now = new Date();
                    const utcNow = new Date(
                      now.getTime() + now.getTimezoneOffset() * 60000
                    ); // Convert to UTC time

                    let hoursUntilHorizon;
                    switch (timeHorizon) {
                      case 1:
                        hoursUntilHorizon = 1 - (utcNow.getUTCHours() % 1);
                        break;
                      case 2:
                        hoursUntilHorizon = 2 - (utcNow.getUTCHours() % 2);
                        break;
                      case 3:
                        hoursUntilHorizon = 3 - (utcNow.getUTCHours() % 3);
                        break;
                      case 4:
                        hoursUntilHorizon = 4 - (utcNow.getUTCHours() % 4);
                        break;
                      case 6:
                        hoursUntilHorizon = 6 - (utcNow.getUTCHours() % 6);
                        break;
                      case 8:
                        hoursUntilHorizon = 8 - (utcNow.getUTCHours() % 8);
                        break;
                      case 12:
                        hoursUntilHorizon = 12 - (utcNow.getUTCHours() % 12);
                        break;
                      case 24:
                        hoursUntilHorizon = 24 - utcNow.getUTCHours();
                        break;
                      default:
                        throw new Error("Invalid time horizon");
                    }

                    const minutesUntilNextHorizon =
                      hoursUntilHorizon * 60 - utcNow.getUTCMinutes();
                    const secondsUntilNextHorizon = 60 - utcNow.getUTCSeconds();
                    const millisecondsUntilNextHorizon =
                      1000 - utcNow.getUTCMilliseconds();

                    const expiry = new Date(
                      utcNow.getTime() +
                        hoursUntilHorizon * 60 * 60 * 1000 +
                        minutesUntilNextHorizon * 60 * 1000 +
                        secondsUntilNextHorizon * 1000 +
                        millisecondsUntilNextHorizon
                    );

                    const timeToLive = Math.floor(
                      (expiry.getTime() - utcNow.getTime()) / 1000
                    ); // Convert to seconds

                    redisClient.set(
                      ledger_name,
                      resultStr,
                      "NX",
                      "XX",
                      "EX",
                      timeToLive,
                      (errorMessage, redisResult) => {
                        if (err) {
                          console.log(
                            `Data caching is not successful at ${new Date()} for ledger ${ledger_name} with length ${
                              queryResult.length
                            } number ${i} time horizon ${timeH} error ${errorMessage}`
                          );
                        } else {
                          console.log(
                            `Data cached successfully at ${new Date()} for ledger ${ledger_name} with length ${
                              queryResult.length
                            } number ${i} time horizon ${timeH} time to live ${timeToLive}`
                          );
                        }
                      }
                    );
                  }
                });
              }
            });
          }
        } else if (ledger_name.includes("M")) {
          var curr_timeH = parseInt(ledger_name.split("M")[1].split("B")[0]);
          if (curr_timeH == timeH) {
            redisClient.get(ledger_name, async function (err, data) {
              if (err) {
                console.error(err);
                return;
              } else {
                // Cache the ledger if it is not already in Redis
                const ledger_query = `SELECT * FROM ${ledger_name}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
                db.query(ledger_query, async function (error, queryResult) {
                  if (error) {
                    console.error(error);
                    return;
                  } else {
                    const resultStr = JSON.stringify(queryResult);
                    const timeHorizon = timeH; // Set the horizon time in hours
                    const now = new Date();
                    const utcNow = new Date(
                      now.getTime() + now.getTimezoneOffset() * 60000
                    ); // Convert to UTC time

                    let hoursUntilHorizon;
                    switch (timeHorizon) {
                      case 1:
                        hoursUntilHorizon = 1 - (utcNow.getUTCHours() % 1);
                        break;
                      case 2:
                        hoursUntilHorizon = 2 - (utcNow.getUTCHours() % 2);
                        break;
                      case 3:
                        hoursUntilHorizon = 3 - (utcNow.getUTCHours() % 3);
                        break;
                      case 4:
                        hoursUntilHorizon = 4 - (utcNow.getUTCHours() % 4);
                        break;
                      case 6:
                        hoursUntilHorizon = 6 - (utcNow.getUTCHours() % 6);
                        break;
                      case 8:
                        hoursUntilHorizon = 8 - (utcNow.getUTCHours() % 8);
                        break;
                      case 12:
                        hoursUntilHorizon = 12 - (utcNow.getUTCHours() % 12);
                        break;
                      case 24:
                        hoursUntilHorizon = 24 - utcNow.getUTCHours();
                        break;
                      default:
                        throw new Error("Invalid time horizon");
                    }

                    const minutesUntilNextHorizon =
                      hoursUntilHorizon * 60 - utcNow.getUTCMinutes();
                    const secondsUntilNextHorizon = 60 - utcNow.getUTCSeconds();
                    const millisecondsUntilNextHorizon =
                      1000 - utcNow.getUTCMilliseconds();

                    const expiry = new Date(
                      utcNow.getTime() +
                        hoursUntilHorizon * 60 * 60 * 1000 +
                        minutesUntilNextHorizon * 60 * 1000 +
                        secondsUntilNextHorizon * 1000 +
                        millisecondsUntilNextHorizon
                    );

                    const timeToLive = Math.floor(
                      (expiry.getTime() - utcNow.getTime()) / 1000
                    ); // Convert to seconds

                    redisClient.set(
                      ledger_name,
                      resultStr,
                      "NX",
                      "XX",
                      "EX",
                      timeToLive,
                      (errorMessage, redisResult) => {
                        if (err) {
                          console.log(
                            `Data caching is not successful at ${new Date()} for ledger ${ledger_name} with length ${
                              queryResult.length
                            } number ${i} time horizon ${timeH} error ${errorMessage}`
                          );
                        } else {
                          console.log(
                            `Data cached successfully at ${new Date()} for ledger ${ledger_name} with length ${
                              queryResult.length
                            } number ${i} time horizon ${timeH} time to live ${timeToLive}`
                          );
                        }
                      }
                    );
                    // console.log(
                    //   `Data cached successfully at ${new Date()} for ledger ${ledger_name} with length ${
                    //     queryResult.length
                    //   } number ${i} time horizon ${timeH}`
                    // );
                  }
                });
              }
            });
          }
        }
      }
      // res.send("Data cached successfully");
    }
  });
};

const cacheDataCompressedLedger = async (timeH) => {
  const query = "select * from Strategies";
  db.query(query, async function (err, result) {
    if (err) {
      console.error(err);
      return;
    } else {
      for (let i = 0; i < result.length; i++) {
        const ledger_name = result[i].strategy_name + "_PNL";

        if (ledger_name.includes("R")) {
          var curr_timeH = ledger_name.split("R")[1].split("B")[0];
          if (curr_timeH == timeH) {
            redisClient.get(ledger_name, async function (err, data) {
              if (err) {
                console.error(err);
                return;
              } else {
                // Cache the ledger if it is not already in Redis
                const ledger_query = `SELECT * FROM ${ledger_name}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
                db.query(ledger_query, async function (error, queryResult) {
                  if (error) {
                    console.error(error);
                    return;
                  } else {
                    const resultStr = JSON.stringify(queryResult);
                    const timeHorizon = timeH; // Set the horizon time in hours
                    const now = new Date();
                    const utcNow = new Date(
                      now.getTime() + now.getTimezoneOffset() * 60000
                    ); // Convert to UTC time

                    let hoursUntilHorizon;
                    switch (timeHorizon) {
                      case 1:
                        hoursUntilHorizon = 1 - (utcNow.getUTCHours() % 1);
                        break;
                      case 2:
                        hoursUntilHorizon = 2 - (utcNow.getUTCHours() % 2);
                        break;
                      case 3:
                        hoursUntilHorizon = 3 - (utcNow.getUTCHours() % 3);
                        break;
                      case 4:
                        hoursUntilHorizon = 4 - (utcNow.getUTCHours() % 4);
                        break;
                      case 6:
                        hoursUntilHorizon = 6 - (utcNow.getUTCHours() % 6);
                        break;
                      case 8:
                        hoursUntilHorizon = 8 - (utcNow.getUTCHours() % 8);
                        break;
                      case 12:
                        hoursUntilHorizon = 12 - (utcNow.getUTCHours() % 12);
                        break;
                      case 24:
                        hoursUntilHorizon = 24 - utcNow.getUTCHours();
                        break;
                      default:
                        throw new Error("Invalid time horizon");
                    }

                    const minutesUntilNextHorizon =
                      hoursUntilHorizon * 60 - utcNow.getUTCMinutes();
                    const secondsUntilNextHorizon = 60 - utcNow.getUTCSeconds();
                    const millisecondsUntilNextHorizon =
                      1000 - utcNow.getUTCMilliseconds();

                    const expiry = new Date(
                      utcNow.getTime() +
                        hoursUntilHorizon * 60 * 60 * 1000 +
                        minutesUntilNextHorizon * 60 * 1000 +
                        secondsUntilNextHorizon * 1000 +
                        millisecondsUntilNextHorizon
                    );

                    const timeToLive = Math.floor(
                      (expiry.getTime() - utcNow.getTime()) / 1000
                    ); // Convert to seconds

                    redisClient.set(
                      ledger_name,
                      resultStr,
                      "NX",
                      "XX",
                      "EX",
                      timeToLive,
                      (errorMessage, redisResult) => {
                        if (err) {
                          console.log(
                            `Data caching is not successful at ${new Date()} for ledger ${ledger_name} with length ${
                              queryResult.length
                            } number ${i} time horizon ${timeH} error ${errorMessage}`
                          );
                        } else {
                          console.log(
                            `Data cached successfully at ${new Date()} for ledger ${ledger_name} with length ${
                              queryResult.length
                            } number ${i} time horizon ${timeH} time to live ${timeToLive}`
                          );
                        }
                      }
                    );
                  }
                });
              }
            });
          }
        } else if (ledger_name.includes("M")) {
          var curr_timeH = ledger_name.split("M")[1].split("B")[0];
          if (curr_timeH == timeH) {
            redisClient.get(ledger_name, async function (err, data) {
              if (err) {
                console.error(err);
                return;
              } else {
                // Cache the ledger if it is not already in Redis
                const ledger_query = `SELECT * FROM ${ledger_name}  ORDER BY LPAD(lower(ledger_key), 6,0) asc;`;
                db.query(ledger_query, async function (error, queryResult) {
                  if (error) {
                    console.error(error);
                    return;
                  } else {
                    const resultStr = JSON.stringify(queryResult);
                    const timeHorizon = timeH; // Set the horizon time in hours
                    const now = new Date();
                    const utcNow = new Date(
                      now.getTime() + now.getTimezoneOffset() * 60000
                    ); // Convert to UTC time

                    let hoursUntilHorizon;
                    switch (timeHorizon) {
                      case 1:
                        hoursUntilHorizon = 1 - (utcNow.getUTCHours() % 1);
                        break;
                      case 2:
                        hoursUntilHorizon = 2 - (utcNow.getUTCHours() % 2);
                        break;
                      case 3:
                        hoursUntilHorizon = 3 - (utcNow.getUTCHours() % 3);
                        break;
                      case 4:
                        hoursUntilHorizon = 4 - (utcNow.getUTCHours() % 4);
                        break;
                      case 6:
                        hoursUntilHorizon = 6 - (utcNow.getUTCHours() % 6);
                        break;
                      case 8:
                        hoursUntilHorizon = 8 - (utcNow.getUTCHours() % 8);
                        break;
                      case 12:
                        hoursUntilHorizon = 12 - (utcNow.getUTCHours() % 12);
                        break;
                      case 24:
                        hoursUntilHorizon = 24 - utcNow.getUTCHours();
                        break;
                      default:
                        throw new Error("Invalid time horizon");
                    }

                    const minutesUntilNextHorizon =
                      hoursUntilHorizon * 60 - utcNow.getUTCMinutes();
                    const secondsUntilNextHorizon = 60 - utcNow.getUTCSeconds();
                    const millisecondsUntilNextHorizon =
                      1000 - utcNow.getUTCMilliseconds();

                    const expiry = new Date(
                      utcNow.getTime() +
                        hoursUntilHorizon * 60 * 60 * 1000 +
                        minutesUntilNextHorizon * 60 * 1000 +
                        secondsUntilNextHorizon * 1000 +
                        millisecondsUntilNextHorizon
                    );

                    const timeToLive = Math.floor(
                      (expiry.getTime() - utcNow.getTime()) / 1000
                    ); // Convert to seconds

                    redisClient.set(
                      ledger_name,
                      resultStr,
                      "NX",
                      "XX",
                      "EX",
                      timeToLive,
                      (errorMessage, redisResult) => {
                        if (err) {
                          console.log(
                            `Data caching is not successful at ${new Date()} for ledger ${ledger_name} with length ${
                              queryResult.length
                            } number ${i} time horizon ${timeH} error ${errorMessage}`
                          );
                        } else {
                          console.log(
                            `Data cached successfully at ${new Date()} for ledger ${ledger_name} with length ${
                              queryResult.length
                            } number ${i} time horizon ${timeH} time to live ${timeToLive}`
                          );
                        }
                      }
                    );
                  }
                });
              }
            });
          }
        }
      }
      // res.send("Data cached successfully");
    }
  });
};

// Run the cacheData function every 30 seconds
// cron.schedule(
//   "15 * * * *",
//   async () => {
//     await cacheDataStrategies();
//     console.log("Caching for strategies are completed");
//     await cacheDataStats();
//     console.log("Caching for stats are completed");
//     await cacheDataLedger();
//     console.log("Caching for ledger are completed");
//     await cacheDataCompressedLedger();
//     console.log("Caching for compressed ledgers are completed");
//   },
//   {
//     timezone: "UTC",
//   }
// );
redisClient.on("error", function (error) {
  console.error(error);
});
// Define function to run caching functions in background
async function cacheDataInBackground(timeH) {
  await cacheDataLedger(timeH);
  await cacheDataCompressedLedger(timeH);
  await cacheDataStats();
  await cacheDataStrategies();
  console.log("Data caching complete");
}
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
app.get("/cacheData/:timeH", async (req, res) => {
  console.log(
    "Signal received for data to be cached for time horizon ",
    req.params.timeH
  );

  // Send response to user immediately
  res.send("Caching data started...");

  // Run caching functions in the background
  cacheDataInBackground(parseInt(req.params.timeH));
});

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
console.log("Data caching script started...");
