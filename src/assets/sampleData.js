import { uniqueId } from "../utils/uniqueId";
export const sampleData = {
  [uniqueId()]: {
    name: "white_russian",
    rating: 4.5,
    ingredients: ["heavy cream", "vodka", "coffee liqueur"],
    tags: ["cocktail", "evening", "drinks", "creamy"],
    description: "The big dude",
    uri:
      "https://www.liquor.com/thmb/F4UibVQr8U9E7Y2AkCag0njUC-E=/720x540/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__liquor__2017__12__20073201__white-russian-720x720-article-cbe4b9a832c64f8da0bb09407caefa7f.jpg",
  },
  [uniqueId()]: {
    name: "old_fashioned",
    rating: 4.7,
    ingredients: ["rye", "bourbon", "angostura bitters", "orange twist"],
    tags: ["cocktail", "evening", "drinks", "citrus"],
    description: "Sour good time",
    uri:
      "https://www.liquor.com/thmb/lavmUGaMMriZPSxfHsPnyK15bSY=/720x720/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__05__08113350__bourbon-old-fashioned-720x720-recipe-ade6f7780c304999be3577e565c9bcdd.jpg",
  },
  [uniqueId()]: {
    name: "whiskey_sour",
    rating: 5,
    ingredients: ["whiskey", "lemon juice", "sugar"],
    tags: ["fast", "cocktail", "evening", "citrus", "drinks"],
    description: "Current fav",
    uri: "https://blue-kitchen.com/wp-content/uploads/2017/05/whiskey-sour.jpg",
  },
  [uniqueId()]: {
    name: "chocolate_cake",
    rating: 4.3,
    ingredients: ["egg", "flour", "sugar", "coco"],
    tags: ["desert", "chocolate", "food"],
    description: "A guilty sweet desert",
    uri:
      "https://tastesbetterfromscratch.com/wp-content/uploads/2010/06/Hersheys-Perfectly-Chocolate-Chocolate-Cake-13.jpg",
  },
  [uniqueId()]: {
    name: "pesto_pasta",
    rating: 4.2,
    ingredients: ["garlic", "basil", "olive oil", "pasta", "cherry tomatoes"],
    tags: ["dinner", "food"],
    description: "A traditional pasta that is good on any day",
    uri:
      "https://www.simplyrecipes.com/wp-content/uploads/2011/05/chicken-florentine-pasta-vertical-a-1800.jpg",
  },
};

export const sampleCategories = {
  [uniqueId()]: {
    name: "food",
    icon: "hamburger",
    type: "FontAwesome5",
    iconColor: "blue",
    tags: ["food"],
  },
  [uniqueId()]: {
    name: "drinks",
    icon: "cocktail",
    type: "FontAwesome5",
    iconColor: "red",
    tags: ["drinks"],
  },
};
