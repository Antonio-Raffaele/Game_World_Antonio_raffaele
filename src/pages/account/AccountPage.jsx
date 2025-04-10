import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/supabase-client";
import Avatar from "../../components/avatar/Avatar";
import ProfilePage from "../../components/ProfilePage";

export default function AccountPage() {
    const { session } = useContext(SessionContext);
    const user = session?.user;

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!user) return;

        let ignore = false;

        const getProfile = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("profiles")
                .select(`username, first_name, last_name, avatar_url`)
                .eq("id", user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }

                setLoading(false);
            }
        };

        getProfile();

        return () => {
            ignore = true;
        };
    }, [user]);

    const updateProfile = async (event) => {
        event.preventDefault();
        if (!user) return;

        setLoading(true);

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            setSuccessMessage("Profilo aggiornato con successo ✅");
            setUsername("");
            setFirstName("");
            setLastName("");
            setAvatarUrl(null);
            setTimeout(() => setSuccessMessage(""), 3000);
        }

        setLoading(false);
    };

    if (!user) return <p>Loading session...</p>;

    return (

        <Container className="mainContent py-4">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center text-md-start">Profile Settings</h2>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={5}>
                    {successMessage && (
                        <Alert variant="success" className="mt-2">
                            {successMessage}
                        </Alert>
                    )}

                    <Form onSubmit={updateProfile} noValidate>
                        <div className="text-center mb-4">
                            <Avatar
                                url={avatar_url}
                                size={150}
                                onUpload={(_, url) => {
                                    setAvatarUrl(url);
                                }}
                            />
                        </div>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={user.email} type="email" readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={first_name || ""}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                type="text"
                                value={last_name || ""}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={username || ""}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <div>
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? "Carico..." : "Modifica"}
                            </Button>
                        </div>
                    </Form>
                </Col>

                <Col xs={12} md={6} lg={5} className="mt-5 mt-md-0">
                    <ProfilePage />
                </Col>
            </Row>
        </Container>
    );
}