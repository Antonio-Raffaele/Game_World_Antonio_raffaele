import { useEffect } from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import styles from "../platformPage/PlatformPage.module.css";

export default function PlatformPage() {
    const { platformId } = useParams();
    const url = `https://api.rawg.io/api/games?key=ed7b95eb8af6434283c6c6f7dc948c58&platforms=${platformId}&page=1`;
    
    
    const { data, loading, error, updateUrl } = useFetchSolution(url);

    useEffect(() => {
        updateUrl(url);
    }, [platformId]);


    if (loading) {
        return (
            <Container fluid className="mainContent mt-5 text-center">
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Sto caricando i dati</span>
                        </Spinner>
                        <p className="mt-3">Sto caricando i dati...</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid className="mainContent py-4">
            <Row className="mb-4">
                <Col>
                    <h1 className={`text-center ${styles.platformTitle}`}>Giochi per piattaforma ID: {platformId}</h1>
                    {error && <p className="text-danger text-center">{error}</p>}
                </Col>
            </Row>

            <Row className="justify-content-center">
                {data && data.results.map((game) => (
                    <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                        <CardGame game={game} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}