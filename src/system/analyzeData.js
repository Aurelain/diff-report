import compareTexts from './compareTexts';
import cls from '../utils/cls';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const analyzeData = (data) => {
    const {list} = data;
    let markup = '';
    for (let i = 0; i < list.length; i++) {
        markup += buildRow(list[i], i + 1);
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
const buildRow = (dataItem, nr) => {
    const comparison = compareTexts(dataItem.text1, dataItem.text2);
    const {text1, text2, differences} = comparison;
    const isChanged = differences !== 0;

    return `
    <div class='${cls('row', !isChanged && 'collapsed')}'>
        <div class='${cls('title', isChanged && 'changed')}'>
            ${nr}. ${dataItem.title || ''}
            <div class='differences'>${differences} differences</div>
        </div>
        <div class='comparison'>
            <div class='text'>${addBreaks(text1)}</div>
            <div class='text'>${addBreaks(text2)}</div>
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
};

/**
 *
 */
const onTitleClick = (event) => {
    const parent = event.currentTarget.parentNode;
    parent.classList.toggle('collapsed');
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default analyzeData;
