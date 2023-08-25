import DiffMatchPatch from 'diff-match-patch';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const diffMatchPatch = new DiffMatchPatch();

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * Compares two texts and, if they differ, produces new versions with decorations (<ins> and <del>).
 * Note: To avoid risks when displaying the new texts, some html symbols are converted to entities.
 * @return {{
 *     text1: string,
 *     text2: string,
 * }}
 * @see /src/tests/diffTexts.test.js
 */
const compareTexts = (text1, text2) => {
    const safeText1 = convertSymbols(text1);
    const safeText2 = convertSymbols(text2);
    const results = diffMatchPatch.diff_main(safeText1, safeText2);
    // console.log('results: ' + JSON.stringify(results, null, 4));

    const t1 = [];
    const t2 = [];
    for (const [op, text] of results) {
        switch (op) {
            case DiffMatchPatch.DIFF_DELETE:
                t1.push('<del>' + text + '</del>');
                t2.push('<del></del>');
                break;
            case DiffMatchPatch.DIFF_INSERT:
                t1.push('<ins></ins>');
                t2.push('<ins>' + text + '</ins>');
                break;
            default:
                // DiffMatchPatch.DIFF_EQUAL
                t1.push(text);
                t2.push(text);
        }
    }

    return {
        text1: t1.join('').split('</del><ins></ins>').join('</del>'),
        text2: t2.join('').split('<del></del><ins>').join('<ins>'),
    };
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const convertSymbols = (text) => {
    return text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;');
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default compareTexts;
