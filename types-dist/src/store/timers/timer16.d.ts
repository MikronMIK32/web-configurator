import { PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
type OptionShape = {
    key: string;
    value: any;
};
export declare enum Timer16Mode {
    DISABLED = "disabled",
    INTERNAL_CLOCK = "internal_clock",
    EXTERNAL_CLOCK_SYNC = "external_clock_sync",
    EXTERNAL_CLOCK = "external_clock",
    ENCODER = "encoder"
}
export declare enum Timer16Polarity {
    RISE = "rise",
    FALL = "fall",
    BOTH = "both"
}
export declare const timerPolarityTranslations: Record<Timer16Polarity, string>;
export declare const timerPolarityOptions: {
    value: string;
    key: string;
}[];
export declare enum Timer16UpdateMode {
    IMMEDIATE = "immediate",
    AFTER_PERIOD = "after_period"
}
export declare enum Timer16WavePolarity {
    FORWARD = "forward",
    INVERTED = "inverted"
}
export declare enum Timer16DigitalFilter {
    DISABLED = "disabled",
    STABLE_TWO_CYCLES = "stable_two_cycles",
    STABLE_FOUR_CYCLES = "stable_four_cycles",
    STABLE_EIGHT_CYCLES = "stable_eight_cycles"
}
export declare enum TriggerSource {
    SOFTWARE_TRIGGER = "software_trigger",
    THERMO_END = "thermo_end",
    ADC_END = "adc_end",
    RTC = "rtc",
    ALARM = "alarm"
}
export declare const timerDigitalFilterTranslations: Record<Timer16DigitalFilter, string>;
export declare const timerModeTranslations: Record<Timer16Mode, string>;
export declare const timerTriggerPolarityTranslations: Record<Timer16Polarity, string>;
export declare const timerDigitalFilterOptions: {
    value: string;
    key: string;
}[];
export declare const activeFrontOptions: {
    value: string;
    key: string;
}[];
export declare const timerModeOptions: {
    value: string;
    key: string;
}[];
export declare const dividerOptions: {
    key: string;
    value: number;
}[];
export declare const updateModeTranslations: Record<Timer16UpdateMode, string>;
export declare const updateModeOptions: {
    value: string;
    key: string;
}[];
export declare const wavePolarityTranslations: Record<Timer16WavePolarity, string>;
export declare const wavePolarityOptions: {
    value: string;
    key: string;
}[];
export declare const getTriggerSourceOptions: (timerNumber: 0 | 1 | 2, isSoftwareDisabled: boolean) => OptionShape[];
export declare const timer16StateSchema: z.ZodObject<{
    mode: z.ZodNativeEnum<typeof Timer16Mode>;
    externalTrigger: z.ZodBoolean;
    generateWaveForm: z.ZodBoolean;
    frequency: z.ZodObject<{
        divider: z.ZodNumber;
        polarity: z.ZodNativeEnum<typeof Timer16Polarity>;
    }, "strip", z.ZodTypeAny, {
        divider: number;
        polarity: Timer16Polarity;
    }, {
        divider: number;
        polarity: Timer16Polarity;
    }>;
    updateMode: z.ZodNativeEnum<typeof Timer16UpdateMode>;
    triggerSource: z.ZodNativeEnum<typeof TriggerSource>;
    activeFront: z.ZodNativeEnum<typeof Timer16Polarity>;
    wavePolarity: z.ZodNativeEnum<typeof Timer16WavePolarity>;
    triggerDigitalFilter: z.ZodNativeEnum<typeof Timer16DigitalFilter>;
}, "strip", z.ZodTypeAny, {
    mode: Timer16Mode;
    externalTrigger: boolean;
    generateWaveForm: boolean;
    frequency: {
        divider: number;
        polarity: Timer16Polarity;
    };
    updateMode: Timer16UpdateMode;
    triggerSource: TriggerSource;
    activeFront: Timer16Polarity;
    wavePolarity: Timer16WavePolarity;
    triggerDigitalFilter: Timer16DigitalFilter;
}, {
    mode: Timer16Mode;
    externalTrigger: boolean;
    generateWaveForm: boolean;
    frequency: {
        divider: number;
        polarity: Timer16Polarity;
    };
    updateMode: Timer16UpdateMode;
    triggerSource: TriggerSource;
    activeFront: Timer16Polarity;
    wavePolarity: Timer16WavePolarity;
    triggerDigitalFilter: Timer16DigitalFilter;
}>;
export type Timer16State = z.infer<typeof timer16StateSchema>;
export declare const timer16InitialState: Timer16State;
export declare const timer16Slice: import("@reduxjs/toolkit").Slice<{
    timer16_0: {
        mode: Timer16Mode;
        externalTrigger: boolean;
        generateWaveForm: boolean;
        frequency: {
            divider: number;
            polarity: Timer16Polarity;
        };
        updateMode: Timer16UpdateMode;
        triggerSource: TriggerSource;
        activeFront: Timer16Polarity;
        wavePolarity: Timer16WavePolarity;
        triggerDigitalFilter: Timer16DigitalFilter;
    };
    timer16_1: {
        mode: Timer16Mode;
        externalTrigger: boolean;
        generateWaveForm: boolean;
        frequency: {
            divider: number;
            polarity: Timer16Polarity;
        };
        updateMode: Timer16UpdateMode;
        triggerSource: TriggerSource;
        activeFront: Timer16Polarity;
        wavePolarity: Timer16WavePolarity;
        triggerDigitalFilter: Timer16DigitalFilter;
    };
    timer16_2: {
        mode: Timer16Mode;
        externalTrigger: boolean;
        generateWaveForm: boolean;
        frequency: {
            divider: number;
            polarity: Timer16Polarity;
        };
        updateMode: Timer16UpdateMode;
        triggerSource: TriggerSource;
        activeFront: Timer16Polarity;
        wavePolarity: Timer16WavePolarity;
        triggerDigitalFilter: Timer16DigitalFilter;
    };
}, {
    setTimer16_0: (old: import("immer/dist/internal").WritableDraft<{
        timer16_0: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_1: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_2: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
    }>, action: PayloadAction<Timer16State>) => {
        timer16_0: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_1: import("immer/dist/internal").WritableDraft<{
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        }>;
        timer16_2: import("immer/dist/internal").WritableDraft<{
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        }>;
    };
    setTimer16_1: (old: import("immer/dist/internal").WritableDraft<{
        timer16_0: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_1: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_2: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
    }>, action: PayloadAction<Timer16State>) => {
        timer16_1: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_0: import("immer/dist/internal").WritableDraft<{
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        }>;
        timer16_2: import("immer/dist/internal").WritableDraft<{
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        }>;
    };
    setTimer16_2: (old: import("immer/dist/internal").WritableDraft<{
        timer16_0: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_1: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_2: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
    }>, action: PayloadAction<Timer16State>) => {
        timer16_2: {
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        };
        timer16_0: import("immer/dist/internal").WritableDraft<{
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        }>;
        timer16_1: import("immer/dist/internal").WritableDraft<{
            mode: Timer16Mode;
            externalTrigger: boolean;
            generateWaveForm: boolean;
            frequency: {
                divider: number;
                polarity: Timer16Polarity;
            };
            updateMode: Timer16UpdateMode;
            triggerSource: TriggerSource;
            activeFront: Timer16Polarity;
            wavePolarity: Timer16WavePolarity;
            triggerDigitalFilter: Timer16DigitalFilter;
        }>;
    };
}, "timer16">;
export declare const setTimer16_0: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mode: Timer16Mode;
    externalTrigger: boolean;
    generateWaveForm: boolean;
    frequency: {
        divider: number;
        polarity: Timer16Polarity;
    };
    updateMode: Timer16UpdateMode;
    triggerSource: TriggerSource;
    activeFront: Timer16Polarity;
    wavePolarity: Timer16WavePolarity;
    triggerDigitalFilter: Timer16DigitalFilter;
}, string>, setTimer16_1: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mode: Timer16Mode;
    externalTrigger: boolean;
    generateWaveForm: boolean;
    frequency: {
        divider: number;
        polarity: Timer16Polarity;
    };
    updateMode: Timer16UpdateMode;
    triggerSource: TriggerSource;
    activeFront: Timer16Polarity;
    wavePolarity: Timer16WavePolarity;
    triggerDigitalFilter: Timer16DigitalFilter;
}, string>, setTimer16_2: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mode: Timer16Mode;
    externalTrigger: boolean;
    generateWaveForm: boolean;
    frequency: {
        divider: number;
        polarity: Timer16Polarity;
    };
    updateMode: Timer16UpdateMode;
    triggerSource: TriggerSource;
    activeFront: Timer16Polarity;
    wavePolarity: Timer16WavePolarity;
    triggerDigitalFilter: Timer16DigitalFilter;
}, string>;
export {};
