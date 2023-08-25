import compareTexts from './compareTexts';
import cls from '../utils/cls';
import copyToClipboard from 'copy-to-clipboard';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let data;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const analyzeData = (dataObject) => {
    data = dataObject;
    const {list, wiki} = dataObject;
    const hasWiki = Boolean(wiki);
    let markup = '';
    for (let i = 0; i < list.length; i++) {
        markup += buildRow(list[i], i + 1, hasWiki);
    }

    document.body.insertAdjacentHTML('beforeend', markup);

    addListeners();
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const buildRow = (dataItem, nr, hasWiki) => {
    const comparison = compareTexts(dataItem.text1, dataItem.text2);
    const {text1, text2, differences} = comparison;
    const isChanged = differences !== 0;

    let wikiButton = '';
    if (hasWiki && dataItem.title) {
        wikiButton = `<button class="wikiButton" data-nr="${nr}">Wiki</button>`;
    }

    return `
    <div class='${cls('row', !isChanged && 'collapsed')}'>
        <div class='${cls('title', isChanged && 'changed')}'>
            ${nr}. ${dataItem.title || ''}
            <div class='differences'>${differences} differences</div>
        </div>
        <div class='content'>
            <div class='comparison'>
                <div class='text'>${addBreaks(text1)}</div>
                <div class='text'>${addBreaks(text2)}</div>
            </div>
            ${wikiButton}
        </div>
    </div>
    `;
};

/**
 *
 */
const addBreaks = (text) => {
    return text.replaceAll('\n', '<br/>');
};

/**
 *
 */
const addListeners = () => {
    const titles = document.querySelectorAll('.title');
    for (const title of titles) {
        title.addEventListener('click', onTitleClick);
    }

    const wikiButtons = document.querySelectorAll('.wikiButton');
    for (const wikiButton of wikiButtons) {
        wikiButton.addEventListener('click', onWikiButtonClick);
    }
};

/**
 *
 */
const onTitleClick = (event) => {
    const parent = event.currentTarget.parentNode;
    parent.classList.toggle('collapsed');
};

/**
 *
 */
const onWikiButtonClick = (event) => {
    const {nr} = event.currentTarget.dataset;
    const index = Number(nr) - 1;
    const {title, text2} = data.list[index];
    copyToClipboard(text2, {format: 'text/plain'});
    const src = data.wiki + '/' + title + '?action=edit';
    window.open(src, '_blank').focus();
    const row = event.currentTarget.closest('.row');
    row.classList.add('collapsed');
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default analyzeData;
