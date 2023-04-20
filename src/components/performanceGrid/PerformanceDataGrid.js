import React, { useEffect, useState, memo, useRef } from "react";
// import "./ModelDataGrid.css";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import DataGridGraph from "../modelDataGrid/GridGraph";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Timer from "../timer/Timer";
import { useStateContext } from "../../ContextProvider";
import ModelNameCol from "../../mobile-components/data-grid/ModelNameCol";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  GridFooterContainer,
  GridPagination,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { database, auth } from "../../firebase_config";
import { ref, onValue, set, update } from "firebase/database";

export function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          {...item}
        />
      )}
    />
  );
}
function CustomFooter() {
  return (
    <GridFooterContainer>
      <CustomPagination />
      <GridPagination />
    </GridFooterContainer>
  );
}

const PerformanceDataGrid = () => {
  const windowWidth = useRef(window.innerWidth);
  const [pinnedRows, setPinnedRows] = useState([]);
  const [Flag, setFlag] = useState(null);
  const [timeH, setTimeH] = useState("All");
  const [selectedItem, setSelectedItem] = useState("All");

  const [rows_cached, set_rows_cached] = useState([]);
  const [coin_search_selection, set_coin_search_selection] = useState([]);
  const [model_search_selection, set_model_search_selection] = useState([]);

  const handleChangeForCoinSelection = (event, values) => {
    if (values != null) {
      if (selectedItem == "All") {
        const res = rows_cached.filter((item) => {
          return item.currency == values.label;
        });
        set_model_search_selection(model_selection_cache["model_names"]);
        setRows(res);
      } else {
        const res = rows_cached.filter((item) => {
          return item.currency === values.label;
        });
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.currency === values.label && obj.value == selectedItem;
        });
        set_model_search_selection(output);
        setRows(res);
      }
    } else {
      if (selectedItem === "All") {
        set_model_search_selection(model_selection_cache["model_names"]);
        setRows(rows_cached);
      } else {
        let output = model_selection_cache["model_names"].filter((obj) => {
          return obj.value === selectedItem;
        });
        set_model_search_selection(output);
        setRows(rows_cached);
      }
    }
  };

  const handleChangeForModelSelection = (event, values) => {
    if (values != null) {
      const res = rows_cached.filter((item) => {
        return item.modelName == values.label;
      });
      handleChangePage("", 1);
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };

  const handleChangeForTimeHorizon = (event, values) => {
    if (values != null) {
      setTimeH(values.props.value);

      if (values.props.value == "All") {
        setRows(rows_cached);
      } else {
        handleChangePage("", 1);
        const res = rows_cached.filter((item) => {
          return item.timeHorizon == values.props.value;
        });

        setRows(res);
      }
    } else {
      setTimeH("All");

      setRows(rows_cached);
    }
  };

  const styles = {
    container: (css) => ({ ...css, width: "200px" }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const [topPerformerModels, setTopPerformersModels] = useState(null);
  const [strategies, setStrategies] = useState(null);

  const {
    stats_cache,
    strategies_cache,
    sorted_stats_cache,
    Set_strategies_cache,
    Set_sorted_stats_cache,
    Set_stats_cache,
    coin_selection_cache,
    Set_coin_search_selection_cache,
    model_selection_cache,
    Set_model_search_selection_cache,
    uid,
    setUid,
    authCheckLogin,
  } = useStateContext();
  const [pnl_for_each_strategy, setPnlForEachStrategy] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (strategies == null && pnl_for_each_strategy == null) {
      return;
    } else {
      var data_for_rows = [];
      var index = 0;

      for (var key in strategies) {
        data_for_rows.push({
          favs: false,
          id: index,
          modelNameMob: [
            strategies[key].time_horizon,
            strategies[key].currency,
            key,
            strategies[key].current_position,
          ],
          modelName: key.replace("_", "-"),
          currency: strategies[key].currency,
          timeHorizon: strategies[key].time_horizon,
          dateAdded: strategies[key].date_started,
          currentForecast: strategies[key].current_position,
          pnl_sum_7: pnl_for_each_strategy[key].pnl_sum_7,
          nextForecast: [
            strategies[key].time_horizon,
            strategies[key].next_forecast,
          ],
          avg_daily_pnl: pnl_for_each_strategy[key].average_daily_pnl,
          forecast_time: strategies[key].forecast_time,
          tpsl: "$186 / $740",

          totalpnl: pnl_for_each_strategy[key].total_pnl,
          pnlGraph: `${key}`,
        });
        index++;
      }
      if (data_for_rows.length != 0) {
        setRows(data_for_rows);
        setPinnedRows([data_for_rows[2]]);
        set_rows_cached(data_for_rows);
      }
    }
  }, [strategies]);
  const [favs_list, set_favs_list] = useState([]);
  useEffect(() => {
    if (authCheckLogin == true) {
      console.log("UID is --->", uid);
      if (rows.length > 0 && uid != null) {
        const starCountRef = ref(database, "user_favs/" + uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          var favs_models_list = [];
          for (let name in data) {
            favs_models_list.push(name);
          }
          if (favs_models_list.length > 0) {
            set_favs_list(favs_models_list);
          }
        });
      }
    } else {
      if (rows.length > 0) {
        const updatedRows = rows.map((row) =>
          row.favs == true ? { ...row, ["favs"]: false } : row
        );
        setRows(updatedRows);
        set_rows_cached(updatedRows);
      }
    }
  }, [authCheckLogin, rows]);

  useEffect(() => {
    if (favs_list.length > 0) {
      const updatedRows = rows.map((row) =>
        favs_list.includes(row.modelName) ? { ...row, ["favs"]: true } : row
      );
      var sorted = {};
      if (Object.keys(updatedRows).length > 10) {
        sorted = Object.keys(updatedRows)
          .map((key) => {
            return { ...updatedRows[key], key };
          })
          .sort((a, b) => b.favs - a.favs);
      }

      if (Object.keys(sorted).length > 10) {
        setRows(sorted);
        set_rows_cached(sorted);
      }
    }
  }, [favs_list]);

  useEffect(() => {
    if (topPerformerModels == null) {
      return;
    } else {
      if (Object.keys(strategies_cache).length == 0) {
        fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_strategies", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            var data_for_strategies = {};
            var model_names = [];
            var coin_names = [];
            var unique_coins = {};
            var index = 0;
            for (var i = 0; i < data["response"].length; i++) {
              model_names.push({
                label: data["response"][i].strategy_name.replace("_", "-"),
                value: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
              });
              if (!unique_coins[data["response"][i].currency]) {
                unique_coins[data["response"][i].currency] = 1;
                coin_names.push({
                  label: data["response"][i].currency,
                });
              }
              var dt = new Date(
                parseInt(data["response"][i].forecast_time) * 1000
              ).toLocaleString();
              var year = dt.split("/")[2].split(",")[0];
              var month = dt.split("/")[0];
              if (month.length == 1) {
                month = "0" + month;
              }
              var day = dt.split("/")[1];
              if (day.length == 1) {
                day = "0" + day;
              }
              var hours = dt.split(", ")[1].split(":")[0];
              if (hours.length == 1) {
                hours = "0" + hours;
              }
              var minutes = dt.split(":")[1];
              if (minutes.length == 1) {
                minutes = "0" + minutes;
              }
              var curr_time_version = dt.split(" ")[2];
              if (curr_time_version == "PM") {
                hours = parseInt(hours) + 12;
              }
              var dt_str =
                year + "-" + month + "-" + day + " " + hours + ":" + minutes;

              data_for_strategies[data["response"][i].strategy_name] = {
                current_position: data["response"][i].current_position,
                time_horizon: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
                date_started: data["response"][i].date_started,
                entry_price: data["response"][i].entry_price,
                forecast_time: dt_str,
                next_forecast: data["response"][i].next_forecast,
                current_price: data["response"][i].current_price,
                strategy_name: data["response"][i].strategy_name,
                current_pnl: data["response"][i].current_pnl,
                position_start_time: data["response"][i].position_start_time,
              };
              index++;
            }
            if (JSON.stringify(data_for_strategies) !== "{}") {
              setStrategies(data_for_strategies);
              set_model_search_selection(model_names);
              Set_strategies_cache({ strategies: data_for_strategies });
              Set_coin_search_selection_cache({
                coin_names: coin_names,
              });
              Set_model_search_selection_cache({
                model_names: model_names,
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        setStrategies(strategies_cache["strategies"]);

        set_coin_search_selection(coin_selection_cache["coin_names"]);
        set_model_search_selection(model_selection_cache["model_names"]);
      }
    }
  }, [topPerformerModels]);

  useEffect(() => {
    if (Flag == null) {
      if (Object.keys(stats_cache).length == 0) {
        fetch("https://zt-rest-api-rmkp2vbpqq-uc.a.run.app/get_stats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            var model_names = {};
            for (var i = 0; i < data["response"].length; i++) {
              model_names[data["response"][i].strategy_name] = {
                strategy_name: data["response"][i].strategy_name,
                current_drawdown: data["response"][i].current_drawdown,
                curr_drawdown_duration:
                  data["response"][i].curr_drawdown_duration,
                average_drawdown: data["response"][i].average_drawdown,
                average_drawdown_duration:
                  data["response"][i].average_drawdown_duration,
                max_drawdown: data["response"][i].max_drawdown,
                max_drawdown_duration:
                  data["response"][i].max_drawdown_duration,
                r2_score: data["response"][i].r2_score,
                sharpe: data["response"][i].sharpe,
                sortino: data["response"][i].sortino,
                total_pnl: data["response"][i].total_pnl,
                total_positive_pnl: data["response"][i].total_positive_pnl,
                total_negative_pnl: data["response"][i].total_negative_pnl,
                total_wins: data["response"][i].total_wins,
                total_losses: data["response"][i].total_losses,
                consective_wins: data["response"][i].consective_wins,
                consective_losses: data["response"][i].consective_losses,
                win_percentage: data["response"][i].win_percentage,
                loss_percentage: data["response"][i].loss_percentage,
                pnl_sum_1: data["response"][i].pnl_sum_1,
                pnl_sum_7: data["response"][i].pnl_sum_7,
                pnl_sum_15: data["response"][i].pnl_sum_15,
                pnl_sum_30: data["response"][i].pnl_sum_30,
                pnl_sum_45: data["response"][i].pnl_sum_45,
                pnl_sum_60: data["response"][i].pnl_sum_60,
                average_daily_pnl: data["response"][i].average_daily_pnl,
                win_loss_ratio: data["response"][i].win_loss_ratio,

                rank: data["response"][i].rank,
              };
            }
            if (JSON.stringify(model_names) !== "{}") {
              const sorted = Object.keys(model_names)
                .map((key) => {
                  return { ...model_names[key], key };
                })
                .sort((a, b) => b.total_pnl - a.total_pnl);
              Set_stats_cache({ stats: model_names });
              setPnlForEachStrategy(model_names);

              Set_sorted_stats_cache({ sorted_stats: sorted });
              setTopPerformersModels(sorted);
              setFlag(true);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setTopPerformersModels(sorted_stats_cache["sorted_stats"]);
        setPnlForEachStrategy(stats_cache["stats"]);
        setFlag(true);
      }
    }
  }, [Flag]);

  // To Link Grid Rows to Models Component
  const linkModels = useNavigate();
  const handleRowClickEvent = (params) => {};
  // To Link Grid Rows to Models Component

  const columns = [
    {
      field: "favs",
      headerName: "Symbols",
      headerAlign: "center",
      flex: 1,
      type: Boolean,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <div>
            <p>1</p>
          </div>
        );
      },
    },

    // { field: "id", headerName: "#", headerAlign: "center", width: 18 },

    {
      field: "modelNameMob",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      renderHeader: (params) => (
        <strong>
          {"Model Name"}
          {/* <Tooltip
            className="performance-table-tooltip"
            title="Model name, time horizon, and currency"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip> */}
        </strong>
      ),
      renderCell: (cellValues) => {
        return (
          <div>
            <p>Name</p>
          </div>
        );
      },
    },
    {
      field: "dateAdded",
      headerName: "Start Date",
      flex: 1,
      type: "date",
      headerAlign: "center",
      renderHeader: (params) => (
        <strong>
          {"Entry"}
          {/* <Tooltip
            className="performance-table-tooltip"
            title="Start date of the model's forecasts"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip> */}
        </strong>
      ),
      renderCell: (cellValues) => {
        return (
          <div>
            <p>$</p>
          </div>
        );
      },
    },
    {
      field: "currentForecast",
      flex: 1,
      headerAlign: "center",

      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value === "Short",
          positive: params.value === "Long",
        });
      },
      renderHeader: (params) => <strong>{"Current PNL"}</strong>,

      renderCell: (cellValues) => {
        return (
          <div>
            <p>$</p>
          </div>
        );
      },
    },

    {
      field: "forecast_time",
      headerName: "Take Profit",
      flex: 1,
      headerAlign: "center",
      renderHeader: (params) => (
        <strong>
          {"Take Profit"}
          {/* <Tooltip
            className="performance-table-tooltip"
            title="Time when the forecast is created (in local system time)"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip> */}
        </strong>
      ),
      renderCell: (cellValues) => {
        return (
          <div>
            <p>$</p>
          </div>
        );
      },
    },

    {
      field: "nextForecast",
      flex: 1,
      headerName: "Stop Loss",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return <Timer time_horizon={cellValues.value} />;
      },
      renderHeader: (params) => (
        <strong>
          {"Stop Loss "}
          {/* <Tooltip
            className="performance-table-tooltip"
            title="Countdown clock till time of next forecast"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip> */}
        </strong>
      ),

      renderCell: (cellValues) => {
        return (
          <div>
            <p>$</p>
          </div>
        );
      },
    },

    {
      field: "avg_daily_pnl",
      headerName: "Avg Daily PNL",
      flex: 1,
      headerAlign: "center",
      renderHeader: (params) => (
        <strong>
          {"Fee"}
          {/* <Tooltip
            className="performance-table-tooltip"
            title="Average daily PNL"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip> */}
        </strong>
      ),

      renderCell: (cellValues) => {
        return (
          <div>
            <p>$</p>
          </div>
        );
      },
    },

    //     {
    //       field: "pnl_sum_7",
    //       headerName: "7d PNL",
    //       width: 120,
    //       sortable: true,
    //       headerAlign: "center",
    //       flex: 1.4,
    //       renderHeader: (params) => (
    //         <strong>
    //           {"7d PNL "}
    //           <Tooltip
    //             className="performance-table-tooltip"
    //             title="PNL of last 7 days"
    //           >
    //             <IconButton>
    //               <BsFillInfoCircleFill />
    //             </IconButton>
    //           </Tooltip>
    //         </strong>
    //       ),
    //     },

    //     {
    //       field: "totalpnl",
    //       headerName: "Total PNL",
    //       width: 110,
    //       sortable: true,
    //       headerAlign: "center",
    //       flex: 1.63,
    //       renderHeader: (params) => (
    //         <strong>
    //           {"Total PNL "}
    //           <Tooltip
    //             className="performance-table-tooltip"
    //             title="The total profit (or loss) generated by the model (aggregate profit minus aggregate loss)
    // "
    //           >
    //             <IconButton>
    //               <BsFillInfoCircleFill />
    //             </IconButton>
    //           </Tooltip>
    //         </strong>
    //       ),

    //       cellClassName: (params) => {
    //         if (params.value == null) {
    //           return "";
    //         }

    //         return clsx("super-app", {
    //           negative: params.value < 0,
    //           positive: params.value > 0,
    //         });
    //       },
    //     },

    {
      field: "pnlGraph",
      headerName: " ",
      sortable: false,
      headerAlign: "center",
      flex: 1,

      renderHeader: (params) => (
        <strong>
          {" "}
          {/* <Tooltip
            className="performance-table-tooltip"
            title="Cumulative PNL graph w.r.t time"
          >
            <IconButton>
              <BsFillInfoCircleFill />
            </IconButton>
          </Tooltip> */}
        </strong>
      ),

      renderCell: (cellValues) => {
        return <p>Transaction</p>;
      },
    },
  ];

  // To Link Grid Rows to Models Component

  const handleChangeForTimeHorizonSelection = (id, timeH) => {
    if (timeH == "All") {
      setRows(rows_cached);
      set_model_search_selection(model_selection_cache["model_names"]);
    } else {
      handleChangePage("", 1);

      const res = rows_cached.filter((item) => {
        return item.timeHorizon == timeH;
      });
      let output = model_selection_cache["model_names"].filter((obj) => {
        return obj.value === timeH;
      });
      set_model_search_selection(output);
      setRows(res);
    }
  };

  const handleChangeForCoinSelectionMob = async (selected) => {
    if (selected != null) {
      const res = rows_cached.filter((item) => {
        return item.currency == selected.label;
      });
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };
  const handleChangeForModelSelectionMob = async (selected) => {
    if (selected != null) {
      const res = rows_cached.filter((item) => {
        return item.modelName == selected.label;
      });
      setRows(res);
    } else {
      setRows(rows_cached);
    }
  };

  const [isActive, setActive] = useState("true");

  const [curr_active, set_curr_active] = useState("hours_filter_All");

  const [pageSize, setPageSize] = React.useState(20);

  const { data } = {
    dataSet: "Commodity",
    rowLength: 540,
    maxColumns: 6,
  };

  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    // console.log("Value is -->", value);
    setPage(value);
    // setPageSize(value);
  };

  const handleChangePageSize = (event) => {
    setPageSize(+event.target.value);
    setPage(1);
  };
  const gridRef = React.createRef();
  const start = (page - 1) * pageSize;
  const end = page * rows.length;
  function handleCellClick(params, event) {
    if (params.field == "favs") {
      if (authCheckLogin == true) {
        const updatedRows = rows.map((row) =>
          row.id === params.row.id
            ? row.favs == true
              ? { ...row, ["favs"]: false }
              : { ...row, ["favs"]: true }
            : row
        );
        setRows(updatedRows);
        set_rows_cached(updatedRows);
        if (params.row.favs == false) {
          const updateObj = {};
          updateObj[params.row.modelName] = true;
          update(ref(database, "user_favs/" + uid), updateObj);
        } else {
          const updateObj = {};
          updateObj[params.row.modelName] = null;
          update(ref(database, "user_favs/" + uid), updateObj);
        }
      } else {
        Swal.fire({
          title: "Kindly login for making model favourite",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-right",
          showConfirmButton: false,
        });
      }
    } else {
      linkModels(`/${params.row.modelName.replace("_", "-")}`);
    }
  }
  return (
    <div className="model-grid">
      <div className="container">
        <div className="model-grid-web">
          <div className="grid-div-web">
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DataGrid
                onRowClick={handleRowClickEvent}
                onCellClick={handleCellClick}
                sx={{
                  borderColor: "var(--color-grid-border)",
                  color: "var(--color-day-black)",
                  "& .MuiDataGrid-cell:hover": {
                    color: "var(--color-day-yellow)",
                  },
                  "& .MuiDataGrid-cell": {
                    justifyContent: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    fontSize: "12px",
                  },
                  backgroundColor: "var(--color-day-white)",
                  "& .MuiDataGrid-columnHeaders": {
                    borderBottomColor: "var(--color-grid-border)",
                  },
                  "& .MuiDataGrid-row": {
                    borderBottomColor: "var(--color-grid-border)",
                  },
                  "& div div div div >.MuiDataGrid-cell": {
                    borderBottom: "none",
                  },

                  "& .MuiDataGrid-footerContainer": {
                    borderTopColor: "var(--color-grid-border)",
                  },
                  "& .super-app.negative": {
                    color: "#FF2E2E",
                    fontWeight: "600",
                  },
                  "& .super-app.positive": {
                    color: " #16C784",
                    fontWeight: "600",
                  },
                }}
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                autoHeight={true}
                pinnedRows={pinnedRows}
                rowsPerPageOptions={[10, 20, 50]}
                onPageSizeChange={(newPage) => {
                  setPageSize(newPage);
                }}
                localeText={{
                  footerRowSelected: CustomPagination,
                }}
                components={{
                  Footer: CustomFooter,
                }}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PerformanceDataGrid);
