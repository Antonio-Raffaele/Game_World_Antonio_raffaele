import { useEffect } from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";

export default function GenrePage() {
    const { genre } = useParams();
    
    const initialUrl = `https://api.rawg.io/api/games?key=ed7b95eb8af6434283c6c6f7dc948c58&genres=${genre}&page=1`;

    
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    
    useEffect(() => {
        updateUrl(initialUrl);
    }, [genre]);

    if (loading) {
        return (
            <div className="container text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Sto caricando i dati</span>
                </Spinner>               
            </div>
        );
    }

    return (
        <Container fluid className="mainContent">
            <h1 className="text-center my-4">Pagina dei titoli: {genre}</h1>
            {error && <p className="text-danger">{error}</p>}

            <Row>
                {data && data.results.map((game) => (
                    <Col key={game.id} xs={12} sm={6} md={6} lg={4} className="mb-4">
                        <CardGame game={game} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}