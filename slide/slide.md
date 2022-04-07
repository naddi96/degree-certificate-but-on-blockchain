---
marp: true
---

# degre certificate but on blockhcain

Proof of concept di come uno Smartcontract interagisce con il web per gestire certificati rilasciati da una commissione

---

# Requisiti 

- Creazione di certificati Da parte del Coordinatore
- Firma dei certificati da parte della commissione
- visualizzazione dei certificati 

---

![](2022-04-05-14-51-28.png)

---

# Smart contract

![](2022-03-26-14-25-12.png)

---

# smart contract 
- raccolta di funzioni e dati (il suo stato) che  se istanziato risiede a un indirizzo specifico sulla blockchain
- le funzioni implementate possono
    - vedere lo stato
    - modificare lo stato
    - applicare anche restrizioni a chi può modificare lo stato del contratto.



---

# Due contratti

- **CreateDegree**  viene istanziato quando viene fatto il deploy sulla blockchain 

- **DegreeBlock** viene istanziato da **CreateDegree** quando si crea un nuovo certificato

![](2022-03-26-14-52-00.png)

---

# Frontend

![width:480](2022-03-26-14-40-34.png)
 
---

# Struttura 

![](2022-04-05-15-15-14.png)

---

# Deploy 

![](2022-04-05-15-49-36.png)



---


# [Prova Live ](https://naddi96.github.io/degree-certificate-but-on-blockchain/)


