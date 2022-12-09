import {IGastos} from "../interfaces";
import {FC} from "react";
import {Gasto} from "./Gasto";

interface Props {
    gastos: IGastos[];
    setGastoEditar: (gastoEditar: IGastos) => void;
    deleteGasto: (id: string | undefined) => void;
    filtro: string;
    gastosFiltrados: IGastos[];
}

export const ListadoGastos: FC<Props> = ({gastos, setGastoEditar, deleteGasto, filtro, gastosFiltrados}) => {
    return (
        <div className="contenedor listado-gastos">

            {
                filtro ? (
                    <>
                        <h2 className="animate__animated animate__fadeIn">
                            {gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoría'}
                        </h2>
                        {
                            gastosFiltrados.map((gasto) => (
                                <Gasto
                                    key={gasto.id}
                                    gasto={gasto}
                                    setGastoEditar={setGastoEditar}
                                    deleteGasto={deleteGasto}
                                />
                            ))
                        }
                    </>
                ) : (
                    <>
                        <h2 className="animate__animated animate__fadeIn">
                            {gastos.length ? 'Gastos' : 'No hay gastos aún'}
                        </h2>
                        {
                            gastos.map((gasto) => (
                                <Gasto
                                    key={gasto.id}
                                    gasto={gasto}
                                    setGastoEditar={setGastoEditar}
                                    deleteGasto={deleteGasto}
                                />
                            ))
                        }
                    </>
                )
            }
        </div>
    );
};
