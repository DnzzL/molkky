import styles from './pin.module.css';

export interface PinProps {
  value: number;
  onClickHandle: (value: number) => void;
}

export function Pin({ value, onClickHandle }: PinProps) {
  return <button onClick={() => onClickHandle(value)}>{value}</button>;
}

export default Pin;
