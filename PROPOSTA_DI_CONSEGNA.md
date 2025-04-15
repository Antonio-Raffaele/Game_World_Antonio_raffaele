## Librerie

FRAMEWORK

1. React (19.0) - Per l'interfaccia utente;
2. React DOM (19.0) – Per il rendering nel DOM;
3. Vite (6.2) – Dev server e bundler ultra-veloce.

ROUTING

4. React Router (7.4) – Per gestire le rotte.

STILE

5. Bootstrap (5.3) –  Per gestire lo stile di layout e componenti;
6. React Bootstrap (2.10); 
7. React Icons (5.5) –  Per la raccolta di icone SVG;
8. @foxeian/react-read-more (1.1) – Per gestire il "mostra di più" delle descrizioni troppo lunghe;
9. React-lazy-load-image-component (1.6) – Per migliore la qualitá di visualizzazione delle immagini.

AUTENTICAZIONE

10. @supabase/supabase-js (2.49) – Punto di accesso al resto delle funzionalità di Supabase.

VALIDAZIONE

11. Zod (3.24) – Schema validation library per i form (registrazione, login, ecc.).

UTILITA'

12. Dayjs (1.11) – Per formattazione delle date.


## Descrizione

Game-World è un'applicazione web sviluppata con React e Vite.
Essa nasce per permettere agli utenti che ci navigano all'interno di esplorare giochi tramite l'integrazione con l'API di RAWG, filtrarli per genere, piattaforma e cercare titoli specifici. L'utente, una volta autenticato, può gestire un profilo personale dove apportare eventuali modifiche ai dati inseriti, alla lista dei giochi preferiti e prendere parte a una chat in tempo reale per ciascun gioco. L'autenticazione e la gestione dei dati di ogni utente sono gestite tramite Supabase.

## API

API dei giochi: https://api.rawg.io;

Il backend è gestito dai servizi di Supabase.

## Stile

Lo stile dell'applicazione è stato gestito attraverso l'utilizzo di React Boostrap CSS.
Alcuni componenti sono stati gestiti con l'utilizzo di classi bootstrap o con l'utilizzo di moduli CSS o CSS globale.

## Pagine

1. Homepage
 Visualizza una lista di giochi che hanno la possibilità di essere filtrati per genere, piattaforma e ricerca.
 Inoltre ogni card della lista ha un bottone con cui poter accedere alla pagina di dettaglio del gioco.

2. Pagina dettaglio prodotto
 Mostra le informazioni dettagliate sul gioco selezionato, con implementazione di una chat in tempo reale e di un bottone per eventuale aggiunta del gioco ai preferiti.

3. Pagina Ricerca
 Mostra risultati della ricerca di giochi per nome inserito dall'utente.

4. Pagina Genere
 Lista di giochi filtrati per genere specifico.

5. Pagina Piattaforme
Lista dei giochi filtrati per piattaforma specifica. 

6. Pagina Registrazione utente
 Form per la creazione di un account tramite email, password e dati personali (nome, cognome e username).

7. Pagina Login
 Form per l'accesso degli utenti registrati.

8. Pagina Account
 Pagina per la modifica profilo e la visualizzazione dei giochi preferiti.


## User Interactions

1. L'utente non autenticato può scrollare la lista dei giochi presenti in piattaforma;
2. L'utente non autenticato può filtrare i giochi per nome, categoria o piattaforma;
3. L'utente non autenticato può registrarsi al sito con email e password;
4. L'utente autenticato può creare una sua personale lista di giochi preferiti;
5. L'utente autenticato può accedere e modificare il proprio profilo;
6. L'utente autenticato può caricare un avatar;
7. L'utente autenticato può inviare messaggi in una realtime chat legata allo specifico gioco;
8. L'utente autenticato può accedere all'elenco dei propri giochi preferiti ed eventualmente eliminarli.

## Context

1. SessionContext
 Fornisce globalmente la sessione utente autenticata per gestire accesso e logout.

2. FavoritesContext
 Gestisce la lista di giochi favoriti dell'utente e ascolta aggiornamenti in tempo reale da Supabase.

## Deployment

[game-world-antonio-raffaele.vercel.app](https://game-world-antonio-raffaele.vercel.app/);




