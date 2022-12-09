import {FC, FormEvent} from "react";
import Swal from 'sweetalert2';

interface Props {
    presupuesto: number;
    setPresupuesto: (presupuesto: number) => void;
    setIsValidPresupuesto: (isValidPresupuesto: boolean) => void;

}

export const NewPresupuesto: FC<Props> = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {
    const handlePresupuesto = (event: FormEvent) => {
        event.preventDefault();

        // Validación
        if (!presupuesto || presupuesto < 0) {
            Swal.fire({
                title: '',
                text: "Presupuesto no válido",
                icon: 'warning',
                confirmButtonColor: '#5147e4',
                confirmButtonText: 'Aceptar'
            })
            return;
        }

        setIsValidPresupuesto(true);
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra animate__animated animate__fadeIn">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label htmlFor="">Definir Presupuesto</label>
                    <input
                        type="number"
                        className="nuevo-presupuesto"
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        onChange={(event) => setPresupuesto(Number(event.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir"/>
            </form>
        </div>
    );
};
