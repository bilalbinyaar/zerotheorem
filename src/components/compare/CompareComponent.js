import React, { useState, useEffect } from "react";
import "./Compare.css";
import Autocomplete from "@mui/material/Autocomplete";
import { useStateContext } from "../../ContextProvider";
import TextField from "@mui/material/TextField";
import ComparisonChartCanvas from "../models/graphs/ComparisonChartCanvas";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import TvSplineAreaChartTopPerformer from "../models/graphs/TvSplineAreaChartTopPerformer";
const CompareComponent = () => {
  const [Flag, setFlag] = useState(null);
  const [stats, set_stats] = useState({});
  const location = useLocation();
  const model_name = location.state.model_name;
  const [default_value, set_default_value] = useState({ label: model_name });
  // console.log("Model name -->", location.state.model_name);
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
  } = useStateContext();

  const [rows, setRows] = useState([]);
  const [strategies, setStrategies] = useState({});

  const [rows_cached, set_rows_cached] = useState([]);
  const handleChangeForModelSelection1 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      set_model_name_1(values.label.replace("-", "_"));
      // setStrategies(strategies_cache);

      // setRows({});
      // const res = rows_cached.filter((item) => {
      //   return item.modelName == values.label;
      // });
      // handleChangePage("", 1);
      // setRows(res);
    } else {
      set_model_name_1("");
      // setRows(rows_cached);
    }
  };
  const handleChangeForModelSelection2 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      set_model_name_2(values.label.replace("-", "_"));

      // setRows({});
      // const res = rows_cached.filter((item) => {
      //   return item.modelName == values.label;
      // });
      // handleChangePage("", 1);
      // setRows(res);
    } else {
      set_model_name_2("");

      // setRows(rows_cached);
    }
  };
  const handleChangeForModelSelection3 = (event, values) => {
    // console.log("Search dropdown -->", values);
    if (values != null) {
      set_model_name_3(values.label.replace("-", "_"));

      // setRows({});
      // const res = rows_cached.filter((item) => {
      //   return item.modelName == values.label;
      // });
      // handleChangePage("", 1);
      // setRows(res);
    } else {
      set_model_name_3("");

      // setRows(rows_cached);
    }
  };

  const [model_search_selection, set_model_search_selection] = useState([]);
  const [model_name_1, set_model_name_1] = useState(model_name);
  const [model_name_2, set_model_name_2] = useState("");
  const [model_name_3, set_model_name_3] = useState("");
  const [model_names, set_model_names] = useState([]);
  useEffect(() => {
    if (model_names.length > 0) {
      return;
    } else {
      if (Object.keys(strategies_cache).length > 0) {
        fetch("https://zt-rest-api-3hwk7v5hda-uc.a.run.app/get_strategies", {
          method: "get",
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data["response"].length);
            var data_for_strategies = {};
            var model_names = [];
            var coin_names = [];
            var unique_coins = {};
            var index = 0;
            for (var i = 0; i < data["response"].length; i++) {
              // var name = data["response"][i].strategy_name.replace("_", "-");
              model_names.push({
                label: data["response"][i].strategy_name.replace("_", "-"),
                // value: i,
              });
              if (!unique_coins[data["response"][i].currency]) {
                unique_coins[data["response"][i].currency] = 1;
                coin_names.push({
                  label: data["response"][i].currency,
                  // value: i,
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
              var dt_str =
                year + "-" + month + "-" + day + " " + hours + ":" + minutes;
              // console.log("DT", dt, dt_str);

              data_for_strategies[data["response"][i].strategy_name] = {
                current_position: data["response"][i].current_position,
                time_horizon: data["response"][i].time_horizon,
                currency: data["response"][i].currency,
                date_started: data["response"][i].date_started,
                entry_price: data["response"][i].entry_price,
                forecast_time: dt_str,
                // .split(".")[0]
                // .slice(0, -3),
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
              set_model_names(model_names);
              // console.log("Using model names -->", model_names);
              //  console.log("Strategies final -->", data_for_strategies);
              Set_strategies_cache({ strategies: data_for_strategies });
              Set_coin_search_selection_cache({
                coin_names: coin_names,
              });
              Set_model_search_selection_cache({
                model_names: model_names,
              });
              // console.log("Here are model names --->", model_names);
            }
          })
          .catch((err) => console.log(err));
      } else {
        // console.log(
        //   "I am using cached value of strategies -->",
        //   strategies_cache
        // );
        setStrategies(strategies_cache["strategies"]);
        // console.log(
        //   "Here are model names c--->",
        //   model_selection_cache["model_names"]
        // );
        // console.log(
        //   "Using model names -->",
        //   model_selection_cache["model_names"]
        // );
        set_model_names(model_selection_cache["model_names"]);
      }
    }
  }, []);
  useEffect(() => {
    if (Flag == null) {
      if (Object.keys(stats_cache).length == 0) {
        fetch("https://zt-rest-api-3hwk7v5hda-uc.a.run.app/get_stats", {
          method: "get",
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data["msg"].length);
            var model_names = {};
            for (var i = 0; i < data["msg"].length; i++) {
              // console.log(data["msg"][i].strategy_name);
              // var name = data["msg"][i].strategy_name;
              model_names[data["msg"][i].strategy_name] = {
                strategy_name: data["msg"][i].strategy_name,
                current_drawdown: data["msg"][i].current_drawdown,
                curr_drawdown_duration: data["msg"][i].curr_drawdown_duration,
                average_drawdown: data["msg"][i].average_drawdown,
                average_drawdown_duration:
                  data["msg"][i].average_drawdown_duration,
                max_drawdown: data["msg"][i].max_drawdown,
                max_drawdown_duration: data["msg"][i].max_drawdown_duration,
                r2_score: data["msg"][i].r2_score,
                sharpe: data["msg"][i].sharpe,
                sortino: data["msg"][i].sortino,
                total_pnl: data["msg"][i].total_pnl,
                total_positive_pnl: data["msg"][i].total_positive_pnl,
                total_negative_pnl: data["msg"][i].total_negative_pnl,
                total_wins: data["msg"][i].total_wins,
                total_losses: data["msg"][i].total_losses,
                consective_wins: data["msg"][i].consective_wins,
                consective_losses: data["msg"][i].consective_losses,
                win_percentage: data["msg"][i].win_percentage,
                loss_percentage: data["msg"][i].loss_percentage,
                pnl_sum_1: data["msg"][i].pnl_sum_1,
                pnl_sum_7: data["msg"][i].pnl_sum_7,
                pnl_sum_15: data["msg"][i].pnl_sum_15,
                pnl_sum_30: data["msg"][i].pnl_sum_30,
                pnl_sum_45: data["msg"][i].pnl_sum_45,
                pnl_sum_60: data["msg"][i].pnl_sum_60,
                average_daily_pnl: data["msg"][i].average_daily_pnl,
                win_loss_ratio: data["msg"][i].win_loss_ratio,

                rank: data["msg"][i].rank,
              };
            }
            if (JSON.stringify(model_names) !== "{}") {
              // console.log("Sortable -->", model_names);

              const sorted = Object.keys(model_names)
                .map((key) => {
                  return { ...model_names[key], key };
                })
                .sort((a, b) => b.total_pnl - a.total_pnl);
              Set_stats_cache({ stats: model_names });
              set_stats(model_names);
              setFlag(true);
            }
          })
          .catch((err) => console.log(err));
      } else {
        // console.log(
        //   "I am using cached values of sorted stats -->",
        //   sorted_stats_cache
        // );
        set_stats(stats_cache["stats"]);
        setFlag(true);
      }
    }
  }, [Flag]);
  return (
    <div className="compare">
      <div className="container">
        <h1>Comparisons</h1>

        <div className="compare-searches">
          <p className="visibility-hidden">search bar 1</p>
          <Autocomplete
            id="country-select-demo"
            className="model-compare-search"
            sx={{
              backgroundColor: "var(--color-forecasts-card)",
              borderRadius: "5px",
              labelColor: "red",
              fontSize: "11px",
              marginLeft: "0.4rem",
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black)",
              },

              "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input": {
                color: "var(--color-day-black)",
              },
              "& div  >.MuiAutocomplete-option.Mui-focused": {
                backgroundColor: "var(--color-day-yellow)",
                color: "#000000",
              },

              "& div >.MuiOutlinedInput-root": {
                padding: "4px",
              },

              "& div div >.MuiAutocomplete-input": {
                padding: "4.5px 4px 4.5px 6px",
              },

              "& div >.MuiAutocomplete-option": {
                fontSize: "12px",
                margin: "0",
                color: "var(--color-day-black)",
              },

              "& .MuiAutocomplete-noOptions": {
                color: "var(--color-day-black)",
                fontSize: "12px",
              },

              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper": {
                backgroundColor: "var(--color-dropdown-bg)",
              },

              "& div div >.MuiAutocomplete-input": {
                fontSize: "11px",
              },

              "& .css-1xc3v61-indicatorContainer": {
                backgroundColor: "var(--color-day-white)",
              },

              "& .css-13cymwt-control": {
                minHeight: "34px",
                height: "34px",
              },

              "& .css-i4bv87-MuiSvgIcon-root": {
                width: "0.8em !important",
                height: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-i4bv87-MuiSvgIcon-root": {
                width: "0.8em !important",
                height: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root": {
                backgroundColor: "var(--color-forecasts-card) !important",
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root:focus": {
                border: "0 !important",
              },

              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus": {
                borderColor: "var(--color-day-yellow) !important",
              },

              "& div >.MuiOutlinedInput-notchedOutline": {
                border: "0px solid var(--color-day-yellow) !important",
              },

              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "12px !important",
                color: "var(--color-day-black) !important",
                top: "-6px !important",
              },

              "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
                {
                  backgroundColor: "var(--color-dropdown-bg) !important",
                  color: "var(--color-day-black) !important",
                },

              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                {
                  color: "var(--color-day-yellow) !important",
                },

              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-yellow) !important",
              },

              "& .css-ptiqhd-MuiSvgIcon-root": {
                height: "0.8em !important",
                width: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                padding: "3px 8px !important",
                backgroundColor: "var(--color-day-yellow) !important",
                borderRadius: "4px",
                display: "flex !important",
                justifyContent: "center !important",
                alignItems: "center !important",
                fontSize: "15px !important",
                textAlign: "center !important",
              },

              "& .optgroup": {
                padding: "2px !important",
              },

              "& div div >.optgroup": {
                backgroundColor: "var(--color-day-white) !important",
                color: "var(--color-day-black) !important",
              },

              "& .mui-options": {
                padding: "0px 15px",
              },

              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
                borderBottom: "2px solid var(--color-day-black) !important",
              },

              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black) !important",
                fontSize: "14px !important",
              },

              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "var(--color-day-black) !important",
              },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:before":
                {
                  borderBottom: "1px solid var(--color-day-yellow) !important",
                },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                {
                  borderBottom: "2px solid var(--color-day-yellow) !important",
                },

              "& #demo-simple-select-standard-label": {
                color: "var(--color-day-yellow) !important",
              },

              "& .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon": {
                color: "var(--color-day-black) !important",
              },

              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected":
                {
                  backgroundColor: "var(--color-day-yellow) !important",
                  color: "black",
                },

              "& .css-1869usk-MuiFormControl-root": {
                height: "60px !important",
              },

              "& div div >.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                {
                  color: "var(--color-day-black) !important",
                  fontSize: "14px !important",
                },

              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root": {
                fontSize: "13px !important",
              },

              "& .css-nlvv43-MuiFormControl-root": {
                margin: "0px 8px !important",
                height: "30px !important",
              },

              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "12px !important",
                color: "var(--color-day-black) !important",
                top: "-8px !important",
              },
            }}
            defaultValue={default_value}
            onChange={handleChangeForModelSelection1}
            options={model_names}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Models"
                inputProps={{
                  ...params.inputProps,
                  style: { width: "70%" }, // set the width to auto

                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Autocomplete
            id="country-select-demo"
            className="model-compare-search"
            sx={{
              backgroundColor: "var(--color-forecasts-card)",
              borderRadius: "5px",
              labelColor: "red",
              fontSize: "11px",
              marginLeft: "0.4rem",
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black)",
              },

              "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input": {
                color: "var(--color-day-black)",
              },
              "& div  >.MuiAutocomplete-option.Mui-focused": {
                backgroundColor: "var(--color-day-yellow)",
                color: "#000000",
              },

              "& div >.MuiOutlinedInput-root": {
                padding: "4px",
              },

              "& div div >.MuiAutocomplete-input": {
                padding: "4.5px 4px 4.5px 6px",
              },

              "& div >.MuiAutocomplete-option": {
                fontSize: "12px",
                margin: "0",
                color: "var(--color-day-black)",
              },

              "& .MuiAutocomplete-noOptions": {
                color: "var(--color-day-black)",
                fontSize: "12px",
              },

              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper": {
                backgroundColor: "var(--color-dropdown-bg)",
              },

              "& div div >.MuiAutocomplete-input": {
                fontSize: "11px",
              },

              "& .css-1xc3v61-indicatorContainer": {
                backgroundColor: "var(--color-day-white)",
              },

              "& .css-13cymwt-control": {
                minHeight: "34px",
                height: "34px",
              },

              "& .css-i4bv87-MuiSvgIcon-root": {
                width: "0.8em !important",
                height: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-i4bv87-MuiSvgIcon-root": {
                width: "0.8em !important",
                height: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root": {
                backgroundColor: "var(--color-forecasts-card) !important",
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root:focus": {
                border: "0 !important",
              },

              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus": {
                borderColor: "var(--color-day-yellow) !important",
              },

              "& div >.MuiOutlinedInput-notchedOutline": {
                border: "0px solid var(--color-day-yellow) !important",
              },

              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "12px !important",
                color: "var(--color-day-black) !important",
                top: "-6px !important",
              },

              "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
                {
                  backgroundColor: "var(--color-dropdown-bg) !important",
                  color: "var(--color-day-black) !important",
                },

              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                {
                  color: "var(--color-day-yellow) !important",
                },

              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-yellow) !important",
              },

              "& .css-ptiqhd-MuiSvgIcon-root": {
                height: "0.8em !important",
                width: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                padding: "3px 8px !important",
                backgroundColor: "var(--color-day-yellow) !important",
                borderRadius: "4px",
                display: "flex !important",
                justifyContent: "center !important",
                alignItems: "center !important",
                fontSize: "15px !important",
                textAlign: "center !important",
              },

              "& .optgroup": {
                padding: "2px !important",
              },

              "& div div >.optgroup": {
                backgroundColor: "var(--color-day-white) !important",
                color: "var(--color-day-black) !important",
              },

              "& .mui-options": {
                padding: "0px 15px",
              },

              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
                borderBottom: "2px solid var(--color-day-black) !important",
              },

              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black) !important",
                fontSize: "14px !important",
              },

              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "var(--color-day-black) !important",
              },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:before":
                {
                  borderBottom: "1px solid var(--color-day-yellow) !important",
                },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                {
                  borderBottom: "2px solid var(--color-day-yellow) !important",
                },

              "& #demo-simple-select-standard-label": {
                color: "var(--color-day-yellow) !important",
              },

              "& .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon": {
                color: "var(--color-day-black) !important",
              },

              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected":
                {
                  backgroundColor: "var(--color-day-yellow) !important",
                  color: "black",
                },

              "& .css-1869usk-MuiFormControl-root": {
                height: "60px !important",
              },

              "& div div >.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                {
                  color: "var(--color-day-black) !important",
                  fontSize: "14px !important",
                },

              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root": {
                fontSize: "13px !important",
              },

              "& .css-nlvv43-MuiFormControl-root": {
                margin: "0px 8px !important",
                height: "30px !important",
              },

              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "12px !important",
                color: "var(--color-day-black) !important",
                top: "-8px !important",
              },
            }}
            onChange={handleChangeForModelSelection2}
            options={model_names}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Models"
                inputProps={{
                  ...params.inputProps,
                  style: { width: "70%" }, // set the width to auto

                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Autocomplete
            id="country-select-demo"
            className="model-compare-search to-hide"
            sx={{
              backgroundColor: "var(--color-forecasts-card)",
              borderRadius: "5px",
              labelColor: "red",
              fontSize: "11px",
              marginLeft: "0.4rem",
              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black)",
              },

              "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input": {
                color: "var(--color-day-black)",
              },
              "& div  >.MuiAutocomplete-option.Mui-focused": {
                backgroundColor: "var(--color-day-yellow)",
                color: "#000000",
              },

              "& div >.MuiOutlinedInput-root": {
                padding: "4px",
              },

              "& div div >.MuiAutocomplete-input": {
                padding: "4.5px 4px 4.5px 6px",
              },

              "& div >.MuiAutocomplete-option": {
                fontSize: "12px",
                margin: "0",
                color: "var(--color-day-black)",
              },

              "& .MuiAutocomplete-noOptions": {
                color: "var(--color-day-black)",
                fontSize: "12px",
              },

              "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper": {
                backgroundColor: "var(--color-dropdown-bg)",
              },

              "& div div >.MuiAutocomplete-input": {
                fontSize: "11px",
              },

              "& .css-1xc3v61-indicatorContainer": {
                backgroundColor: "var(--color-day-white)",
              },

              "& .css-13cymwt-control": {
                minHeight: "34px",
                height: "34px",
              },

              "& .css-i4bv87-MuiSvgIcon-root": {
                width: "0.8em !important",
                height: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-i4bv87-MuiSvgIcon-root": {
                width: "0.8em !important",
                height: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root": {
                backgroundColor: "var(--color-forecasts-card) !important",
                color: "var(--color-day-black) !important",
              },

              "& div div >.MuiOutlinedInput-root:focus": {
                border: "0 !important",
              },

              "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline:focus": {
                borderColor: "var(--color-day-yellow) !important",
              },

              "& div >.MuiOutlinedInput-notchedOutline": {
                border: "0px solid var(--color-day-yellow) !important",
              },

              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "12px !important",
                color: "var(--color-day-black) !important",
                top: "-6px !important",
              },

              "& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
                {
                  backgroundColor: "var(--color-dropdown-bg) !important",
                  color: "var(--color-day-black) !important",
                },

              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                {
                  color: "var(--color-day-yellow) !important",
                },

              "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-yellow) !important",
              },

              "& .css-ptiqhd-MuiSvgIcon-root": {
                height: "0.8em !important",
                width: "0.8em !important",
                fill: "var(--color-black-opcaity) !important",
              },

              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root": {
                padding: "3px 8px !important",
                backgroundColor: "var(--color-day-yellow) !important",
                borderRadius: "4px",
                display: "flex !important",
                justifyContent: "center !important",
                alignItems: "center !important",
                fontSize: "15px !important",
                textAlign: "center !important",
              },

              "& .optgroup": {
                padding: "2px !important",
              },

              "& div div >.optgroup": {
                backgroundColor: "var(--color-day-white) !important",
                color: "var(--color-day-black) !important",
              },

              "& .mui-options": {
                padding: "0px 15px",
              },

              "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
                borderBottom: "2px solid var(--color-day-black) !important",
              },

              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                color: "var(--color-day-black) !important",
                fontSize: "14px !important",
              },

              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "var(--color-day-black) !important",
              },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:before":
                {
                  borderBottom: "1px solid var(--color-day-yellow) !important",
                },

              "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                {
                  borderBottom: "2px solid var(--color-day-yellow) !important",
                },

              "& #demo-simple-select-standard-label": {
                color: "var(--color-day-yellow) !important",
              },

              "& .css-1mf6u8l-MuiSvgIcon-root-MuiSelect-icon": {
                color: "var(--color-day-black) !important",
              },

              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected":
                {
                  backgroundColor: "var(--color-day-yellow) !important",
                  color: "black",
                },

              "& .css-1869usk-MuiFormControl-root": {
                height: "60px !important",
              },

              "& div div >.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                {
                  color: "var(--color-day-black) !important",
                  fontSize: "14px !important",
                },

              "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root": {
                fontSize: "13px !important",
              },

              "& .css-nlvv43-MuiFormControl-root": {
                margin: "0px 8px !important",
                height: "30px !important",
              },

              "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "12px !important",
                color: "var(--color-day-black) !important",
                top: "-8px !important",
              },
            }}
            onChange={handleChangeForModelSelection3}
            options={model_names}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Models"
                inputProps={{
                  ...params.inputProps,
                  style: { width: "70%" }, // set the width to auto

                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>

        <div className="search-table">
          <table className="tg no-bl">
            <thead className="no-bl">
              <tr>
                <th className="tg-0lax no-bl" visibility="hidden">
                  {/* <ComparisonChartCanvas /> */}
                </th>
                <th className="tg-0lax">
                  <TvSplineAreaChartTopPerformer
                    model_name={model_name_1.replace("-", "_")}
                  />
                </th>
                <th className="tg-0lax">
                  <TvSplineAreaChartTopPerformer
                    model_name={model_name_2.replace("-", "_")}
                  />
                </th>
                <th className="tg-0lax to-hide">
                  <TvSplineAreaChartTopPerformer
                    model_name={model_name_3.replace("-", "_")}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tg-0lax">Time Horizon</td>
                <td className="tg-0lax">
                  {strategies[model_name_1]
                    ? strategies[model_name_1].time_horizon
                    : null}
                </td>
                <td className="tg-0lax">
                  {strategies[model_name_2]
                    ? strategies[model_name_2].time_horizon
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {strategies[model_name_3]
                    ? strategies[model_name_3].time_horizon
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">Currency</td>
                <td className="tg-0lax">
                  {strategies[model_name_1]
                    ? strategies[model_name_1].currency
                    : null}
                </td>
                <td className="tg-0lax">
                  {strategies[model_name_2]
                    ? strategies[model_name_2].currency
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {strategies[model_name_3]
                    ? strategies[model_name_3].currency
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">Start Date</td>
                <td className="tg-0lax">
                  {strategies[model_name_1]
                    ? strategies[model_name_1].date_started
                    : null}
                </td>
                <td className="tg-0lax">
                  {strategies[model_name_2]
                    ? strategies[model_name_2].date_started
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {strategies[model_name_3]
                    ? strategies[model_name_3].date_started
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">Forecast</td>
                <td className="tg-0lax">
                  {strategies[model_name_1]
                    ? strategies[model_name_1].current_position
                    : null}
                </td>
                <td className="tg-0lax">
                  {strategies[model_name_2]
                    ? strategies[model_name_2].current_position
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {strategies[model_name_3]
                    ? strategies[model_name_3].current_position
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">Forecast Time</td>
                <td className="tg-0lax">
                  {strategies[model_name_1]
                    ? strategies[model_name_1].forecast_time
                    : null}
                </td>
                <td className="tg-0lax">
                  {strategies[model_name_2]
                    ? strategies[model_name_2].forecast_time
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {strategies[model_name_3]
                    ? strategies[model_name_3].forecast_time
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">Next Forecast</td>
                <td className="tg-0lax">
                  {strategies[model_name_1]
                    ? strategies[model_name_1].next_forecast
                    : null}
                </td>
                <td className="tg-0lax">
                  {strategies[model_name_2]
                    ? strategies[model_name_2].next_forecast
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {strategies[model_name_3]
                    ? strategies[model_name_3].next_forecast
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">1d PNL</td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].pnl_sum_1 : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].pnl_sum_1 : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].pnl_sum_1 : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">7d PNL</td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].pnl_sum_7 : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].pnl_sum_7 : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].pnl_sum_7 : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">15d PNL</td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].pnl_sum_15 : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].pnl_sum_15 : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].pnl_sum_15 : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">30d PNL</td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].pnl_sum_30 : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].pnl_sum_30 : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].pnl_sum_30 : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">45d PNL</td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].pnl_sum_45 : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].pnl_sum_45 : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].pnl_sum_45 : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">60d PNL</td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].pnl_sum_60 : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].pnl_sum_60 : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].pnl_sum_60 : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Max DD
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].max_drawdown
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].max_drawdown
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].max_drawdown
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Max DD Day
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].max_drawdown_duration
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].max_drawdown_duration
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].max_drawdown_duration
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Average DD
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].average_drawdown
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].average_drawdown
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].average_drawdown
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Average DD Days
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].average_drawdown_duration
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].average_drawdown_duration
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].average_drawdown_duration
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Current DD
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].current_drawdown
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].current_drawdown
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].current_drawdown
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Current DD Days
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].curr_drawdown_duration
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].curr_drawdown_duration
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].curr_drawdown_duration
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Total Wins
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].total_wins : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].total_wins : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].total_wins : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Total Losses
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].total_losses
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].total_losses
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].total_losses
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Consecutive Wins
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].consective_wins
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].consective_wins
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].consective_wins
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Consecutive Losses
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].consective_losses
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].consective_losses
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].consective_losses
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Win Percentage
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].win_percentage
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].win_percentage
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].win_percentage
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Win/Loss Ratio
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].win_loss_ratio
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].win_loss_ratio
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].win_loss_ratio
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Aggregate Profit
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].total_positive_pnl
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].total_positive_pnl
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].total_positive_pnl
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Aggregate Loss
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].total_negative_pnl
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].total_negative_pnl
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].total_negative_pnl
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Average Daily PNL
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1]
                    ? stats[model_name_1].average_daily_pnl
                    : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2]
                    ? stats[model_name_2].average_daily_pnl
                    : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3]
                    ? stats[model_name_3].average_daily_pnl
                    : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  R2 Score
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].r2_score : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].r2_score : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].r2_score : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Sharpe
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].sharpe : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].sharpe : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].sharpe : null}
                </td>
              </tr>
              <tr>
                <td className="tg-0lax">
                  Sortino
                  <Tooltip title="X">
                    <IconButton>
                      <BsFillInfoCircleFill />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className="tg-0lax">
                  {stats[model_name_1] ? stats[model_name_1].sortino : null}
                </td>
                <td className="tg-0lax">
                  {stats[model_name_2] ? stats[model_name_2].sortino : null}
                </td>
                <td className="tg-0lax to-hide">
                  {stats[model_name_3] ? stats[model_name_3].sortino : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareComponent;
