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
      .filter((entry) => entry.spesa > 0) // Filtra solo le uscite
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
          spesa: parseFloat(item.spesa.replace("€", "").replace(",", ".")),
        }));
        setEntries(formattedLists);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const addEntry = (newEntry) => { //aggiunge un nuovo elemento al db
    console.log("Adding new entry:", newEntry);
    fetch("http://localhost:3000/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchEntries(); // Aggiorna la lista dopo l'aggiunta
        setOpenModal(false); // Chiudi il modal dopo l'aggiunta
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const uscite = entries.filter((entry) => entry.spesa < 0); //filtra se negativo manda alle uscite
  const entrate = entries.filter((entry) => entry.spesa >= 0); //filtra se positivo manda alle entrate

  return (
    <>
      <div>
        <Navsuperiore onOpenModal={() => setOpenModal(true)} />
      </div>
      <div className="flex flex-row justify-evenly ">
        <Uscite entries={uscite} />
        <Entrate entries={entrate} />
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
