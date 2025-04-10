import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import RealtimeChat from "./realtimeChat/RealtimeChat";

export default function Chatbox({data}){

    const {session} = useContext(SessionContext);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const {message} = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === "string" && message.trim().length !== 0) {
            const {error} = await supabase
            .from("messages")
            .insert([
                {
                    profile_id: session?.user.id,
                    profile_username: session?.user.user_metadata.username,
                    game_id: data.id,
                    content: message
                }
            ])
            .select()
            if (error) {
                console.error(error);
                
            } else {
                inputMessage.reset();
            }
        }
    }

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <h4 className="text-center">Gamers Chat</h4>
                </Col>
            </Row>

            <Row className="justify-content-center mb-4">
                <Col xs={12} md={10} lg={8}>
                    <div className="p-1 rounded bg-light">
                        <RealtimeChat data={data} />
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Form className="mt-3" onSubmit={handleMessageSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="message"
                                placeholder="Inserisci messaggio"
                                autoComplete="off"
                            />
                        </Form.Group>
                        <div>
                            <Button variant="primary" type="submit">
                                Invia
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}