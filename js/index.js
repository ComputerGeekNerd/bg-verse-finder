class BhagvadGita {
	constructor(formModal_DOM) {
		this.contentContainer_DOM = document.querySelector('.chapter-content');
		this.formModal_DOM = formModal_DOM;
		this.createLayout();
		new Toggler(
			document.querySelector('#verse-toggle'),
			document.querySelector('#chapter-toggle')
		);
		new Dropdown(document.querySelector('.dropdown-chapter-root'));
		new Dropdown(document.querySelector('.dropdown-verse-root'));
		this.handlers();
	}
	createLayout() {
		this.formModal_DOM.innerHTML = `
            <div class="form-toggle">
                <button id="verse-toggle">Verse</button>
                <button id="chapter-toggle">Chapter</button>
            </div>
        
            <div id="verse-form" >
                <form class="verse-form" data-type="verse">
                    <div class="dropdown-verse-root"></div>
                    <div class="form-group">
                        <label for="verse-input">Verse Number</label>
                        <input disabled class="verse-number" type="number" placeholder="Verse no. ex: 24">
                    </div>
                    <button  class="btn btn-submit">Submit</button>
                </form>
            </div>
        
            <div id="chapter-form">
                <form data-type="chapter" class="chapter-form">
                    <div class="dropdown-chapter-root"></div>
                    <button class="btn btn-submit">Submit</button>
                </form>
            </div>
        `;
	}

	handlers() {
		this.verseForm_DOM = document.querySelector('.verse-form');
		this.chapterForm_DOM = document.querySelector('.chapter-form');

		this.verseForm_DOM.addEventListener('submit', (e) => {
			e.preventDefault();
			this.handleClickOnVerseSubmitBtn(e);
		});

		this.chapterForm_DOM.addEventListener('submit', (e) => {
			e.preventDefault();
			this.handleClickOnChapterSubmitBtn(e);
		});

		document.body.addEventListener('click', async (e) => {
			await this.handleClickOnSelectingChapterInVerseDropdown(e);
		});

		window.addEventListener('load', (e) => {
			// By default  fetch verse number for selected chapter;
			const selectedChapter =
				this.verseForm_DOM.querySelector('.selected').dataset.value;
			this.getValidVerseNumbers(selectedChapter);
		});
	}

	async handleClickOnSelectingChapterInVerseDropdown(e) {
		const element = e.target.closest('.verse-form .custom-option');
		if (!element) return;
		const selectedChapter = element.dataset.value;
		const verseInput_DOM = document.querySelector('.verse-number');
		verseInput_DOM.setAttribute('disabled', true);
		await this.getValidVerseNumbers(selectedChapter);
		verseInput_DOM.removeAttribute('disabled');
	}

	async getValidVerseNumbers(selectedChapter) {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key':
					'cf6b7264b6msh53519832a4e8588p192183jsneb8d357e17c5',
				'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
			}
		};
		let chapter = await fetch(
			`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${selectedChapter}/`,
			options
		);
		chapter = await chapter.json();
		const chapterVerseNumber = chapter.verses_count;

		const verseInput_DOM = document.querySelector('.verse-number');
		verseInput_DOM.setAttribute(
			'placeholder',
			`Enter between 1 - ${chapterVerseNumber}`
		);
		verseInput_DOM.removeAttribute('disabled');
		localStorage.setItem('verseNo', chapterVerseNumber);
		localStorage.setItem('authKey', token);
	}

	clearVerseForm() {
		const verseInput_DOM = document.querySelector('.verse-number');
		verseInput_DOM.value = '';
		verseInput_DOM.setAttribute(
			'placeholder',
			`Enter between 1 - ${localStorage.getItem('verseNo')}`
		);
	}

	getVerseTranslation(translations) {
		console.log('transl: ', translations);
		const res = translations.filter(
			(translation) =>
				translation.language === 'english' &&
				translation.author_name === 'Dr. S. Sankaranarayan'
		);
		if (res.length > 0) return res[0].description;
		return '';
	}

	async handleClickOnVerseSubmitBtn(e) {
		this.moveLayoutToLeftSide();
		this.contentContainer_DOM.innerHTML = `
            <img class="loading" src="./media/loader.gif" alt="loader">
		`;
		const chapterNo = document.querySelector('.verse-form .selected')
			.dataset.value;
		const verseNo = document.querySelector('.verse-number').value;

		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key':
					'cf6b7264b6msh53519832a4e8588p192183jsneb8d357e17c5',
				'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
			}
		};

		if (
			+verseNo < 1 ||
			+verseNo > +localStorage.getItem('verseNo') ||
			verseNo.includes('.')
		) {
			this.contentContainer_DOM.innerHTML = `
            <div>
                Invalid Verse Number
            </div>
        `;
			return;
		}

		document.querySelector('.loading').style.display = 'block';
		let getVerse = await fetch(
			`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNo}/verses/${verseNo}/`,
			options
		);
		document.querySelector('.loading').style.display = 'none';
		getVerse = await getVerse.json();

		if (getVerse.chapter_number) {
			const desc = this.getVerseTranslation(getVerse.translations);
			this.contentContainer_DOM.innerHTML = `
            <h4 class="verse-title">Chapter : ${getVerse.chapter_number} - Verse: ${getVerse.verse_number}</h4>
            <h2 class="verse">${getVerse.text}<h2>
            <h4 class="verse-transliteration">${getVerse.transliteration}</h4>   
            <h3 class="verse-meaning">${desc}</h3>
            <p class="verse-word-meaning">
            <strong>Word Meanings </strong>: ${getVerse.word_meanings}
            </p>
        `;
		} else {
			this.contentContainer_DOM.innerHTML = `
            Chapter : ${chapterNo} - Verse : ${verseNo} not found
		`;
		}
		this.clearVerseForm();
		const detailsView = document.getElementById('details-view');
		detailsView.scrollIntoView(top, { behavior: 'smooth', block: 'start' });
	}

	moveLayoutToLeftSide() {
		//moves layout to leftside and chapter-content to right-side.
		// document.querySelector(".modal").style.transform = "translateX(-30%)";
		document.querySelector('.modal').classList.add('modal-move-left');
		document
			.querySelector('.chapter-content')
			.classList.add('chapter-content-display');
	}

	async handleClickOnChapterSubmitBtn(e) {
		this.moveLayoutToLeftSide();

		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key':
					'cf6b7264b6msh53519832a4e8588p192183jsneb8d357e17c5',
				'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
			}
		};

		const selectedChapter = e.target.querySelector(
			'.chapter-form .selected'
		).dataset.value;
		this.contentContainer_DOM.innerHTML = `
            <img class="loading" src="./media/loader.gif" alt="loader">
        `;

		document.querySelector('.loading').style.display = 'block';
		const fetchChapterDetails = await fetch(
			`https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${selectedChapter}/`,
			options
		).then((data) => data.json());
		document.querySelector('.loading').style.display = 'none';

		let chapter = fetchChapterDetails;
		this.contentContainer_DOM.innerHTML += `
                <h2 class="chapter-title">${chapter.chapter_number} - ${chapter.name}
                </h2>
                <h4>${chapter.name_transliterated}</h4>   
                <h3 class="chapter-meaning">${chapter.name_meaning}</h3>
                <p class="chapter-summary">
                ${chapter.chapter_summary}
                </p>

                <p class="chapter-total">Total Verses : ${chapter.verses_count}</p>
        `;
		const detailsView = document.getElementById('details-view');
		detailsView.scrollIntoView(top, { behavior: 'smooth', block: 'start' });
	}
}

const app = new BhagvadGita(formModal_DOM);
