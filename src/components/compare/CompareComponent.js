import React, { useState } from 'react';
import './Compare.css';
import Autocomplete from "@mui/material/Autocomplete";
import { useStateContext } from "../../ContextProvider";
import TextField from "@mui/material/TextField";
import ComparisonChartCanvas from '../models/graphs/ComparisonChartCanvas';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";



const CompareComponent = () => {
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

    const [rows_cached, set_rows_cached] = useState([]);
    const handleChangeForModelSelection = (event, values) => {
    // console.log("Search dropdown -->", values);
        if (values != null) {
        // setRows({});
        const res = rows_cached.filter((item) => {
            return item.modelName == values.label;
        });
        handleChangePage("", 1);
        setRows(res);
        } else {
        setRows(rows_cached);
        }
    };

    const handleChangePage = (event, value) => {
        console.log("Value is -->", value);
        setPage(value);
        // setPageSize(value);
    };

  const [page, setPage] = useState(1);

  const [model_search_selection, set_model_search_selection] = useState([
    { label: "Area50", value: 1 },
    { label: "Area51", value: 2 },
    { label: "Area52", value: 3 },
  ]);



  return (
    <div className='compare'>
        <div className='container'>
            <h1>Comparisons</h1>

            <div className='compare-searches'>
                <p className='visibility-hidden'>search bar 1</p>
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

                      "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input":
                        {
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

                      "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          color: "var(--color-day-black) !important",
                        },

                      "& div div >.MuiOutlinedInput-root": {
                        backgroundColor:
                          "var(--color-forecasts-card) !important",
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
                          backgroundColor:
                            "var(--color-dropdown-bg) !important",
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
                        borderBottom:
                          "2px solid var(--color-day-black) !important",
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
                          borderBottom:
                            "1px solid var(--color-day-yellow) !important",
                        },

                      "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                        {
                          borderBottom:
                            "2px solid var(--color-day-yellow) !important",
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
                    onChange={handleChangeForModelSelection}
                    options={model_search_selection}
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

                      "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input":
                        {
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

                      "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          color: "var(--color-day-black) !important",
                        },

                      "& div div >.MuiOutlinedInput-root": {
                        backgroundColor:
                          "var(--color-forecasts-card) !important",
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
                          backgroundColor:
                            "var(--color-dropdown-bg) !important",
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
                        borderBottom:
                          "2px solid var(--color-day-black) !important",
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
                          borderBottom:
                            "1px solid var(--color-day-yellow) !important",
                        },

                      "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                        {
                          borderBottom:
                            "2px solid var(--color-day-yellow) !important",
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
                    onChange={handleChangeForModelSelection}
                    options={model_search_selection}
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

                      "& div div >.css-194a1fa-MuiSelect-select-MuiInputBase-input":
                        {
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

                      "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          color: "var(--color-day-black) !important",
                        },

                      "& div div >.MuiOutlinedInput-root": {
                        backgroundColor:
                          "var(--color-forecasts-card) !important",
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
                          backgroundColor:
                            "var(--color-dropdown-bg) !important",
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
                        borderBottom:
                          "2px solid var(--color-day-black) !important",
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
                          borderBottom:
                            "1px solid var(--color-day-yellow) !important",
                        },

                      "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root:after":
                        {
                          borderBottom:
                            "2px solid var(--color-day-yellow) !important",
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
                    onChange={handleChangeForModelSelection}
                    options={model_search_selection}
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

            <div className='search-table'>
                <table className="tg no-bl">
                    <thead className='no-bl'>
                    <tr>
                        <th className="tg-0lax no-bl" visibility='hidden'>
                            <ComparisonChartCanvas />
                        </th>
                        <th className="tg-0lax">
                            <ComparisonChartCanvas model_name={"ZT1_0M24BTC26"} />
                        </th>
                        <th className="tg-0lax">
                            {/* <ComparisonChartCanvas  model_name={"ZT1_0M24BTC26"}/> */}
                        </th>
                        <th className="tg-0lax">
                            {/* <ComparisonChartCanvas  model_name={"ZT1_0M24BTC26"} /> */}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="tg-0lax">Time Horizon</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Currency</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Start Date</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Forecast</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Forecast Time</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Next Forecast</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">1d PNL</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">7d PNL</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">15d PNL</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">30d PNL</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">45d PNL</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">60d PNL</td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Max DD
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Max DD Day
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Average DD 
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Average DD Days
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Current DD
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Current DD Days
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Total Wins
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Total Losses
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Consecutive Wins
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Consecutive Losses
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Win Percentage
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Win/Loss Ratio
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Aggregate Profit
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Aggregate Loss
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Average Daily PNL
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">R2 Score
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Sharpe
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    <tr>
                        <td className="tg-0lax">Sortino
                            <Tooltip title="X">
                                <IconButton>
                                <BsFillInfoCircleFill />
                                </IconButton>
                            </Tooltip>
                        </td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                        <td className="tg-0lax"></td>
                    </tr>
                    </tbody>
                    </table>
            </div>

        </div>
    </div>
  )
}

export default CompareComponent