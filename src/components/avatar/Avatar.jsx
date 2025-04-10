import { useEffect, useState } from 'react';
import supabase from '../../supabase/supabase-client';
import { Col, Container, Row } from 'react-bootstrap';
import styles from "../avatar/Avatar.module.css";

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            console.error('Error downloading image: ', error.message)
        }
    }

    const uploadAvatar = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(event, filePath)
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center text-center">
                <Col xs="auto">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            style={{ height: size, width: size }}
                            className={styles.avatarImage}
                        />
                    ) : (
                        <div
                            style={{ height: size, width: size }}
                            className={styles.noImage}
                        />
                    )}
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs="auto" className= {`mt-4 ${styles.inputWrapper}`}>
                    <input
                        type="file"
                        id="single"
                        accept="image/*"
                        onChange={uploadAvatar}
                        disabled={uploading}
                    />
                </Col>
            </Row>
        </Container>
    )
}