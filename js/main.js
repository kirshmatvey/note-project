const colors = {
    GREEN: 'green',
    BLUE: 'blue',
    RED: 'red',
    YELLOW: 'yellow',
    PURPLE: 'purple',
}

const MOCK_NOTES = [
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: colors.GREEN,
        isFavorite: true,
    },
    // ...
    {
        id: 2,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: colors.RED,
        isFavorite: false,
    },
    {
        id: 3,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: colors.BLUE,
        isFavorite: false,
    },
    {
        id: 4,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: colors.BLUE,
        isFavorite: true,
    },
]

const model = {
    success: true,
    notes: MOCK_NOTES,

    addNote(title, content, color) {
        const noteTitle = document.querySelector('#note-title')
        const noteDescription = document.querySelector('#note-description')

        const newNote = {
            id: new Date().getTime(),
            title: title,
            content: content,
            color: color,
            isFavorite: false,
        }

        this.notes.unshift(newNote)

        noteTitle.value = ''
        noteDescription.value = ''

        view.render(this.notes)

        this.showMessage('Заметка добавлена!')
    },

    removeNote(id) {
        this.notes = this.notes.filter((note) => note.id !== id)

        if (view.showFavorite) {
            this.showFavorite()
        } else {
            view.render(this.notes)
        }
    },

    updateNote(id) {
        this.notes = this.notes.map((note) => note.id === id ? { ...note, isFavorite: !note.isFavorite } : note)

        if (view.showFavorite) {
            this.showFavorite()
        } else {
            view.render(this.notes)
        }
    },

    showFavorite() {
        const favoriteList = this.notes.filter((note) => note.isFavorite)

        view.render(favoriteList)
    },

    showMessage(message) {
        const messageBox = document.querySelector('.message-box')
        const messageContent = document.querySelector('#message-content')
        const messageSign = document.querySelector('#message-sign')

        if (this.success) {
            messageSign.setAttribute('src', './images/icons/Done.svg')
            messageBox.classList.add('success')
        } else {
            messageSign.setAttribute('src', './images/icons/warning.svg')
            messageBox.classList.add('error')
        }

        messageContent.textContent = message
        messageBox.classList.toggle('pop-up')
        setTimeout(() => {
            messageBox.classList.toggle('pop-up')
            setTimeout(() => {
                messageBox.classList.remove('error')
                messageBox.classList.remove('success')
            }, 600)
        }, 2000)

    }
}

const view = {
    showFavorite: false,
    render(data) {
        const noteContainer = document.querySelector('.note-container')
        const noteCounter = document.querySelector('.note-counter')
        if (this.showFavorite) {
            noteCounter.textContent = `Всего избранных заметок: ${data.length}`
        } else {
            noteCounter.textContent = `Всего заметок: ${data.length}`
        }


        noteContainer.innerHTML = ''

        if (model.notes.length === 0) {
            const noNoteMessage = document.createElement('p')
            noNoteMessage.innerHTML = `У вас нет еще ни одной заметки<br>Заполните поля выше и создайте свою первую заметку!`
            noNoteMessage.classList.add('no-note-message')
            noteContainer.append(noNoteMessage)
        } else {
            const noteContainerWrapper = document.createElement('div')
            noteContainerWrapper.classList.add('note-container-wrapper')

            const showFavorite = document.createElement('div')
            showFavorite.classList.add('show-favorite')

            let checkboxPath = "./images/icons/checkbox-inactive.svg"
            if (this.showFavorite) {
                checkboxPath = "./images/icons/checkbox-active.svg"
            } else {
                checkboxPath = "./images/icons/checkbox-inactive.svg"
            }

            showFavorite.innerHTML = `
            <img src="${checkboxPath}" class="favorite-checkbox" id="favorite-checkbox" alt="show-favorite">
            <span class="favorite-span">Показать только избранные заметки</span>
            `
            noteContainerWrapper.innerHTML = ''

            data.forEach((item) => {
                let notePath = ''
                if (item.isFavorite) {
                    notePath = './images/icons/heart%20active.svg'
                } else {
                    notePath = './images/icons/heart%20inactive.svg'
                }
                noteContainerWrapper.innerHTML += `
                <article class="note" id="${item.id}">
                    <header class="note-header ${item.color}" >
                        <div class="note-header-wrapper">
                            <h2 class="note-title">${item.title}</h2>
                            <div class="note-buttons">
                                <img id="heart" src="${notePath}" alt="is-favorite">
                                <img id="trash" src="./images/icons/trash.svg" alt="delete">
                            </div>
                        </div>
                    </header>
                    <div class="note-content">
                        <p class="note-info">${item.content}</p>
                    </div>
                </article>
                `
            })



            noteContainer.append(showFavorite)
            noteContainer.append(noteContainerWrapper)
        }

    },

    init() {
        let chosenColor = colors.YELLOW
        this.render(model.notes)

        const noteForm = document.querySelector('.note-form')
        const noteTitle = document.querySelector('#note-title')
        const noteDescription = document.querySelector('#note-description')
        const noteContainer = document.querySelector('.note-container')

        noteContainer.addEventListener('click', (event) => {
            if (event.target.getAttribute('id') === 'trash') {
                controller.removeNote(+event.target.closest('.note').id)
            } else if (event.target.getAttribute('id') === 'heart') {
                controller.updateNote(+event.target.closest('.note').id)
            } else if (event.target.getAttribute('id') === 'favorite-checkbox') {
                this.showFavorite = !this.showFavorite
                controller.showFavorite()
            }
        })

        noteForm.addEventListener('submit', (event) => {
            event.preventDefault()
            controller.addNote(noteTitle.value, noteDescription.value, chosenColor)
        })

        noteForm.addEventListener('click', (event) => {
            if (event.target.classList.contains('radio')) {
                switch (event.target.getAttribute('value')) {
                    case 'green':
                        chosenColor = colors.GREEN
                        break;
                    case 'blue':
                        chosenColor = colors.BLUE
                        break;
                    case 'red':
                        chosenColor = colors.RED
                        break;
                    case 'purple':
                        chosenColor = colors.PURPLE
                        break;
                    case 'yellow':
                        chosenColor = colors.YELLOW
                        break;
                }

            }
        })
    }

}

const controller = {
    addNote(title, content, color) {
        if (title.length > 50) {
            model.success = false
            model.showMessage('Максимальная длина заголовка - 50 символов')
        } else {
            model.success = true
            model.addNote(title, content, color)
        }
    },
    removeNote(id) {
        model.removeNote(id)
    },
    updateNote(id) {
        model.updateNote(id)
    },
    showFavorite() {
        if (view.showFavorite) {
            model.showFavorite()
        } else {
            view.render(model.notes)
        }
    },
}

view.init()