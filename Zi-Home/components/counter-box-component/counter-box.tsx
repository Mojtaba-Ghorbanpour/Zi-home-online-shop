"use client";
import { Button } from "@heroui/react";

const CounterBox = ({
  count,
  onChange,
}: {
  count: number;
  onChange: (value: number) => void;
}) => {
  const increase = () => onChange(count + 1);
  const decrease = () => onChange(count > 1 ? count - 1 : 1);

  return (
    <div className="flex items-center gap-3 rounded-lg">
      <Button
        isIconOnly
        variant="shadow"
        color="danger"
        onClick={decrease}
        className="text-3xl"
        size="sm"
      >
        -
      </Button>
      <span className="text-center text-lg font-medium">{count}</span>
      <Button
        isIconOnly
        color="danger"
        variant="shadow"
        onClick={increase}
        className="text-2xl"
        size="sm"
      >
        +
      </Button>
    </div>
  );
};

export default CounterBox;
