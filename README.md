# Progetto Robot
# Problema
L'uomo è impreciso/sbaglia/perde quando vengono trasportati tanti oggetti di piccole dimensioni, quando bisogna fare un lavoro preciso e continuo suguendo una linea precisa e quando bisogna fare movimenti precisi e veloci 
# Obbiettivo
Trasportare oggetti di varie dimensioni e peso da un punto preciso ad un altro, seguire/disegnare/mantenere oggetti seguendo una linea con precisione, fare movimenti precisi e rapidi
# Funzionalità
* ## Requisiti di autenticazione
### Requisiti Funzionali:
* ### Registrazione
Gli utenti devono fornire i dati necessari per la registrazione di un nuovo account (email, password, nome)
* ### Login
Gli utenti registrati devono poter effettuare l'accesso per utilizzare/aggiungere un robot
### Requisiti Non Funzionali:
* ### Recupero Account:
Gli utenti hanno la possibilità di recuperare le credenziali (password) tramite l'indirizzo email
* ## Requisiti d'uso
  ### Requisiti Funzionali:
* ### Controllo da locale
Gli utenti hanno la possibilità di comandare il robot da locale tramite l'apposito schermo o connettendo un gamepad
* ### Controllo da remoto
Gli utenti hanno la possibilità di comandare il robot da remoto tramite un computer o un telefono connesso alla stessa rete e connettendo un gamepad al computer o al telefono connesso
  ### Requisiti Non Funzionali:
* ### Ampia Compatibilità:
Il sistema deve riconoscere un ampia gamma di dispositivi per facilitare l'utilizzo del robot
* ## Requisiti di Sistema
  ### Requisiti Funzionali:
* ### Rilevanento di Ostacoli
* Il robot deve rilevare gli ostacoli/muri
* ### Inseguimento di linee a terra
* Il robot dovrà seguire una o piu linee a terra di un colore specifico dettato dal sistema/utente
  ### Requisiti Non Funzionali:
* ### Presa di oggetti
* Il robot deve avere un gancio per la presa di oggetti (gancio manuale o non)
![Alt UML](https://yuml.me/diagram/usecase/[Visitor]-(Login),(Login)<(Contact%20Staff),[Visitor]-(Register),[Visitor]-(Buy%20Robot),(Buy%20Robot)>(Contact%20Staff),(Login)<(Reset%20Password),[Registered%20User]-(Add%20Robot),[Registered%20User]-(Remove%20Robot),(Add%20Robot)<(See%20Analytics),(Add%20Robot)<(Control%20Robot),[Registered%20User]-(Use%20Remote%20Connected%20Phone%20/%20PC),(Use%20Remote%20Connected%20Phone%20/%20PC)<(Use%20Gamepad),(Control%20Robot)<(Use%20Gamepad),[Office%20Staff]-(Add%20functionalities),)
