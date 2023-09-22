import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExchangeAlt } from "react-icons/fa";

const country_list = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",

  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  GHC: "GH",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",

  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NPR");
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  const getExchangeRate = () => {
    const API_KEY = "fce816cd9f86ce1a4f455b65"; // Replace with your API key
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

    axios
      .get(url)
      .then((response) => {
        const rates = response.data.conversion_rates;
        const rate = rates[toCurrency];
        setExchangeRate(rate);
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
        setExchangeRate(null);
      });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const swapCurrencies = () => {
    const tempFromCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempFromCurrency);
  };

  return (
    <div className="wrapper">
      <header>Currency Converter</header>
      <form>
        <div className="amount">
          <p>Enter Amount</p>
          <input type="text" value={amount} onChange={handleAmountChange} />
        </div>
        <div className="drop-list">
          <div className="from">
            <p>From</p>
            <div className="select-box">
              <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                {Object.keys(country_list).map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="icon" onClick={swapCurrencies}>
            <FaExchangeAlt />
          </div>
          <div className="to">
            <p>To</p>
            <div className="select-box">
              <select value={toCurrency} onChange={handleToCurrencyChange}>
                {Object.keys(country_list).map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="exchange-rate" style={{ marginBottom: "20px" }}>
          {exchangeRate
            ? `${amount} ${fromCurrency} = ${(amount * exchangeRate).toFixed(
                2
              )} ${toCurrency}`
            : "Getting exchange rate..."}
        </div>
        <button type="button" onClick={getExchangeRate}>
          Get Exchange Rate
        </button>
      </form>
    </div>
  );
};

export default Currency;
