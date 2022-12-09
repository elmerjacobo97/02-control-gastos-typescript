import {useEffect, useState} from "react";
import {Header, Modal, ListadoGastos, Filtros} from "./components";
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg';
import {IGastos} from "./interfaces";
import {generateId} from "./helpers";

function App() {
    const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) || 0);
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [gastos, setGastos] = useState<IGastos[]>(
        localStorage.getItem('gastos')
            ? JSON.parse(localStorage.getItem('gastos')!)
            : []
    );
    const [gastoEditar, setGastoEditar] = useState<IGastos>({
        id: "",
        cantidad: 0,
        category: "",
        date: 0,
        nombre: ""
    });
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState<IGastos[]>([]);

    useEffect(() => {
        // Si tiene algo id, entonces editamos
        if (gastoEditar.id?.length) {
            setModal(true);

            setTimeout(() => {
                setAnimarModal(true);
            }, 300)
        }
    }, [gastoEditar])

    const handleNewGasto = () => {
        setModal(true);
        setGastoEditar({id: "", cantidad: 0, category: "", date: 0, nombre: ""});

        setTimeout(() => {
            setAnimarModal(true);
        }, 300)
    }

    // Guardar gasto
    const saveGasto = (gasto: IGastos) => {
        // console.log(gasto.id);
        if (gasto.id) {
            // Actualizar
            const gastosActualizados = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState);
            setGastos(gastosActualizados);
            setGastoEditar({cantidad: 0, category: "", date: 0, id: "", nombre: ""})

        } else {
            // Nuevo gasto
            gasto.id = generateId();
            gasto.date = Date.now();
            setGastos([...gastos, gasto]);
        }

        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 300)
    }

    // Eliminar gasto
    const deleteGasto = (id: string | undefined) => {
        const gastosActualizados = gastos.filter((gastoState) =>gastoState.id !== id);
        setGastos(gastosActualizados);
    }

    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto.toString());
    }, [presupuesto])

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }, [gastos])

    useEffect(() => {
        // Filtrar gastos por categoría
        const gastosFiltrados = gastos.filter((gasto) => gasto.category === filtro);
        setGastosFiltrados(gastosFiltrados)
    }, [filtro])

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto') || 0);
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true);
        }
    }, [])

    return (
       <div className={modal ? "fijar" : undefined}>
           <Header
               presupuesto={presupuesto}
               setPresupuesto={setPresupuesto}
               isValidPresupuesto={isValidPresupuesto}
               setIsValidPresupuesto={setIsValidPresupuesto}
               gastos={gastos}
               setGastos={setGastos}
           />

           {
               isValidPresupuesto && (
                   <>
                       <main>
                           <Filtros
                               filtro={filtro}
                               setFiltro={setFiltro}
                           />

                           <ListadoGastos
                               gastos={gastos}
                               setGastoEditar={setGastoEditar}
                               deleteGasto={deleteGasto}
                               filtro={filtro}
                               gastosFiltrados={gastosFiltrados}
                           />
                       </main>
                       <div className="nuevo-gasto">
                           <img
                               src={IconoNuevoGasto}
                               alt="icono nuevo gasto"
                               onClick={handleNewGasto}
                           />
                       </div>
                   </>
               )
           }

           {
               modal && (
                  <Modal
                      setModal={setModal}
                      animarModal={animarModal}
                      setAnimarModal={setAnimarModal}
                      saveGasto={saveGasto}
                      gastoEditar={gastoEditar}
                      setGastoEditar={setGastoEditar}
                  />
               )
           }
       </div>
    )
}

export default App;
