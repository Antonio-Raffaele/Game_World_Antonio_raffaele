import { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import LazyLoadGameImage from "../../components/LazyLoadGameImage";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToogleFavorite";
import Chatbox from "../../components/Chatbox";
import ReadMoreArea from "@foxeian/react-read-more";

export default function GamePage() {
    const { id } = useParams();

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=ed7b95eb8af6434283c6c6f7dc948c58`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);


    useEffect(() => {
        updateUrl(initialUrl);
    }, [id]);

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
        <Container fluid className="mainContent text-white py-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Pagina del titolo: {data && data.name}</h1>
                    {error && <p className="text-danger text-center">{error}</p>}
                </Col>
            </Row>

            <Row className="gy-4">
                <Col xs={12} md={6} lg={6}>
                    <h2>{data && data.name}</h2>
                    <p><strong>Data di rilascio:</strong> {data && data.released}</p>
                    <p><strong>Rating:</strong> {data && data.rating}</p>
                    <p><strong>Descrizione:</strong></p>
                    <ReadMoreArea
                        lettersLimit={500}
                        expandLabel="Leggi di più"
                        collapseLabel="Leggi di meno"
                    >
                        {data && data.description_raw}
                    </ReadMoreArea>
                </Col>

                <Col xs={12} md={6} lg={6}>
                    <Row className="gy-4">
                        <Col xs={12}>
                            <LazyLoadGameImage image={data && data.background_image} />
                        </Col>
                        <Col xs={12}>
                            <ToggleFavorite data={data} />
                        </Col>
                        <Col xs={12}>
                            <Chatbox data={data} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

