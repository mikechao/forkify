export function netlifyLoadReceipeResult() {
  return {
    status: 'success',
    data: {
      recipe: {
        title: "Geeno's Pizza",
        source_url: 'testing pizza',
        image_url:
          'https://lh3.googleusercontent.com/contacts/ADUEL1zXFUFdDiDykRFdlm2xMc_YCuQqT-tHCH67z26v7LoZlc2Yfjdq',
        publisher: 'Geeno',
        cooking_time: 5,
        servings: 1,
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
        id: '65147903622c9a0014492004',
      },
    },
  };
}

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
    ...(bookmarked && { bookmarked: true }),
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

export function nutritionWdigetContent() {
  return `"<style type=\"text/css\">.spoonacular-salmon{color:#e76182}\n.spoonacular-blue{color:#269fca}\n.spoonacular-quickview{font-size:14px;display:inline-block;padding:5px 10px;border:1px solid #333;margin-right:6px;margin-bottom:6px;font-weight:bold}\n.spoonacular-caption{font-weight:bold;margin-top:12px;font-size:16px;margin-bottom:6px}\n.spoonacular-nutrition-visualization-bar{display:inline-block;height:12px;max-width:calc(100% - 70px);max-width:-webkit-calc(100% - 70px);max-width:-moz-calc(100% - 70px);max-width:-o-calc(100% - 70px)}\n.spoonacular-nutrition-visualization-bar.spoonacular-salmon{background-color:#e76182}\n.spoonacular-nutrition-visualization-bar.spoonacular-blue{background-color:#269fca}\n.spoonacular-nutrition-visualization-bar-number{display:inline-block;margin-left:12px}\n.spoonacular-nutrient-name{display:inline-block;width:114px;font-size:14px}\n.spoonacular-nutrient-value{display:inline-block;width:75px;font-size:14px}\n.spoonacularNutritionCompositionChart {\n\tdisplay: inline-block;\n\tz-index: 99999;\n}\n.spoonacularNutritionCompositionChart .canvasjs-chart-canvas {\n\tborder: 1px solid #333;\n\tpadding: 10px;\n}\n</style><div itemprop=\"nutrition\" itemscope itemtype=\"http://schema.org/NutritionInformation\"><div class=\"spoonacular-caption\">Quickview</div><div class=\"spoonacular-quickview\" itemprop=\"calories\">0 Calories</div><div class=\"spoonacular-quickview\" itemprop=\"proteinContent\">0.0g Protein</div><div class=\"spoonacular-quickview\" itemprop=\"fatContent\">0.0g Total Fat</div><div class=\"spoonacular-quickview\" itemprop=\"carbohydrateContent\">0.0g Carbs</div></div><div class=\"spoonacular-caption spoonacular-salmon\">Limit These</div><div class=\"spoonacular-nutrient-name\">Calories</div><div class=\"spoonacular-nutrient-value\">0.0k</div><div style=\"display:inline-block;width: -moz-calc(100% - 189px);width: -webkit-calc(100% - 189px);width: -o-calc(100% - 189px);width: calc(100% - 189px);\"><div class=\"spoonacular-nutrition-visualization-bar spoonacular-salmon\" style=\"width:0.0%\" onmouseover=\"spoonacularShowNutritionComposition(event,'ENERGY')\" onmouseout=\"spoonacularHideNutritionComposition('ENERGY')\"></div><div class=\"spoonacular-nutrition-visualization-bar-number spoonacular-salmon\">0%</div></div><br><div class=\"spoonacular-nutrient-name\">Fat</div><div class=\"spoonacular-nutrient-value\">0.0g</div><div style=\"display:inline-block;width: -moz-calc(100% - 189px);width: -webkit-calc(100% - 189px);width: -o-calc(100% - 189px);width: calc(100% - 189px);\"><div class=\"spoonacular-nutrition-visualization-bar spoonacular-salmon\" style=\"width:0.0%\" onmouseover=\"spoonacularShowNutritionComposition(event,'FAT')\" onmouseout=\"spoonacularHideNutritionComposition('FAT')\"></div><div class=\"spoonacular-nutrition-visualization-bar-number spoonacular-salmon\">0%</div></div><br><div class=\"spoonacular-nutrient-name\">&nbsp;&nbsp;Saturated Fat</div><div class=\"spoonacular-nutrient-value\">0.0g</div><div style=\"display:inline-block;width: -moz-calc(100% - 189px);width: -webkit-calc(100% - 189px);width: -o-calc(100% - 189px);width: calc(100% - 189px);\"><div class=\"spoonacular-nutrition-visualization-bar spoonacular-salmon\" style=\"width:0.0%\" onmouseover=\"spoonacularShowNutritionComposition(event,'FAT_SATURATED')\" onmouseout=\"spoonacularHideNutritionComposition('FAT_SATURATED')\"></div><div class=\"spoonacular-nutrition-visualization-bar-number spoonacular-salmon\">0%</div></div><br><div class=\"spoonacular-nutrient-name\">Carbohydrates</div><div class=\"spoonacular-nutrient-value\">0.0g</div><div style=\"display:inline-block;width: -moz-calc(100% - 189px);width: -webkit-calc(100% - 189px);width: -o-calc(100% - 189px);width: calc(100% - 189px);\"><div class=\"spoonacular-nutrition-visualization-bar spoonacular-salmon\" style=\"width:0.0%\" onmouseover=\"spoonacularShowNutritionComposition(event,'CARBOHYDRATES')\" onmouseout=\"spoonacularHideNutritionComposition('CARBOHYDRATES')\"></div><div class=\"spoonacular-nutrition-visualization-bar-number spoonacular-salmon\">0%</div></div><br><div class=\"spoonacular-nutrient-name\">&nbsp;&nbsp;Sugar</div><div class=\"spoonacular-nutrient-value\"></div><div style=\"display:inline-block;width: -moz-calc(100% - 189px);width: -webkit-calc(100% - 189px);width: -o-calc(100% - 189px);width: calc(100% - 189px);\"><div class=\"spoonacular-nutrition-visualization-bar spoonacular-salmon\" style=\"width:0.0%\" onmouseover=\"spoonacularShowNutritionComposition(event,'SUGAR')\" onmouseout=\"spoonacularHideNutritionComposition('SUGAR')\"></div><div class=\"spoonacular-nutrition-visualization-bar-number spoonacular-salmon\">0%</div></div><br><div class=\"spoonacular-nutrient-name\">Cholesterol</div><div class=\"spoonacular-nutrient-value\">0.0mg</div><div style=\"display:inline-block;width: -moz-calc(100% - 189px);width: -webkit-calc(100% - 189px);width: -o-calc(100% - 189px);width: calc(100% - 189px);\"><div class=\"spoonacular-nutrition-visualization-bar spoonacular-salmon\" style=\"width:0.0%\" onmouseover=\"spoonacularShowNutritionComposition(event,'CHOLESTEROL')\" onmouseout=\"spoonacularHideNutritionComposition('CHOLESTEROL')\"></div><div class=\"spoonacular-nutrition-visualization-bar-number spoonacular-salmon\">0%</div></div><br><div class=\"spoonacular-nutrient-name\">Sodium</div><div class=\"spoonacular-nutrient-value\">0.0mg</div><div style=\"display:inline-block;width: -moz-calc(100% - 189px);width: -webkit-calc(100% - 189px);width: -o-calc(100% - 189px);width: calc(100% - 189px);\"><div class=\"spoonacular-nutrition-visualization-bar spoonacular-salmon\" style=\"width:0.0%\" onmouseover=\"spoonacularShowNutritionComposition(event,'SODIUM')\" onmouseout=\"spoonacularHideNutritionComposition('SODIUM')\"></div><div class=\"spoonacular-nutrition-visualization-bar-number spoonacular-salmon\">0%</div></div><br><div class=\"spoonacular-caption spoonacular-blue\">Get Enough Of These</div><div class=\"spoonacular-nutrient-name\">Protein</div><div class=\"spoonacular-nutrient-value\">0.0g</div><div style=\"display:inline-block;width: -moz-calc(100% - 189px);width: -webkit-calc(100% - 189px);width: -o-calc(100% - 189px);width: calc(100% - 189px);\"><div class=\"spoonacular-nutrition-visualization-bar spoonacular-blue\" style=\"width:0.0%\" onmouseover=\"spoonacularShowNutritionComposition(event,'PROTEIN')\" onmouseout=\"spoonacularHideNutritionComposition('PROTEIN')\"></div><div class=\"spoonacular-nutrition-visualization-bar-number spoonacular-blue\">0%</div></div><br><div style=\"margin-top:12px;width:12px;height:12px\" class=\"spoonacular-nutrition-visualization-bar spoonacular-salmon\"></div><div style=\"margin-left:6px;margin-right:6px;width:12px;height:12px\" class=\"spoonacular-nutrition-visualization-bar spoonacular-blue\"></div>covered percent of daily need<div id=\"spoonacularNutritionComposition-ENERGY\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-ENERGY\"></div></div>\n<div id=\"spoonacularNutritionComposition-FAT\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-FAT\"></div></div>\n<div id=\"spoonacularNutritionComposition-FAT_SATURATED\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-FAT_SATURATED\"></div></div>\n<div id=\"spoonacularNutritionComposition-CARBOHYDRATES\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-CARBOHYDRATES\"></div></div>\n<div id=\"spoonacularNutritionComposition-SUGAR\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-SUGAR\"></div></div>\n<div id=\"spoonacularNutritionComposition-CHOLESTEROL\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-CHOLESTEROL\"></div></div>\n<div id=\"spoonacularNutritionComposition-SODIUM\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-SODIUM\"></div></div>\n<div id=\"spoonacularNutritionComposition-ALCOHOL\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-ALCOHOL\"></div></div>\n<div id=\"spoonacularNutritionComposition-CAFFEINE\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-CAFFEINE\"></div></div>\n<div id=\"spoonacularNutritionComposition-PROTEIN\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-PROTEIN\"></div></div>\n<div id=\"spoonacularNutritionComposition-COPPER\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-COPPER\"></div></div>\n<div id=\"spoonacularNutritionComposition-ZINC\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-ZINC\"></div></div>\n<div id=\"spoonacularNutritionComposition-IRON\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-IRON\"></div></div>\n<div id=\"spoonacularNutritionComposition-RIBOFLAVIN_B2\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-RIBOFLAVIN_B2\"></div></div>\n<div id=\"spoonacularNutritionComposition-VITAMIN_A\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-VITAMIN_A\"></div></div>\n<div id=\"spoonacularNutritionComposition-MAGNESIUM\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-MAGNESIUM\"></div></div>\n<div id=\"spoonacularNutritionComposition-VITAMIN_B6\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-VITAMIN_B6\"></div></div>\n<div id=\"spoonacularNutritionComposition-PHOSPHORUS\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-PHOSPHORUS\"></div></div>\n<div id=\"spoonacularNutritionComposition-THIAMIN_B1\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-THIAMIN_B1\"></div></div>\n<div id=\"spoonacularNutritionComposition-SELENIUM\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-SELENIUM\"></div></div>\n<div id=\"spoonacularNutritionComposition-NIACIN_B3\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-NIACIN_B3\"></div></div>\n<div id=\"spoonacularNutritionComposition-MANGANESE\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-MANGANESE\"></div></div>\n<div id=\"spoonacularNutritionComposition-CALCIUM\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-CALCIUM\"></div></div>\n<div id=\"spoonacularNutritionComposition-PANTOTHENIC_ACID_B5\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-PANTOTHENIC_ACID_B5\"></div></div>\n<div id=\"spoonacularNutritionComposition-POTASSIUM\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-POTASSIUM\"></div></div>\n<div id=\"spoonacularNutritionComposition-FOLATE\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-FOLATE\"></div></div>\n<div id=\"spoonacularNutritionComposition-VITAMIN_B12\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-VITAMIN_B12\"></div></div>\n<div id=\"spoonacularNutritionComposition-VITAMIN_C\" class=\"spoonacularNutritionCompositionChart\" style=\"display:none\"><div id=\"spoonacularNutritionCompositionChart-VITAMIN_C\"></div></div>\n<script type=\"text/javascript\">jQuery(function() {chartENERGY = new CanvasJS.Chart('spoonacularNutritionCompositionChart-ENERGY',{title:{text: \"Distribution of Calories\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartFAT = new CanvasJS.Chart('spoonacularNutritionCompositionChart-FAT',{title:{text: \"Distribution of Fat\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartFAT_SATURATED = new CanvasJS.Chart('spoonacularNutritionCompositionChart-FAT_SATURATED',{title:{text: \"Distribution of Saturated Fat\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartCARBOHYDRATES = new CanvasJS.Chart('spoonacularNutritionCompositionChart-CARBOHYDRATES',{title:{text: \"Distribution of Carbohydrates\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartSUGAR = new CanvasJS.Chart('spoonacularNutritionCompositionChart-SUGAR',{title:{text: \"Distribution of Sugar\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: []}]});\nchartCHOLESTEROL = new CanvasJS.Chart('spoonacularNutritionCompositionChart-CHOLESTEROL',{title:{text: \"Distribution of Cholesterol\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartSODIUM = new CanvasJS.Chart('spoonacularNutritionCompositionChart-SODIUM',{title:{text: \"Distribution of Sodium\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartALCOHOL = new CanvasJS.Chart('spoonacularNutritionCompositionChart-ALCOHOL',{title:{text: \"Distribution of Alcohol\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: []}]});\nchartCAFFEINE = new CanvasJS.Chart('spoonacularNutritionCompositionChart-CAFFEINE',{title:{text: \"Distribution of Caffeine\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: []}]});\nchartPROTEIN = new CanvasJS.Chart('spoonacularNutritionCompositionChart-PROTEIN',{title:{text: \"Distribution of Protein\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartCOPPER = new CanvasJS.Chart('spoonacularNutritionCompositionChart-COPPER',{title:{text: \"Distribution of Copper\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartZINC = new CanvasJS.Chart('spoonacularNutritionCompositionChart-ZINC',{title:{text: \"Distribution of Zinc\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartIRON = new CanvasJS.Chart('spoonacularNutritionCompositionChart-IRON',{title:{text: \"Distribution of Iron\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartRIBOFLAVIN_B2 = new CanvasJS.Chart('spoonacularNutritionCompositionChart-RIBOFLAVIN_B2',{title:{text: \"Distribution of Vitamin B2\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartVITAMIN_A = new CanvasJS.Chart('spoonacularNutritionCompositionChart-VITAMIN_A',{title:{text: \"Distribution of Vitamin A\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartMAGNESIUM = new CanvasJS.Chart('spoonacularNutritionCompositionChart-MAGNESIUM',{title:{text: \"Distribution of Magnesium\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartVITAMIN_B6 = new CanvasJS.Chart('spoonacularNutritionCompositionChart-VITAMIN_B6',{title:{text: \"Distribution of Vitamin B6\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartPHOSPHORUS = new CanvasJS.Chart('spoonacularNutritionCompositionChart-PHOSPHORUS',{title:{text: \"Distribution of Phosphorus\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartTHIAMIN_B1 = new CanvasJS.Chart('spoonacularNutritionCompositionChart-THIAMIN_B1',{title:{text: \"Distribution of Vitamin B1\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartSELENIUM = new CanvasJS.Chart('spoonacularNutritionCompositionChart-SELENIUM',{title:{text: \"Distribution of Selenium\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartNIACIN_B3 = new CanvasJS.Chart('spoonacularNutritionCompositionChart-NIACIN_B3',{title:{text: \"Distribution of Vitamin B3\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartMANGANESE = new CanvasJS.Chart('spoonacularNutritionCompositionChart-MANGANESE',{title:{text: \"Distribution of Manganese\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartCALCIUM = new CanvasJS.Chart('spoonacularNutritionCompositionChart-CALCIUM',{title:{text: \"Distribution of Calcium\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartPANTOTHENIC_ACID_B5 = new CanvasJS.Chart('spoonacularNutritionCompositionChart-PANTOTHENIC_ACID_B5',{title:{text: \"Distribution of Vitamin B5\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartPOTASSIUM = new CanvasJS.Chart('spoonacularNutritionCompositionChart-POTASSIUM',{title:{text: \"Distribution of Potassium\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartFOLATE = new CanvasJS.Chart('spoonacularNutritionCompositionChart-FOLATE',{title:{text: \"Distribution of Folate\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartVITAMIN_B12 = new CanvasJS.Chart('spoonacularNutritionCompositionChart-VITAMIN_B12',{title:{text: \"Distribution of Vitamin B12\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\nchartVITAMIN_C = new CanvasJS.Chart('spoonacularNutritionCompositionChart-VITAMIN_C',{title:{text: \"Distribution of Vitamin C\",verticalAlign: 'top',horizontalAlign: 'left'},backgroundColor: 'rgba(255, 255, 255, 1)',creditHref: '',creditText: '',toolTip:{content: \"\",},animationEnabled:false,data: [{type: 'doughnut',dataPoints: [{y:0.0, indexLabel:\"dog salt\"},]}]});\n});</script><div style=\"margin-top:3px;margin-right:10px;text-align:right;\">Widget by <a href=\"https://spoonacular.com\">spoonacular.com</a></div>"`;
}
