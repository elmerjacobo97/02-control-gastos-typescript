import {FC} from "react";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import {IGastos} from "../interfaces";
import {formatMoney, formatterDate} from "../helpers";

import IconoAhorro from '../assets/img/icono_ahorro.svg';
import IconoCasa from '../assets/img/icono_casa.svg';
import IconoComida from '../assets/img/icono_comida.svg';
import IconoGastos from '../assets/img/icono_gastos.svg';
import IconoOcio from '../assets/img/icono_ocio.svg';
import IconoSalud from '../assets/img/icono_salud.svg';
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg';

const diccionarioIconos: any = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
}

interface Props {
    gasto: IGastos;
    setGastoEditar: (gastoEditar: IGastos) => void;
    deleteGasto: (id: string | undefined) => void;
}

export const Gasto: FC<Props> = ({gasto, setGastoEditar, deleteGasto}) => {
    const {id, nombre, cantidad, category, date} = gasto;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={()=> deleteGasto(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra animate__animated animate__fadeIn">
                    <div className="contenido-gasto">
                        <img
                            src={diccionarioIconos[category]}

                            alt=""
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{category}</p>
                            <p className="nombre-gasto">{nombre}</p>
                            <p className="fecha-gasto">
                                Agregado el: {''}
                                <span>{formatterDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">{formatMoney(cantidad)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};
