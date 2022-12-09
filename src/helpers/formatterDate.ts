export const formatterDate = (date: number | undefined) => {
    const newDate = new Date();
    const options: any = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return newDate.toLocaleDateString('es-ES', options);
}
