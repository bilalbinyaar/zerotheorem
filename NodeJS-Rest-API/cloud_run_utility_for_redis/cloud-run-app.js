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
      "EX",
      timeToLive,
      (errorMessage, redisResult) => {
        if (err) {
          console.log(
            `Data cached is not successful at ${new Date()} for strategies with error ${errorMessage}`
          );
        } else {
          console.log(
            `Data cached successfully at ${new Date()} for strategies redis message ${redisResult}`
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
    console.log(
      `Data cached successfully at ${new Date()} for stats redis message ${redisResult}`
    );
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
                    const utcNow = new Date();
                    const hours = utcNow.getUTCHours();
                    const minutes = utcNow.getUTCMinutes();
                    const seconds = utcNow.getUTCSeconds();
                    if (timeH == 1) {
                      remaining_minutes = 60 - minutes;
                      remaining_seconds = 60 - seconds;
                      total_seconds =
                        remaining_minutes * 60 + remaining_seconds;
                      const timeToLive = total_seconds;

                      redisClient.set(
                        ledger_name,
                        resultStr,
                        "NX",
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
                              } number ${i} time horizon ${timeH} time to live ${timeToLive} redis message ${redisResult}`
                            );
                          }
                        }
                      );
                    } else {
                      const nextOccurrenceHours =
                        Math.floor(hours / timeH) * timeH + timeH;
                      const remainingHours = nextOccurrenceHours - hours - 1;

                      remaining_minutes = 60 - minutes;
                      remaining_seconds = 60 - seconds;
                      total_seconds =
                        remaining_minutes * 60 +
                        remaining_seconds +
                        remainingHours * 60 * 60;
                      const timeToLive = total_seconds;

                      redisClient.set(
                        ledger_name,
                        resultStr,
                        "NX",
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
                              } number ${i} time horizon ${timeH} time to live ${timeToLive} redis message ${redisResult}`
                            );
                          }
                        }
                      );
                    }
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
                    const utcNow = new Date();
                    const hours = utcNow.getUTCHours();
                    const minutes = utcNow.getUTCMinutes();
                    const seconds = utcNow.getUTCSeconds();
                    if (timeH == 1) {
                      remaining_minutes = 60 - minutes;
                      remaining_seconds = 60 - seconds;
                      total_seconds =
                        remaining_minutes * 60 + remaining_seconds;
                      const timeToLive = total_seconds;

                      redisClient.set(
                        ledger_name,
                        resultStr,
                        "NX",
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
                              } number ${i} time horizon ${timeH} time to live ${timeToLive} redis message ${redisResult}`
                            );
                          }
                        }
                      );
                    } else {
                      const nextOccurrenceHours =
                        Math.floor(hours / timeH) * timeH + timeH;
                      const remainingHours = nextOccurrenceHours - hours - 1;

                      remaining_minutes = 60 - minutes;
                      remaining_seconds = 60 - seconds;
                      total_seconds =
                        remaining_minutes * 60 +
                        remaining_seconds +
                        remainingHours * 60 * 60;
                      const timeToLive = total_seconds;

                      redisClient.set(
                        ledger_name,
                        resultStr,
                        "NX",
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
                              } number ${i} time horizon ${timeH} time to live ${timeToLive} redis message ${redisResult}`
                            );
                          }
                        }
                      );
                    }

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
                    const utcNow = new Date();
                    const hours = utcNow.getUTCHours();
                    const minutes = utcNow.getUTCMinutes();
                    const seconds = utcNow.getUTCSeconds();
                    if (timeH == 1) {
                      remaining_minutes = 60 - minutes;
                      remaining_seconds = 60 - seconds;
                      total_seconds =
                        remaining_minutes * 60 + remaining_seconds;
                      const timeToLive = total_seconds;

                      redisClient.set(
                        ledger_name,
                        resultStr,
                        "NX",
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
                    } else {
                      const nextOccurrenceHours =
                        Math.floor(hours / timeH) * timeH + timeH;
                      const remainingHours = nextOccurrenceHours - hours - 1;

                      remaining_minutes = 60 - minutes;
                      remaining_seconds = 60 - seconds;
                      total_seconds =
                        remaining_minutes * 60 +
                        remaining_seconds +
                        remainingHours * 60 * 60;
                      const timeToLive = total_seconds;

                      redisClient.set(
                        ledger_name,
                        resultStr,
                        "NX",
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
                    const utcNow = new Date();
                    const hours = utcNow.getUTCHours();
                    const minutes = utcNow.getUTCMinutes();
                    const seconds = utcNow.getUTCSeconds();
                    if (timeH == 1) {
                      remaining_minutes = 60 - minutes;
                      remaining_seconds = 60 - seconds;
                      total_seconds =
                        remaining_minutes * 60 + remaining_seconds;
                    } else {
                      const nextOccurrenceHours =
                        Math.floor(hours / timeH) * timeH + timeH;
                      const remainingHours = nextOccurrenceHours - hours - 1;

                      remaining_minutes = 60 - minutes;
                      remaining_seconds = 60 - seconds;
                      total_seconds =
                        remaining_minutes * 60 +
                        remaining_seconds +
                        remainingHours * 60 * 60;
                    }
                    const timeToLive = total_seconds;

                    redisClient.set(
                      ledger_name,
                      resultStr,
                      "NX",
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
