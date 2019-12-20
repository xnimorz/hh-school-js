const template = '<div>{good}<b>{price}</b></div>';

const data = template.replace(/{([a-z]+)}/g, (match) => {

})

document.querySelector('js-place-where-to-put-template').innerHTML = data;