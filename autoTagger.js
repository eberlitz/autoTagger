(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.autoTagger = factory()
}(this, function() {
    'use strict';
    var defaultStopWords = {
        'en': ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours    ', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'],
        'pt': ['a','as','do', 'da', 'das', 'dos', 'de', 'da','no','na','nos','nas', 'já', 'se', 'ao', 'na', 'seja', 'será', 'que', 'último', 'é', 'acerca', 'agora', 'algumas', 'alguns', 'ali', 'ambos', 'antes', 'apontar', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aqui', 'atrás', 'bem', 'bom', 'cada', 'caminho', 'cima', 'com', 'como', 'comprido', 'conhecido', 'corrente', 'das', 'debaixo', 'dentro', 'desde', 'desligado', 'deve', 'devem', 'deverá', 'direita', 'diz', 'dizer', 'dois', 'dos', 'e', 'ela', 'ele', 'eles', 'em', 'enquanto', 'então', 'está', 'estão', 'estado', 'estar', 'estará', 'este', 'estes', 'esteve', 'estive', 'estivemos', 'estiveram', 'eu', 'fará', 'faz', 'fazer', 'fazia', 'fez', 'fim', 'foi', 'fora', 'horas', 'iniciar', 'inicio', 'ir', 'irá', 'ista', 'iste', 'isto', 'ligado', 'maioria', 'maiorias', 'mais', 'mas', 'mesmo', 'meu', 'muito', 'muitos', 'nós', 'não', 'nome', 'nosso', 'novo', 'o', 'onde', 'os', 'ou', 'outro', 'para', 'parte', 'pegar', 'pelo', 'pessoas', 'pode', 'poderá', 'podia', 'por', 'porque', 'povo', 'promeiro', 'quê', 'qual', 'qualquer', 'quando', 'quem', 'quieto', 'são', 'saber', 'sem', 'ser', 'seu', 'somente', 'têm', 'tal', 'também', 'tem', 'tempo', 'tenho', 'tentar', 'tentaram', 'tente', 'tentei', 'teu', 'teve', 'tipo', 'tive', 'todos', 'trabalhar', 'trabalho', 'tu', 'um', 'uma', 'umas', 'uns', 'usa', 'usar', 'valor', 'veja', 'ver', 'verdade', 'verdadeiro', 'você']
    };

    var autoTagger = AutoTagger;
    autoTagger.useStopWords = useStopWords;
    autoTagger.fromText = fromText;

    return autoTagger;
    //-----------------------------------------------------------------------------
    function AutoTagger() {
        var self = this;
        self._stopWords = [];
        self.useStopWords = useStopWords;
        self.fromText = fromText;
        return self;
    };

    function useStopWords(stopWords) {
        var at = this instanceof AutoTagger ? this : new AutoTagger();
        if (isString(stopWords)) {
            at._stopWords = at._stopWords.concat(defaultStopWords[stopWords] || []);
        } else {
            at._stopWords = at._stopWords.concat(stopWords || []);
        }
        return at;
    }

    function fromText(text, atLeast, numWords) {
        var me = this instanceof AutoTagger ? this : new AutoTagger();
        var data;

        if (!isString(text)) return;
        atLeast = atLeast || 2;
        numWords = numWords || 5;

        data = text.replace(/\s+/g, " ").toLowerCase()
            //.replace(/[^a-zA-Z'\-]+/g, " ")
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ");
        data = me._stopWords.reduce(function(text, stop_word) {
            // Build the regex
            var regex = "^\\s*" + stop_word + "\\s*$"; // Only word
            regex += "|^\\s*" + stop_word + "\\s+"; // First word
            regex += "|\\s+" + stop_word + "\\s*$"; // Last word
            regex += "|\\s+" + stop_word + "\\s+"; // Word somewhere in the middle
            regex = new RegExp(regex, "ig");
            return text.replace(regex, " ");
        }, data);
        data = data.match(/[^\s]+/g);

        if (!data) return;

        //var textLength = data.length;
        var gramsFrequency = getGramsFrequency(data, numWords);
        return gramsFrequency.reduce(function(a, b, i) {
                var frequencyTable = b || {};
                return Object.keys(frequencyTable)
                    .filter(function(word) {
                        return frequencyTable[word] >= atLeast
                    })
                    .map(function(word) {
                        return {
                            word: word,
                            count: frequencyTable[word],
                            // freq: Math.round(frequencyTable[word] / textLength * 10000) / 100,
                            // peso: ((i + 1) / gramsFrequency.length),
                        }
                    }).concat(a);
            }, [])
            // sort words by abc order
            .sort(function(a, b) {
                return b.count - a.count;
            });
    }

    function getGramsFrequency(data, numWords) {
        numWords = numWords || 5;
        var keys = [];
        var i = 0,
            j = 0;
        for (i = 0; i < numWords; i++) {
            keys.push({});
        }
        var map = data.reduce(function(p, c, i, arr) {
            p[0][c] = (p[0][c] || 0) + 1;
            for (j = 1; j < numWords; j++) {
                if (i + j < arr.length) {
                    c += " " + arr[i + j];
                    p[j][c] = (p[j][c] || 0) + 1;
                } else break;
            }
            return p;
        }, keys);
        return map;
    }

    function isString(value) {
        return typeof value === 'string';
    }
}));