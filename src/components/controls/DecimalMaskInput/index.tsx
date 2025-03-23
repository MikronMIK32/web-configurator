import { ChangeEvent, forwardRef, useCallback, useState } from 'react';
import Input, { InputProps } from '../Input';

export interface DecimalMaskInputProps extends InputProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => void;
}

export const DecimalMaskInput = forwardRef<HTMLInputElement, DecimalMaskInputProps>(
  ({ value: valueFromProps, onChange, ...props }, ref) => {
    const [rawValue, setRawValue] = useState<string>(''); // Internal state to track raw user input
    const [cursorPosition, setCursorPosition] = useState<number>(0); // Track cursor position

    /**
     * Formats the input value for display (adds commas for thousands separators).
     */
    const formatValue = useCallback((val: string): string => {
      if (!val) return ''; // Return empty string for no input
      const numericValue = val.replace(/\D/g, ''); // Remove non-numeric characters
      if (!numericValue) return ''; // Return empty string if no valid numbers exist
      return Number(numericValue).toLocaleString(); // Format with commas
    }, []);

    /**
     * Handles input changes.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const rawInput = input.value.replace(/\D/g, ''); // Extract raw numeric input
      const selectionStart = input.selectionStart || 0; // Preserve cursor position

      // Update internal state with raw value
      setRawValue(rawInput);

      const value = input.value.replace(/\s/g, '');

      const clone = { ...e };
      clone.currentTarget.value = value;

      // Trigger external onChange handler with raw value
      onChange?.(clone, { value });

      clone.currentTarget.value = rawInput;

      // Calculate the new cursor position after formatting
      const formattedValue = formatValue(rawInput);
      const newCursorPosition = calculateCursorPosition(formattedValue, rawInput, selectionStart);

      // Update cursor position after React updates the DOM
      setTimeout(() => {
        if (input) {
          input.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
    };

    /**
     * Calculates the correct cursor position after formatting.
     */
    const calculateCursorPosition = (formattedValue: string, rawInput: string, selectionStart: number): number => {
      let cursorOffset = 0;

      for (let i = 0; i < selectionStart && i < rawInput.length; i++) {
        const rawChar = rawInput[i];
        const formattedIndex = formattedValue.indexOf(rawChar, cursorOffset);

        if (formattedIndex !== -1) {
          cursorOffset = formattedIndex + 1; // Move cursor offset past the matched character
        }
      }

      return cursorOffset;
    };

    /**
     * Handles focus to reset the input value to raw format.
     */
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const input = e.target;
      input.value = rawValue; // Show raw value when focused
      setCursorPosition(input.value.length); // Set cursor to the end
    };

    /**
     * Handles blur to format the value for display.
     */
    const handleBlur = () => {
      const formattedValue = formatValue(rawValue);
      setRawValue(formattedValue); // Update raw value to formatted value on blur
    };

    return (
      <Input
        {...props}
        value={formatValue(rawValue)} // Display formatted value
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
      />
    );
  }
);

DecimalMaskInput.displayName = 'DecimalMaskInput';

export default DecimalMaskInput;
