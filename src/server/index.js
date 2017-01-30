/**
 * Created by timur on 1/30/17.
 */

const rp = require('request-promise')
const request = require('request')
const fs = require('fs')
const path = require('path')

const apiKey = 9823

const download = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {

    console.log('content-type:', res.headers['content-type'])
    console.log('content-length:', res.headers['content-length'])

    request(uri).pipe(fs.createWriteStream(filename))
      .on('close', callback)
  })
}

rp(`http://www.thecocktaildb.com/api/json/v1/${apiKey}/random.php`)
  .then(res => JSON.parse(res))
  .then(data => data['drinks'][0])
  .then(data => {

    const ingredients = []

    for (var i = 0; i < 15; i++) {

      const ingredient = data[`strIngredient${i}`]
      const measurement = data[`strMeasure${i}`]

      if (ingredient && measurement && !measurement.endsWith('\n')) {
        ingredients.push({
          title: ingredient,
          measurement: measurement
        })
      }
    }

    const id = data.idDrink
    const title = data.strDrink
    const instructions = data.strInstructions
    const image = data.strDrinkThumb
    const pathToDrink = `res/drinks/${id}`

    const drink = {
      id,
      title,
      instructions,
      ingredients,
      image
    }

    fs.mkdirSync(pathToDrink)

    const fileExt = path.extname(image)

    download(
      image,
      path.join(pathToDrink, `img${fileExt}`),
      function () {
        console.log(`${title} ${id} image saved.`)
      }
    )

    fs.writeFileSync(
      path.join(pathToDrink, 'data.json'),
      JSON.stringify(drink)
    )
  })
  .catch(console.error)

