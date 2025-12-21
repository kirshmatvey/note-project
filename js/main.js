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
        isFavorite: false,
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
        isFavorite: false,
    },
]

const model = {
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
    }
}

const view = {
    render(data) {
        const noteContainer = document.querySelector('.note-container')
        const noteCounter = document.querySelector('.note-counter')
        noteCounter.textContent = `Всего заметок: ${data.length}`

        noteContainer.innerHTML = ''

        if (data.length === 0) {
            const noNoteMessage = document.createElement('p')
            noNoteMessage.innerHTML = `У вас нет еще ни одной заметки<br>Заполните поля выше и создайте свою первую заметку!`
            noNoteMessage.classList.add('no-note-message')
            noteContainer.append(noNoteMessage)
        } else {
            const noteContainerWrapper = document.createElement('div')
            noteContainerWrapper.classList.add('note-container-wrapper')

            const showFavorite = document.createElement('div')
            showFavorite.classList.add('show-favorite')
            showFavorite.innerHTML = `
            <img src="./images/icons/checkbox-inactive.svg" class="favorite-checkbox" alt="show-favorite">
            <span class="favorite-span">Показать только избранные заметки</span>
            `
            noteContainerWrapper.innerHTML = ''

            data.forEach((item) => {
                noteContainerWrapper.innerHTML += `
                <article class="note">
                    <header class="note-header ${item.color}" >
                        <div class="note-header-wrapper">
                            <h2 class="note-title">${item.title}</h2>
                            <div class="note-buttons">
                                <img id="heart" src="./images/icons/heart%20inactive.svg" alt="is-favorite">
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
        const noteHeader = document.querySelector('.note-header')

        noteHeader.addEventListener('click', (event) => {
            if (event.target.getAttribute('id') === 'trash') {
                controller.deleteNote(event.target.getAttribute('id'))
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
        if (title === '' || content === '') {
            // messageBox.classList.toggle('pop-up')
        } else if (title.length > 50) {
            // messageBox.classList.toggle('pop-up')
        } else {
            model.addNote(title, content, color)
        }
    }
}

view.init()