# Monthly expense checker

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f5f2c79178404839b58bcf40ba737777)](https://app.codacy.com/app/syusyu/expense-checker?utm_source=github.com&utm_medium=referral&utm_content=syusyu/expense-checker&utm_campaign=Badge_Grade_Dashboard)
[![CircleCI](https://circleci.com/gh/syusyu/expense-checker/tree/master.svg?style=svg)](https://circleci.com/gh/syusyu/expense-checker/tree/master)
[![codecov](https://codecov.io/gh/syusyu/expense-checker/branch/master/graph/badge.svg)](https://codecov.io/gh/syusyu/expense-checker)

Expense Checker is a very simple application to confirm your monthly expenditure.


## Demo
Check the [live demo](http://sum-monthly-expense.s3-ap-northeast-1.amazonaws.com/index.html).

You can use this page very easily.
- First, prepare your expenditure CSV files. Normally your bank WEB system provides it
- Put the CSV files in the page
- Confirm the monthly expenditure


## Customization
You can build your own expense checker after you checkout this repository.
If you prepare CONFIGURATION file, you can easily put the following feature in your own app.

### Config file location
Put `/config/default.json` in your expense-checker repository.

### Contents of the Config file
```
{
    "HEADER_TERMS" : {
        "date": "your-own-date-header-name",
        "expenditure": "your-own-expenditure-header-name",
        "content": "your-own-content-header-name"
    },

    "FILTER_TERMS" : [
        "Some string"
    ],

    "DATE_FORMAT": "YYYY-MM",

    "CURRENCY": "JPY",

    "EXPENDITURE_LEVEL_COLORS" : [
        {"min": 0, "max": 400000, "color": "#EEEEEE"},
        {"min": 400000, "max": 600000, "color": "#A5D6A7"},
        {"min": 600000, "max": 800000, "color": "#FFF59D"},
        {"min": 800000, "max": 1000000, "color": "#FF9800"},
        {"min": 1000000, "color": "#F44336"}
    ]
}
```


