import Pin from '../pin/pin';
import styles from './pin-group.module.css';

export interface PinGroupProps {
  onClickHandle: (value: number) => void;
}

export function PinGroup({ onClickHandle }: PinGroupProps) {
  return (
    <div>
      <div>
        <Pin value={7} onClickHandle={onClickHandle}></Pin>
        <Pin value={9} onClickHandle={onClickHandle}></Pin>
        <Pin value={8} onClickHandle={onClickHandle}></Pin>
      </div>
      <div>
        <Pin value={5} onClickHandle={onClickHandle}></Pin>
        <Pin value={11} onClickHandle={onClickHandle}></Pin>
        <Pin value={12} onClickHandle={onClickHandle}></Pin>
        <Pin value={6} onClickHandle={onClickHandle}></Pin>
      </div>
      <div>
        <Pin value={3} onClickHandle={onClickHandle}></Pin>
        <Pin value={10} onClickHandle={onClickHandle}></Pin>
        <Pin value={4} onClickHandle={onClickHandle}></Pin>
      </div>
      <div>
        <Pin value={1} onClickHandle={onClickHandle}></Pin>
        <Pin value={2} onClickHandle={onClickHandle}></Pin>
      </div>
      <div>
        <Pin value={0} onClickHandle={onClickHandle}></Pin>
      </div>
    </div>
  );
}

export default PinGroup;
