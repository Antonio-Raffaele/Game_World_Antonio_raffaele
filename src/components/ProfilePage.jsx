import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import FavoritesContext from "../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Col, Container, Row } from "react-bootstrap";


export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <Container className="py-4">
            <Row className="mb-3">
                <Col>
                    <h2>
                        Hey {session?.user.user_metadata.first_name} 👋
                    </h2>
                </Col>
            </Row>

            <Row>
                <Col>
                    <details className="dropdown">
                        <summary>Preferiti</summary>

                        {favorites.length === 0 ? (
                            <p className="mt-3">Non ci sono preferiti al momento...</p>
                        ) : (
                            <ul className="list-unstyled mt-3">
                                {favorites.map((game) => (
                                    <li
                                        key={game.id} className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                width={50}
                                                height={50}
                                                src={game.game_image}
                                                alt={game.game_name}
                                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                            <p className="mb-0">{game.game_name}</p>
                                        </div>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => removeFavorite(game.game_id)}
                                        >
                                            <FaTrashAlt />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </details>
                </Col>
            </Row>
        </Container>
    );
}