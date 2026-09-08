// Updated data model
/*
{
   "name": "black shirt" (mandatory)
   "type": "sweater" (mandatory)
   "image": "img" (mandatory)
   "colour": "green" (mandatory) 
   "times_used": 3  (If you choose an outfit)
   "style": "alternative"
   "size": 38
   "comfy_level": 5   (1-5)
   "season": "winter"
   feel free to add more
}
*/

let itemArray = [];    // Where all the clothes are stored (i just put items because clothing is longer to write lol)
let nextId = 1;

const getAll = () => {
  return itemArray;
};

const addOne = (name, type, image, colour, times_used, style, size, comfy_level, season) => {
  if (!name || !type || !image || !colour || times_used === undefined || !style || !size|| !comfy_level || !season ) {
    return false;
  }
  const newItem = {
    id: nextId++,
    name,
    type,
    image,
    colour,
    times_used,
    style,
    size,
    comfy_level,
    season,
  };
  itemArray.push(newItem);
  return newItem;
};

const findById = (id) => {
  const item = itemArray.find((item) => item.id === Number(id));
  return item || false;
};

const updateOneById = (id, updatedData) => {
  const item = findById(id);
  if (item) {
    if (updatedData.name) item.name = updatedData.name;
    if (updatedData.type) item.type = updatedData.type;
    if (updatedData.image) item.image = updatedData.image;
    if (updatedData.colour) item.colour = updatedData.colour;
    if (updatedData.times_used !== undefined) item.times_used = updatedData.times_used;
    if (updatedData.style) item.style = updatedData.style;
    if (updatedData.size) item.size = updatedData.size;
    if (updatedData.comfy_level) item.comfy_level = updatedData.comfy_level;
    if (updatedData.season) item.season = updatedData.season;
    return item;
  }
  return false;
};

const deleteOneById = (id) => {
  const item = findById(id);
  if (item) {
    const initialLength = itemArray.length;
    itemArray = itemArray.filter((item) => item.id !== Number(id));
    return itemArray.length < initialLength;
  }
  return false;
};



module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};
