import { RegistroRecogida } from "../Model/RegistroRecogida.js";


export const GetAllRegistrosRecogida = async (req, res) => {
    try {
        const registrosRecogida = await RegistroRecogida.findAll();
        res.json(registrosRecogida);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving RegistrosRecogida."
        });
    }
}
