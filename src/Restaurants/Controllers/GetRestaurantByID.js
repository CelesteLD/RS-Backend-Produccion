import { Restaurant } from "../Model/Restaurant.js";

// Get restaurant by id
export const GetRestaurantByID = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);

        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: "Restaurant not found" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving restaurant."
        });
    }
}

