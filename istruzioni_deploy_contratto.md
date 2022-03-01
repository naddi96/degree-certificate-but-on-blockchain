## Istruzioni per il deploy del contratto su Blockchain di test Ropsten

### installazione delle dipendenze

Per prima cosa posizionarsi nella cartella `cd ./smartcontract/degreeblock`

installare truffle  `npm install -g truffle`

Eseguire il comando `npm install` per installare tutte le dipendenze


### Configurazione dell deploy

1. Aprire il file `truffle-config.js` 
2. modificare la variabile MNEMONIC con il propria chiave privata
3. modificare la variabile ETH_NODE con il propio nodo Ethereum (nel mio caso userò i nodi Ethereum messi a disposizione da  [infura](https://infura.io/) )

### Deploy del contratto  

1. eseguire il comando `truffle deploy --network ropsten`
2. copiare l'interfaccia del contratto nel frontend `cp cp -r ./build/contracs/  ../../frontend/degree-block/src/`

