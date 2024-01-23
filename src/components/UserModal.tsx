import {useState} from 'react'
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { User } from '../Model/types';

interface ModalProps {
    setIsOpen: boolean;
    user: User;

}

const  UserModal = ({ setIsOpen, user }:ModalProps) => {
    const [issOpen, setIssOpen ] = useState(false);
    return (
        <>
        <div className={styles.darkBG} onClick={() => setIssOpen(true)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                <h5 className={styles.heading}>{`${user.firstName} ${user.lastName}`}</h5>
                </div>
                <button className={styles.closeBtn} onClick={() => setIssOpen(false)}>
                <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <div className={styles.modalContent}>
                        <img src={user.image} alt={`Foto de${user.lastName}`} />
                    {JSON.stringify(user)}
                </div>
                <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                    <button className={styles.deleteBtn} onClick={() => setIssOpen(false)}>
                    Delete
                    </button>
                    <button
                    className={styles.cancelBtn}
                    onClick={() => setIssOpen(false)}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default UserModal
