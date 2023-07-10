import * as Select from "@radix-ui/react-select";
import styles from "./task-input.module.scss";
import Image from "next/image";
import { useMemo, useState } from "react";
import cx from "classnames";

const TaskInput = () => {
  const checkIcon = useMemo(
    () => <Image src="/icons/check.svg" width={20} height={20} alt="check" />,
    []
  );
  const [inputGroupValues, setInputGroupValues] = useState<{
    type: string | undefined;
    text: string;
  }>({
    type: undefined,
    text: "",
  });
  return (
    <div className={styles.container}>
      <Select.Root
        value={inputGroupValues.type}
        onValueChange={(value) =>
          setInputGroupValues((prev) => ({ ...prev, type: value }))
        }
      >
        <Select.Trigger
          className={cx(
            styles.trigger,
            inputGroupValues.type && styles.selected
          )}
          aria-label="Type"
        >
          <Select.Value placeholder="Type" />
          <Select.Icon className="SelectIcon">
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
            <Select.Viewport className="SelectViewport">
              <Select.Item value="bug" className={styles.item}>
                <Select.ItemText>
                  <div className={styles.itemContent}>
                    <div className={cx(styles.box, styles.red)} />
                    Bug
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  {checkIcon}
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="feature" className={styles.item}>
                <Select.ItemText>
                  <div className={styles.itemContent}>
                    <div className={cx(styles.box, styles.pink)} />
                    Feature
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  {checkIcon}
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item value="refactor" className={styles.item}>
                <Select.ItemText>
                  <div className={styles.itemContent}>
                    <div className={cx(styles.box, styles.green)} />
                    Refactor
                  </div>
                </Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  {checkIcon}
                </Select.ItemIndicator>
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
        onChange={(e) =>
          setInputGroupValues((prev) => ({ ...prev, text: e.target.value }))
        }
      />
    </div>
  );
};
export default TaskInput;
