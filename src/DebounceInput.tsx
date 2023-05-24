// Import necessary hooks from React
import { InputHTMLAttributes, useEffect, useState } from "react";

// Define Props interface. It extends InputHTMLAttributes while replacing the onChange method,
// so it could accept string | number type for value and returns void. It also has an optional prop for debounceTime.
interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string | number;
  onChange: (val: string | number) => void;
  debounceTime?: number;
}

// Define the DebouncedInput component
export const DebouncedInput = ({
  value: initialValue, // the initial value of the input
  onChange, // the onChange handler
  debounceTime = 300, // the debounce time (default is 300ms)
  ...props // spread in the rest of the props
}: Props) => {
  // Define a state variable for the input's value
  const [value, setValue] = useState(initialValue);

  // useEffect hook to update state if initialValue prop changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // useEffect hook to debounce the onChange handler
  // this is triggered on every keypress but waits for a pause in typing (i.e., 'debounces') before running
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounceTime);

    // cleanup function to clear the timeout when the component unmounts or the value, onChange, or debounceTime changes
    return () => {
      clearTimeout(timeout);
    };
  }, [value, onChange, debounceTime]);

  // Render the input field
  return (
    <input
      {...props} // spread in the rest of the props
      value={value} // set the value of the input to the state variable
      onChange={(e) => setValue(e.target.value)} // update the state variable when the input changes
    />
  );
};
