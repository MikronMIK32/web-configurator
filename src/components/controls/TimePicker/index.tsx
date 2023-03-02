import {
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
} from 'antd';
import 'antd/dist/antd.css';

interface TimePickerProps extends AntdTimePickerProps {}

const TimePicker = (props: TimePickerProps) => <AntdTimePicker {...props} />;

export default TimePicker;
