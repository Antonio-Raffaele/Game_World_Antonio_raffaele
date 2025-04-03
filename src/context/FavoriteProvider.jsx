import { useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext"
import FavoritesContext from "../context/FavoritesContext"


export default function FavoritesProvider({ children }) {

    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);


    const fetchFavorites = useCallback(async () => {
        if (!session?.user) return;
        const { data, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session?.user.id);
        if (error) {
            console.error("Errore", error.message);
        } else { setFavorites(data) };
    }, [session]);

    const isFavorite = (game) => favorites.find((el) => +el.game_id === game.id);

    const addFavorites = async (game) => {
        if (!session?.user) return;

        if (isFavorite(game)) {
            alert("Gioco già nei preferiti!");
            return;
        }

        const { data, error } = await supabase
            .from("favorites")
            .insert([
                {
                    user_id: session.user.id,
                    game_id: game.id,
                    game_name: game.name,
                    game_image: game.background_image,
                },
            ])
            .select();

        if (error) {
            alert("Errore durante l'inserimento nei preferiti");
        } else {
            setFavorites(data);
        }
    };

    const removeFavorite = async (gameId) => {

        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("game_id", gameId)
            .eq("user_id", session?.user.id)

        if (error) {
            alert("Errore durante la cancellazione");
        } else {
            setFavorites((prev) => prev.filter((el) => el.game_id !== gameId && el.user_id !== session?.user.id));
        }
    }

    useEffect(() => {
        if (session) {
            fetchFavorites()
        }
        const favorites = supabase
            .channel("favorites")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "favorites" },
                () => fetchFavorites()
            )
            .subscribe();

        return () => {
            if (favorites) {
                supabase.removeChannel(favorites);
            }
            favorites.unsubscribe();
        };
    }, [fetchFavorites, session]);

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites, addFavorites, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
} 
