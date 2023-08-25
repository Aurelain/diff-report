import analyzeData from './system/analyzeData';
import embedScriptFile from './utils/embedScriptFile';

/**
 *
 */
const onWindowLoad = async () => {
    if (!window.DATA) {
        await embedScriptFile('data.js');
    }
    analyzeData(window.DATA);
};

window.addEventListener('load', onWindowLoad);
