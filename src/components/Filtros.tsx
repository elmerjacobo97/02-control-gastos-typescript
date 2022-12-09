import {FC} from "react";

interface Props {
    filtro: string;
    setFiltro: (filtro: string) => void;
}

export const Filtros: FC<Props> = ({filtro, setFiltro}) => {
    return (
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">
                    <label htmlFor="category">Filtras Gastos</label>
                    <select
                        id="category"
                        value={filtro}
                        onChange={(event) => setFiltro(event.target.value)}
                    >
                        <option value="">--Todas las categorías--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    );
};
