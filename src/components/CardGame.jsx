import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LazyLoadGameImage from './LazyLoadGameImage';
import { Link } from 'react-router';

export default function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(',');
    const { background_image: image } = game;

    return (
        <Card className='cardCustom'>
            <LazyLoadGameImage image={image} />
            <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                    {game.released}
                </Card.Text>
                <p>{genres}</p>
                <Button as={Link} to={`/games/${game.slug}/${game.id}`} className='btnCard' >
                Dettaglio gioco
                </Button>
            </Card.Body>
        </Card>
    );
}
