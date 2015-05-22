# autoTagger.js

Simple JavaScript text auto tagger

# Usage


Include the javascript in the browser:

```html
<script type="text/javascript" src="https://cdn.rawgit.com/eberlitz/autoTagger/master/autoTagger.js"></script>
```

or use it in Node.js:

```
$> npm install auto-tagger
```

```js
var autoTagger = require('auto-tagger');
```

You can use the folowing methods to extract relevant tags from documents:

```js
var testText = "This text is from a Wikipedia entry about Bayes' Theorem. Bayesian inference has applications in artificial intelligence and expert systems. Bayesian inference techniques have been a fundamental part of computerized pattern recognition techniques since the late 1950s. There is also an ever growing connection between Bayesian methods and simulation-based Monte Carlo techniques since complex models cannot be processed in closed form by a Bayesian analysis, while the graphical model structure inherent to statistical models, may allow for efficient simulation algorithms like the Gibbs sampling and other Metropolis-Hastings algorithm schemes. Recently Bayesian inference has gained popularity amongst the phylogenetics community for these reasons; applications such as BEAST, MrBayes and P4 allow many demographic and evolutionary parameters to be estimated simultaneously."

var tags = autoTagger

// using portuguese stop words
.useStopWords('pt')

// using english stop words
.useStopWords('en')

// adding aditionals stop words
.useStopWords(['will'])

// extract tags from text
// return tags that have at least 2 ocurrences
// and look for ocurrences of 4 consecutive words 
.fromText(testText,2,4)

// Format the output
.map(function(w){return w.word + ':'+ w.count}).join('\r\n');

/*
 * print results to the console:
 * "bayesian:5
 * bayesian inference:3
 * inference:3
 * techniques:3
 * techniques since:2
 * applications:2
 * since:2
 * models:2
 * allow:2"
 *
 */
console.log(tags);


```
