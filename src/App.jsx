import { useEffect, useState } from "react";
import Entrate from "./components/Entrate";
import Navsuperiore from "./components/Navsuperiore";
import Uscite from "./components/Uscite";
import Modal from "./components/Modal";

function App() {
  const [entries, setEntries] = useState([]); //gestisce le entrate
  const [openModal, setOpenModal] = useState(false); //gestisce il modal
  const [sottraeUscite, setSottraeUscite] = useState(0); //gestisce la somma delle uscite
  const [sommaUscite, setSommaUscite] = useState(0); //gestisce la somma delle entrate

  useEffect(() => { //fetch per le entrate
    fetchEntries();
  }, []);

  useEffect(() => {
    // Calcola la somma delle uscite ogni volta che entries cambia
    const sottrae = entries
      .filter((entry) => entry.spesa < 0) // Filtra solo le uscite
      .reduce((acc, entry) => acc + entry.spesa, 0); // Sottrae i valori, lo 0 indica il valore di partenza
    setSottraeUscite(sottrae);
  }, [entries]);

  useEffect(() => {
    // Calcola la somma delle entrate ogni volta che entries cambia
    const somma = entries
      .filter((entry) => entry.spesa > 0) // Filtra solo le entrate
      .reduce((acc, entry) => acc + entry.spesa, 0); // somma i valori
    setSommaUscite(somma);
  }, [entries]);

  const fetchEntries = () => { //fetch per prendere i dati dal database
    fetch("http://localhost:3000/lists")
      .then((res) => res.json())
      .then((lists) => {
        console.log("Fetched lists:", lists);
        const formattedLists = lists.map((item) => ({
          ...item,
          spesa: parseFloat(item.spesa.replace("€", "").replace(",", ".")), // Converte 'spesa' in numero
        }));
        setEntries(formattedLists);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const addEntry = (newEntry) => { //aggiunge un nuovo elemento al db
    console.log("Aggiungo nuova entrata: ", newEntry);
    fetch("http://localhost:3000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successo:", data);
        fetchEntries(); // Aggiorna la lista dopo l'aggiunta
        setOpenModal(false); // Chiudi il modal dopo l'aggiunta
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  };

  // Funzione per rimuovere una voce dalla lista
  const removeEntry = (id) => {
    console.log("Rimozione del parametro con l'id: ", id); // Log per capire se id è corretto (funziona)
    const updatedEntries = entries.filter(entry => entry.id !== id); //con filter rimuove l'oggetto
    setEntries(updatedEntries); // Aggiorna lo stato con la nuova lista

    // Chiamata per eliminare dal backend
    fetch(`http://localhost:3000/lists/${id}`, { //seleziona l'oggetto tramite id
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`L'oggetto con l' id ${id} è stato rimosso.`);
        } else {
          console.error("Errore durante la rimozione:", response);
        }
      })
      .catch((error) => {
        console.error("Errore durante la rimozione:", error);
      });
  };

  const uscite = entries.filter((entry) => entry.spesa < 0); //filtra se negativo manda alle uscite
  const entrate = entries.filter((entry) => entry.spesa >= 0); //filtra se positivo manda alle entrate

  return (
    <>
      <div>
        <Navsuperiore onOpenModal={() => setOpenModal(true)} />
      </div>
      <div className="flex flex-row justify-evenly">
        <Uscite entries={uscite} removeEntry={removeEntry} />
        <Entrate entries={entrate} removeEntry={removeEntry} />
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddEntry={addEntry}
      />
      <div className="flex flex-row justify-evenly mt-5">
        <h1>Totale Uscite: {sottraeUscite.toFixed(2)} €</h1>
        <h1>Totale: {sommaUscite.toFixed(2)} €</h1>
      </div>
    </>
  );
}

export default App;

