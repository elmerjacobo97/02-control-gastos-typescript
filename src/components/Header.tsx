import {ControlPresupuesto, NewPresupuesto} from "./";
import {FC} from "react";
import {IGastos} from "../interfaces";

interface Props {
    presupuesto: number;
    setPresupuesto: (presupuesto: number) => void;
    isValidPresupuesto: boolean;
    setIsValidPresupuesto: (isValidPresupuesto: boolean) => void;
    gastos: IGastos[];
    setGastos: (gastos: IGastos[]) => void;
}

export const Header: FC<Props> = ({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {
                isValidPresupuesto ? (
                    <ControlPresupuesto
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        gastos={gastos}
                        setGastos={setGastos}
                        setIsValidPresupuesto={setIsValidPresupuesto}
                    />
                ) : (
                    <NewPresupuesto
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setIsValidPresupuesto={setIsValidPresupuesto}
                    />
                )
            }
        </header>
    );
};
