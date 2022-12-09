import {FC, useEffect, useState} from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {formatMoney} from "../helpers";
import {IGastos} from "../interfaces";
import Swal from "sweetalert2";

interface Props {
    presupuesto: number;
    gastos: IGastos[];
    setPresupuesto: (presupuesto: number) => void;
    setGastos: (gastos: IGastos[]) => void;
    setIsValidPresupuesto: (isValidPresupuesto: boolean) => void;
}
export const ControlPresupuesto: FC<Props> = ({presupuesto, gastos, setPresupuesto, setGastos, setIsValidPresupuesto}) => {
    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);


    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        // Calcular el porcentaje gastado
        const newPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(Number(newPorcentaje));
        }, 1000)
    }, [gastos])

    const handleResetApp = () => {
        Swal.fire({
            title: '',
            text: "¿Deseas reiniciar presupuesto y gastos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5147e4',
            cancelButtonColor: '#db2827',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                setGastos([]);
                setPresupuesto(0);
                setIsValidPresupuesto(false);
                Swal.fire(
                    '',
                    'App reiniciada correctamente',
                    'success'
                )
            }
        })
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas animate__animated animate__fadeIn">
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? "#FF2442" : "#5C7AEA",
                        trailColor: "#E6E6E6",
                        textColor: porcentaje > 100 ? "#FF2442" : "#5C7AEA",
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto:</span> {formatMoney(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {formatMoney(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatMoney(gastado)}
                </p>
            </div>
        </div>
    );
};
