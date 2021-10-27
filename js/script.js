const iconsArray = [
  {
    name: "cat",
    prefix: "fa-",
    type: "animal",
    family: "fas",
  },
  {
    name: "crow",
    prefix: "fa-",
    type: "animal",
    family: "fas",
  },
  {
    name: "dog",
    prefix: "fa-",
    type: "animal",
    family: "fas",
  },
  {
    name: "dove",
    prefix: "fa-",
    type: "animal",
    family: "fas",
  },
  {
    name: "dragon",
    prefix: "fa-",
    type: "animal",
    family: "fas",
  },
  {
    name: "horse",
    prefix: "fa-",
    type: "animal",
    family: "fas",
  },
  {
    name: "hippo",
    prefix: "fa-",
    type: "animal",
    family: "fas",
  },
  {
    name: "fish",
    prefix: "fa-",
    type: "animal",
    family: "fas",
  },
  {
    name: "carrot",
    prefix: "fa-",
    type: "vegetable",
    family: "fas",
  },
  {
    name: "apple-alt",
    prefix: "fa-",
    type: "vegetable",
    family: "fas",
  },
  {
    name: "lemon",
    prefix: "fa-",
    type: "vegetable",
    family: "fas",
  },
  {
    name: "pepper-hot",
    prefix: "fa-",
    type: "vegetable",
    family: "fas",
  },
  {
    name: "user-astronaut",
    prefix: "fa-",
    type: "user",
    family: "fas",
  },
  {
    name: "user-graduate",
    prefix: "fa-",
    type: "user",
    family: "fas",
  },
  {
    name: "user-ninja",
    prefix: "fa-",
    type: "user",
    family: "fas",
  },
  {
    name: "user-secret",
    prefix: "fa-",
    type: "user",
    family: "fas",
  },
];

const colorsObject = {
  user: "rgb(102,11,114)",
  animal: "rgb(47,0,253)",
  vegetable: "rgb(232,162,6)",
};

// Desired Data Structure
/* 
 
     {
        categoria1: [
            {
                name: "user-secret",
                prefix: "fa-",
                type: "user",
                family: "fas",
            } .....
        ] .....
    },


*/
const cardsContainer = document.getElementById("cards_container");
const categorySelect = document.getElementById("category_select");
const dataObj = generateDataStructure(iconsArray);
populateIconsGrid(dataObj, ...Object.keys(dataObj));
populateSelectOptions(dataObj);

categorySelect.addEventListener("change", function () {
  if (this.value === "all") {
    populateIconsGrid(dataObj, ...Object.keys(dataObj));
  } else {
    populateIconsGrid(dataObj, this.value);
  }
});

/**
 *
 * @param {{key:[{name:string,prefix:string,type:string,family:string}]}} iconsDataObject
 */
function populateSelectOptions(iconsDataObject) {
  let selectHtmlText = `<option selected value="all">All</option>`;
  for (const key in iconsDataObject) {
    selectHtmlText += `<option value="${key.toLowerCase()}">${
      key[0].toUpperCase() + key.slice(1)
    }</option>`;
  }
  categorySelect.innerHTML = selectHtmlText;
}

/**
 *
 * @param {{key:[{name:string,prefix:string,type:string,family:string}]}} iconsDataObject
 * @param  {...string} categories
 */
function populateIconsGrid(iconsDataObject, ...categories) {
  let innerHtmlText = "";
  categories.forEach((category) => {
    if (iconsDataObject.hasOwnProperty(category)) {
      const categoryHtml = iconsDataObject[category].reduce(
        (accumulator, { prefix, name, family, color }) => {
          return (accumulator += `
          <div class="col">
          <div class="row row-cols-1 align-items-center align-content-center">
              <div class="col">
                  <section class="card p-4 align-items-center shadow" style="color:${color}">
                      <i class="${family} ${prefix}${name} fs-1"></i>
                      <h6 class="mt-2">${name.toUpperCase()}</h6>
                  </section>
              </div>
          </div>
      </div>`);
        },
        ""
      );
      innerHtmlText += categoryHtml;
    }
  });
  cardsContainer.innerHTML = innerHtmlText;
}

/**
 *
 * @param {[{name:string,prefix:string,type:string,family:string}]} arrayOfIcons
 * @returns 
} */
function generateDataStructure(arrayOfIcons) {
  const newObject = {};

  //   const uniqueColorsArray = [];

  arrayOfIcons.map(({ name, prefix, type, family }) => {
    if (!newObject.hasOwnProperty(type)) {
      newObject[type] = [];
      if (!colorsObject.hasOwnProperty(type)) {
        colorsObject[type] = generateUniqueRandomColor(colorsObject);
      }
    }
    newObject[type].push({
      name,
      prefix,
      type,
      family,
      color: colorsObject[type],
    });
  });
  return newObject;
}

/**
 *
 * @param {key: string} uniqueColorArray
 * @returns
 */
function generateUniqueRandomColor(colorsObject) {
  let newColor = generateRandomColor();
  while (Object.values(colorsObject).includes(newColor)) {
    newColor = generateRandomColor();
  }
  return newColor;
}

function generateRandomColor() {
  return `rgb(${getRandomInt(0, 256)},${getRandomInt(0, 256)},${getRandomInt(
    0,
    256
  )})`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
