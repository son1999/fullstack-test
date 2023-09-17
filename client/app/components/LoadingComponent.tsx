import { Spin } from "antd"
import styles from '../page.module.css'

const LoadingComponent = () => {
    return (
        <div className={styles.centerSpinner}>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </div>
    )
}

export default LoadingComponent;