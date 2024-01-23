import { type User } from "../types.d";
import "../style/UserCard.css";

interface Props {
    user: User;
}

export function UserCard({ user }: Props) {
    return (
        <>
            {
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="our-team">
                                <div className="picture">
                                    <img className="img-fluid" src={user.image} />
                                </div>

                                <div className="team-content">
                                    <h3 className="name">{`${user.firstName} ${user.lastName}`}</h3>
                                    <h4 className="title">{user.email}</h4>
                                    <h4 className="title">{user.phone}</h4>
                                    <h4 className="departament">{`${user.company.department}`}</h4>
                                </div>

                                <ul className="social">
                                    <li>
                                        <a
                                            href="https://codepen.io/collection/XdWJOQ/"
                                            className="fa fa-facebook"
                                            aria-hidden="true"
                                        />
                                    </li>
                                    <li>
                                        <a
                                            href="https://codepen.io/collection/XdWJOQ/"
                                            className="fa fa-twitter"
                                            aria-hidden="true"
                                        />
                                    </li>
                                    <li>
                                        <a
                                            href="https://codepen.io/collection/XdWJOQ/"
                                            className="fa fa-google-plus"
                                            aria-hidden="true"
                                        />
                                    </li>
                                    <li>
                                        <a
                                            href="https://codepen.io/collection/XdWJOQ/"
                                            className="fa fa-linkedin"
                                            aria-hidden="true"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
