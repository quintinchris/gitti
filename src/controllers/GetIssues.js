"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var GithubApiUrl = 'https://api.github.com/';
var SearchIssuesGithubApiUrl = 'https://api.github.com/search/issues';
var getIssuesFromGithub = function (url, query) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"]
                    .get(url, {
                    params: {
                        q: "\"" + query + "\""
                    }
                })
                    .then(function (response) {
                    console.log(response.data);
                    return response.data;
                })["catch"](function (error) {
                    console.log(error);
                })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.data];
        }
    });
}); };
var Labels;
(function (Labels) {
    Labels[Labels["good first issue"] = 0] = "good first issue";
    Labels[Labels["help wanted"] = 1] = "help wanted";
    Labels[Labels["enhancement"] = 2] = "enhancement";
    Labels[Labels["priority"] = 3] = "priority";
    Labels[Labels["first timers only"] = 4] = "first timers only";
})(Labels || (Labels = {}));
var getLabelsQuery = function (options) {
    var labelsQuery = '';
    for (var i = 0; i < options.length; i++) {
        labelsQuery += "label:" + Labels[options[i]];
    }
    return labelsQuery;
};
var test = [1, 3];
console.log(getLabelsQuery(test));
var getLanguageQuery = function (toInclude, toExclude) {
    var includedLanguages = '';
    var excludedLanguages = '';
    for (var i = 0; i < toInclude.length; i++) {
        includedLanguages += "language:" + toInclude[i] + " ";
    }
    for (var i = 0; i < toExclude.length; i++) {
        excludedLanguages += "-language:" + toExclude[i] + " ";
    }
    return { includedLanguages: includedLanguages, excludedLanguages: excludedLanguages };
};
var KeywordLocation;
(function (KeywordLocation) {
    KeywordLocation[KeywordLocation["body"] = 0] = "body";
    KeywordLocation[KeywordLocation["title"] = 1] = "title";
    KeywordLocation[KeywordLocation["comments"] = 2] = "comments";
})(KeywordLocation || (KeywordLocation = {}));
var getKeywordQuery = function (keyword, location) {
    var keywordQuery = keyword + " in:" + KeywordLocation[location];
    return keywordQuery;
};
var getExcludedItems = function (items) { };
module.exports = getIssuesFromGithub;
/*
--SORTING OPTIONS--
1. SORT BY LAST UPDATED

--FILTER OUT BEFORE SHOWING USER--
1. LABELS CONTAINS X
2. ASSIGNEE OR ASIGNEES ARE BOTH EMPTY
3. LOCKED = FALSE
4. STATE = 'OPEN'

--FILTERING OPTIONS--
SO YOU CAN QUERY GITHUB API KINDA LIKE JQL FOR JIRA,
✔ FILTER BY LANGUAGE => LANGUAGE:TS/JS/RUBY/ETC,
✔ FILTER FOR TERMS IN BODY OF ISSUE => TESTS IN:BODY
FILTER BY PRIORITY LABELS => LABEL:PRIORITY
SEARCH THINGS THAT HAVE NO SOMETHING => NO:ASSIGNEE, NO:LABEL
SEARCH WORDS IN THE TITLE, BODY, OR COMMENTS => WORDS IN:TITLE/BODY/COMMENTS
SEARCH OPEN/CLOSED => IS:OPEN OR STATE:OPEN
FILTER OUT ISSUES LINKED TO A PR => -LINKED:PR
FILTER OUT ISSUES THAT HAVE SOMETHING => -LABEL:RESOLVED, -STATE:CLOSED, ETC

IDEA IS TO LET USER CONTROL/CHOOSE WHAT THEY WANT TO FILTER BY
SO ON THE FRONT END, WE WILL HAVE A FORM WITH BUTTONS/TEXTBOXES TO LET USERS TELL WHAT ISSUES THEY WANT TO SEE
I.E.
    LABELS => BUTTONS FOR EACH LABEL, THEY CAN CHOOSE MORE THAN 1
    KEYWORDS => TEXTBOX, THEY ENTER TEXT THEY WANT TO SEE CONTAINED WITHIN (TITLE, BODY, OR COMMENTS? BUTTONS FOR THOSE?)
*/ 
