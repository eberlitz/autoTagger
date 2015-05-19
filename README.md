# autoTagger.js

JavaScript text auto tagger


# Usage

```
var testText = "This text is from a Wikipedia entry about Bayes' Theorem. Bayesian inference has applications in artificial intelligence and expert systems. Bayesian inference techniques have been a fundamental part of computerized pattern recognition techniques since the late 1950s. There is also an ever growing connection between Bayesian methods and simulation-based Monte Carlo techniques since complex models cannot be processed in closed form by a Bayesian analysis, while the graphical model structure inherent to statistical models, may allow for efficient simulation algorithms like the Gibbs sampling and other Metropolis-Hastings algorithm schemes. Recently Bayesian inference has gained popularity amongst the phylogenetics community for these reasons; applications such as BEAST, MrBayes and P4 allow many demographic and evolutionary parameters to be estimated simultaneously."

new autoTagger().useStopWords('en').fromText(testText)
```