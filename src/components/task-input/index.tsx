import * as Select from "@radix-ui/react-select";
import styles from "./task-input.module.scss";
import Image from "next/image";
import { useMemo, useState } from "react";
import cx from "classnames";
import { Task } from "@/types/task";

const TaskInput: React.FC<{
  initialData?: Task;
  index: number;
  onInputChange: (
    index: number,
    value: {
      category: string | undefined;
      text: string;
      _id?: string;
    }
  ) => void;
}> = ({ initialData, onInputChange, index }) => {
  const checkIcon = useMemo(
    () => <Image src="/icons/check.svg" width={20} height={20} alt="check" />,
    []
  );
  const [inputGroupValues, setInputGroupValues] = useState<{
    category: string | undefined;
    text: string;
    _id?: string;
  }>({
    category: initialData?.category || undefined,
    text: initialData?.text || "",
    _id: initialData?._id || undefined,
  });

  const handleInputGroupChange = (
    value: string,
    inputName: "category" | "text"
  ) => {
    onInputChange(index, { ...inputGroupValues, [inputName]: value });
    setInputGroupValues((prev) => ({ ...prev, [inputName]: value }));
  };

  return (
    <div className={styles.container}>
      <Select.Root
        value={inputGroupValues.category}
        onValueChange={(value) => handleInputGroupChange(value, "category")}
      >
        <Select.Trigger
          className={cx(
            styles.trigger,
            inputGroupValues.category && styles.selected
          )}
          aria-label="Type"
        >
          <Select.Value placeholder="Type" />
          <Select.Icon>
            <Image
              src="/icons/expand-gray.svg"
              width={20}
              height={20}
              alt="expand"
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={styles.content}>
            <Select.Viewport>
              <Select.Item value="bug" className={styles.item}>
                <Select.ItemText>
                  <div className={styles.itemContent}>
                    <div className={cx(styles.box, styles.red)} />
                    Bug
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator>{checkIcon}</Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="feature" className={styles.item}>
                <Select.ItemText>
                  <div className={styles.itemContent}>
                    <div className={cx(styles.box, styles.green)} />
                    Feature
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator>{checkIcon}</Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="refactor" className={styles.item}>
                <Select.ItemText>
                  <div className={styles.itemContent}>
                    <div className={cx(styles.box, styles.pink)} />
                    Refactor
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator>{checkIcon}</Select.ItemIndicator>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <input
        className={styles.input}
        type="text"
        placeholder="Please write task description..."
        value={inputGroupValues?.text}
        onChange={(e) => handleInputGroupChange(e.target.value, "text")}
      />
    </div>
  );
};
export default TaskInput;
