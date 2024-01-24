
import styles from "../style/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { User } from '../Model/types';

interface ModalProps {
    isOpen: boolean;
    user: User;
    onClose: () => void;

}


const  UserModal = ({ user, onClose }:ModalProps) => {

    //const [issOpen, setIssOpen ] = useState(isOpen);
    return (
        <>
        <div className={styles.darkBG} onClick={() => onclick=(onClose)} />
        <div className={styles.centered}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                <h5 className={styles.heading}>{`${user.firstName} ${user.lastName}`}</h5>
                </div>
                <button className={styles.closeBtn} onClick={() => onClose()}>
                <RiCloseLine style={{ marginBottom: "-3px" }} />
                </button>
                <div className={styles.modalContent}>
                    <picture className={styles.modal_content_img}>
                        <source srcSet={user.image} type="image/webp" />
                        <img  className={styles.modalPicture} src={user.image} alt={`Foto de ${user.lastName}`} />
                    </picture>

                    <article className={styles.modal_user_date}>
                        <h1>{`Email: ${user.email} | Telefono: ${user.phone}`}</h1>
                        <h1>{`Cedula: ${user.bank.cardNumber}`}</h1>
                        <h1>{`Compañia: ${user.company.name}`}</h1>
                        <h1>{`Departamento: ${user.company.department}`}</h1>
                        <h1>{`Titulo: ${user.company.title}`}</h1>
                        <h1>{`Adress: ${user.address.city}, ${user.address.address}, ${user.address.state}, ${user.address.postalCode}, ${user.address.address}`}</h1>
                    </article>
                    
                    
                </div>
                {/* <div className={styles.modalActions}>
                <div className={styles.actionsContainer}>
                    <button className={styles.deleteBtn} onClick={() => alert(user.id)}>
                    Delete
                    </button>
                    <button
                    className={styles.cancelBtn}
                    onClick={() => onclick=(onClose)}
                    >
                    Cancel
                    </button>
                </div>
                </div> */}
            </div>
            </div>
        </>
    )
}

export default UserModal
