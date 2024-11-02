import {ChangeEvent, FC} from "react"
import {Input, Tooltip} from "antd"
import styles from "@features/staking/styles.module.css"
import {InfoCircleOutlined} from "@ant-design/icons"

interface InputFieldProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  prefix: string
  suffixTooltip: string
  disabled?: boolean
}

const InputField: FC<InputFieldProps> = ({ value, onChange, placeholder, suffixTooltip, disabled = false, prefix = 'TON' }) => (
  <Input
    className={styles.form_field}
    placeholder={placeholder}
    prefix={<span style={{ opacity: 0.5 }}>{prefix}</span>}
    type="number"
    min="0"
    value={value}
    onChange={onChange}
    suffix={
      <Tooltip title={suffixTooltip}>
        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
      </Tooltip>
    }
    disabled={disabled}
  />
)

export default InputField