// import { SchemaItem } from './types';

export const CELL_SIZE = 32;
export const ROWS = 56;
export const COLS = 44;

export const initialSchemaCode = `[
    {
        "type": "multiplexor",
        "col": 20,
        "row": 1,
        "width": 4,
        "height": 6,
        "pins": [
            {
                "code": "1",
                "isActive": false,
                "name": "APB_M"
            },
            {
                "code": "2",
                "isActive": false,
                "name": "SYS_CLK"
            },
            {
                "code": "3",
                "isActive": false,
                "name": "HCLK"
            },
            {
                "code": "4",
                "isActive": true,
                "name": "OSC32K"
            },
            {
                "code": "5",
                "isActive": false,
                "name": "LSI32K"
            },
            {
                "code": "6",
                "isActive": true,
                "name": "TX_PAD"
            }
        ]
    },
    {
        "type": "input-block",
        "col": 1,
        "row": 4,
        "width": 4,
        "height": 2,
        "value": "32",
        "connectionLeft": "none",
        "connectionRight": "bidirectional",
        "prefix": "Входная частота",
        "postfix": "до 32 МГц",
        "editable": true
    },
    {
        "type": "input-block",
        "col": 6,
        "row": 4,
        "width": 4,
        "height": 2,
        "value": "OSC32M",
        "connectionLeft": "biline",
        "connectionRight": "bidirectional",
        "postfix": "32 МГц",
        "postfixAlign": "center"
    },
    {
        "type": "input-block",
        "col": 6,
        "row": 7,
        "width": 4,
        "height": 2,
        "value": "32",
        "connectionLeft": "none",
        "connectionRight": "line",
        "prefix": "HSI",
        "postfix": "МГц",
        "prefixAlign": "center",
        "postfixAlign": "center",
        "editable": true
    },
    {
        "type": "input-block",
        "col": 6,
        "row": 10,
        "width": 4,
        "height": 2,
        "value": "32",
        "connectionLeft": "none",
        "connectionRight": "line",
        "prefix": "LSI",
        "postfix": "кГц",
        "prefixAlign": "center",
        "postfixAlign": "center",
        "editable": true
    },
    {
        "type": "vertical-line",
        "col": 5,
        "row": 2,
        "width": 2,
        "height": 32
    },
    {
        "type": "horizontal-line",
        "col": 5,
        "row": 6,
        "width": 32,
        "height": 1
    }
]`;
