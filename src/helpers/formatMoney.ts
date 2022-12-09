export const formatMoney = (cantidad: number) => {
    return cantidad.toLocaleString('es-PE', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: 'PEN'
    })
}
