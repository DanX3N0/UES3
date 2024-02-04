document.addEventListener('DOMContentLoaded', () => {
  const itemList = document.getElementById('item-list')
  itemList.innerHTML = ''

  async function getE() {
    try {
      const response = await fetch('/catalog')
      const data = await response.json()
      console.log(data)
      data.products.forEach((item) => {
        const card = document.createElement('div')
        card.classList.add('card')

        const name = document.createElement('h3')
        name.textContent = item.name
        card.appendChild(name)

        const image = document.createElement('img')
        image.src = item.image
        card.appendChild(image)

        const price = document.createElement('p')
        price.textContent = 'Price: Bs' + item.price
        card.appendChild(price)

        itemList.appendChild(card)
      })
    } catch (er) {
      console.log('error al get data', er)
    }
  }
  getE()
})
