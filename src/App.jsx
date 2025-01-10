import { useEffect, useState } from "react";
import Entrate from "./components/Entrate";
import Navsuperiore from "./components/Navsuperiore";
import Uscite from "./components/Uscite";
import Modal from "./components/Modal";

function App() {
  const [entries, setEntries] = useState([]); // Gestisce le entrate/uscite
  const [openModal, setOpenModal] = useState(false); // Gestisce il modal
  const [sottraeUscite, setSottraeUscite] = useState(0); // Somma uscite
  const [sommaUscite, setSommaUscite] = useState(0); // Somma entrate

  useEffect(() => {
    // Fetch per le entrate/uscite dal database
    fetchEntries();
  }, []);

  useEffect(() => {
    // Calcola la somma delle uscite ogni volta che `entries` cambia
    const sottrae = entries
      .filter((entry) => entry.spesa < 0)
      .reduce((acc, entry) => acc + entry.spesa, 0);
    setSottraeUscite(sottrae);
  }, [entries]);

  useEffect(() => {
    // Calcola la somma delle entrate ogni volta che `entries` cambia
    const somma = entries
      .filter((entry) => entry.spesa > 0)
      .reduce((acc, entry) => acc + entry.spesa, 0);
    setSommaUscite(somma);
  }, [entries]);

  const fetchEntries = () => {
    // Fetch per prendere i dati dal database
    fetch("http://localhost:3000/lists")
      .then((res) => res.json())
      .then((lists) => {
        const formattedLists = lists.map((item) => {
          const spesaValue = item.spesa != null ? item.spesa.toString().replace("€", "").replace(",", ".") : "0"; //controllo per vedere se spesa è definito (dava errore perchè modificando un campo e mettendolo null si rompeva tutto)
          return {
            ...item,
            spesa: parseFloat(spesaValue),
          };
        });
        setEntries(formattedLists);
      })
      .catch((error) => console.error("Errore durante il fetch:", error));
  };

  const addEntry = (newEntry) => {
    // Aggiunge un nuovo elemento al database
    fetch("http://localhost:3000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then(() => {
        fetchEntries(); // Aggiorna la lista dopo l'aggiunta
        setOpenModal(false); // Chiudi il modal
      })
      .catch((error) => console.error("Errore durante l'aggiunta:", error));
  };

  const removeEntry = (id) => {
    // Rimuove un elemento dal database
    fetch(`http://localhost:3000/lists/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchEntries(); // Aggiorna la lista dopo la rimozione
        } else {
          console.error("Errore durante la rimozione:", res);
        }
      })
      .catch((error) => console.error("Errore durante la rimozione:", error));
  };

  const updateEntry = (id, updatedData) => {
    // Modifica un elemento nel database
    fetch(`http://localhost:3000/lists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (res.ok) {
          fetchEntries(); // Aggiorna la lista dopo la modifica
        } else {
          console.error("Errore durante la modifica:", res);
        }
      })
      .catch((error) => console.error("Errore durante la modifica:", error));
  };

  const uscite = entries.filter((entry) => entry.spesa < 0); // Filtra le uscite
  const entrate = entries.filter((entry) => entry.spesa >= 0); // Filtra le entrate

  return (
    <>
      <div>
        <Navsuperiore onOpenModal={() => setOpenModal(true)} />
      </div>
      <div className="flex flex-row justify-evenly scale-95">
        <Uscite entries={uscite} removeEntry={removeEntry} updateEntry={updateEntry} />
        <Entrate entries={entrate} removeEntry={removeEntry} updateEntry={updateEntry} />
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAddEntry={addEntry}
      />
      <div className="flex flex-row justify-evenly mt-5">
        <h1>Totale Uscite: <span className="text-red-600">{sottraeUscite.toFixed(2)}€</span> </h1>
        <h1>Totale Entrate: <span className="text-green-600">{sommaUscite.toFixed(2)}€</span></h1>
      </div>
    </>
  );
}

export default App;

