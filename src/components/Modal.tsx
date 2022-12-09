import {FC, FormEvent, useEffect, useState} from "react";
import Swal from "sweetalert2";
import {IGastos} from "../interfaces";
import CerrarModal from '../assets/img/cerrar.svg';

interface Props  {
    setModal: (modal: boolean) => void;
    animarModal: boolean;
    setAnimarModal: (animarModal: boolean) => void;
    saveGasto: (gasto: IGastos) => void;
    gastoEditar: IGastos;
    setGastoEditar: (gastoEditar: IGastos) => void
}

export const Modal: FC<Props> = ({setModal, animarModal, setAnimarModal, saveGasto, gastoEditar, setGastoEditar}) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [category, setCategory] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        // Si tiene algo id, entonces editamos
        if (gastoEditar.id?.length) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategory(gastoEditar.category);
            setId(gastoEditar.id);
        }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({id: "", cantidad: 0, category: "", date: 0, nombre: ""});
        setTimeout(() => {
            setModal(false);
        }, 300)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if ([nombre, cantidad, category].includes('')) {
            Swal.fire({
                title: '',
                text: "Llena todos los campos",
                icon: 'warning',
                confirmButtonColor: '#5147e4',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        if (cantidad === 0) {
            Swal.fire({
                title: '',
                text: 'Cantidad no válida',
                icon: 'warning',
                confirmButtonColor: '#5147e4',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        const gasto = {
            nombre,
            cantidad,
            category,
            id,
        }

        saveGasto(gasto);
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarModal}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            >
                <legend>{gastoEditar.id?.length ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto"
                        value={cantidad}
                        onChange={(event) => setCantidad(Number(event.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="category">Categoría</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" value={gastoEditar.id?.length ? 'Guardar Cambios' : 'Añadir Gasto'} />
            </form>
        </div>
    );
};
