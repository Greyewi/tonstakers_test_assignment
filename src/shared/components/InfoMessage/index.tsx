import {FC, memo, ReactNode} from "react";
import globalStyles from "@src/App.module.css";

const InfoMessage: FC<{ children: ReactNode, icon?: 'string' }> = memo(({ children, icon }) => {
  return <p className={globalStyles.component_wrapper}>
    {children}
    {icon && <img src={icon} alt="info"/>}
  </p>
})

export default InfoMessage