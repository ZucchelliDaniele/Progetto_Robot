Repository creata a fini di scopo scolastico 

### Questa repository è utilizzata soltanto per mantenere le routes e i server python necessari fino a quando la versione in sveltekit non sarà completa, attualmente l'unica versione con middleware funzionante è quella in Sveltekit
Conversione del sito in SvelteKit Repo: https://github.com/ZucchelliDaniele/Progetto_Robot_SvelteKit

# Progetto Robot
# Problema
L'uomo è impreciso/sbaglia/perde quando vengono trasportati tanti oggetti di piccole dimensioni, quando bisogna fare un lavoro preciso e continuo suguendo una linea precisa e quando bisogna fare movimenti precisi e veloci 
# Obbiettivo
Trasportare oggetti di varie dimensioni e peso da un punto preciso ad un altro, seguire/disegnare/mantenere oggetti seguendo una linea con precisione, fare movimenti precisi e rapidi
# Funzionalità
* ## Associazione
  ### Requisiti Funzionali:
* ###  Associazione tramite codice
Gli utenti hanno la possibilità di connettersi a un robot nella propria rete locale tramite un codice temporaneo
* ## Requisiti d'uso
  ### Requisiti Funzionali:
* ### Controllo da locale
Gli utenti hanno la possibilità di comandare il robot da locale tramite l'apposito schermo o connettendo un gamepad
* ### Controllo da remoto
Gli utenti hanno la possibilità di comandare il robot da remoto tramite un computer o un telefono connesso alla stessa rete e connettendo un gamepad al computer o al telefono connesso
  ### Requisiti Non Funzionali:
* ### Ampia Compatibilità:
Il sistema deve riconoscere un ampia gamma di dispositivi per facilitare l'utilizzo del robot
![Alt UML](https://yuml.me/diagram/usecase/[Visitor]-(Login),(Login)<(Contact%20Staff),[Visitor]-(Register),[Visitor]-(Buy%20Robot),(Buy%20Robot)>(Contact%20Staff),(Login)<(Reset%20Password),[Registered%20User]-(Add%20Robot),[Registered%20User]-(Remove%20Robot),(Add%20Robot)<(See%20Analytics),(Add%20Robot)<(Control%20Robot),[Registered%20User]-(Use%20Remote%20Connected%20Phone%20/%20PC),(Use%20Remote%20Connected%20Phone%20/%20PC)<(Use%20Gamepad),(Control%20Robot)<(Use%20Gamepad),[Office%20Staff]-(Add%20functionalities),)

# WBS
![Colorful Work Breakdown Structure](https://github.com/ZucchelliDaniele/Progetto_Robot/assets/101174771/f6201000-e07e-4f35-9d00-4ce9f19a9be0)


# Value Proposition
## Semplifica il tuo lavoro con RoboPi
### Lavoro preciso e facile
Semplifica i tuoi lavori tramite RoboPi, un robot automatizzato con interfaccia web utilizzabile da ogni dispositivo. Personalizza il tuo lavoro nel metodo più semplice tramite movimenti precisi e veloci. Controlla il tuo robot a distanza in tempo reale tramite 4 ruote motrici con gestione dei movimenti distinti che permettono movimenti in ogni direzione. Vivi il tuo lavoro vedendolo in tempo reale tramite la telecamera grandangolare ad alta qualità. Sfrutta il tuo robot anche al buio o in spazi ombreggiati tramite la visione notturna. 
### Caratteristiche
* Sistema Omnidirezionale
* Telecamera grandangolare ad alta risoluzione
* Visione Notturna
* Controllo da remoto da più dispositivi
* Sistema preciso con previsioni in tempo reale
# User stories
## Utente Generico 
* Come utente generico voglio poter connettermi al robot tramite un codice associato sullo schermo
## Utente Salvato/Connesso
* Come utente salvato/connesso voglio poter visualizzare l'interfaccia web del robot e poterlo utilizzare correttamente
* Come utente salvato/connesso voglio poter connettermi e sconnettermi ad altri robot presenti nella rete
## Controllo locale
* Come utente connesso tramite controllo locale voglio poter utilizzare il mio robot direttamente da esso con dispositivi di input annessi (gamepad, touchscreen) senza l'utilizzo di dispositivi esterni (smartphone, PC, ecc..)
## Controllo remoto
* Come utente connesso tramite controllo remoto voglio poter utilizzare il mio robot da distanza ed avere un'esperienza al più simile a quella del controllo locale, non saranno obbligatori dispositivi di input annessi al robot (gamepad, touchscreen), ma che siamo solamente facoltativi rispetto ai dispositivi esterni (smartphone o/e PC, ecc..)
## Visualizzazione spazio fisico
* Come utente connesso tramite controllo remoto e/o locale voglio poter visualizzare lo spazio fisico davanti al robot tramite una telecamera in qualsiasi condizione di luce (giorno e notte)
## Trasposto oggetti
* Come utente connesso in locale voglio poter trasportare degli oggetti adeguati tramite i dispositivi annessi al robot o esterni
## Staff 
* Come utente "staff" voglio poter aggiornare e migliorare il codice dei robot prodotti tramite la pubblicazione di nuove versioni su questo github

# Multi Tenancy
## Login / Register
* L'utente deve recarsi fisicamente al robot per aggiungere il proprio dispositivo tramite un codice univoco e casuale
* Ogni dispositivo si autentica automaticamente nel caso sia stato già registrato
* Ogni dispositivo viene rimosso dopo 7 giorni di inutilizzo del robot
* Ad ogni utilizzo viene aggiornata la lista degli utilizzi del robot
## Utilizzo
* Ogni utente ha la possibilità di comandare il robot a distanza, tuttavia se più utenti vogliono comandare lo stesso robot la richiesta di utilizzo verrà inviata all'utente che lo sta utilizzando in quel momento
* Ogni utente ha la possibilità di visualizzare i robot presenti all'interno della rete e accedervi ad essi tramite i passaggi precedentemente descritti
* Ogni utente ha la possibilità di visualizzare la telecamera presente sul robot e tener visivamente traccia dell'utilizzo
* L'utente che comanda il robot direttamente da esso e non mediante un altro dispositivo ha il controllo del robot e può rimuovere il controllo agl'altri utenti

# Come fare il tuo robot
## Setup del raspberry pi
* Prendi una scheda micro sd e installa raspberry pi Bullseye (64bit)
* Mettila nel tuo raspberry (consigliato il 4)
* Installa il raspberry ad un monitor touch (7 pollici nel mio caso)
* Installa la webcam nel raspberry (utilizzo la raspberry pi camera module 3 Noir-Wide)
* Attacca il raspberry ad un powerbank (consigliabili almeno 50W)
* Scarica questa repository
* Scarica i node modules
* Avvia il server web (consigliabile la modalità host)
* Avvia il server nodejs in backend
* Avvia i server python websocket e camera
## Modelli 3D
* ### [PowerBank](https://github.com/ZucchelliDaniele/Progetto_Robot/blob/b7cdaec23b4a2052f64a399bd6fec9496ad9d125/Robot3DModels/PowerBank.stl)
* ### [PiCase](https://github.com/ZucchelliDaniele/Progetto_Robot/blob/09322e6c2641f126dbb73ce9fab60052f773395a/Robot3DModels/PiCase.stl)
