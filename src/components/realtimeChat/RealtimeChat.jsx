import { useCallback, useEffect, useRef, useState } from "react";
import supabase from "../../supabase/supabase-client";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "../realtimeChat/RealtimeChat.module.css";


dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", data?.id);
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id]);

    useEffect(() => {
        if (data) {
            getInitialMessages();
        }
        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [data, getInitialMessages]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    if (loadingInitial) {
        return (
            <Container fluid className="mainContent text-center">
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
        <div className={styles.chatContainer} ref={messageRef}>
            {error && <p>{error}</p>}
            {messages &&
                messages.map((message) => (
                    <Card key={message.id}>
                        <Card.Body>
                            <Card.Title className="text-info">{message.profile_username}</Card.Title>
                            <Card.Text>
                                {message.content}
                            </Card.Text>
                            <small>{dayjs().to(dayjs(message.created_at))}</small>
                        </Card.Body>
                    </Card>
                ))}
        </div>
    )
}