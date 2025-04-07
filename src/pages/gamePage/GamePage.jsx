import { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import LazyLoadGameImage from "../../components/LazyLoadGameImage";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToogleFavorite";
import Chatbox from "../../components/Chatbox";

export default function GamePage() {
    const { id } = useParams();

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=ed7b95eb8af6434283c6c6f7dc948c58`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);


    useEffect(() => {
        updateUrl(initialUrl);
    }, [id]);

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
        <Container fluid className="mainContent text-white">
            <h1 className="text-center my-4">Pagina del titolo: {data && data.name}</h1>
            {error && <p className="text-danger">{error}</p>}

            <Row>
                <Col xs={12} sm={6} md={4} lg={4} className="mb-4">
                    <p><strong>Data di rilascio:</strong> {data && data.released}</p>
                    <h2>{data && data.name}</h2>
                    <p><strong>Rating:</strong> {data && data.rating}</p>
                    <p><strong>Descrizione:</strong></p>
                    <p>{data && data.description_raw}</p>
                </Col>

                <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
                    <LazyLoadGameImage image={data && data.background_image} />
                </Col>

                <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
                    <ToggleFavorite data={data} />
                </Col>

                <Col xs={12} sm={6} md={6} lg={3} className="mb-4">
                <Chatbox data={data && data} />
                </Col>
            </Row>
        </Container>
    );
}

