export const CELL_SIZE = 16;
export const ROWS = 112;
export const COLS = 88;

export const STROKE_WIDTH = 2;
export const STROKE_COLOR = '#000';

export const initialSchemaCode = `[
    {
        "type": "input-block",
        "name": "input_osc32m",
        "col": 2,
        "row": 6,
        "width": 8,
        "height": 4,
        "value": "32",
        "connectionLeft": "none",
        "connectionRight": "bidirectional",
        "prefix": "Входная частота",
        "postfix": "до 32 МГц",
        "editable": true
    },
    {
        "type": "input-block",
        "name": "osc32m",
        "col": 10,
        "row": 6,
        "width": 10,
        "height": 4,
        "value": "OSC32M",
        "connectionLeft": "biline",
        "connectionRight": "line",
        "postfix": "32 МГц",
        "postfixAlign": "center"
    },
    {
        "type": "input-block",
        "name": "hsi",
        "col": 12,
        "row": 16,
        "width": 8,
        "height": 4,
        "value": "32",
        "connectionLeft": "none",
        "connectionRight": "line",
        "prefix": "HSI",
        "postfix": "32 МГц",
        "prefixAlign": "center",
        "postfixAlign": "center",
        "editable": true
    },
    {
        "type": "input-block",
        "name": "lsi",
        "col": 12,
        "row": 24,
        "width": 8,
        "height": 4,
        "value": "32",
        "connectionLeft": "none",
        "connectionRight": "line",
        "prefix": "LSI",
        "postfix": "32 кГц",
        "prefixAlign": "center",
        "postfixAlign": "center",
        "editable": true
    },
    {
        "type": "input-block",
        "name": "osc32k",
        "col": 10,
        "row": 34,
        "width": 10,
        "height": 4,
        "value": "OSC32K",
        "connectionLeft": "biline",
        "connectionRight": "line",
        "postfix": "32 кГц",
        "postfixAlign": "center"
    },
    {
        "type": "input-block",
        "name": "osc32k_freq_in",
        "col": 2,
        "row": 34,
        "width": 8,
        "height": 4,
        "value": "32.768",
        "connectionLeft": "none",
        "connectionRight": "bidirectional",
        "prefix": "Входная частота",
        "postfix": "до 32 кГц",
        "editable": true
    },
    {
        "type": "input-block",
        "name": "rtc_freq",
        "col": 30,
        "row": 33,
        "width": 8,
        "height": 4,
        "value": "32",
        "connectionLeft": "right",
        "connectionRight": "none",
        "postfix": "к RTC (кГц)",
        "postfixAlign": "center"
    },
    {
        "name": "mux_sys_clk",
        "type": "multiplexor",
        "col": 48,
        "row": 6,
        "width": 8,
        "height": 10,
        "prefix": "Мультиплексор частоты системы",
        "pins": [
            {
                "code": "1",
                "isActive": true,
                "name": "OSC32M"
            },
            {
                "code": "2",
                "isActive": false,
                "name": "HSI"
            },
            {
                "code": "3",
                "isActive": false,
                "name": "LSI"
            },
            {
                "code": "4",
                "isActive": true,
                "name": "OSC32K"
            }
        ]
    },
    {
        "name": "mux_rtc_clk",
        "type": "multiplexor",
        "col": 22,
        "row": 24,
        "width": 8,
        "height": 6,
        "prefix": "Мультиплексор частоты RTC",
        "pins": [
            {
                "code": "1",
                "isActive": true,
                "name": "LSI"
            },
            {
                "code": "2",
                "isActive": false,
                "name": "OSC32K"
            }
        ]
    },
    {
        "name": "mux_mon_clk",
        "type": "multiplexor",
        "col": 22,
        "row": 32,
        "width": 8,
        "height": 6,
        "prefix": "Мультиплексор монитора частоты",
        "pins": [
            {
                "code": "1",
                "isActive": true,
                "name": "LSI"
            },
            {
                "code": "2",
                "isActive": false,
                "name": "OSC32K"
            }
        ]
    },
    {
        "name": "mux_wdt_clk",
        "type": "multiplexor",
        "col": 48,
        "row": 20,
        "width": 8,
        "height": 10,
        "prefix": "Мультиплексор частоты WDT",
        "pins": [
            {
                "code": "1",
                "isActive": true,
                "name": "OSC32M"
            },
            {
                "code": "2",
                "isActive": false,
                "name": "HSI"
            },
            {
                "code": "3",
                "isActive": false,
                "name": "LSI"
            },
            {
                "code": "4",
                "isActive": true,
                "name": "OSC32K"
            }
        ]
    },
    {
        "type": "wire",
        "name": "vline_1",
        "points": [
            {
                "col": 10,
                "row": 2
            },
            {
                "col": 10,
                "row": 68
            }
        ]
    },
    {
        "type": "intersection",
        "name": "int0",
        "col": 2,
        "row": 2,
        "width": 1,
        "height": 1
    }
]`;
