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
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: colors.RED,
        isFavorite: false,
    },
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: colors.BLUE,
        isFavorite: false,
    },
    {
        id: 1,
        title: 'Работа с формами',
        content: 'К определённым полям формы можно обратиться через form.elements по значению, указанному в атрибуте name',
        color: colors.BLUE,
        isFavorite: false,
    },
]

const model = {
    notes: MOCK_NOTES,

    addNote(title, content) {
        const noteTitle = document.querySelector('#note-title')
        const noteDescription = document.querySelector('#note-description')

        const newNote = {
            id: new Date().getTime(),
            title: title,
            content: content,
            color: colors.BLUE,
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

        data.forEach((item) => {
            noteContainer.innerHTML += `
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
    },

    init() {
        this.render(model.notes)

        const additionButton = document.querySelector('.note-form')
        const noteTitle = document.querySelector('#note-title')
        const noteDescription = document.querySelector('#note-description')

        additionButton.addEventListener('submit', (event) => {
            event.preventDefault()
            controller.addNote(noteTitle.value, noteDescription.value)
        })

    }

}

const controller = {
    addNote(title, content) {
        if (title === '' || content === '') {
            // messageBox.classList.toggle('pop-up')
        } else if (title.length > 50) {
            // messageBox.classList.toggle('pop-up')
        } else {
            model.addNote(title, content)
        }
    }
}

view.init()