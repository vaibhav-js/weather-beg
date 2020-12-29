const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    messageone.textContent = 'Loading..'
    messagetwo.textContent = ''
    e.preventDefault()
    const location = search.value
    fetch('/weather?address=' + encodeURIComponent(location)).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return messageone.textContent = data.error
            }
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast
        })
    })
})