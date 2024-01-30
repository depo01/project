import { User } from '../Model/types';
// import '../style/UserCard.css';
import "../style/UserCard.styl"
import UserModal from './UserModal';
import { useState } from 'react';
import { BiSolidUserDetail } from 'react-icons/bi';

interface Props {
    user: User;
}

export function UserCard({ user }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="c-our__team">
                            <div className="c-our__picture">
                                <img className="img-fluid" src={user.image} alt={`Foto de ${user.lastName}`} />
                            </div>

                            <div className="c-team__content">
                                <h3 className="name">{`${user.firstName} ${user.lastName}`}</h3>
                                <h4 className="title">{user.email}</h4>
                                <h4 className="title">{user.phone}</h4>
                                <h4 className="departament">{`${user.company.department}`}</h4>
                            </div>

                            <ul className="social">
                                <li>
                                    
                                    <BiSolidUserDetail
                                        className="c-out__b"
                                        onClick={handleOpenModal}
                                        size={20}
                                    />
                                </li>
                                {/* Otros elementos sociales aquí */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <UserModal isOpen={isOpen} user={user} onClose={handleCloseModal} />}
        </>
    );
}