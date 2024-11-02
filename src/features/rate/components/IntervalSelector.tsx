import { FC, memo } from 'react'
import { Select } from 'antd'
import type { SelectProps } from 'antd'

interface IntervalSelectorProps {
  value: number
  onChange: SelectProps<number>['onChange']
}

const IntervalSelector: FC<IntervalSelectorProps> = memo(
  ({ value, onChange }) => {
    return (
      <Select<number>
        style={{ width: 125 }}
        value={value}
        onChange={onChange}
        title='auto update interval'
        options={[
          {
            label: <span>update interval</span>,
            title: 'update interval',
            options: [
              { value: 30, label: '30 seconds' },
              { value: 60, label: '1 minute' },
              { value: 180, label: '3 minute' }
            ]
          }
        ]}
      />
    )
  }
)

export default IntervalSelector
