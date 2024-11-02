import { Input, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import styles from '../styles.module.css'
import {ChangeEvent, FC} from "react"
interface StakeInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  tooltipTitle: string;
}

const StakeInput: FC<StakeInputProps> = ({ value, onChange, placeholder, tooltipTitle }) => (
  <Input
    className={styles.form_field}
    placeholder={placeholder}
    prefix={<span style={{ opacity: 0.5 }}>TON</span>}
    type="number"
    min="0"
    value={value}
    onChange={onChange}
    suffix={
      <Tooltip title={tooltipTitle}>
        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
      </Tooltip>
    }
  />
)

export default StakeInput