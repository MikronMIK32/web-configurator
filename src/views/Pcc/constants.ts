// import { SchemaItem } from './types';

export const CELL_SIZE = 32;
export const ROWS = 56;
export const COLS = 44;

export const initialSchemaCode = `[
   {
      "name":"multiplexor_sys_clk",
      "type":"multiplexor",
      "col":23,
      "row":18,
      "width":4,
      "height":4,
      "prefix":"Входная частота",
      "pins":[
         {
            "code":"1",
            "isActive":true,
            "name":"OSC32M"
         },
         {
            "code":"2",
            "isActive":false,
            "name":"HSI"
         },
         {
            "code":"3",
            "isActive":false,
            "name":"LSI"
         },
         {
            "code":"4",
            "isActive":true,
            "name":"OSC32K"
         }
      ]
   },
   {
      "type":"input-block",
      "name":"osc32m_freq_in",
      "col":1,
      "row":15,
      "width":4,
      "height":2,
      "value":"32",
      "connectionLeft":"none",
      "connectionRight":"bidirectional",
      "prefix":"Входная частота",
      "postfix":"до 32 МГц",
      "editable":true
   },
   {
      "type":"input-block",
      "name":"osc32m",
      "col":6,
      "row":15,
      "width":4,
      "height":2,
      "value":"OSC32M",
      "connectionLeft":"biline",
      "connectionRight":"line",
      "postfix":"32 МГц",
      "postfixAlign":"center"
   },
   {
      "type":"input-block",
      "name":"hsi",
      "col":6,
      "row":19,
      "width":4,
      "height":2,
      "value":"32",
      "connectionLeft":"none",
      "connectionRight":"line",
      "prefix":"HSI",
      "postfix":"32 МГц",
      "prefixAlign":"center",
      "postfixAlign":"center",
      "editable":true
   },
   {
      "type":"input-block",
      "name":"lsi",
      "col":6,
      "row":23,
      "width":4,
      "height":2,
      "value":"32",
      "connectionLeft":"none",
      "connectionRight":"line",
      "prefix":"LSI",
      "postfix":"32 кГц",
      "prefixAlign":"center",
      "postfixAlign":"center",
      "editable":true
   },
   {
      "type":"input-block",
      "name":"osc32k",
      "col":6,
      "row":27,
      "width":4,
      "height":2,
      "value":"OSC32K",
      "connectionLeft":"biline",
      "connectionRight":"line",
      "postfix":"32 МГц",
      "postfixAlign":"center"
   },
   {
      "type":"input-block",
      "name":"osc32k_freq_in",
      "col":1,
      "row":27,
      "width":4,
      "height":2,
      "value":"32.768",
      "connectionLeft":"none",
      "connectionRight":"bidirectional",
      "prefix":"Входная частота",
      "postfix":"до 32 МГц",
      "editable":true
   },
   {
      "type":"vertical-line",
      "col":5,
      "row":2,
      "width":2,
      "height":32
   },
   {
      "type":"horizontal-line",
      "col":10,
      "row":16,
      "width":13,
      "height":1
   }
]
`;
