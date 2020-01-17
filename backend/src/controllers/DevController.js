const axios = require ("axios");

const Dev = require ("../models/Dev");
const parseStringAsArray = require ("../utils/parseStringAsArray");

// index, show, store, update, destroy

module.exports = {
  async index(request, response)
  {
    const devs = await Dev.find ();
    return response.json (devs);
  },

  async store(request, response)
  {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev)
    {
      const apiResponse = await axios.get (`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray (techs.toLowerCase());

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create ({
        github_username,
        name,
        avatar_url,
        bio,
        location,
        techs: techsArray,
      });
    }

    return response.json (dev);
  },

  async update(request, response) {
    const { id } = request.params;
    const { name, techs, latitude, longitude } = request.body;
    console.log(request.body, id);
    const techsArray = parseStringAsArray(techs.toLowerCase());

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.updateOne({github_username: id}, {
      name,
      techs: techsArray,
      location,
    });
    console.log(dev);

    return response.json(dev);
  },

  async destroy(request, response) {
    const { id } = request.params;
    const deleted = await Dev.deleteOne({ github_username:id });
    return response.json(deleted);
  }
};