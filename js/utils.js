const formModal_DOM = document.querySelector('.form-modal');

class Toggler {
	constructor(verseBtn_DOM, chapterBtn_DOM) {
		this.verseBtn_DOM = verseBtn_DOM;
		this.chapterBtn_DOM = chapterBtn_DOM;
		this.handlers();
		this.toggleChapter();
		this.toggleVerse();
	}
	handlers() {
		this.verseBtn_DOM.addEventListener('click', () => this.toggleVerse());
		this.chapterBtn_DOM.addEventListener('click', () =>
			this.toggleChapter()
		);
	}
	toggleChapter() {
		document.getElementById('verse-toggle').style.backgroundColor = '#fff';
		document.getElementById('verse-toggle').style.color = '#222';
		document.getElementById('chapter-toggle').style.backgroundColor =
			'#FCEABF';
		document.getElementById('chapter-toggle').style.color = '#000';
		document.getElementById('verse-form').style.display = 'none';
		document.getElementById('chapter-form').style.display = 'block';
	}

	toggleVerse() {
		document.getElementById('verse-toggle').style.backgroundColor =
			'#ffd700';
		document.getElementById('verse-toggle').style.color = '#000';
		document.getElementById('chapter-toggle').style.backgroundColor =
			'#fff';
		document.getElementById('chapter-toggle').style.color = '#222';
		document.getElementById('chapter-form').style.display = 'none';
		document.getElementById('verse-form').style.display = 'block';
	}
}

class Dropdown {
	constructor(root) {
		this.root = root;
		this.createUI();
		this.eventHandlers();
	}
	createUI() {
		this.root.innerHTML = `
        <p class="label-custom-select">Select Chapter</p>
        <div class="custom-select-wrapper">
            <div class="custom-select">
                <div class="custom-select__trigger">
                    <span>Chapter - 1</span>
                
                <div class="arrow"></div>
            </div>
            <div class="custom-options">
                <span class="custom-option selected" data-value="1">Chapter - 1</span>
                <span class="custom-option" data-value="2">Chapter - 2</span>
                <span class="custom-option" data-value="3">Chapter - 3</span>
                <span class="custom-option" data-value="4">Chapter - 4</span>
                <span class="custom-option" data-value="5">Chapter - 5</span>
                <span class="custom-option" data-value="6">Chapter - 6</span>
                <span class="custom-option" data-value="7">Chapter - 7</span>
                <span class="custom-option" data-value="8">Chapter - 8</span>
                <span class="custom-option" data-value="9">Chapter - 9</span>
                <span class="custom-option" data-value="10">Chapter - 10</span>
                <span class="custom-option" data-value="11">Chapter - 11</span>
                <span class="custom-option" data-value="12">Chapter - 12</span>
                <span class="custom-option" data-value="13">Chapter - 13</span>
                <span class="custom-option" data-value="14">Chapter - 14</span>
                <span class="custom-option" data-value="15">Chapter - 15</span>
                <span class="custom-option" data-value="16">Chapter - 16</span>
                <span class="custom-option" data-value="17">Chapter - 17</span>
                <span class="custom-option" data-value="18">Chapter - 18</span>
            </div>
        </div>
        </div>
        `;
	}
	eventHandlers() {
		this.root
			.querySelector('.custom-select-wrapper')
			.addEventListener('click', () => {
				this.root
					.querySelector('.custom-select')
					.classList.toggle('open');
			});

		for (const option of document.querySelectorAll('.custom-option')) {
			option.addEventListener('click', function () {
				if (!this.classList.contains('selected')) {
					this.parentNode
						.querySelector('.custom-option.selected')
						.classList.remove('selected');
					this.classList.add('selected');
					this.closest('.custom-select').querySelector(
						'.custom-select__trigger span'
					).textContent = this.textContent;
				}
			});
		}

		window.addEventListener('click', (e) => {
			const select = this.root.querySelector('.custom-select');
			if (!select.contains(e.target)) {
				select.classList.remove('open');
			}
		});
	}
}
