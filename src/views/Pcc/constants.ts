// import { SchemaItem } from './types';

export const CELL_SIZE = 16;
export const ROWS = 112;
export const COLS = 88;

export const STROKE_WIDTH = 1;
export const STROKE_COLOR = '#000';

export const initialSchemaCode = `[
    {
        "name": "multiplexor_sys_clk",
        "type": "multiplexor",
        "col": 48,
        "row": 36,
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
        "name": "multiplexor_rtc_clk",
        "type": "multiplexor",
        "col": 20,
        "row": 52,
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
                "name": "HSI"
            }
        ]
    },
    {
        "type": "input-block",
        "name": "osc32m_freq_in",
        "col": 2,
        "row": 28,
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
        "row": 28,
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
        "row": 38,
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
        "row": 48,
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
        "row": 58,
        "width": 10,
        "height": 4,
        "value": "OSC32K",
        "connectionLeft": "biline",
        "connectionRight": "line",
        "postfix": "32 МГц",
        "postfixAlign": "center"
    },
    {
        "type": "input-block",
        "name": "osc32k_freq_in",
        "col": 2,
        "row": 58,
        "width": 8,
        "height": 4,
        "value": "32.768",
        "connectionLeft": "none",
        "connectionRight": "bidirectional",
        "prefix": "Входная частота",
        "postfix": "до 32 МГц",
        "editable": true
    },
    {
        "type": "input-block",
        "name": "rtc_freq",
        "col": 28,
        "row": 53,
        "width": 8,
        "height": 4,
        "value": "32",
        "connectionLeft": "right",
        "connectionRight": "none",
        "postfix": "к RTC (кГц)",
        "postfixAlign": "center"
    },
    {
        "type": "wire",
        "name": "vline_1",
        "points": [
            {
                "col": 10,
                "row": 4
            },
            {
                "col": 10,
                "row": 68
            }
        ]
    },
    {
        "type": "wire",
        "name": "vline_2",
        "points": [
            {
                "col": 48,
                "row": 30
            },
            {
                "col": 48,
                "row": 38
            }
        ]
    },
    {
        "type": "wire",
        "name": "line_3",
        "points": [
            {
                "col": 20,
                "row": 42
            },
            {
                "col": 20,
                "row": 50
            },
            {
                "col": 20,
                "row": 42
            },
            {
                "col": 44,
                "row": 42
            }
        ]
    },
    {
        "type": "wire",
        "name": "vline_5",
        "points": [
            {
                "col": 20,
                "row": 50
            },
            {
                "col": 20,
                "row": 54
            }
        ]
    },
    {
        "type": "wire",
        "name": "vline_6",
        "points": [
            {
                "col": 20,
                "row": 56
            },
            {
                "col": 20,
                "row": 60
            }
        ]
    },
    {
        "type": "wire",
        "name": "hline_1",
        "points": [
            {
                "col": 20,
                "row": 30
            },
            {
                "col": 48,
                "row": 30
            }
        ]
    },
    {
        "type": "wire",
        "name": "hline_2",
        "points": [
            {
                "col": 20,
                "row": 40
            },
            {
                "col": 46,
                "row": 40
            }
        ]
    },
    {
        "type": "wire",
        "name": "hline_4",
        "points": [
            {
                "col": 40,
                "row": 44
            },
            {
                "col": 48,
                "row": 44
            },
            {
                "col": 40,
                "row": 44
            },
            {
                "col": 40,
                "row": 60
            },
            {
                "col": 20,
                "row": 60
            },
            {
                "col": 40,
                "row": 60
            }
        ]
    },
    {
        "type": "intersection",
        "col": 43,
        "row": 44,
        "width": 1,
        "height": 1
    }
]`;
