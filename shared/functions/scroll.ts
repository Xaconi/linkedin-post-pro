export const scrollIntoId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}