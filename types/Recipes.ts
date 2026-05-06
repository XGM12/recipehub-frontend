import { RecipeIngredient } from "./RecipeIngredient";
import { Step } from "./Step";
import { User } from "./User";

export interface Recipe {
	id:                number;
	name:              string;
	imageUrl:          string;
	prepTimeMinutes:   number;
	category:          string;
	createdAt:         Date;
	createdBy:         number | null;
	recipeIngredients: RecipeIngredient[];
	user:              User[];
	steps:             Step[];
}
