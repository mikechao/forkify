export function getBookmarkedRecipeId() {
  return '65147903622c9a0014492004';
}

export function getNonBookmarkedRecipeId() {
  return '3411342532253245ad24';
}

export function getRecipe(bookmarked = true) {
  return {
    id: bookmarked ? getBookmarkedRecipeId() : getNonBookmarkedRecipeId(),
    title: "Geeno's Pizza",
    publisher: 'Geeno',
    sourceUrl: 'testing pizza',
    image:
      'https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq',
    servings: 1,
    cookingTime: 5,
    ingredients: [
      { quantity: 1, unit: '', description: 'Dog' },
      { quantity: null, unit: '', description: 'salt' },
    ],
    key: '0fe58a46-944a-41f2-b3c8-5b6458414195',
    ...(bookmarked && { bookmark: true }),
  };
}

export function searchRecipesResults() {
  return {
    status: 'success',
    results: 3,
    data: {
      recipes: [
        {
          publisher: 'BBC Food',
          image_url:
            'http://forkify-api.herokuapp.com/images/theultimatemasalatea_86647_16x92aa7.jpg',
          title: 'The ultimate masala tea',
          id: '5ed6604591c37cdc054bcf99',
        },
        {
          publisher: 'Steamy Kitchen',
          image_url:
            'http://forkify-api.herokuapp.com/images/chinese_tea_egg1200x1502f10.jpg',
          title: 'Chinese Marbled Tea Egg Recipe',
          id: '5ed6604591c37cdc054bcd54',
        },
        {
          publisher: 'Pastry Affair',
          image_url:
            'http://forkify-api.herokuapp.com/images/8490340733_91c07b6f0c_b149f.jpg',
          title:
            'Black Tea Cake with Honey&nbsp;Buttercream - Home - Pastry Affair',
          id: '5ed6604591c37cdc054bcf9c',
        },
      ],
    },
  };
}

export function bookmarkedRecipes() {
  return [
    {
      id: '651de23273368200146f3de4',
      title: "James's Pizza",
      publisher: 'James',
      sourceUrl: 'http://james.com',
      image:
        'https://i.etsystatic.com/37771943/r/il/0d7dc7/4196027934/il_1588xN.4196027934_71ev.jpg',
      servings: 1,
      cookingTime: 4,
      ingredients: [
        {
          quantity: 1,
          unit: '',
          description: 'Cat',
        },
        {
          quantity: 1,
          unit: 'bag',
          description: 'orange fur',
        },
        {
          quantity: null,
          unit: '',
          description: 'nails',
        },
      ],
      key: '0fe58a46-944a-41f2-b3c8-5b6458414195',
      bookmarked: true,
    },
    {
      id: '65147903622c9a0014492004',
      title: "Geeno's Pizza",
      publisher: 'Geeno',
      sourceUrl: 'testing pizza',
      image:
        'https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq',
      servings: 1,
      cookingTime: 5,
      ingredients: [
        {
          quantity: 1,
          unit: '',
          description: 'Dog',
        },
        {
          quantity: null,
          unit: '',
          description: 'salt',
        },
      ],
      key: '0fe58a46-944a-41f2-b3c8-5b6458414195',
      bookmarked: true,
    },
  ];
}
