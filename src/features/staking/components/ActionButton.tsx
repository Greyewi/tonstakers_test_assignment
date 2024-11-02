import {Button} from 'antd'
import styles from '../styles.module.css'
import {FC, memo} from "react"
interface ActionButtonProps {
  onClick: () => void
  text: string
  disabled?: boolean
}

const ActionButton: FC<ActionButtonProps> = memo(({ onClick, text, disabled = false }) => (
  <Button onClick={onClick} className={styles.form_field} disabled={disabled}>
    {text}
  </Button>
))

export default ActionButton