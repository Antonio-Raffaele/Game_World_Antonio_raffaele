import { useContext } from "react";
import { Button } from "react-bootstrap";
import FavoritesContext from "../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ToggleFavorite({ data }) {
    const {favorites, addFavorites, removeFavorite} = useContext(FavoritesContext);

    const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);


    return (
        <>
            {isFavorite() ? (
                <Button variant="danger" onClick={() => removeFavorite(data)}>
                    <FaHeart /> Rimuovi dai preferiti
                </Button>) : (
                <Button variant="outline-danger" onClick={() => addFavorites(data)}>
                    <FaRegHeart /> Aggiungi ai preferiti
                </Button>
            )}
        </>
    );
}
